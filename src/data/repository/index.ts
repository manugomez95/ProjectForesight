/**
 * Centralized Repository Index
 *
 * Single entry point for all repository data and utilities
 */

// Parameter repository
export {
  PARAMETER_REPOSITORY,
  getParameterDefinition,
  getParametersByCategory,
  getParametersByTag,
  findParameterByName,
} from './parameters';

// Milestone repository
export {
  MILESTONE_REPOSITORY,
  getMilestoneDefinition,
  getMilestonesByCategory,
  getMilestonesByTag,
  findMilestoneByName,
} from './milestones';

// Assumption repository
export {
  ASSUMPTION_REPOSITORY,
  getAssumptionDefinition,
  getAssumptionsByCategory,
  getAssumptionsByTag,
  findAssumptionByName,
  getAssumptionsForParameter,
} from './assumptions';

// Re-export types
export type {
  ParameterDefinition,
  MilestoneDefinition,
  MetricDefinition,
  AssumptionDefinition,
  RepositoryItemMetadata,
  ParameterReference,
  MilestoneReference,
  AssumptionReference,
  SimilarityMatch,
  FindOrCreateOptions,
} from '../../types/repository';
