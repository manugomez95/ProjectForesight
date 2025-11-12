/**
 * Repository Factory Functions
 *
 * Provides find-or-create utilities to prevent duplication when adding
 * new parameters, milestones, or metrics to scenarios.
 */

import type {
  ParameterDefinition,
  MilestoneDefinition,
  SimilarityMatch,
  FindOrCreateOptions,
} from '../types/repository';
import {
  PARAMETER_REPOSITORY,
  findParameterByName,
} from '../data/repository/parameters';
import {
  MILESTONE_REPOSITORY,
  findMilestoneByName,
} from '../data/repository/milestones';
import { findSimilarItems } from './repositoryMatching';

/**
 * Result of a find-or-create operation
 */
export interface FindOrCreateResult<T> {
  /** The item (either found or newly created) */
  item: T;
  /** Whether this is a new item or an existing one */
  isNew: boolean;
  /** Similar items that were found */
  similarItems?: SimilarityMatch<T>[];
  /** Recommendation message */
  message?: string;
}

/**
 * Find or suggest creation of a parameter
 *
 * This function checks the repository for:
 * 1. Exact name match
 * 2. Alias match
 * 3. Similar items based on name and description
 *
 * Returns the best match or suggests creating a new parameter
 */
export function findOrCreateParameter(
  query: {
    name: string;
    description?: string;
    unit?: string;
    tags?: string[];
  },
  options: FindOrCreateOptions = {}
): FindOrCreateResult<ParameterDefinition> {
  const threshold = options.threshold ?? 0.7;

  // Step 1: Check for exact match by name or alias
  const exactMatch = findParameterByName(query.name);
  if (exactMatch) {
    return {
      item: exactMatch,
      isNew: false,
      message: `Found existing parameter: "${exactMatch.name}" (ID: ${exactMatch.id})`,
    };
  }

  // Step 2: Find similar items
  const similarItems = findSimilarItems(
    {
      name: query.name,
      description: query.description,
      tags: query.tags,
    } as Partial<ParameterDefinition>,
    PARAMETER_REPOSITORY,
    threshold
  );

  // Step 3: If we have high-confidence matches, suggest using them
  if (similarItems.length > 0) {
    const bestMatch = similarItems[0];

    if (bestMatch.score >= 0.85) {
      // Very similar - recommend using existing
      return {
        item: bestMatch.item,
        isNew: false,
        similarItems,
        message: `Found very similar parameter: "${bestMatch.item.name}" (ID: ${bestMatch.item.id}). Consider using this instead. Similarity: ${(bestMatch.score * 100).toFixed(0)}%`,
      };
    } else {
      // Moderate similarity - inform user but allow new creation
      return {
        item: createParameterTemplate(query),
        isNew: true,
        similarItems,
        message: `Similar parameters found. Review before creating new parameter:\n${similarItems.map((m) => `  - "${m.item.name}" (${(m.score * 100).toFixed(0)}% similar)`).join('\n')}`,
      };
    }
  }

  // Step 4: No matches - create new parameter template
  return {
    item: createParameterTemplate(query),
    isNew: true,
    message: `No similar parameters found. Creating new parameter: "${query.name}"`,
  };
}

/**
 * Find or suggest creation of a milestone
 */
export function findOrCreateMilestone(
  query: {
    name: string;
    description?: string;
    tags?: string[];
  },
  options: FindOrCreateOptions = {}
): FindOrCreateResult<MilestoneDefinition> {
  const threshold = options.threshold ?? 0.7;

  // Step 1: Check for exact match by name or alias
  const exactMatch = findMilestoneByName(query.name);
  if (exactMatch) {
    return {
      item: exactMatch,
      isNew: false,
      message: `Found existing milestone: "${exactMatch.name}" (ID: ${exactMatch.id})`,
    };
  }

  // Step 2: Find similar items
  const similarItems = findSimilarItems(
    {
      name: query.name,
      description: query.description,
      tags: query.tags,
    } as Partial<MilestoneDefinition>,
    MILESTONE_REPOSITORY,
    threshold
  );

  // Step 3: If we have high-confidence matches, suggest using them
  if (similarItems.length > 0) {
    const bestMatch = similarItems[0];

    if (bestMatch.score >= 0.85) {
      // Very similar - recommend using existing
      return {
        item: bestMatch.item,
        isNew: false,
        similarItems,
        message: `Found very similar milestone: "${bestMatch.item.name}" (ID: ${bestMatch.item.id}). Consider using this instead. Similarity: ${(bestMatch.score * 100).toFixed(0)}%`,
      };
    } else {
      // Moderate similarity - inform user but allow new creation
      return {
        item: createMilestoneTemplate(query),
        isNew: true,
        similarItems,
        message: `Similar milestones found. Review before creating new milestone:\n${similarItems.map((m) => `  - "${m.item.name}" (${(m.score * 100).toFixed(0)}% similar)`).join('\n')}`,
      };
    }
  }

  // Step 4: No matches - create new milestone template
  return {
    item: createMilestoneTemplate(query),
    isNew: true,
    message: `No similar milestones found. Creating new milestone: "${query.name}"`,
  };
}

/**
 * Batch check for parameters in a scenario
 * Returns a report of all parameters and their repository status
 */
export function analyzeScenarioParameters(parameters: { name: string; description?: string }[]): {
  matched: Array<{ query: string; match: ParameterDefinition }>;
  similar: Array<{ query: string; matches: SimilarityMatch<ParameterDefinition>[] }>;
  new: string[];
} {
  const result = {
    matched: [] as Array<{ query: string; match: ParameterDefinition }>,
    similar: [] as Array<{ query: string; matches: SimilarityMatch<ParameterDefinition>[] }>,
    new: [] as string[],
  };

  for (const param of parameters) {
    const findResult = findOrCreateParameter(param);

    if (!findResult.isNew) {
      result.matched.push({ query: param.name, match: findResult.item });
    } else if (findResult.similarItems && findResult.similarItems.length > 0) {
      result.similar.push({ query: param.name, matches: findResult.similarItems });
    } else {
      result.new.push(param.name);
    }
  }

  return result;
}

/**
 * Batch check for milestones in a scenario
 */
export function analyzeScenarioMilestones(milestones: { name: string; description?: string }[]): {
  matched: Array<{ query: string; match: MilestoneDefinition }>;
  similar: Array<{ query: string; matches: SimilarityMatch<MilestoneDefinition>[] }>;
  new: string[];
} {
  const result = {
    matched: [] as Array<{ query: string; match: MilestoneDefinition }>,
    similar: [] as Array<{ query: string; matches: SimilarityMatch<MilestoneDefinition>[] }>,
    new: [] as string[],
  };

  for (const milestone of milestones) {
    const findResult = findOrCreateMilestone(milestone);

    if (!findResult.isNew) {
      result.matched.push({ query: milestone.name, match: findResult.item });
    } else if (findResult.similarItems && findResult.similarItems.length > 0) {
      result.similar.push({ query: milestone.name, matches: findResult.similarItems });
    } else {
      result.new.push(milestone.name);
    }
  }

  return result;
}

/**
 * Create a parameter template for a new parameter
 */
function createParameterTemplate(query: {
  name: string;
  description?: string;
  unit?: string;
  tags?: string[];
}): ParameterDefinition {
  // Generate ID from name
  const id = query.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    id,
    name: query.name,
    description: query.description || `TODO: Add description for ${query.name}`,
    unit: query.unit || 'TODO: specify unit',
    color: '#6b7280', // Default gray color
    category: 'other',
    tags: query.tags || ['uncategorized'],
    usesConfidence: true,
  };
}

/**
 * Create a milestone template for a new milestone
 */
function createMilestoneTemplate(query: {
  name: string;
  description?: string;
  tags?: string[];
}): MilestoneDefinition {
  // Generate ID from name
  const id = query.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    id,
    name: query.name,
    description: query.description || `TODO: Add description for ${query.name}`,
    category: 'other',
    defaultSignificance: 'medium',
    tags: query.tags || ['uncategorized'],
  };
}

/**
 * Generate a deduplication report for all scenarios
 * This helps identify parameters/milestones that should be unified
 */
export function generateDeduplicationReport(): {
  parameters: {
    duplicates: Array<{
      name: string;
      instances: Array<{ name: string; description?: string }>;
    }>;
    suggestions: Array<{
      items: string[];
      suggestedUnification: string;
      similarity: number;
    }>;
  };
  milestones: {
    duplicates: Array<{
      name: string;
      instances: Array<{ name: string; description?: string }>;
    }>;
    suggestions: Array<{
      items: string[];
      suggestedUnification: string;
      similarity: number;
    }>;
  };
} {
  // This would analyze all scenarios and find duplicates
  // For now, returning empty structure
  return {
    parameters: {
      duplicates: [],
      suggestions: [],
    },
    milestones: {
      duplicates: [],
      suggestions: [],
    },
  };
}
