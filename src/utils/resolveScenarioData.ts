/**
 * Utility to resolve parameters and milestones from both inline and repository-based scenarios
 */

import type { ScenarioParameter, Milestone, FlexibleScenario, AIScenario } from '../types/scenario';
import type { RepositoryParameter } from '../types/scenario';
import type { MilestoneReference } from '../types/repository';
import { getParameterDefinition, getMilestoneDefinition } from '../data/repository';

/**
 * Resolve a repository parameter reference into a full ScenarioParameter
 */
function resolveParameterRef(ref: RepositoryParameter): ScenarioParameter | null {
  const definition = getParameterDefinition(ref.parameterId);

  if (!definition) {
    console.warn(`Parameter not found in repository: ${ref.parameterId}`);
    return null;
  }

  return {
    id: definition.id,
    name: ref.nameOverride || definition.name,
    description: ref.descriptionOverride || definition.description,
    unit: ref.unitOverride || definition.unit,
    data: ref.data,
    color: ref.colorOverride || definition.color,
  };
}

/**
 * Resolve a milestone reference into a full Milestone
 */
function resolveMilestoneRef(ref: MilestoneReference): Milestone | null {
  const definition = getMilestoneDefinition(ref.milestoneId);

  if (!definition) {
    console.warn(`Milestone not found in repository: ${ref.milestoneId}`);
    return null;
  }

  return {
    id: definition.id,
    date: ref.date,
    title: ref.titleOverride || definition.name,
    description: ref.descriptionOverride || definition.description,
    significance: ref.significance,
    category: definition.category as Milestone['category'],
  };
}

/**
 * Get all parameters for a scenario (handles both inline and repository-based)
 */
export function getAllParameters(scenario: FlexibleScenario): ScenarioParameter[] {
  const aiScenario = scenario as AIScenario;
  const repoScenario = scenario as any; // RepositoryBasedScenario

  // If it has inline parameters, use those
  if (aiScenario.parameters && Array.isArray(aiScenario.parameters)) {
    return aiScenario.parameters;
  }

  // Otherwise, resolve from repository references
  if (repoScenario.parameterRefs && Array.isArray(repoScenario.parameterRefs)) {
    const parameters: ScenarioParameter[] = [];
    for (const ref of repoScenario.parameterRefs) {
      const resolved = resolveParameterRef(ref);
      if (resolved) {
        parameters.push(resolved);
      }
    }
    return parameters;
  }

  return [];
}

/**
 * Get all milestones for a scenario (handles both inline and repository-based)
 */
export function getAllMilestones(scenario: FlexibleScenario): Milestone[] {
  const aiScenario = scenario as AIScenario;
  const repoScenario = scenario as any; // RepositoryBasedScenario

  // If it has inline milestones, use those
  if (aiScenario.milestones && Array.isArray(aiScenario.milestones)) {
    return aiScenario.milestones;
  }

  // Otherwise, resolve from repository references
  if (repoScenario.milestoneRefs && Array.isArray(repoScenario.milestoneRefs)) {
    const milestones: Milestone[] = [];
    for (const ref of repoScenario.milestoneRefs) {
      const resolved = resolveMilestoneRef(ref);
      if (resolved) {
        milestones.push(resolved);
      }
    }
    return milestones;
  }

  return [];
}
