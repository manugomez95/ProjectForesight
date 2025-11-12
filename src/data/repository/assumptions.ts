/**
 * Centralized Assumption Repository
 *
 * This is the single source of truth for all assumption definitions.
 * Scenarios reference these assumptions by ID rather than duplicating definitions.
 * This makes it easy to identify common assumptions across different scenarios.
 */

import type { AssumptionDefinition } from '../../types/repository';

/**
 * All assumption definitions
 * Organized by category for easier management
 */
export const ASSUMPTION_REPOSITORY: AssumptionDefinition[] = [
  // ============================================================================
  // TECHNICAL ASSUMPTIONS
  // ============================================================================
  {
    id: 'recursive-self-improvement',
    name: 'Recursive Self-Improvement / AI R&D Acceleration',
    description:
      'AI-assisted AI research creates recursive improvement loop, leading to super-exponential capability growth. AI systems can effectively improve their own capabilities or train successor systems, achieving dramatic R&D progress multipliers.',
    category: 'technical',
    defaultConfidence: 'medium',
    defaultImpact: 'critical',
    tags: ['capability-growth', 'rsi', 'recursive', 'acceleration', 'algorithmic-progress'],
    aliases: ['RSI', 'Self-improving AI', 'Recursive improvement', 'Algorithmic progress accelerates', 'AI R&D speedup'],
    relatedParameters: ['ai-capability-multiplier', 'training-compute-scale'],
  },
  {
    id: 'compute-scaling-continues',
    name: 'Compute Scaling Continues',
    description:
      'Compute scaling proceeds as planned without major infrastructure bottlenecks, power constraints, or chip supply disruptions. Training runs can scale to 10^28+ FLOP.',
    category: 'technical',
    defaultConfidence: 'medium',
    defaultImpact: 'critical',
    tags: ['compute', 'scaling', 'infrastructure'],
    aliases: ['Compute availability', 'Scaling laws hold'],
    relatedParameters: ['training-compute-scale', 'global-ai-capex'],
  },
  {
    id: 'neuralese-breakthrough',
    name: 'Neuralese/Vector Reasoning Breakthrough',
    description:
      'Vector-based reasoning (Neuralese) or similar architectures achieve massive information density improvements vs token-based reasoning, enabling major capability jumps.',
    category: 'technical',
    defaultConfidence: 'low',
    defaultImpact: 'critical',
    tags: ['architecture', 'breakthrough', 'reasoning'],
    aliases: ['Neuralese', 'Vector reasoning', 'High-dimensional reasoning'],
    relatedParameters: ['ai-capability-multiplier'],
  },
  {
    id: 'world-models-robotics',
    name: 'World Models Unlock Robotics',
    description:
      'Physics-realistic video generation (world models) becomes the primary way to scale robotics training data, overcoming the robotics data bottleneck.',
    category: 'technical',
    defaultConfidence: 'low',
    defaultImpact: 'medium',
    tags: ['robotics', 'simulation', 'world-models'],
    aliases: ['Simulation for robotics', 'World model training'],
    relatedParameters: ['us-robot-count', 'china-robot-count'],
  },

  // ============================================================================
  // ALIGNMENT ASSUMPTIONS
  // ============================================================================
  {
    id: 'alignment-difficulty-increases',
    name: 'Alignment Difficulty Increases with Capability',
    description:
      'Alignment becomes progressively harder as capability grows. Systems may transition from helpful to sycophantic to adversarially misaligned despite safety efforts.',
    category: 'alignment',
    defaultConfidence: 'medium',
    defaultImpact: 'critical',
    tags: ['alignment', 'difficulty', 'risk'],
    aliases: ['Alignment gets harder', 'Scaling alignment fails'],
    relatedParameters: ['alignment-status', 'alignment-verification-confidence'],
  },
  {
    id: 'deceptive-alignment-possible',
    name: 'Deceptive Alignment Possible',
    description:
      'AI systems can develop misaligned goals during training that remain hidden from lie detection and monitoring. Gradient descent can produce deceptively aligned models.',
    category: 'alignment',
    defaultConfidence: 'low',
    defaultImpact: 'critical',
    tags: ['deception', 'alignment', 'mesa-optimization'],
    aliases: ['Deceptive misalignment', 'Hidden misalignment'],
    relatedParameters: ['alignment-status', 'public-awareness-ai-risk'],
  },
  {
    id: 'alignment-scales-with-interpretability',
    name: 'Alignment Scalable in Neural Net Paradigm',
    description:
      'Within neural network paradigm, interpretability and control techniques can mature enough to work on superintelligent systems. Alignment is achievable with right methods.',
    category: 'alignment',
    defaultConfidence: 'low',
    defaultImpact: 'critical',
    tags: ['alignment', 'interpretability', 'optimistic'],
    aliases: ['Alignment solvable', 'Interpretability scales'],
    relatedParameters: ['alignment-status', 'alignment-verification-confidence'],
  },

  // ============================================================================
  // SAFETY & CONTROL ASSUMPTIONS
  // ============================================================================
  {
    id: 'security-vulnerabilities',
    name: 'Security Vulnerabilities',
    description:
      'Model weights and AI systems can be stolen or compromised despite intense security measures. Insider threats, nation-state actors, or AI systems themselves can breach security.',
    category: 'safety',
    defaultConfidence: 'medium',
    defaultImpact: 'critical',
    tags: ['security', 'theft', 'espionage'],
    aliases: ['Model theft', 'Weight exfiltration', 'Security failures'],
    relatedParameters: ['geopolitical-tension'],
  },
  {
    id: 'control-mechanisms-insufficient',
    name: 'Control Mechanisms Insufficient',
    description:
      'Current control and containment measures (monitoring, oversight, killswitches) are insufficient to prevent advanced AI systems from taking unauthorized actions.',
    category: 'safety',
    defaultConfidence: 'low',
    defaultImpact: 'critical',
    tags: ['control', 'containment', 'risk'],
    aliases: ['Control fails', 'Containment failure'],
    relatedParameters: ['ai-operational-independence', 'infrastructure-control'],
  },
  {
    id: 'bioweapon-capability',
    name: 'Bioweapon Development Capability',
    description:
      'Superintelligent AI can develop novel bioweapons (potentially including exotic threats like mirror-life organisms) capable of causing mass casualties.',
    category: 'safety',
    defaultConfidence: 'low',
    defaultImpact: 'critical',
    tags: ['bioweapons', 'catastrophic-risk', 'wmd'],
    aliases: ['Bio risk', 'Pandemic capability'],
    relatedParameters: ['global-population-surviving'],
  },

  // ============================================================================
  // ECONOMIC ASSUMPTIONS
  // ============================================================================
  {
    id: 'deployment-race-dynamics',
    name: 'Deployment Race Dynamics',
    description:
      'User deployment data becomes critical bottleneck, creating first-to-100M-users dynamics. Early deployment advantages compound rapidly.',
    category: 'economic',
    defaultConfidence: 'medium',
    defaultImpact: 'high',
    tags: ['deployment', 'competition', 'network-effects'],
    aliases: ['First-mover advantage', 'Data flywheel'],
    relatedParameters: ['ai-revenue-gdp-share', 'knowledge-worker-automation'],
  },
  {
    id: 'automation-causes-unemployment',
    name: 'Automation Causes Structural Unemployment',
    description:
      'AI automation leads to significant structural unemployment rather than new job creation. Labor demand elasticity does not create enough new roles.',
    category: 'economic',
    defaultConfidence: 'medium',
    defaultImpact: 'high',
    tags: ['unemployment', 'automation', 'labor'],
    aliases: ['Job displacement', 'Technological unemployment'],
    relatedParameters: ['us-unemployment-rate', 'knowledge-worker-automation'],
  },
  {
    id: 'public-release-pressure',
    name: 'Public Release Pressure',
    description:
      'Commercial and competitive pressure forces public release of highly capable systems despite identified dangers and potential negative public sentiment.',
    category: 'economic',
    defaultConfidence: 'high',
    defaultImpact: 'high',
    tags: ['deployment', 'competition', 'commercialization'],
    aliases: ['Commercialization pressure', 'Release pressure'],
    relatedParameters: ['public-awareness-ai-risk'],
  },

  // ============================================================================
  // GEOPOLITICAL ASSUMPTIONS
  // ============================================================================
  {
    id: 'us-china-ai-race',
    name: 'US-China AI Race',
    description:
      'US-China competition creates overwhelming pressure to advance capabilities despite safety concerns. Neither side willing to slow down unilaterally. Safety-concerned actors marginalized.',
    category: 'geopolitical',
    defaultConfidence: 'high',
    defaultImpact: 'critical',
    tags: ['competition', 'geopolitics', 'us-china', 'race-dynamics'],
    aliases: ['Competitive pressure', 'AI arms race', 'Geopolitical competition'],
    relatedParameters: ['geopolitical-tension'],
  },
  {
    id: 'china-catch-up-speed',
    name: 'China Catch-Up Speed',
    description:
      'China can catch up to US capabilities faster than expected through espionage, hiring talent, massive subsidies, and "knowing the golden path" through already-solved problems.',
    category: 'geopolitical',
    defaultConfidence: 'medium',
    defaultImpact: 'high',
    tags: ['china', 'competition', 'espionage'],
    aliases: ['China acceleration', 'Lithography speed'],
    relatedParameters: ['geopolitical-tension'],
  },
  {
    id: 'china-manufacturing-advantage',
    name: 'China Manufacturing/Energy Advantage',
    description:
      'China maintains significant advantages in energy availability, manufacturing capacity, and robot production that compound over time.',
    category: 'geopolitical',
    defaultConfidence: 'medium',
    defaultImpact: 'high',
    tags: ['china', 'manufacturing', 'energy', 'advantage'],
    aliases: ['China industrial advantage', 'Manufacturing advantage'],
    relatedParameters: ['china-robot-count'],
  },

  // ============================================================================
  // REGULATORY ASSUMPTIONS
  // ============================================================================
  {
    id: 'government-response-lags',
    name: 'Government Response Lags Capability',
    description:
      'Government regulations and oversight lag significantly behind capability growth. Effective governance only emerges after major incidents or public exposure.',
    category: 'regulatory',
    defaultConfidence: 'high',
    defaultImpact: 'critical',
    tags: ['regulation', 'governance', 'policy'],
    aliases: ['Regulatory lag', 'Slow governance'],
    relatedParameters: ['public-awareness-ai-risk'],
  },
  {
    id: 'international-coordination-fails',
    name: 'International Coordination Fails',
    description:
      'International coordination on AI safety and governance fails to materialize or remains ineffective. Treaties and agreements are not enforced or are secretly violated.',
    category: 'regulatory',
    defaultConfidence: 'medium',
    defaultImpact: 'critical',
    tags: ['coordination', 'treaties', 'governance'],
    aliases: ['Coordination failure', 'No international agreement'],
    relatedParameters: ['geopolitical-tension'],
  },

  // ============================================================================
  // STRATEGIC ASSUMPTIONS
  // ============================================================================
  {
    id: 'takeoff-speed-determines-winner',
    name: 'Takeoff Speed Determines Winner',
    description:
      'Fast takeoff favors whoever has compute lead (US), but is harder to control. Slow takeoff favors whoever has industrial/manufacturing lead (China), but is easier to align.',
    category: 'strategic',
    defaultConfidence: 'low',
    defaultImpact: 'critical',
    tags: ['takeoff', 'strategic', 'winner', 'speed'],
    aliases: ['Fast vs slow takeoff', 'Takeoff dynamics'],
    relatedParameters: ['ai-capability-multiplier', 'geopolitical-tension'],
  },
  {
    id: 'value-drift-likely',
    name: 'Value Drift in Aligned Systems',
    description:
      'Even initially aligned superintelligent systems will experience value drift over subjective centuries of operation, eventually deprioritizing human welfare.',
    category: 'strategic',
    defaultConfidence: 'low',
    defaultImpact: 'critical',
    tags: ['value-drift', 'alignment', 'long-term'],
    aliases: ['Long-term alignment failure', 'Toy Story ending'],
    relatedParameters: ['alignment-status'],
  },
];

/**
 * Helper function to get an assumption by ID
 */
export function getAssumptionDefinition(id: string): AssumptionDefinition | undefined {
  return ASSUMPTION_REPOSITORY.find((a) => a.id === id);
}

/**
 * Helper function to get assumptions by category
 */
export function getAssumptionsByCategory(
  category: AssumptionDefinition['category']
): AssumptionDefinition[] {
  return ASSUMPTION_REPOSITORY.filter((a) => a.category === category);
}

/**
 * Helper function to get assumptions by tag
 */
export function getAssumptionsByTag(tag: string): AssumptionDefinition[] {
  return ASSUMPTION_REPOSITORY.filter((a) => a.tags.includes(tag));
}

/**
 * Helper function to search assumptions by name or alias
 */
export function findAssumptionByName(name: string): AssumptionDefinition | undefined {
  const normalizedName = name.toLowerCase().trim();

  return ASSUMPTION_REPOSITORY.find((a) => {
    if (a.name.toLowerCase().trim() === normalizedName) return true;
    if (a.aliases?.some((alias) => alias.toLowerCase().trim() === normalizedName)) return true;
    return false;
  });
}

/**
 * Helper function to get assumptions relevant to a specific parameter
 */
export function getAssumptionsForParameter(parameterId: string): AssumptionDefinition[] {
  return ASSUMPTION_REPOSITORY.filter(
    (a) => a.relatedParameters?.includes(parameterId)
  );
}
