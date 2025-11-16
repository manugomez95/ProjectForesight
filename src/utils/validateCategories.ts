/**
 * Utility to validate that all category configurations are complete
 * Run this in development to ensure all categories have proper styling
 */

import { ALL_CATEGORIES, ASSUMPTION_CATEGORIES, type AssumptionCategory } from '../config/categories';

/**
 * Validate that all categories have complete configuration
 * Returns array of validation errors (empty if all valid)
 */
export function validateCategoryConfig(): string[] {
  const errors: string[] = [];

  ALL_CATEGORIES.forEach((category) => {
    const config = ASSUMPTION_CATEGORIES[category];

    if (!config) {
      errors.push(`Missing configuration for category: ${category}`);
      return;
    }

    if (!config.label) {
      errors.push(`Missing label for category: ${category}`);
    }

    if (!config.description) {
      errors.push(`Missing description for category: ${category}`);
    }

    if (!config.color.primary) {
      errors.push(`Missing primary color for category: ${category}`);
    }

    if (!config.color.background) {
      errors.push(`Missing background color for category: ${category}`);
    }

    if (!config.color.border) {
      errors.push(`Missing border color for category: ${category}`);
    }
  });

  return errors;
}

/**
 * Check if CSS exists for all categories
 * Note: This is a runtime check that verifies the presence of CSS classes
 * It's best run in a browser environment
 */
export function checkCategoryCSSClasses(): {
  missingBadges: AssumptionCategory[];
  missingFilters: AssumptionCategory[];
} {
  if (typeof document === 'undefined') {
    console.warn('CSS validation can only run in browser environment');
    return { missingBadges: [], missingFilters: [] };
  }

  const missingBadges: AssumptionCategory[] = [];
  const missingFilters: AssumptionCategory[] = [];

  ALL_CATEGORIES.forEach((category) => {
    // Check if badge class exists
    const testBadge = document.createElement('span');
    testBadge.className = `badge ${category}`;
    document.body.appendChild(testBadge);
    const badgeStyles = window.getComputedStyle(testBadge);

    // Check if the badge has custom background color (not inherited)
    if (badgeStyles.backgroundColor === 'rgba(0, 0, 0, 0)' || badgeStyles.backgroundColor === 'transparent') {
      missingBadges.push(category);
    }

    document.body.removeChild(testBadge);

    // Check if filter class exists
    const testFilter = document.createElement('button');
    testFilter.className = `tag ${category} active`;
    document.body.appendChild(testFilter);
    const filterStyles = window.getComputedStyle(testFilter);

    // Check if the filter has custom background color (not inherited)
    if (filterStyles.backgroundColor === 'rgba(0, 0, 0, 0)' || filterStyles.backgroundColor === 'transparent') {
      missingFilters.push(category);
    }

    document.body.removeChild(testFilter);
  });

  return { missingBadges, missingFilters };
}

/**
 * Run all validations and log results
 * Useful for development debugging
 */
export function runCategoryValidation(): void {
  console.group('📋 Category Configuration Validation');

  // Validate config completeness
  const configErrors = validateCategoryConfig();
  if (configErrors.length > 0) {
    console.error('❌ Configuration errors found:');
    configErrors.forEach((error) => console.error(`  - ${error}`));
  } else {
    console.log('✅ All category configurations are complete');
  }

  // Validate CSS classes
  const { missingBadges, missingFilters } = checkCategoryCSSClasses();

  if (missingBadges.length > 0) {
    console.error('❌ Missing badge CSS for categories:', missingBadges);
    console.error('   Add CSS rules for: .badge.' + missingBadges.join(', .badge.'));
  } else {
    console.log('✅ All badge CSS classes exist');
  }

  if (missingFilters.length > 0) {
    console.error('❌ Missing filter CSS for categories:', missingFilters);
    console.error('   Add CSS rules for: .category-filter .tag.active.' + missingFilters.join(', .category-filter .tag.active.'));
  } else {
    console.log('✅ All filter CSS classes exist');
  }

  console.groupEnd();
}
