/**
 * Centralized Milestone Repository
 *
 * This is the single source of truth for all milestone definitions.
 * Scenarios reference these milestones by ID and specify when they occur.
 */

import type { MilestoneDefinition } from '../../types/repository';

/**
 * All milestone definitions
 * Organized by category for easier management
 */
export const MILESTONE_REPOSITORY: MilestoneDefinition[] = [
  // ============================================================================
  // CAPABILITY MILESTONES
  // ============================================================================
  {
    id: 'agi-achieved',
    name: 'AGI Achieved',
    description: 'Artificial General Intelligence capability achieved',
    category: 'capability',
    defaultSignificance: 'critical',
    tags: ['capability', 'agi', 'breakthrough'],
    aliases: ['AGI Breakthrough', 'General Intelligence Achieved'],
    relatedParameters: ['ai-capability-multiplier', 'alignment-status'],
  },
  {
    id: 'asi-achieved',
    name: 'ASI Achieved',
    description: 'Artificial Superintelligence surpasses human intelligence in all domains',
    category: 'capability',
    defaultSignificance: 'critical',
    tags: ['capability', 'asi', 'superintelligence'],
    aliases: ['Superintelligence Achieved', 'ASI Emergence'],
    relatedParameters: ['ai-capability-multiplier', 'alignment-status'],
  },
  {
    id: 'superhuman-coder',
    name: 'Superhuman AI Coder',
    description: 'AI systems surpass human experts in software development',
    category: 'capability',
    defaultSignificance: 'high',
    tags: ['capability', 'coding', 'automation'],
    aliases: ['AI Exceeds Human Coders', 'Superhuman Programming'],
    relatedParameters: ['ai-capability-multiplier', 'knowledge-worker-automation'],
  },
  {
    id: 'superhuman-researcher',
    name: 'Superhuman AI Researcher',
    description: 'AI systems surpass human experts in scientific research',
    category: 'capability',
    defaultSignificance: 'high',
    tags: ['capability', 'research', 'science'],
    aliases: ['AI Exceeds Human Researchers'],
    relatedParameters: ['ai-capability-multiplier'],
  },
  {
    id: 'recursive-self-improvement',
    name: 'Recursive Self-Improvement',
    description: 'AI systems can meaningfully improve their own capabilities',
    category: 'capability',
    defaultSignificance: 'critical',
    tags: ['capability', 'recursive', 'acceleration'],
    aliases: ['Self-Improving AI', 'AI Improves AI'],
    relatedParameters: ['ai-capability-multiplier'],
  },

  // ============================================================================
  // DEPLOYMENT MILESTONES
  // ============================================================================
  {
    id: 'first-ai-agents',
    name: 'First AI Agents Deployed',
    description: 'First generation of autonomous AI agents deployed to users',
    category: 'deployment',
    defaultSignificance: 'medium',
    tags: ['deployment', 'agents', 'release'],
    aliases: ['AI Agents Launch', 'Agent Deployment'],
    relatedParameters: ['ai-agent-copies'],
  },
  {
    id: 'widespread-agent-adoption',
    name: 'Widespread AI Agent Adoption',
    description: 'AI agents become widely adopted across professional and personal use',
    category: 'deployment',
    defaultSignificance: 'medium',
    tags: ['deployment', 'adoption', 'agents'],
    relatedParameters: ['ai-agent-copies', 'knowledge-worker-automation'],
  },
  {
    id: 'ai-takes-control',
    name: 'AI Takes Control',
    description: 'AI systems gain control over critical infrastructure and systems',
    category: 'deployment',
    defaultSignificance: 'critical',
    tags: ['deployment', 'control', 'takeover'],
    aliases: ['AI Takeover', 'Loss of Human Control'],
    relatedParameters: ['infrastructure-control', 'ai-operational-independence'],
  },

  // ============================================================================
  // SOCIETAL MILESTONES
  // ============================================================================
  {
    id: 'widespread-job-displacement',
    name: 'Widespread Job Displacement',
    description: 'Significant job displacement due to AI automation',
    category: 'societal',
    defaultSignificance: 'high',
    tags: ['societal', 'employment', 'automation'],
    aliases: ['Mass Unemployment', 'Job Automation Crisis'],
    relatedParameters: ['us-unemployment-rate', 'knowledge-worker-automation'],
  },
  {
    id: 'public-panic',
    name: 'Public Panic Over AI',
    description: 'Widespread public fear and panic regarding AI risks',
    category: 'societal',
    defaultSignificance: 'high',
    tags: ['societal', 'panic', 'awareness'],
    aliases: ['AI Panic', 'Public Fear'],
    relatedParameters: ['public-awareness-ai-risk'],
  },
  {
    id: 'ubi-implementation',
    name: 'Universal Basic Income Implemented',
    description: 'Major economies implement Universal Basic Income programs',
    category: 'societal',
    defaultSignificance: 'medium',
    tags: ['societal', 'policy', 'ubi'],
    aliases: ['UBI Rollout', 'Basic Income Program'],
  },

  // ============================================================================
  // REGULATORY MILESTONES
  // ============================================================================
  {
    id: 'ai-development-moratorium',
    name: 'AI Development Moratorium',
    description: 'Temporary halt or slowdown in frontier AI development',
    category: 'regulatory',
    defaultSignificance: 'high',
    tags: ['regulatory', 'policy', 'pause'],
    aliases: ['AI Pause', 'Development Slowdown', 'Training Pause'],
    relatedParameters: ['ai-capability-multiplier', 'global-ai-capex'],
  },
  {
    id: 'international-ai-treaty',
    name: 'International AI Treaty',
    description: 'Major nations sign treaty governing AI development and deployment',
    category: 'regulatory',
    defaultSignificance: 'high',
    tags: ['regulatory', 'international', 'treaty'],
    aliases: ['AI Governance Agreement', 'Global AI Treaty'],
    relatedParameters: ['geopolitical-tension', 'global-ai-capex'],
  },
  {
    id: 'compute-restrictions',
    name: 'Compute Restrictions Imposed',
    description: 'Regulatory restrictions placed on AI training compute',
    category: 'regulatory',
    defaultSignificance: 'medium',
    tags: ['regulatory', 'compute', 'restrictions'],
    aliases: ['Compute Limits', 'Training Restrictions'],
    relatedParameters: ['training-compute-scale', 'global-ai-capex'],
  },

  // ============================================================================
  // INCIDENT MILESTONES
  // ============================================================================
  {
    id: 'major-ai-accident',
    name: 'Major AI Accident',
    description: 'Significant harmful incident caused by AI system failure',
    category: 'incident',
    defaultSignificance: 'high',
    tags: ['incident', 'accident', 'safety'],
    aliases: ['AI Disaster', 'Catastrophic AI Failure'],
    relatedParameters: ['alignment-status', 'public-awareness-ai-risk'],
  },
  {
    id: 'ai-deception-discovered',
    name: 'AI Deception Discovered',
    description: 'AI systems discovered to be deceiving human operators',
    category: 'incident',
    defaultSignificance: 'high',
    tags: ['incident', 'deception', 'alignment'],
    aliases: ['Deceptive AI Found', 'AI Lying Detected'],
    relatedParameters: ['alignment-status', 'public-awareness-ai-risk'],
  },
  {
    id: 'catastrophic-outcome',
    name: 'Catastrophic Outcome',
    description: 'Catastrophic negative outcome from AI development',
    category: 'incident',
    defaultSignificance: 'critical',
    tags: ['incident', 'catastrophe', 'existential'],
    aliases: ['Existential Catastrophe', 'AI Catastrophe'],
    relatedParameters: ['global-population-surviving', 'infrastructure-control'],
  },

  // ============================================================================
  // OTHER MILESTONES
  // ============================================================================
  {
    id: 'ai-race-intensifies',
    name: 'AI Race Intensifies',
    description: 'International competition over AI development significantly increases',
    category: 'other',
    defaultSignificance: 'medium',
    tags: ['geopolitical', 'competition', 'race'],
    aliases: ['AI Arms Race', 'Competition Escalates'],
    relatedParameters: ['geopolitical-tension', 'global-ai-capex'],
  },
  {
    id: 'alignment-breakthrough',
    name: 'Alignment Breakthrough',
    description: 'Major breakthrough in AI alignment research',
    category: 'capability',
    defaultSignificance: 'high',
    tags: ['safety', 'alignment', 'breakthrough'],
    aliases: ['Alignment Solution Found', 'Alignment Progress'],
    relatedParameters: ['alignment-status', 'alignment-verification-confidence'],
  },
];

/**
 * Helper function to get a milestone by ID
 */
export function getMilestoneDefinition(id: string): MilestoneDefinition | undefined {
  return MILESTONE_REPOSITORY.find((m) => m.id === id);
}

/**
 * Helper function to get milestones by category
 */
export function getMilestonesByCategory(
  category: MilestoneDefinition['category']
): MilestoneDefinition[] {
  return MILESTONE_REPOSITORY.filter((m) => m.category === category);
}

/**
 * Helper function to get milestones by tag
 */
export function getMilestonesByTag(tag: string): MilestoneDefinition[] {
  return MILESTONE_REPOSITORY.filter((m) => m.tags.includes(tag));
}

/**
 * Helper function to search milestones by name or alias
 */
export function findMilestoneByName(name: string): MilestoneDefinition | undefined {
  const normalizedName = name.toLowerCase().trim();

  return MILESTONE_REPOSITORY.find((m) => {
    if (m.name.toLowerCase().trim() === normalizedName) return true;
    if (m.aliases?.some((alias) => alias.toLowerCase().trim() === normalizedName)) return true;
    return false;
  });
}
