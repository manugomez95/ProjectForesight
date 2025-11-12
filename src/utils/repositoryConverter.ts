/**
 * Repository Converter Utilities
 *
 * Converts between traditional inline scenario definitions and
 * repository-based scenarios that reference centralized data.
 */

import type {
  AIScenario,
  ScenarioParameter,
  Milestone,
  RepositoryBasedScenario,
  RepositoryParameter,
} from '../types/scenario';
import type { MilestoneReference } from '../types/repository';
import {
  getParameterDefinition,
  findParameterByName,
} from '../data/repository/parameters';
import {
  getMilestoneDefinition,
  findMilestoneByName,
} from '../data/repository/milestones';

/**
 * Convert a repository-based scenario to a traditional scenario
 * This expands all references into full inline definitions
 */
export function expandRepositoryScenario(
  scenario: RepositoryBasedScenario
): AIScenario {
  // Expand parameters
  const parameters: ScenarioParameter[] = scenario.parameterRefs.map((ref) => {
    const definition = getParameterDefinition(ref.parameterId);

    if (!definition) {
      throw new Error(`Parameter definition not found: ${ref.parameterId}`);
    }

    return {
      id: definition.id,
      name: ref.nameOverride ?? definition.name,
      description: ref.descriptionOverride ?? definition.description,
      unit: ref.unitOverride ?? definition.unit,
      color: ref.colorOverride ?? definition.color,
      data: ref.data,
    };
  });

  // Expand milestones
  const milestones: Milestone[] = scenario.milestoneRefs.map((ref) => {
    const definition = getMilestoneDefinition(ref.milestoneId);

    if (!definition) {
      throw new Error(`Milestone definition not found: ${ref.milestoneId}`);
    }

    return {
      id: definition.id,
      date: ref.date,
      title: ref.titleOverride ?? definition.name,
      description: ref.descriptionOverride ?? definition.description,
      significance: ref.significance,
      category: definition.category,
    };
  });

  // Return expanded scenario
  return {
    ...scenario,
    parameters,
    milestones,
  } as AIScenario;
}

/**
 * Convert a traditional scenario to repository-based format
 * This attempts to match parameters and milestones to repository definitions
 */
export function convertToRepositoryScenario(
  scenario: AIScenario,
  options: {
    /** Whether to create overrides for items that don't exactly match */
    createOverrides?: boolean;
    /** Similarity threshold for matching (0-1) */
    matchThreshold?: number;
  } = {}
): {
  scenario: RepositoryBasedScenario;
  warnings: string[];
  unmatchedParameters: ScenarioParameter[];
  unmatchedMilestones: Milestone[];
} {
  const warnings: string[] = [];
  const unmatchedParameters: ScenarioParameter[] = [];
  const unmatchedMilestones: Milestone[] = [];

  // Convert parameters
  const parameterRefs: RepositoryParameter[] = [];

  for (const param of scenario.parameters) {
    const match = findParameterByName(param.name);

    if (match) {
      const ref: RepositoryParameter = {
        parameterId: match.id,
        data: param.data,
      };

      // Add overrides if values differ
      if (options.createOverrides) {
        if (param.name !== match.name) {
          ref.nameOverride = param.name;
        }
        if (param.description !== match.description) {
          ref.descriptionOverride = param.description;
        }
        if (param.unit !== match.unit) {
          ref.unitOverride = param.unit;
        }
        if (param.color && param.color !== match.color) {
          ref.colorOverride = param.color;
        }
      }

      parameterRefs.push(ref);
    } else {
      // No match found - add to unmatched list
      unmatchedParameters.push(param);
      warnings.push(
        `Parameter "${param.name}" not found in repository. Add to repository or update scenario.`
      );
    }
  }

  // Convert milestones
  const milestoneRefs: MilestoneReference[] = [];

  for (const milestone of scenario.milestones) {
    const match = findMilestoneByName(milestone.title);

    if (match) {
      const ref: MilestoneReference = {
        milestoneId: match.id,
        date: milestone.date,
        significance: milestone.significance,
      };

      // Add overrides if values differ
      if (options.createOverrides) {
        if (milestone.title !== match.name) {
          ref.titleOverride = milestone.title;
        }
        if (milestone.description !== match.description) {
          ref.descriptionOverride = milestone.description;
        }
      }

      milestoneRefs.push(ref);
    } else {
      // No match found - add to unmatched list
      unmatchedMilestones.push(milestone);
      warnings.push(
        `Milestone "${milestone.title}" not found in repository. Add to repository or update scenario.`
      );
    }
  }

  // Create repository-based scenario
  const { parameters, milestones, ...scenarioBase } = scenario;

  const repositoryScenario: RepositoryBasedScenario = {
    ...scenarioBase,
    parameterRefs,
    milestoneRefs,
  };

  return {
    scenario: repositoryScenario,
    warnings,
    unmatchedParameters,
    unmatchedMilestones,
  };
}

/**
 * Check if a scenario is repository-based
 */
export function isRepositoryBased(
  scenario: AIScenario | RepositoryBasedScenario
): scenario is RepositoryBasedScenario {
  return 'parameterRefs' in scenario;
}

/**
 * Normalize a scenario to traditional format
 * If it's already traditional, return as-is
 * If it's repository-based, expand it
 */
export function normalizeScenario(
  scenario: AIScenario | RepositoryBasedScenario
): AIScenario {
  if (isRepositoryBased(scenario)) {
    return expandRepositoryScenario(scenario);
  }
  return scenario;
}

/**
 * Create a parameter data template for a repository parameter
 * This is useful when creating new scenarios
 */
export function createParameterData(
  parameterId: string,
  dataPoints: Array<{ date: string; value: number; confidence?: 'low' | 'medium' | 'high' }>
): RepositoryParameter {
  const definition = getParameterDefinition(parameterId);

  if (!definition) {
    throw new Error(`Parameter definition not found: ${parameterId}`);
  }

  return {
    parameterId,
    data: dataPoints.map((point) => ({
      date: point.date,
      value: point.value,
      confidence: point.confidence,
    })),
  };
}

/**
 * Create a milestone reference template
 * This is useful when creating new scenarios
 */
export function createMilestoneReference(
  milestoneId: string,
  date: string,
  significance: 'low' | 'medium' | 'high' | 'critical',
  overrides?: {
    title?: string;
    description?: string;
  }
): MilestoneReference {
  const definition = getMilestoneDefinition(milestoneId);

  if (!definition) {
    throw new Error(`Milestone definition not found: ${milestoneId}`);
  }

  return {
    milestoneId,
    date,
    significance,
    titleOverride: overrides?.title,
    descriptionOverride: overrides?.description,
  };
}
