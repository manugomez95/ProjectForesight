/**
 * Centralized configuration for assumption categories
 * This file serves as the single source of truth for category definitions and colors
 */

export type AssumptionCategory =
  | 'technical'
  | 'alignment'
  | 'safety'
  | 'security'
  | 'economic'
  | 'geopolitical'
  | 'regulatory'
  | 'strategic';

export interface CategoryConfig {
  id: AssumptionCategory;
  label: string;
  color: {
    /** Main color for text */
    primary: string;
    /** Background color (with opacity) */
    background: string;
    /** Border color (with opacity) */
    border: string;
  };
  description: string;
}

/**
 * Complete list of all assumption categories with their visual styling
 * Add new categories here and they will automatically appear in filters and have proper styling
 */
export const ASSUMPTION_CATEGORIES: Record<AssumptionCategory, CategoryConfig> = {
  technical: {
    id: 'technical',
    label: 'Technical',
    color: {
      primary: '#60a5fa',
      background: 'rgba(59, 130, 246, 0.2)',
      border: 'rgba(59, 130, 246, 0.4)',
    },
    description: 'AI capabilities, compute, architecture breakthroughs',
  },
  alignment: {
    id: 'alignment',
    label: 'Alignment',
    color: {
      primary: '#fbbf24',
      background: 'rgba(245, 158, 11, 0.2)',
      border: 'rgba(245, 158, 11, 0.4)',
    },
    description: 'AI alignment and control challenges',
  },
  safety: {
    id: 'safety',
    label: 'Safety',
    color: {
      primary: '#22d3ee',
      background: 'rgba(6, 182, 212, 0.2)',
      border: 'rgba(6, 182, 212, 0.4)',
    },
    description: 'Safety measures, control mechanisms, risks',
  },
  security: {
    id: 'security',
    label: 'Security',
    color: {
      primary: '#fb923c',
      background: 'rgba(249, 115, 22, 0.2)',
      border: 'rgba(249, 115, 22, 0.4)',
    },
    description: 'Cybersecurity, model theft, infrastructure protection',
  },
  economic: {
    id: 'economic',
    label: 'Economic',
    color: {
      primary: '#34d399',
      background: 'rgba(16, 185, 129, 0.2)',
      border: 'rgba(16, 185, 129, 0.4)',
    },
    description: 'Deployment, automation, market dynamics',
  },
  geopolitical: {
    id: 'geopolitical',
    label: 'Geopolitical',
    color: {
      primary: '#f87171',
      background: 'rgba(239, 68, 68, 0.2)',
      border: 'rgba(239, 68, 68, 0.4)',
    },
    description: 'US-China competition, manufacturing, espionage',
  },
  regulatory: {
    id: 'regulatory',
    label: 'Regulatory',
    color: {
      primary: '#f472b6',
      background: 'rgba(236, 72, 153, 0.2)',
      border: 'rgba(236, 72, 153, 0.4)',
    },
    description: 'Government response, international coordination',
  },
  strategic: {
    id: 'strategic',
    label: 'Strategic',
    color: {
      primary: '#a78bfa',
      background: 'rgba(139, 92, 246, 0.2)',
      border: 'rgba(139, 92, 246, 0.4)',
    },
    description: 'Takeoff speed, value drift, long-term considerations',
  },
};

/**
 * Array of all category IDs in a consistent order
 */
export const ALL_CATEGORIES: AssumptionCategory[] = Object.keys(
  ASSUMPTION_CATEGORIES
) as AssumptionCategory[];

/**
 * Get category configuration by ID
 */
export function getCategoryConfig(category: AssumptionCategory): CategoryConfig {
  return ASSUMPTION_CATEGORIES[category];
}

/**
 * Validate that a category exists and has proper configuration
 */
export function validateCategory(category: string): category is AssumptionCategory {
  return category in ASSUMPTION_CATEGORIES;
}

/**
 * Get CSS variable name for a category color property
 */
export function getCategoryCSSVar(category: AssumptionCategory, property: 'primary' | 'background' | 'border'): string {
  return `--category-${category}-${property}`;
}
