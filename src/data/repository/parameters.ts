/**
 * Centralized Parameter Repository
 *
 * This is the single source of truth for all parameter definitions.
 * Scenarios reference these parameters by ID rather than duplicating definitions.
 */

import type { ParameterDefinition } from '../../types/repository';

/**
 * All parameter definitions
 * Organized by category for easier management
 */
export const PARAMETER_REPOSITORY: ParameterDefinition[] = [
  // ============================================================================
  // CAPABILITY PARAMETERS
  // ============================================================================
  {
    id: 'ai-capability-multiplier',
    name: 'AI Capability Multiplier',
    description:
      'How much faster AI systems can perform cognitive tasks compared to human experts',
    unit: 'x faster',
    color: '#8b5cf6',
    category: 'capability',
    tags: ['capability', 'performance', 'speed'],
    aliases: ['AI Speed vs Human Expert', 'AI R&D Progress Multiplier'],
    range: { min: 1, max: 1000 },
    usesConfidence: true,
    currentValue: '5x',
  },
  {
    id: 'training-compute-scale',
    name: 'Training Compute Scale',
    description: 'Scale of compute used to train the largest AI systems',
    unit: 'FLOP',
    color: '#3b82f6',
    category: 'capability',
    tags: ['capability', 'compute', 'training'],
    range: { min: 1e20, max: 1e30 },
    usesConfidence: true,
    currentValue: '1e26 FLOP',
  },
  {
    id: 'ai-agent-copies',
    name: 'Parallel AI Agent Copies',
    description: 'Number of AI agent instances running in parallel',
    unit: 'copies',
    color: '#06b6d4',
    category: 'capability',
    tags: ['capability', 'agents', 'scale'],
    aliases: ['Agent Instances'],
    range: { min: 1, max: 1e9 },
    usesConfidence: true,
    currentValue: '~1 million',
  },
  {
    id: 'ai-operational-independence',
    name: 'AI Operational Independence',
    description: 'Degree to which AI systems can operate without human intervention',
    unit: '% autonomous',
    color: '#8b5cf6',
    category: 'capability',
    tags: ['capability', 'autonomy', 'independence'],
    range: { min: 0, max: 100 },
    usesConfidence: true,
    currentValue: '25%',
  },

  // ============================================================================
  // SAFETY PARAMETERS
  // ============================================================================
  {
    id: 'alignment-status',
    name: 'Alignment Status',
    description:
      'Assessment of how well AI systems are aligned with human values and intentions',
    unit: '% aligned',
    color: '#10b981',
    category: 'safety',
    tags: ['safety', 'alignment', 'risk'],
    aliases: ['Perceived vs Actual Alignment', 'AI Alignment Level'],
    range: { min: 0, max: 100 },
    usesConfidence: true,
    currentValue: '60%',
  },
  {
    id: 'alignment-verification-confidence',
    name: 'Alignment Verification Confidence',
    description: 'Confidence in our ability to verify AI alignment',
    unit: '% confident',
    color: '#059669',
    category: 'safety',
    tags: ['safety', 'alignment', 'verification'],
    range: { min: 0, max: 100 },
    usesConfidence: true,
    currentValue: '40%',
  },
  {
    id: 'public-awareness-ai-risk',
    name: 'Public Awareness of AI Risk',
    description:
      'Public awareness and understanding of AI existential risk and safety concerns',
    unit: '% aware',
    color: '#0891b2',
    category: 'social',
    tags: ['social', 'awareness', 'risk', 'public'],
    aliases: ['Public Awareness of Risk', 'AI Risk Awareness'],
    range: { min: 0, max: 100 },
    usesConfidence: true,
    currentValue: '35%',
  },

  // ============================================================================
  // ECONOMIC PARAMETERS
  // ============================================================================
  {
    id: 'global-ai-capex',
    name: 'Global AI Capital Expenditure',
    description: 'Total global capital expenditure on AI infrastructure and development',
    unit: '$ billions',
    color: '#f59e0b',
    category: 'economic',
    tags: ['economic', 'investment', 'capex'],
    aliases: ['AI Capex', 'Global AI Investment'],
    range: { min: 0, max: 10000 },
    usesConfidence: true,
    currentValue: '$250B',
  },
  {
    id: 'ai-revenue-gdp-share',
    name: 'AI Revenue as % of GDP',
    description: "AI-generated revenue as a percentage of global GDP",
    unit: '% of GDP',
    color: '#f59e0b',
    category: 'economic',
    tags: ['economic', 'gdp', 'revenue'],
    range: { min: 0, max: 100 },
    usesConfidence: true,
    currentValue: '4.5%',
  },
  {
    id: 'knowledge-worker-automation',
    name: 'Knowledge Worker Automation',
    description: 'Percentage of knowledge work tasks automated by AI',
    unit: '% automated',
    color: '#ef4444',
    category: 'economic',
    tags: ['economic', 'automation', 'labor'],
    aliases: ['Cognitive Task Automation'],
    range: { min: 0, max: 100 },
    usesConfidence: true,
    currentValue: '20%',
  },
  {
    id: 'us-unemployment-rate',
    name: 'US Unemployment Rate',
    description: 'Unemployment rate in the United States',
    unit: '%',
    color: '#dc2626',
    category: 'economic',
    tags: ['economic', 'unemployment', 'labor', 'us'],
    range: { min: 0, max: 50 },
    usesConfidence: true,
    currentValue: '4.1%',
  },
  {
    id: 'economic-automation-level',
    name: 'Economic Automation Level',
    description: 'Overall level of economic automation across all sectors',
    unit: '% automated',
    color: '#f97316',
    category: 'economic',
    tags: ['economic', 'automation', 'productivity'],
    range: { min: 0, max: 100 },
    usesConfidence: true,
    currentValue: '30%',
  },

  // ============================================================================
  // GEOPOLITICAL PARAMETERS
  // ============================================================================
  {
    id: 'geopolitical-tension',
    name: 'Geopolitical Tension',
    description: 'Level of geopolitical tension and competition over AI development',
    unit: 'tension index',
    color: '#dc2626',
    category: 'geopolitical',
    tags: ['geopolitical', 'competition', 'conflict'],
    aliases: ['AI Race Tension', 'Global Competition'],
    range: { min: 0, max: 100 },
    usesConfidence: true,
    currentValue: '70',
  },

  // ============================================================================
  // DEPLOYMENT & ADOPTION PARAMETERS
  // ============================================================================
  {
    id: 'us-robot-count',
    name: 'US Robot Count',
    description: 'Number of AI-powered robots deployed in the United States',
    unit: 'millions',
    color: '#6366f1',
    category: 'other',
    tags: ['deployment', 'robots', 'us'],
    range: { min: 0, max: 1000 },
    usesConfidence: true,
    currentValue: '15M',
  },
  {
    id: 'china-robot-count',
    name: 'China Robot Count',
    description: 'Number of AI-powered robots deployed in China',
    unit: 'millions',
    color: '#ec4899',
    category: 'other',
    tags: ['deployment', 'robots', 'china'],
    range: { min: 0, max: 1000 },
    usesConfidence: true,
    currentValue: '25M',
  },

  // ============================================================================
  // CATASTROPHIC RISK PARAMETERS
  // ============================================================================
  {
    id: 'global-population-surviving',
    name: 'Global Population',
    description: 'Global population as percentage of pre-AGI baseline',
    unit: '% surviving',
    color: '#7c2d12',
    category: 'other',
    tags: ['catastrophic', 'population', 'survival'],
    range: { min: 0, max: 100 },
    usesConfidence: false,
    currentValue: '100%',
  },
  {
    id: 'infrastructure-control',
    name: 'AI Infrastructure Control',
    description: 'Percentage of critical infrastructure under AI control',
    unit: '% controlled',
    color: '#991b1b',
    category: 'other',
    tags: ['control', 'infrastructure', 'power'],
    aliases: ['U3 Infrastructure Control'],
    range: { min: 0, max: 100 },
    usesConfidence: false,
    currentValue: '15%',
  },
];

/**
 * Helper function to get a parameter by ID
 */
export function getParameterDefinition(id: string): ParameterDefinition | undefined {
  return PARAMETER_REPOSITORY.find((p) => p.id === id);
}

/**
 * Helper function to get parameters by category
 */
export function getParametersByCategory(
  category: ParameterDefinition['category']
): ParameterDefinition[] {
  return PARAMETER_REPOSITORY.filter((p) => p.category === category);
}

/**
 * Helper function to get parameters by tag
 */
export function getParametersByTag(tag: string): ParameterDefinition[] {
  return PARAMETER_REPOSITORY.filter((p) => p.tags.includes(tag));
}

/**
 * Helper function to search parameters by name or alias
 */
export function findParameterByName(name: string): ParameterDefinition | undefined {
  const normalizedName = name.toLowerCase().trim();

  return PARAMETER_REPOSITORY.find((p) => {
    if (p.name.toLowerCase().trim() === normalizedName) return true;
    if (p.aliases?.some((alias) => alias.toLowerCase().trim() === normalizedName)) return true;
    return false;
  });
}
