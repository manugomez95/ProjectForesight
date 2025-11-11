import { AIScenario } from '../../types/scenario';
import { takeoff2032 } from './takeoff-2032';

/**
 * Registry of all available AI forecast scenarios
 */
export const scenarios: AIScenario[] = [
  takeoff2032,
  // Add more scenarios here as they are created
];

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
