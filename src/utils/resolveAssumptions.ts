/**
 * Utility to resolve assumptions from both inline definitions and repository references
 */

import type { Assumption } from '../types/scenario';
import type { AssumptionReference } from '../types/repository';
import { getAssumptionDefinition } from '../data/repository';

/**
 * Resolve an assumption reference into a full Assumption object
 */
export function resolveAssumptionRef(ref: AssumptionReference): Assumption | null {
  const definition = getAssumptionDefinition(ref.assumptionId);

  if (!definition) {
    console.warn(`Assumption not found in repository: ${ref.assumptionId}`);
    return null;
  }

  return {
    id: definition.id,
    category: definition.category,
    description: ref.descriptionOverride || definition.description,
    confidence: ref.confidence || definition.defaultConfidence,
    impact: ref.impact || definition.defaultImpact,
  };
}

/**
 * Get all assumptions for a scenario, combining inline and repository references
 */
export function getAllAssumptions(
  inlineAssumptions?: Assumption[],
  assumptionRefs?: AssumptionReference[]
): Assumption[] {
  const assumptions: Assumption[] = [];

  // Add inline assumptions
  if (inlineAssumptions) {
    assumptions.push(...inlineAssumptions);
  }

  // Add resolved repository references
  if (assumptionRefs) {
    for (const ref of assumptionRefs) {
      const resolved = resolveAssumptionRef(ref);
      if (resolved) {
        assumptions.push(resolved);
      }
    }
  }

  return assumptions;
}

/**
 * Group assumptions by category
 */
export function groupAssumptionsByCategory(assumptions: Assumption[]): Record<string, Assumption[]> {
  return assumptions.reduce((groups, assumption) => {
    const category = assumption.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(assumption);
    return groups;
  }, {} as Record<string, Assumption[]>);
}

/**
 * Get statistics about assumptions
 */
export function getAssumptionStats(assumptions: Assumption[]) {
  return {
    total: assumptions.length,
    byConfidence: {
      low: assumptions.filter(a => a.confidence === 'low').length,
      medium: assumptions.filter(a => a.confidence === 'medium').length,
      high: assumptions.filter(a => a.confidence === 'high').length,
      critical: assumptions.filter(a => a.confidence === 'critical').length,
    },
    byImpact: {
      low: assumptions.filter(a => a.impact === 'low').length,
      medium: assumptions.filter(a => a.impact === 'medium').length,
      high: assumptions.filter(a => a.impact === 'high').length,
      critical: assumptions.filter(a => a.impact === 'critical').length,
    },
    byCategory: groupAssumptionsByCategory(assumptions),
  };
}
