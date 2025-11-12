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

// Re-export types
export type {
  ParameterDefinition,
  MilestoneDefinition,
  MetricDefinition,
  RepositoryItemMetadata,
  ParameterReference,
  MilestoneReference,
  SimilarityMatch,
  FindOrCreateOptions,
} from '../../types/repository';
