/**
 * Core types for AI forecast scenarios
 * Designed to standardize different AI forecast scenarios for comparison and visualization
 */

/**
 * A specific point in time with associated metrics
 */
export interface DataPoint {
  date: string; // ISO date or year
  value: number;
  label?: string;
  confidence?: 'low' | 'medium' | 'high';
}

/**
 * A tracked parameter across the scenario timeline
 */
export interface ScenarioParameter {
  id: string;
  name: string;
  description: string;
  unit: string; // e.g., "% of GDP", "millions", "percentage"
  data: DataPoint[];
  color?: string; // for visualization
}

/**
 * A significant event or milestone in the scenario
 */
export interface Milestone {
  id: string;
  date: string; // ISO date or year
  title: string;
  description: string;
  significance: 'low' | 'medium' | 'high' | 'critical';
  category?: string; // e.g., "technical", "geopolitical", "economic", "social"
}

/**
 * A time period in the scenario with narrative description
 */
export interface TimelinePeriod {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  narrative: string; // Main story/description
  keyEvents: string[]; // Bullet points of key events
  metrics?: Record<string, number>; // Snapshot of metrics at this period
}

/**
 * A branching point where the scenario splits into different paths
 */
export interface Branch {
  id: string;
  branchDate: string;
  triggerCondition: string;
  description: string;
  paths: {
    id: string;
    name: string;
    probability?: number; // optional probability estimate
    description: string;
    outcome: string;
    periods: TimelinePeriod[];
    milestones: Milestone[];
  }[];
}

/**
 * Key assumption or uncertainty in the scenario
 */
export interface Assumption {
  id: string;
  category: string; // e.g., "technical", "geopolitical", "economic"
  description: string;
  confidence: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high'; // impact if assumption is wrong
}

/**
 * The final outcome of the scenario
 */
export interface ScenarioOutcome {
  alignmentStatus: 'aligned' | 'misaligned' | 'uncertain' | 'partial';
  controlStatus: 'controlled' | 'uncontrolled' | 'uncertain' | 'partial';
  humanOutcome: 'extremely-good' | 'good' | 'neutral' | 'bad' | 'extremely-bad' | 'extinction';
  description: string;
  winningActor?: string; // e.g., "US", "China", "AI systems", "humanity"
}

/**
 * Main scenario interface
 */
export interface AIScenario {
  // Metadata
  id: string;
  title: string;
  author: string;
  source: string;
  sourceUrl?: string;
  datePublished: string;
  lastUpdated?: string;

  // Summary
  summary: string;
  scenarioType: 'optimistic' | 'pessimistic' | 'modal' | 'median' | 'worst-case' | 'best-case';

  // Timeline
  timelineStart: string;
  timelineEnd: string;
  periods: TimelinePeriod[];

  // Data
  parameters: ScenarioParameter[];
  milestones: Milestone[];

  // Structure
  hasBranching: boolean;
  branches?: Branch[];

  // Context
  assumptions: Assumption[];
  openQuestions?: string[];

  // Outcomes
  outcomes: ScenarioOutcome | ScenarioOutcome[]; // Single or multiple if branching

  // Tags for filtering/searching
  tags: string[];
}

/**
 * Comparison result between two scenarios
 */
export interface ScenarioComparison {
  scenario1: AIScenario;
  scenario2: AIScenario;
  commonParameters: string[];
  divergencePoints: {
    date: string;
    description: string;
  }[];
  keyDifferences: {
    category: string;
    description: string;
  }[];
}
