/**
 * Component to compare assumptions across multiple scenarios
 * Shows which assumptions are common and which are unique
 */

import { useMemo, useEffect, useRef, useState } from 'react';
import type { FlexibleScenario } from '../types/scenario';
import { getAllAssumptions } from '../utils/resolveAssumptions';
import { ALL_CATEGORIES, ASSUMPTION_CATEGORIES, validateCategory } from '../config/categories';
import { runCategoryValidation } from '../utils/validateCategories';

interface AssumptionComparisonViewProps {
  scenarios: FlexibleScenario[];
  focusedAssumptionId?: string;
}

interface AssumptionUsage {
  assumptionId: string;
  name: string;
  description: string;
  category: string;
  scenarios: string[]; // scenario IDs that use this assumption
  count: number;
}

export default function AssumptionComparisonView({ scenarios, focusedAssumptionId }: AssumptionComparisonViewProps) {
  const assumptionRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const assumptionUsage = useMemo(() => {
    const usageMap = new Map<string, AssumptionUsage>();
    const invalidCategories = new Set<string>();

    // Collect all assumptions from all scenarios
    scenarios.forEach((scenario) => {
      const assumptions = getAllAssumptions(
        scenario.assumptions,
        'assumptionRefs' in scenario ? scenario.assumptionRefs : undefined
      );

      assumptions.forEach((assumption) => {
        // Validate category
        if (!validateCategory(assumption.category)) {
          invalidCategories.add(assumption.category);
        }

        if (!usageMap.has(assumption.id)) {
          usageMap.set(assumption.id, {
            assumptionId: assumption.id,
            name: assumption.description.split('.')[0].slice(0, 80), // First sentence or 80 chars
            description: assumption.description,
            category: assumption.category,
            scenarios: [],
            count: 0,
          });
        }

        const usage = usageMap.get(assumption.id)!;
        if (!usage.scenarios.includes(scenario.id)) {
          usage.scenarios.push(scenario.id);
          usage.count++;
        }
      });
    });

    // Warn about invalid categories in development
    if (invalidCategories.size > 0) {
      console.warn(
        '⚠️ Invalid assumption categories detected:',
        Array.from(invalidCategories),
        '\nValid categories are:',
        ALL_CATEGORIES,
        '\nPlease update these assumptions to use valid categories or add the new categories to src/config/categories.ts'
      );
    }

    // Convert to array and sort by usage count (descending)
    return Array.from(usageMap.values()).sort((a, b) => b.count - a.count);
  }, [scenarios]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ALL_CATEGORIES.forEach((c) => {
      counts[c] = assumptionUsage.filter((a) => a.category === c).length;
    });
    return counts;
  }, [assumptionUsage]);

  const filteredAssumptionUsage = useMemo(() => {
    if (!selectedCategory) return assumptionUsage;
    return assumptionUsage.filter((a) => a.category === selectedCategory);
  }, [assumptionUsage, selectedCategory]);

  // Scroll to focused assumption
  useEffect(() => {
    if (focusedAssumptionId) {
      const element = assumptionRefs.current.get(focusedAssumptionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('highlighted');
          setTimeout(() => element.classList.remove('highlighted'), 2000);
        }, 100);
      }
    }
  }, [focusedAssumptionId]);

  // Validate category configuration in development
  useEffect(() => {
    if (import.meta.env.DEV) {
      runCategoryValidation();
    }
  }, []); // Run once on mount

  return (
    <div className="assumption-comparison-view">
      <div className="comparison-header">
        <div>
          <h2>Assumption Analysis</h2>
          <p className="subtitle">Across {scenarios.length} Scenarios</p>
        </div>
      </div>

      <div className="category-filter" style={{ marginBottom: '1rem' }}>
        <button
          className={`tag ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          All <span className="count">{assumptionUsage.length}</span>
        </button>
        {ALL_CATEGORIES.map((category) => (
          <button
            key={category}
            className={`tag ${category} ${selectedCategory === category ? 'active' : ''}`}
            onClick={() =>
              setSelectedCategory((prev) => (prev === category ? null : category))
            }
          >
            {ASSUMPTION_CATEGORIES[category].label}{' '}
            <span className="count">{categoryCounts[category] || 0}</span>
          </button>
        ))}
      </div>

      {(filteredAssumptionUsage.length > 0) && (
        <div className="assumptions-section">
          <div className="assumptions-list">
            {filteredAssumptionUsage.map((usage) => {
              const singleScenario =
                usage.count === 1
                  ? (scenarios.find((s) => s.id === usage.scenarios[0])?.title ||
                      usage.scenarios[0])
                  : null;
              return (
                <div
                  key={usage.assumptionId}
                  ref={(el) => {
                    if (el) assumptionRefs.current.set(usage.assumptionId, el);
                  }}
                  className="assumption-card"
                >
                  <div className="assumption-header">
                    <span className={`badge ${usage.category}`}>{usage.category}</span>
                    {usage.count > 1 && (
                      <span className="usage-badge">
                        {usage.count} scenario{usage.count !== 1 ? 's' : ''}
                      </span>
                    )}
                    {singleScenario && (
                      <span className="scenario-badge">{singleScenario}</span>
                    )}
                  </div>
                  <p className="assumption-description">{usage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      
    </div>
  );
}
