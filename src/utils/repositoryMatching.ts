/**
 * Repository Matching Utilities
 *
 * Provides algorithms for finding similar items in the repository
 * to prevent duplication and maintain consistency.
 */

import type { RepositoryItemMetadata, SimilarityMatch } from '../types/repository';

/**
 * Calculate Levenshtein distance between two strings
 * This measures the minimum number of single-character edits needed
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Calculate similarity score between two strings (0-1)
 * Uses normalized Levenshtein distance
 */
function stringSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  if (s1 === s2) return 1.0;

  const maxLength = Math.max(s1.length, s2.length);
  if (maxLength === 0) return 1.0;

  const distance = levenshteinDistance(s1, s2);
  return 1 - distance / maxLength;
}

/**
 * Extract key terms from a string for semantic matching
 */
function extractKeyTerms(text: string): Set<string> {
  const stopWords = new Set([
    'a',
    'an',
    'the',
    'of',
    'in',
    'to',
    'for',
    'on',
    'at',
    'by',
    'with',
    'from',
    'is',
    'and',
    'or',
  ]);

  return new Set(
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 2 && !stopWords.has(word))
  );
}

/**
 * Calculate semantic similarity based on shared key terms
 */
function semanticSimilarity(text1: string, text2: string): number {
  const terms1 = extractKeyTerms(text1);
  const terms2 = extractKeyTerms(text2);

  if (terms1.size === 0 && terms2.size === 0) return 1.0;
  if (terms1.size === 0 || terms2.size === 0) return 0.0;

  const intersection = new Set([...terms1].filter((term) => terms2.has(term)));
  const union = new Set([...terms1, ...terms2]);

  return intersection.size / union.size;
}

/**
 * Calculate overall similarity score between two repository items
 */
export function calculateSimilarity<T extends RepositoryItemMetadata>(
  item1: Partial<T>,
  item2: T
): number {
  const weights = {
    name: 0.5,
    description: 0.3,
    tags: 0.1,
    aliases: 0.1,
  };

  let score = 0;
  let totalWeight = 0;

  // Name similarity (most important)
  if (item1.name && item2.name) {
    score += stringSimilarity(item1.name, item2.name) * weights.name;
    totalWeight += weights.name;
  }

  // Check aliases against name
  if (item1.name && item2.aliases) {
    const aliasScores = item2.aliases.map((alias) => stringSimilarity(item1.name!, alias));
    const maxAliasScore = Math.max(...aliasScores, 0);
    score += maxAliasScore * weights.aliases;
    totalWeight += weights.aliases;
  }

  // Description semantic similarity
  if (item1.description && item2.description) {
    const descSimilarity = semanticSimilarity(item1.description, item2.description);
    score += descSimilarity * weights.description;
    totalWeight += weights.description;
  }

  // Tag overlap
  if (item1.tags && item2.tags && item1.tags.length > 0 && item2.tags.length > 0) {
    const tags1 = new Set(item1.tags.map((t) => t.toLowerCase()));
    const tags2 = new Set(item2.tags.map((t) => t.toLowerCase()));
    const intersection = new Set([...tags1].filter((t) => tags2.has(t)));
    const union = new Set([...tags1, ...tags2]);
    const tagSimilarity = intersection.size / union.size;
    score += tagSimilarity * weights.tags;
    totalWeight += weights.tags;
  }

  return totalWeight > 0 ? score / totalWeight : 0;
}

/**
 * Find similar items in a collection
 */
export function findSimilarItems<T extends RepositoryItemMetadata>(
  query: Partial<T>,
  collection: T[],
  threshold: number = 0.7
): SimilarityMatch<T>[] {
  const matches: SimilarityMatch<T>[] = [];

  for (const item of collection) {
    const score = calculateSimilarity(query, item);

    if (score >= threshold) {
      let reason = '';
      if (score >= 0.95) {
        reason = 'Very similar name and description';
      } else if (score >= 0.85) {
        reason = 'Similar name or close match in description';
      } else if (score >= 0.75) {
        reason = 'Moderate similarity in name and description';
      } else {
        reason = 'Some overlap in terminology';
      }

      matches.push({ item, score, reason });
    }
  }

  // Sort by score descending
  return matches.sort((a, b) => b.score - a.score);
}

/**
 * Check if an exact match exists (by name or alias)
 */
export function findExactMatch<T extends RepositoryItemMetadata>(
  name: string,
  collection: T[]
): T | null {
  const normalizedName = name.toLowerCase().trim();

  for (const item of collection) {
    // Check name
    if (item.name.toLowerCase().trim() === normalizedName) {
      return item;
    }

    // Check aliases
    if (item.aliases) {
      for (const alias of item.aliases) {
        if (alias.toLowerCase().trim() === normalizedName) {
          return item;
        }
      }
    }
  }

  return null;
}

/**
 * Generate a suggested unified name for similar items
 */
export function suggestUnifiedName(names: string[]): string {
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];

  // Find the most common terms
  const termCounts = new Map<string, number>();

  for (const name of names) {
    const terms = extractKeyTerms(name);
    for (const term of terms) {
      termCounts.set(term, (termCounts.get(term) || 0) + 1);
    }
  }

  // Sort terms by frequency and reconstruct a name
  const sortedTerms = Array.from(termCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([term]) => term);

  // Capitalize first letter of each term
  const unified = sortedTerms
    .slice(0, 4) // Limit to top 4 terms
    .map((term) => term.charAt(0).toUpperCase() + term.slice(1))
    .join(' ');

  return unified || names[0];
}
