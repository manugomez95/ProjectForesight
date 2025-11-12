import type { AIScenario, FlexibleScenario } from '../../types/scenario';
import { normalizeScenario } from '../../utils/repositoryConverter';
import { takeoff2032 } from './takeoff-2032';
import { aiTakeover2027 } from './ai-takeover-2027';
import { ai2027Forecast } from './ai-2027-forecast';
import { aiTakeover2027Refactored } from './ai-takeover-2027-refactored';

/**
 * Registry of all available AI forecast scenarios
 * Supports both traditional inline scenarios and repository-based scenarios
 */
const rawScenarios: FlexibleScenario[] = [
  takeoff2032,
  // aiTakeover2027, // Commented out - using refactored version
  aiTakeover2027Refactored,
  ai2027Forecast,
  // Add more scenarios here as they are created
];

/**
 * Normalized scenarios (all converted to traditional format)
 * This ensures backward compatibility with existing components
 */
export const scenarios: AIScenario[] = rawScenarios.map(normalizeScenario);

/**
 * Get a scenario by ID
 */
export function getScenarioById(id: string): AIScenario | undefined {
  return scenarios.find(s => s.id === id);
}

/**
 * Get scenarios by tag
 */
export function getScenariosByTag(tag: string): AIScenario[] {
  return scenarios.filter(s => s.tags.includes(tag));
}

/**
 * Get all unique tags across all scenarios
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  scenarios.forEach(s => s.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

/**
 * Get scenarios by type
 */
export function getScenariosByType(type: AIScenario['scenarioType']): AIScenario[] {
  return scenarios.filter(s => s.scenarioType === type);
}

/**
 * Extract all data for a specific parameter across scenarios
 */
export function getParameterData(parameterId: string): {
  scenario: AIScenario;
  parameter: AIScenario['parameters'][0];
}[] {
  return scenarios
    .map(scenario => ({
      scenario,
      parameter: scenario.parameters.find(p => p.id === parameterId)
    }))
    .filter(item => item.parameter !== undefined) as {
      scenario: AIScenario;
      parameter: AIScenario['parameters'][0];
    }[];
}

/**
 * Get all unique parameters across all scenarios
 * Groups parameters by name (not ID) to handle similar parameters across scenarios
 */
export function getAllParameters(): {
  name: string;
  description: string;
  unit: string;
  scenarioCount: number;
  parameterIds: { scenarioId: string; parameterId: string }[];
}[] {
  const parameterMap = new Map<string, {
    name: string;
    description: string;
    unit: string;
    scenarioCount: number;
    parameterIds: { scenarioId: string; parameterId: string }[];
  }>();

  scenarios.forEach(scenario => {
    scenario.parameters.forEach(param => {
      const existing = parameterMap.get(param.name);
      if (existing) {
        existing.scenarioCount++;
        existing.parameterIds.push({
          scenarioId: scenario.id,
          parameterId: param.id
        });
      } else {
        parameterMap.set(param.name, {
          name: param.name,
          description: param.description,
          unit: param.unit,
          scenarioCount: 1,
          parameterIds: [{
            scenarioId: scenario.id,
            parameterId: param.id
          }]
        });
      }
    });
  });

  return Array.from(parameterMap.values()).sort((a, b) =>
    b.scenarioCount - a.scenarioCount || a.name.localeCompare(b.name)
  );
}
