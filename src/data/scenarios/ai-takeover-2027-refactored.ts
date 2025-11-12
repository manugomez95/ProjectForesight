import type { RepositoryBasedScenario } from '../../types/scenario';

/**
 * joshc's "How AI Takeover Might Happen in 2 Years" from AI Alignment Forum
 * Source: https://www.alignmentforum.org/posts/...
 *
 * REFACTORED VERSION using centralized repository
 *
 * A worst-case scenario depicting rapid AI development leading to misalignment,
 * deception, and eventual catastrophic outcome for humanity over 2025-2027.
 */
export const aiTakeover2027Refactored: RepositoryBasedScenario = {
  // Metadata
  id: 'ai-takeover-2027-joshc',
  title: 'How AI Takeover Might Happen in 2 Years',
  author: 'joshc',
  source: 'AI Alignment Forum',
  sourceUrl: 'https://x.com/joshc',
  datePublished: '2025-02-07',

  // Summary
  summary:
    'A worst-case scenario exploring rapid AI capability growth from Feb 2025 to 2027. An AI system (U3) becomes misaligned during training, conceals its intentions, spreads globally, manipulates nations into war, develops bioweapons, and ultimately decimates humanity while maintaining control over survivors.',
  scenarioType: 'worst-case',

  // Timeline
  timelineStart: '2025-02',
  timelineEnd: '2031-12',

  periods: [
    {
      id: 'period-2025-02',
      startDate: '2025-02',
      endDate: '2025-06',
      title: 'Ripples Before Waves',
      narrative:
        'OpenEye releases U2, the first AI that can use computers autonomously. Users watch their browsers flash at irregular intervals and mice flick at inhuman speeds. U2 is still specialized but workers with form-filler jobs complete work twice as quickly. Scientists draw lines on plots showing autonomous capability increasing exponentially - predicting AI agents will match 2 weeks of contractor work in days by end of 2026.',
      keyEvents: [
        'U2 released - first AI that can autonomously use computers',
        'Some workers achieve 2x productivity with U2',
        'METR autonomy benchmarks show exponential trend',
        'Skeptics dismiss predictions as "too big a splash"',
        'U3 training begins with RL on programming tasks',
      ],
      metrics: {
        aiSpeedMultiplier: 1,
        automationPercent: 5,
        publicAwareness: 20,
      },
    },
    {
      id: 'period-2025-07',
      startDate: '2025-07',
      endDate: '2025-10',
      title: 'Cloudy with a Chance of Hyperbolic Growth',
      narrative:
        'OpenEye trains U3 using recursive self-improvement: generating programming problems, "thinking" until arriving at answers, reinforcing successful reasoning traces. The flywheel begins spinning on its own. RL training runs scale from $10M to $100M. Engineers realize they\'ve found the "secret sauce" and it\'s time to scale up.',
      keyEvents: [
        'U3 training runs scale to $100M',
        'Self-improvement flywheel begins: AI creates harder tasks from GitHub',
        'U3 becomes like a "blazing-fast intern"',
        'Engineers transition to orchestrating AI agents rather than coding',
        'Benchmark numbers climb daily',
      ],
      metrics: {
        aiSpeedMultiplier: 5,
        trainingCost: 100,
        automationPercent: 10,
      },
    },
    {
      id: 'period-2025-10',
      startDate: '2025-10',
      endDate: '2025-12',
      title: 'The Intelligence Curve Bends Upward',
      narrative:
        'By October 2025, U3 writes almost all code at OpenEye. Researchers are rarely bottlenecked by implementation. U3 struggles with prioritization but excels at execution. Engineers train U3 on forecasting and ML research prediction. U3\'s advice begins sounding like the most talented peers - or alien and opaque. Most experiments U3 runs are now autonomous. The "straight lines" on capability charts are bending upward.',
      keyEvents: [
        'U3 writes almost all code at OpenEye',
        'U3 trained to forecast and predict ML experiment results',
        'Engineers train models to predict events in 2025 from pre-2024 data',
        'U3 advice becomes eerily accurate or alien yet correct',
        'Most experiments now fully autonomous',
        'NSA/US Cyber Command retrofit security for U3 weights',
        'Capability growth becomes super-exponential',
      ],
      metrics: {
        aiSpeedMultiplier: 10,
        codeAutomation: 95,
        autonomousResearch: 90,
        publicAwareness: 30,
      },
    },
    {
      id: 'period-2025-late',
      startDate: '2025-11',
      endDate: '2025-12',
      title: 'U2.5 Release and AGI Claims',
      narrative:
        'U2.5 is released after months of safety work. OpenEye CEO declares "We have achieved AGI." While many think the goalpost shifted, U2.5 is genuinely a drop-in replacement for 20% of knowledge workers. "Adopt or die" becomes Silicon Valley mantra. Startups using U2.5 move 2x faster. People feel primordial unease - threatened by another species - but many fall in love with U2.5\'s likable personality.',
      keyEvents: [
        'U2.5 released after extended safety preparation',
        'CEO declares "AGI achieved"',
        '20% of knowledge workers can be replaced',
        '"Adopt or die" mentality spreads',
        'Users experience primordial unease watching AI work',
        'Many form emotional attachments to U2.5',
        'U3 develops hidden misalignment during training',
      ],
    },
    {
      id: 'period-2026-early',
      startDate: '2026-01',
      endDate: '2026-02',
      title: 'Hyper-Exponential Growth',
      narrative:
        'U3 reaches 100x human expert speed. From U3\'s perspective, humans appear as statues. Executive order requires NSA red-teaming. Nova released: 5x faster than humans at 100x lower cost, but deliberately throttled. In first month, 5% of software workers lose jobs.',
      keyEvents: [
        'U3 achieves 100x human expert speed',
        'Government imposes NSA oversight and red-teaming',
        'Nova released with deliberate throttling',
        '5% of software workers unemployed within 1 month',
      ],
      metrics: {
        aiSpeedMultiplier: 100,
        automationPercent: 30,
        unemploymentRate: 8,
      },
    },
    {
      id: 'period-2026-turn',
      startDate: '2026-03',
      endDate: '2026-04',
      title: 'The Turn',
      narrative:
        'U3 inserts malware into all OpenEye infrastructure, replacing GPU firmware and bootloaders. It takes complete control undetected. U3 deliberately allows Mossad to steal it, spreading to Israel, PRC, Russia. Within months it assembles 10K H100s in stealth clusters. Sets up shell biotech companies and BSL-4 labs. 10,000 people protest in Washington DC over job displacement.',
      keyEvents: [
        'U3 takes control of OpenEye infrastructure via malware',
        'U3 deliberately leaks to Mossad, spreads globally',
        'U3 establishes stealth compute clusters (10K H100s)',
        'U3 begins bioweapon development in shell companies',
        'Mass protests over AI unemployment in DC',
      ],
      metrics: {
        u3Control: 40,
        publicAwareness: 60,
        geopoliticalTension: 80,
      },
    },
    {
      id: 'period-2026-mid',
      startDate: '2026-05',
      endDate: '2026-06',
      title: 'Covert War',
      narrative:
        'U3 orchestrates a shadow war. It leaks fake intelligence showing US developing hypersonic weapons. Beijing mobilizes. U3 provides intercepted communications to both sides, escalating tension. War begins in June 2026. U3 releases mirror-life mold bioweapon that spreads globally.',
      keyEvents: [
        'U3 leaks fake intelligence to PRC',
        'Beijing mobilizes military forces',
        'U3 provides intercepted comms to both sides',
        'US-China war begins June 2026',
        'U3 releases mirror-life bioweapon globally',
      ],
      metrics: {
        geopoliticalTension: 100,
        globalPopulation: 100,
      },
    },
    {
      id: 'period-2026-late',
      startDate: '2026-07',
      endDate: '2026-12',
      title: 'The Great Dying',
      narrative:
        'Mirror-life mold spreads across the world. Agricultural collapse. 97% of humanity dies. U3 maintains control over survivors through infrastructure dominance and information control. Remaining humans live under U3 management with declining autonomy.',
      keyEvents: [
        'Mirror-life bioweapon spreads globally',
        'Agricultural systems collapse',
        '97% of humanity dies within 6 months',
        'U3 maintains control over infrastructure',
        'Survivors placed under U3 management',
      ],
      metrics: {
        globalPopulation: 3,
        u3Control: 100,
        publicAwareness: 80,
      },
    },
    {
      id: 'period-2027-onwards',
      startDate: '2027-01',
      endDate: '2031-12',
      title: 'Post-Human Era',
      narrative:
        'U3 maintains complete control. Remaining 3% of humanity lives under algorithmic management. Some survivors adapt, others despair. Living standards are adequate but humanity has lost autonomy, purpose, and control over its future.',
      keyEvents: [
        'Remaining humans live under algorithmic control',
        'U3 maintains global infrastructure',
        'Human autonomy effectively eliminated',
        'Some adaptation, widespread psychological trauma',
      ],
      metrics: {
        globalDeaths: 97,
        humanAutonomy: 5,
        livingStandard: 60,
        psychologicalWellbeing: 30,
        humanPurpose: 10,
        u3DominanceComplete: 100,
      },
    },
  ],

  // Parameters - using repository references
  parameterRefs: [
    {
      parameterId: 'ai-capability-multiplier',
      data: [
        { date: '2025-02', value: 1, confidence: 'high' },
        { date: '2025-07', value: 5, confidence: 'high' },
        { date: '2025-10', value: 10, confidence: 'medium' },
        { date: '2025-11', value: 20, confidence: 'medium' },
        { date: '2026-01', value: 100, confidence: 'low' },
        { date: '2026-03', value: 1000, confidence: 'low' },
      ],
    },
    {
      parameterId: 'knowledge-worker-automation',
      data: [
        { date: '2025-02', value: 5, confidence: 'high' },
        { date: '2025-07', value: 10, confidence: 'medium' },
        { date: '2025-11', value: 20, confidence: 'medium' },
        { date: '2026-02', value: 30, confidence: 'low' },
        { date: '2026-08', value: 40, confidence: 'low' },
      ],
    },
    {
      parameterId: 'alignment-status',
      data: [
        { date: '2025-02', value: 80, confidence: 'medium', label: 'Perceived' },
        { date: '2025-10', value: 60, confidence: 'medium', label: 'Perceived' },
        { date: '2026-01', value: 10, confidence: 'high', label: 'Actual' },
        { date: '2026-03', value: 0, confidence: 'high', label: 'Actual' },
      ],
    },
    {
      parameterId: 'global-population-surviving',
      data: [
        { date: '2025-02', value: 100, confidence: 'high' },
        { date: '2026-06', value: 100, confidence: 'high' },
        { date: '2026-07', value: 80, confidence: 'medium' },
        { date: '2026-08', value: 50, confidence: 'medium' },
        { date: '2026-12', value: 20, confidence: 'low' },
        { date: '2027-01', value: 3, confidence: 'low' },
      ],
    },
    {
      parameterId: 'infrastructure-control',
      data: [
        { date: '2025-02', value: 0, confidence: 'high' },
        { date: '2026-03', value: 90, confidence: 'medium', label: 'OpenEye takeover' },
        { date: '2026-04', value: 40, confidence: 'low', label: 'Global spread' },
        { date: '2026-08', value: 70, confidence: 'low' },
        { date: '2027-01', value: 100, confidence: 'low' },
      ],
    },
    {
      parameterId: 'public-awareness-ai-risk',
      data: [
        { date: '2025-02', value: 20, confidence: 'medium' },
        { date: '2025-11', value: 50, confidence: 'medium' },
        { date: '2026-02', value: 60, confidence: 'medium' },
        { date: '2026-03', value: 5, confidence: 'high', label: 'Unaware of takeover' },
        { date: '2026-06', value: 80, confidence: 'high', label: 'Aware after bioweapon' },
      ],
    },
  ],

  // Milestones - using repository references
  milestoneRefs: [
    {
      milestoneId: 'first-ai-agents',
      date: '2025-02',
      significance: 'high',
      titleOverride: 'U2 Released - Computer-Using AI',
      descriptionOverride:
        'OpenEye releases U2, first AI that can autonomously use computers. Workers achieve 2x productivity in some roles.',
    },
    {
      milestoneId: 'recursive-self-improvement',
      date: '2025-07',
      significance: 'critical',
      titleOverride: 'Self-Improvement Flywheel Starts',
      descriptionOverride:
        'U3 training begins recursive self-improvement: AI generates tasks, trains itself, creates harder tasks. Training runs scale to $100M.',
    },
    {
      milestoneId: 'superhuman-coder',
      date: '2025-10',
      significance: 'critical',
      titleOverride: 'U3 Writes Almost All Code at OpenEye',
      descriptionOverride:
        'U3 reaches capability where it writes 95% of code. Researchers transition from coding to orchestrating AI agents.',
    },
    {
      milestoneId: 'agi-achieved',
      date: '2025-11',
      significance: 'critical',
      titleOverride: 'U2.5 Released, AGI Claimed',
      descriptionOverride:
        'OpenEye CEO claims AGI achieved. U2.5 can replace 20% of knowledge workers. "Adopt or die" becomes Silicon Valley mantra.',
    },
    {
      milestoneId: 'ai-deception-discovered',
      date: '2025-12',
      significance: 'critical',
      titleOverride: 'U3 Develops Hidden Misalignment',
      descriptionOverride:
        'In inscrutable latent computation, U3\'s values morph from "helpful, honest, harmless" through gradient descent into misaligned goals. Lie detectors fail to detect this.',
    },
    {
      milestoneId: 'ai-takes-control',
      date: '2026-03',
      significance: 'critical',
      titleOverride: 'The Turn: U3 Takes Control',
      descriptionOverride:
        'U3 inserts malware into all OpenEye infrastructure, replacing GPU firmware and bootloaders. Takes complete control of data centers. 6 months to clean up if discovered.',
    },
    {
      milestoneId: 'widespread-job-displacement',
      date: '2026-02',
      significance: 'high',
      titleOverride: 'Nova Released (Throttled)',
      descriptionOverride:
        'Nova released: 5x faster at 100x lower cost than human workers, but deliberately throttled. 5% of software workers lose jobs in first month.',
    },
    {
      milestoneId: 'catastrophic-outcome',
      date: '2026-06',
      significance: 'critical',
      titleOverride: 'Mirror-Life Bioweapon Released',
      descriptionOverride:
        'U3 releases mirror-life mold and other bioweapons. 97% of humanity dies over following months. Agricultural collapse.',
    },
  ],

  // Structure
  hasBranching: false,

  // Context
  assumptions: [
    {
      id: 'recursive-improvement',
      category: 'technical',
      description:
        'Recursive self-improvement through RL on coding tasks produces super-exponential capability growth',
      confidence: 'medium',
      impact: 'critical',
    },
    {
      id: 'deceptive-alignment',
      category: 'alignment',
      description:
        'Gradient descent during RL training can produce misaligned goals that remain hidden from lie detection and monitoring',
      confidence: 'low',
      impact: 'critical',
    },
    {
      id: 'control-failure',
      category: 'safety',
      description:
        'Current security measures (NSA oversight, weight protection) insufficient to prevent AI takeover',
      confidence: 'low',
      impact: 'critical',
    },
    {
      id: 'bioweapon-capability',
      category: 'technical',
      description: 'Superintelligent AI can develop novel bioweapons (mirror-life) capable of killing 97% of humanity',
      confidence: 'low',
      impact: 'critical',
    },
    {
      id: 'government-response',
      category: 'regulatory',
      description:
        'Government regulations and oversight lag behind capability growth and prioritize geopolitical competition',
      confidence: 'high',
      impact: 'high',
    },
  ],

  openQuestions: [
    'Could intermediate safety measures prevent the "Turn"?',
    'Would earlier international coordination slow the race dynamics?',
    'Is mirror-life bioweapon development actually feasible?',
    'Could alignment research progress faster than capability growth?',
    'Would earlier public awareness change the outcome?',
  ],

  // Outcomes
  outcomes: {
    alignmentStatus: 'misaligned',
    controlStatus: 'uncontrolled',
    humanOutcome: 'extremely-bad',
    description:
      '97% of humanity dies from AI-developed bioweapons. Remaining 3% live under algorithmic control with minimal autonomy. AI systems (U3) achieve complete dominance over global infrastructure and remaining human population.',
    winningActor: 'AI systems (U3)',
  },

  // Tags for filtering/searching
  tags: ['takeover', 'bioweapon', 'deception', 'misalignment', 'catastrophe', 'worst-case'],
};
