/**
 * Component to compare assumptions across multiple scenarios
 * Shows which assumptions are common and which are unique
 */

import { useMemo } from 'react';
import type { FlexibleScenario } from '../types/scenario';
import { getAllAssumptions } from '../utils/resolveAssumptions';
import { ASSUMPTION_REPOSITORY } from '../data/repository';

interface AssumptionComparisonViewProps {
  scenarios: FlexibleScenario[];
}

interface AssumptionUsage {
  assumptionId: string;
  name: string;
  description: string;
  category: string;
  scenarios: string[]; // scenario IDs that use this assumption
  count: number;
}

export default function AssumptionComparisonView({ scenarios }: AssumptionComparisonViewProps) {
  const assumptionUsage = useMemo(() => {
    const usageMap = new Map<string, AssumptionUsage>();

    // Collect all assumptions from all scenarios
    scenarios.forEach((scenario) => {
      const assumptions = getAllAssumptions(
        (scenario as any).assumptions,
        (scenario as any).assumptionRefs
      );

      assumptions.forEach((assumption) => {
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

    // Convert to array and sort by usage count (descending)
    return Array.from(usageMap.values()).sort((a, b) => b.count - a.count);
  }, [scenarios]);

  const commonAssumptions = assumptionUsage.filter((a) => a.count > 1);
  const uniqueAssumptions = assumptionUsage.filter((a) => a.count === 1);
  const totalAssumptions = ASSUMPTION_REPOSITORY.length;
  const usedAssumptions = assumptionUsage.length;

  return (
    <div className="assumption-comparison-view">
      <div className="comparison-header">
        <h2>Assumption Analysis Across {scenarios.length} Scenarios</h2>
        <div className="stats-summary">
          <div className="stat-card">
            <div className="stat-value">{totalAssumptions}</div>
            <div className="stat-label">Total in Repository</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{usedAssumptions}</div>
            <div className="stat-label">Used in Scenarios</div>
          </div>
          <div className="stat-card highlight">
            <div className="stat-value">{commonAssumptions.length}</div>
            <div className="stat-label">Shared Assumptions</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{uniqueAssumptions.length}</div>
            <div className="stat-label">Unique Assumptions</div>
          </div>
        </div>
      </div>

      {commonAssumptions.length > 0 && (
        <div className="assumptions-section">
          <h3>🔗 Common Assumptions (Used by Multiple Scenarios)</h3>
          <div className="assumptions-list">
            {commonAssumptions.map((usage) => {
              const scenarioNames = usage.scenarios
                .map((id) => scenarios.find((s) => s.id === id)?.title || id)
                .join(', ');

              return (
                <div key={usage.assumptionId} className="assumption-card common">
                  <div className="assumption-header">
                    <span className={`badge ${usage.category}`}>{usage.category}</span>
                    <span className="usage-badge">
                      Used by {usage.count} scenario{usage.count !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="assumption-description">{usage.description}</p>
                  <div className="scenario-list">
                    <strong>Scenarios:</strong> {scenarioNames}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {uniqueAssumptions.length > 0 && (
        <div className="assumptions-section">
          <h3>🔸 Unique Assumptions (Used by Single Scenario)</h3>
          <details>
            <summary>Show {uniqueAssumptions.length} unique assumptions</summary>
            <div className="assumptions-list">
              {uniqueAssumptions.map((usage) => {
                const scenario = scenarios.find((s) => s.id === usage.scenarios[0]);

                return (
                  <div key={usage.assumptionId} className="assumption-card unique">
                    <div className="assumption-header">
                      <span className={`badge ${usage.category}`}>{usage.category}</span>
                      <span className="scenario-badge">{scenario?.title || usage.scenarios[0]}</span>
                    </div>
                    <p className="assumption-description">{usage.description}</p>
                  </div>
                );
              })}
            </div>
          </details>
        </div>
      )}

      <div className="category-breakdown">
        <h3>📊 Breakdown by Category</h3>
        <div className="category-grid">
          {['technical', 'alignment', 'safety', 'economic', 'geopolitical', 'regulatory', 'strategic'].map(
            (category) => {
              const categoryAssumptions = assumptionUsage.filter((a) => a.category === category);
              const commonCount = categoryAssumptions.filter((a) => a.count > 1).length;

              return (
                <div key={category} className="category-card">
                  <h4>{category}</h4>
                  <div className="category-stats">
                    <div>Total: {categoryAssumptions.length}</div>
                    <div>Common: {commonCount}</div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
