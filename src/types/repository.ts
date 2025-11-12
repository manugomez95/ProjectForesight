/**
 * Centralized Repository Types
 *
 * This module defines the types for the centralized repository of parameters,
 * metrics, and milestones. This allows scenarios to reference shared definitions
 * instead of duplicating data.
 */

/**
 * Common metadata for all repository items
 */
export interface RepositoryItemMetadata {
  /** Unique identifier for this item */
  id: string;
  /** Display name */
  name: string;
  /** Detailed description */
  description: string;
  /** Tags for categorization and search */
  tags: string[];
  /** Alternative names or aliases */
  aliases?: string[];
  /** When this item was created */
  createdAt?: string;
  /** When this item was last updated */
  updatedAt?: string;
}

/**
 * Parameter definition in the centralized repository
 * This extends the base ScenarioParameter with repository metadata
 */
export interface ParameterDefinition extends RepositoryItemMetadata {
  /** Unit of measurement */
  unit: string;
  /** Default color for visualization */
  color: string;
  /** Category for grouping parameters */
  category: 'capability' | 'economic' | 'social' | 'safety' | 'geopolitical' | 'other';
  /** Typical range for this parameter */
  range?: {
    min: number;
    max: number;
  };
  /** Whether this parameter typically uses confidence intervals */
  usesConfidence?: boolean;
}

/**
 * Milestone definition in the centralized repository
 */
export interface MilestoneDefinition extends RepositoryItemMetadata {
  /** Category for grouping milestones */
  category: 'capability' | 'deployment' | 'societal' | 'regulatory' | 'incident' | 'other';
  /** Typical significance level */
  defaultSignificance?: 'low' | 'medium' | 'high' | 'critical';
  /** Related parameters that typically change with this milestone */
  relatedParameters?: string[];
}

/**
 * Metric snapshot definition for timeline periods
 */
export interface MetricDefinition extends RepositoryItemMetadata {
  /** Unit of measurement */
  unit: string;
  /** Category for grouping metrics */
  category: 'capability' | 'economic' | 'social' | 'adoption' | 'other';
  /** Typical range for this metric */
  range?: {
    min: number;
    max: number;
  };
}

/**
 * Assumption definition in the centralized repository
 */
export interface AssumptionDefinition extends RepositoryItemMetadata {
  /** Category for grouping assumptions */
  category: 'technical' | 'alignment' | 'safety' | 'economic' | 'geopolitical' | 'regulatory' | 'strategic';
  /** Default confidence level */
  defaultConfidence: 'low' | 'medium' | 'high' | 'critical';
  /** Default impact if wrong */
  defaultImpact: 'low' | 'medium' | 'high' | 'critical';
  /** Related parameters that depend on this assumption */
  relatedParameters?: string[];
}

/**
 * Reference to a parameter with scenario-specific overrides
 */
export interface ParameterReference {
  /** ID of the parameter in the repository */
  parameterId: string;
  /** Optional override for the display name */
  nameOverride?: string;
  /** Optional override for the description */
  descriptionOverride?: string;
  /** Optional override for the color */
  colorOverride?: string;
  /** Optional override for the unit */
  unitOverride?: string;
}

/**
 * Reference to a milestone with scenario-specific details
 */
export interface MilestoneReference {
  /** ID of the milestone in the repository */
  milestoneId: string;
  /** Date when this milestone occurs in the scenario */
  date: string;
  /** Optional override for the title */
  titleOverride?: string;
  /** Optional override for the description */
  descriptionOverride?: string;
  /** Significance level for this specific scenario */
  significance: 'low' | 'medium' | 'high' | 'critical';
  /** Optional related metrics at this milestone */
  relatedMetrics?: Record<string, number>;
}

/**
 * Reference to an assumption with scenario-specific overrides
 */
export interface AssumptionReference {
  /** ID of the assumption in the repository */
  assumptionId: string;
  /** Optional override for the description */
  descriptionOverride?: string;
  /** Scenario-specific confidence level (overrides default) */
  confidence?: 'low' | 'medium' | 'high' | 'critical';
  /** Scenario-specific impact level (overrides default) */
  impact?: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Similarity match result for deduplication
 */
export interface SimilarityMatch<T> {
  /** The matched item */
  item: T;
  /** Similarity score (0-1, where 1 is exact match) */
  score: number;
  /** Reason for the match */
  reason: string;
}

/**
 * Options for finding or creating items in the repository
 */
export interface FindOrCreateOptions {
  /** Minimum similarity score to consider a match (0-1) */
  threshold?: number;
  /** Whether to automatically merge if a close match is found */
  autoMerge?: boolean;
  /** Whether to prompt for confirmation before creating new items */
  requireConfirmation?: boolean;
}
