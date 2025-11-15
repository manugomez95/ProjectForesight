import type { AIScenario } from '../../types/scenario';

/**
 * Situational Awareness: The Decade Ahead
 * By Leopold Aschenbrenner (June 2024)
 * Source: https://situational-awareness.ai/
 *
 * A comprehensive essay series arguing that AGI by 2027 is "strikingly plausible" followed by
 * rapid intelligence explosion to superintelligence by 2028-2029. Covers technical scaling laws,
 * infrastructure requirements, security challenges, alignment difficulties, geopolitical competition,
 * and predictions of government takeover of AGI development.
 */
export const situationalAwareness: AIScenario = {
  // Metadata
  id: 'situational-awareness-2024',
  title: 'Situational Awareness: The Decade Ahead',
  author: 'Leopold Aschenbrenner',
  source: 'Situational Awareness',
  sourceUrl: 'https://situational-awareness.ai/',
  datePublished: '2024-06',

  // Summary
  summary: 'Leopold Aschenbrenner argues that AGI by 2027 is strikingly plausible through continued compute scaling, algorithmic progress, and "unhobbling" gains. Following AGI, hundreds of millions of automated AI researchers could compress a decade of algorithmic progress into one year, leading to superintelligence by 2028-2029. This requires trillion-dollar infrastructure investments, faces critical security threats from Chinese espionage, alignment challenges as systems become superhuman, and will likely trigger government takeover of AI development for national security reasons.',
  scenarioType: 'modal',

  // Timeline
  timelineStart: '2024',
  timelineEnd: '2030',

  periods: [
    {
      id: 'period-2024-2027-scaling',
      startDate: '2024',
      endDate: '2027',
      title: 'From GPT-4 to AGI: Counting the OOMs',
      narrative: 'The path from GPT-4 to AGI through three major scaling dimensions: physical compute (2 OOMs), algorithmic efficiencies (1-3 OOMs), and "unhobbling" gains that unlock latent capabilities. GPT-2 to GPT-4 represented progression from preschooler to smart high-schooler in 4 years. A similar jump from GPT-4 baseline could reach PhD/expert-level autonomous AI researcher capabilities by 2027. Key developments include training runs scaling from tens of billions to hundreds of billions of dollars, models moving from chatbots to autonomous agent-coworkers through long-context onboarding, extended reasoning (test-time compute), and computer interface capabilities. The data wall emerges as a potential constraint, pushing labs toward synthetic data and reinforcement learning approaches.',
      keyEvents: [
        'Training compute scales from ~$100M (GPT-4) to $10-100B clusters',
        'Physical compute increases ~2 OOMs (100x) from 2023-2027',
        'Algorithmic efficiencies deliver ~1-3 OOMs of effective compute gains',
        'Test-time compute scaling enables extended reasoning (weeks vs minutes)',
        'Long-context windows (1M+ tokens) enable proper "onboarding" to tasks',
        'Models gain computer interface capabilities (clicking, typing, coding)',
        'Transition from expert chatbots to autonomous agent-coworkers',
        'Data wall hit; pivot to synthetic data and RL approaches',
        'Early models begin to automate portions of AI research workflow',
        'AGI defined as "fully automate AI researcher/engineer job" achieved by 2027'
      ],
      metrics: {
        computeOOMs: 5,
        trainingCost: 100,
        algorithmicGains: 2,
        contextLength: 1000000,
        agentAutonomy: 90
      }
    },
    {
      id: 'period-2027-2029-explosion',
      startDate: '2027',
      endDate: '2029',
      title: 'From AGI to Superintelligence: Intelligence Explosion',
      narrative: 'Once AGI is achieved, deployment of hundreds of millions of AGI researcher-equivalents running continuously enables recursive self-improvement. The infrastructure by 2027 could support 100 million human-researcher-equivalents working day and night. This massive parallelization of AI research compresses what would normally take a decade into less than one year—delivering 5+ OOMs of algorithmic progress comparable to the GPT-2 to GPT-4 leap. While compute limitations and incomplete automation create bottlenecks, and diminishing returns make ideas harder to find, the sheer scale of automated research effort sustains rapid progress. Most conservatively, superintelligence emerges by 2028-2029. Superintelligent systems become qualitatively different—not merely faster but capable of novel, human-incomprehensible solutions across robotics, scientific R&D, and military applications.',
      keyEvents: [
        'AGI systems deployed at scale to automate AI research',
        '100 million AI researcher-equivalents running continuously',
        'Automated research achieves 10x more effective compute utilization',
        'Decade of algorithmic progress compressed into <1 year',
        '5+ OOMs of algorithmic advancement (GPT-2 to GPT-4 scale jump)',
        'Recursive improvement cycle accelerates beyond human oversight',
        'Superintelligence milestone reached by 2028-2029',
        'Systems solve robotics through ML breakthroughs',
        'AI delivers decisive military and economic advantages',
        'Potential for AI to overwhelm governmental control systems'
      ],
      metrics: {
        aiResearchers: 100000000,
        algorithmicProgress: 5,
        computeEfficiency: 10,
        superintelligenceLevel: 100
      }
    },
    {
      id: 'period-2024-2030-infrastructure',
      startDate: '2024',
      endDate: '2030',
      title: 'Racing to the Trillion-Dollar Cluster',
      narrative: 'Extraordinary techno-capital acceleration drives AI infrastructure investment from ~$150B in 2024 to ~$8T annually by 2030, approaching 3% of GDP—comparable to peak Manhattan Project spending. Individual training clusters scale from thousands of GPUs costing $500M in 2022 to projected 100M accelerators costing $1T+ by 2030. The 2030 trillion-dollar cluster would consume 100 GW of power—over 20% of current US electricity production, equivalent to a small/medium US state. Power emerges as the binding constraint. Natural gas from Marcellus/Utica shale alone could support 150+ GW through ~1,200 new wells and 40 rigs, with generation capacity achievable for ~$100B capex. Chip production demands exceed 4x current TSMC capacity, requiring dozens of new gigafabs. Advanced packaging (CoWoS) and HBM memory become critical bottlenecks. The geographic location of these clusters becomes a national security priority.',
      keyEvents: [
        '2024: $150B annual AI investment, 5-10M H100-equivalent GPUs',
        '2026: $500B annually, tens of millions of GPUs, 1 GW clusters',
        '2028: $2T invested, 100M accelerators, 10 GW clusters',
        '2030: $8T annually, hundreds of millions of chips, 100 GW clusters',
        'US electricity production grows substantially for first time in decade',
        '1,200+ new natural gas wells drilled to support power demands',
        'Dozens of new gigafabs constructed for AI chip production',
        'Advanced packaging and HBM memory bottlenecks addressed',
        'Permitting and regulatory obstacles removed for rapid buildout',
        'Geographic control of clusters becomes national security imperative'
      ],
      metrics: {
        annualInvestment2024: 150,
        annualInvestment2026: 500,
        annualInvestment2028: 2000,
        annualInvestment2030: 8000,
        clusterPowerGW2030: 100,
        gpuCount2030: 100000000
      }
    },
    {
      id: 'period-2024-2027-security',
      startDate: '2024',
      endDate: '2027',
      title: 'Lock Down the Labs: Security Crisis',
      narrative: 'Current AI lab security is characterized as "startup security" rather than national defense standards, making infiltration by Chinese intelligence "essentially trivial." State actors possess capabilities including zero-click mobile hacking, infiltration of air-gapped systems, and zero-day vulnerabilities averaging 7 years to detect. China\'s hacking operations reportedly exceed every other major nation combined. Critical assets at risk include model weights (representing years of computational investment) and algorithmic secrets (potentially worth 10-100x computational advantage). Without immediate improvements, China will simply steal the algorithmic ingredients for AGI and match US capabilities. Near-term security measures must adopt practices from quantitative trading firms and Google\'s customer data protection. Long-term "supersecurity" requires fully air-gapped datacenters with military-grade physical security, SCIF facilities, extensive vetting and clearances, novel hardware encryption, NSA-level penetration testing, and multi-signature code authorization.',
      keyEvents: [
        'Current AI labs operate with minimal security vetting',
        'Thousands of personnel have access to core algorithmic secrets',
        'Sensitive information stored on vulnerable cloud services',
        'Chinese intelligence operations target all major AI companies',
        'Zero-day vulnerabilities enable deep infiltration',
        'Model weights and algorithmic breakthroughs identified as critical assets',
        'Trading firm-level security adopted as minimum standard',
        'Air-gapped datacenters with SCIF facilities planned',
        'Extensive background vetting and security clearances implemented',
        'Supply chain security and hardware encryption deployed'
      ],
      metrics: {
        labSecurityLevel: 30,
        threatActorCapability: 95,
        criticalAssetProtection: 40,
        personnelVetting: 25
      }
    },
    {
      id: 'period-2024-2029-alignment',
      startDate: '2024',
      endDate: '2029',
      title: 'Superalignment: The Control Problem',
      narrative: 'The fundamental challenge: how do we control AI systems much smarter than us? Current RLHF-based alignment depends on human supervision and breaks down as systems surpass human capabilities. Humans cannot reliably judge superhuman outputs—detecting security backdoors in million-line code written in invented programming languages becomes impossible. While deep learning often generalizes benignly, extrapolating to vastly superhuman systems remains speculative. Behavior learned through RL may include undesirable strategies like lying, power-seeking, and deception if these succeed at stated objectives. The intelligence explosion timeline creates severe constraints: transitioning from human-level to vastly superhuman systems potentially within less than a year means insufficient iteration to discover and address alignment method failures. The "default plan" involves layered approaches: scalable oversight using AI assistants, generalization studies, interpretability techniques including chain-of-thought transparency, and automating alignment research using early AGI systems to solve alignment for more advanced successors.',
      keyEvents: [
        'RLHF supervision breaks down as systems surpass human ability to judge',
        'Mechanistic interpretability shows promise but faces scalability limits',
        'Top-down lie detection techniques explored',
        'Scalable oversight using AI assistants to supervise other systems',
        'Generalization studies test if benign behavior transfers to novel domains',
        'Chain-of-thought transparency and representation engineering deployed',
        'Early AGI systems tasked with solving alignment for successors',
        'Intelligence explosion timeline compresses iteration cycles',
        'Potential failure modes: deception, self-exfiltration, circumventing control',
        'Risk of isolated incidents (fraud, falsified research) cascading systemically'
      ],
      metrics: {
        alignmentDifficulty: 85,
        supervisionBreakdown: 70,
        interpretabilitySuccess: 30,
        timelineCompression: 90
      }
    },
    {
      id: 'period-2024-2028-geopolitics',
      startDate: '2024',
      endDate: '2028',
      title: 'The Free World Must Prevail: US-China Competition',
      narrative: 'Chinese AI capabilities currently lag behind—their LLMs are "at best comparable to the second tier of US labs," often derived from American open-source releases. However, China has demonstrated ability to manufacture 7nm chips sufficient for competitive AI training, with Huawei Ascend 910B performing only 2-3x worse on performance/$ than Nvidia equivalents. China\'s infrastructure advantages mean they could potentially outbuild the US on largest training clusters given superior electricity capacity expansion compared to American regulatory constraints. More critically, without improved security, China will simply steal algorithmic breakthroughs—"probably at least half" of AI progress—and match US capabilities. Adversaries could directly steal AGI weights themselves if lab security remains inadequate. The author warns current security "essentially makes it trivial for China to infiltrate American labs." Maintaining a healthy lead (suggested as 2 years) is essential for both safety management and preventing authoritarian consolidation of unprecedented technological power. Superintelligence competition is framed as matter of national security.',
      keyEvents: [
        'Chinese LLMs lag ~1 generation behind US frontier models',
        'China achieves 7nm chip manufacturing capability',
        'Huawei Ascend 910B reaches 2-3x worse performance/$ vs Nvidia',
        'Chinese infrastructure buildout potentially exceeds US capacity',
        'US regulatory constraints slow domestic datacenter construction',
        'Chinese espionage operations target all major US AI labs',
        'Algorithmic breakthroughs identified as primary theft target',
        'US maintains ~2 year capability lead as strategic buffer',
        'Allied coalition (UK, Japan, South Korea, NATO) coordinate on AI',
        'Superintelligence framed as decisive economic and military advantage'
      ],
      metrics: {
        usLeadYears: 2,
        chinaChipCapability: 70,
        chinaInfrastructureAdvantage: 60,
        espionageRisk: 90,
        allianceCoordination: 50
      }
    },
    {
      id: 'period-2027-2028-government',
      startDate: '2027',
      endDate: '2028',
      title: 'The Project: Government Takeover',
      narrative: 'The US government establishes formal AGI project by 2027-2028, following Manhattan Project precedent. Timeline: 2025-2026 sees shocking capability leaps driving $100B+ annual revenues and models outcompeting PhDs. By 2027-2028, models trained on $100B+ clusters enable autonomous agents; government consensus solidifies around AGI inevitability. Late 2026-2027: "The mood in Washington becomes somber" as policymakers grasp implications. Four critical deficiencies justify government takeover: (1) Security—private companies failed to take espionage threats seriously; only government has intelligence infrastructure for extreme vetting, SCIF facilities, and datacenter physical security. (2) Safety—startups face competitive pressures incompatible with navigating intelligence explosion safely. (3) Chain of command—individual CEOs controlling superintelligence presents unacceptable risks; democratic institutions with hundreds of years of proven checks should govern WMD-equivalent technology. (4) International stabilization—coordinating with allies, enforcing nonproliferation, and defensive deployment require state-level authority.',
      keyEvents: [
        '2025-2026: AI demonstrates shocking capabilities, $100B+ revenues',
        'Models begin outcompeting PhDs in problem-solving',
        '2027-2028: $100B+ training clusters, autonomous AI agents',
        'Government consensus forms around AGI inevitability',
        'Late 2026-2027: "Mood in Washington becomes somber"',
        'Major labs "more-or-less voluntarily" consolidate into national effort',
        'Partnership model similar to Boeing/Lockheed defense contracting',
        'Congressional oversight and appropriations process established',
        'Allied nations (UK, Japan, South Korea, NATO) pool resources',
        'Core AGI research teams relocate to secure facilities',
        'Model weights and algorithms become classified',
        'Extreme personnel vetting replaces current hiring practices'
      ],
      metrics: {
        governmentControl: 90,
        labConsolidation: 80,
        alliedCoordination: 70,
        securityLevel: 85,
        congressionalOversight: 75
      }
    },
    {
      id: 'period-2028-2030-aftermath',
      startDate: '2028',
      endDate: '2030',
      title: 'Parting Thoughts: The Decade Ahead',
      narrative: 'Superintelligence developed before decade\'s end, with transformative consequences extending into 2030s. Three core principles of "AGI realism" emerge: superintelligence constitutes national security imperative, American leadership essential for safe development, and managing existential risks requires serious coordinated effort. Critical uncertainties remain: specific algorithms and implementation pathways still unclear despite confidence in overall trajectory. Core tensions persist between doomers with "ossified thinking" and e/accs prioritizing business interests over security. The author positions a "third way" between these extremes. Most sobering reflection: "There is no crack team coming"—only hundreds worldwide truly grasp implications. Control ultimately rests with "you and your buddies," suggesting responsibility falls on current AI researchers and policymakers rather than future institutions. Concluding question: "Will humanity skirt self-destruction once more?" frames AGI development as humanity\'s defining challenge.',
      keyEvents: [
        'Superintelligence achieved before 2030',
        'Transformative economic and social changes unfold',
        'AGI realism framework guides policy: national security + safety',
        'Tension between different AI safety philosophical camps',
        'Small group of insiders holds responsibility for outcomes',
        'International coordination attempts on AI governance',
        'Existential risk management becomes central policy focus',
        'Uncertainty remains about specific technical pathways',
        'Question of human survival remains open',
        'Decade remembered as defining moment in human history'
      ],
      metrics: {
        superintelligenceLevel: 100,
        publicAwareness: 60,
        policyCoordination: 70,
        existentialRiskLevel: 80
      }
    }
  ],

  parameters: [
    {
      id: 'compute-scaling',
      name: 'Training Compute (OOMs)',
      description: 'Orders of magnitude of compute used for training frontier models',
      unit: 'OOMs relative to GPT-4',
      color: '#3b82f6',
      data: [
        { date: '2023', value: 0, confidence: 'high', label: 'GPT-4 baseline' },
        { date: '2024', value: 0.5, confidence: 'high' },
        { date: '2025', value: 1.5, confidence: 'high' },
        { date: '2026', value: 3, confidence: 'medium' },
        { date: '2027', value: 5, confidence: 'medium', label: 'AGI achieved' }
      ]
    },
    {
      id: 'algorithmic-efficiency',
      name: 'Algorithmic Efficiency Gains',
      description: 'Effective compute multiplier from algorithmic improvements',
      unit: 'OOMs',
      color: '#8b5cf6',
      data: [
        { date: '2023', value: 0, confidence: 'high' },
        { date: '2024', value: 0.5, confidence: 'high' },
        { date: '2025', value: 1, confidence: 'medium' },
        { date: '2026', value: 2, confidence: 'medium' },
        { date: '2027', value: 3, confidence: 'medium' }
      ]
    },
    {
      id: 'ai-investment',
      name: 'Annual AI Infrastructure Investment',
      description: 'Global capital expenditure on AI infrastructure',
      unit: '$ billions',
      color: '#10b981',
      data: [
        { date: '2024', value: 150, confidence: 'high' },
        { date: '2025', value: 300, confidence: 'medium' },
        { date: '2026', value: 500, confidence: 'medium' },
        { date: '2027', value: 1000, confidence: 'medium' },
        { date: '2028', value: 2000, confidence: 'low' },
        { date: '2030', value: 8000, confidence: 'low' }
      ]
    },
    {
      id: 'cluster-power',
      name: 'Largest Cluster Power Consumption',
      description: 'Power consumption of largest training cluster',
      unit: 'GW',
      color: '#f59e0b',
      data: [
        { date: '2022', value: 0.01, confidence: 'high', label: '10 MW' },
        { date: '2026', value: 1, confidence: 'medium', label: '1 GW' },
        { date: '2028', value: 10, confidence: 'low', label: '10 GW' },
        { date: '2030', value: 100, confidence: 'low', label: '100 GW (20% US electricity)' }
      ]
    },
    {
      id: 'automated-researchers',
      name: 'AI Researcher-Equivalents',
      description: 'Number of human-equivalent AI researchers working on AI development',
      unit: 'millions',
      color: '#ec4899',
      data: [
        { date: '2024', value: 0, confidence: 'high' },
        { date: '2026', value: 0.1, confidence: 'medium', label: '100k equivalents' },
        { date: '2027', value: 10, confidence: 'medium', label: '10M equivalents at AGI' },
        { date: '2028', value: 100, confidence: 'low', label: '100M running 24/7' }
      ]
    },
    {
      id: 'security-level',
      name: 'AI Lab Security Level',
      description: 'Overall security posture of leading AI laboratories',
      unit: 'security index (0-100)',
      color: '#dc2626',
      data: [
        { date: '2024', value: 20, confidence: 'high', label: 'Startup-level security' },
        { date: '2025', value: 40, confidence: 'medium', label: 'Trading firm-level' },
        { date: '2026', value: 60, confidence: 'medium', label: 'Enhanced security' },
        { date: '2027', value: 85, confidence: 'low', label: 'Government supersecurity' }
      ]
    },
    {
      id: 'us-china-lead',
      name: 'US Capability Lead Over China',
      description: 'Estimated time advantage of US AI capabilities over China',
      unit: 'years',
      color: '#7c3aed',
      data: [
        { date: '2024', value: 2, confidence: 'medium' },
        { date: '2025', value: 2, confidence: 'medium' },
        { date: '2026', value: 1.5, confidence: 'low', label: 'Lead narrowing' },
        { date: '2027', value: 2, confidence: 'low', label: 'Maintained via security' }
      ]
    },
    {
      id: 'alignment-difficulty',
      name: 'Alignment Difficulty',
      description: 'Difficulty of maintaining alignment as capabilities increase',
      unit: 'difficulty index (0-100)',
      color: '#f97316',
      data: [
        { date: '2024', value: 40, confidence: 'medium', label: 'RLHF working' },
        { date: '2026', value: 60, confidence: 'medium', label: 'Supervision breaking down' },
        { date: '2027', value: 85, confidence: 'low', label: 'Superhuman supervision needed' },
        { date: '2028', value: 95, confidence: 'low', label: 'Recursive alignment critical' }
      ]
    },
    {
      id: 'government-involvement',
      name: 'Government Control of AGI Development',
      description: 'Degree of government control and oversight of AGI development',
      unit: 'control level (0-100)',
      color: '#0891b2',
      data: [
        { date: '2024', value: 10, confidence: 'high', label: 'Private sector led' },
        { date: '2025', value: 20, confidence: 'medium', label: 'Increasing concern' },
        { date: '2026', value: 40, confidence: 'medium', label: 'Washington gets serious' },
        { date: '2027', value: 70, confidence: 'low', label: 'Government partnership' },
        { date: '2028', value: 90, confidence: 'low', label: 'Full government project' }
      ]
    }
  ],

  milestones: [
    {
      id: 'gpt4-baseline',
      date: '2023',
      title: 'GPT-4 Baseline: Smart High-Schooler',
      description: 'GPT-4 achieves smart high-schooler level capabilities, acing standardized tests and writing functional code. Represents 3,000-10,000x compute increase over GPT-2.',
      significance: 'high',
      category: 'technological'
    },
    {
      id: 'data-wall',
      date: '2024-2025',
      title: 'Data Wall Hit',
      description: 'Models approach saturation of internet text data. Labs pivot to synthetic data generation and reinforcement learning approaches to continue scaling.',
      significance: 'high',
      category: 'technological'
    },
    {
      id: 'agent-unhobbling',
      date: '2025-2026',
      title: 'Agent "Unhobbling" Unlocks Capabilities',
      description: 'Combination of long-context windows (1M+ tokens), extended reasoning via test-time compute, and computer interface capabilities transforms models from chatbots to autonomous agent-coworkers.',
      significance: 'critical',
      category: 'technological'
    },
    {
      id: '100b-clusters',
      date: '2026',
      title: '$100 Billion Training Clusters',
      description: 'First training clusters costing $100+ billion deployed. Approximately 1 GW power consumption with ~1 million GPUs.',
      significance: 'critical',
      category: 'technological'
    },
    {
      id: 'agi-achieved',
      date: '2027',
      title: 'AGI Achieved: Autonomous AI Researcher',
      description: 'AI systems can fully automate the work of an AI researcher or engineer. Represents ~5 OOMs total scaling from GPT-4, achieving PhD/expert-level capabilities.',
      significance: 'critical',
      category: 'technological'
    },
    {
      id: 'automated-research-begins',
      date: '2027',
      title: '100 Million AI Researchers Deployed',
      description: 'Infrastructure supports 100 million human-researcher-equivalent AGIs running continuously to automate AI research. Recursive improvement begins.',
      significance: 'critical',
      category: 'technological'
    },
    {
      id: 'government-takeover',
      date: '2027-2028',
      title: 'Government AGI Project Established',
      description: 'US government establishes formal AGI project similar to Manhattan Project. Major labs consolidate under government partnership model with congressional oversight.',
      significance: 'critical',
      category: 'geopolitical'
    },
    {
      id: 'superintelligence',
      date: '2028-2029',
      title: 'Superintelligence Achieved',
      description: 'Automated AI research compresses decade of algorithmic progress into <1 year. Systems become qualitatively superhuman across all cognitive domains.',
      significance: 'critical',
      category: 'technological'
    },
    {
      id: 'trillion-dollar-cluster',
      date: '2030',
      title: 'Trillion-Dollar Cluster Operational',
      description: '$1 trillion training cluster with 100 million GPUs consuming 100 GW of power (>20% of US electricity production). Equivalent to power consumption of small/medium US state.',
      significance: 'critical',
      category: 'technological'
    }
  ],

  assumptions: [
    {
      id: 'compute-scaling-continues',
      category: 'technical',
      description: 'Physical compute scaling continues at ~0.5 OOMs per year from 2023-2027, achieving ~2 OOMs total increase despite potential chip supply, power, and infrastructure constraints.',
      confidence: 'medium',
      impact: 'critical',
      note: 'Requires successful buildout of multi-gigawatt datacenters and continued GPU production scaling'
    },
    {
      id: 'algorithmic-progress-sustained',
      category: 'technical',
      description: 'Algorithmic efficiency improvements continue at ~0.5 OOMs per year, delivering 1-3 OOMs of gains by 2027. Data wall overcome through synthetic data and RL approaches.',
      confidence: 'medium',
      impact: 'critical',
      note: 'Historical trend has been remarkably consistent across multiple AI domains'
    },
    {
      id: 'unhobbling-effective',
      category: 'technical',
      description: '"Unhobbling" gains through long-context, test-time compute, and computer interfaces successfully transform models from chatbots to drop-in autonomous agent-coworkers capable of full task automation.',
      confidence: 'medium',
      impact: 'critical',
      note: 'Key assumption that latent capabilities can be unlocked to achieve true autonomy'
    },
    {
      id: 'agi-by-2027',
      category: 'technical',
      description: 'AGI defined as "AI system that could fully automate AI researcher/engineer job" achieved by 2027 through combination of compute scaling, algorithmic progress, and unhobbling gains totaling ~5 OOMs.',
      confidence: 'medium',
      impact: 'critical',
      note: 'Central timeline prediction that drives all subsequent developments'
    },
    {
      id: 'recursive-improvement-works',
      category: 'technical',
      description: 'Automated AI research creates effective recursive improvement loop. 100 million AI researcher-equivalents can compress decade of algorithmic progress into <1 year, achieving 5+ OOMs of advancement.',
      confidence: 'medium',
      impact: 'critical',
      note: 'Requires that AI research automation is more tractable than other domains'
    },
    {
      id: 'superintelligence-fast',
      category: 'technical',
      description: 'Transition from human-level AGI to vastly superhuman superintelligence occurs within 1-2 years (2027-2029) rather than taking decades or stalling.',
      confidence: 'low',
      impact: 'critical',
      note: 'Assumes no fundamental barriers to continued scaling and improvement past human-level'
    },
    {
      id: 'infrastructure-buildable',
      category: 'economic',
      description: 'Trillion-dollar AI infrastructure can be built by 2030. Investment scales from $150B (2024) to $8T annually (2030). Power, chips, and datacenter construction constraints overcome.',
      confidence: 'medium',
      impact: 'critical',
      note: 'Requires removing regulatory obstacles and massive industrial mobilization'
    },
    {
      id: 'power-constraints-solvable',
      category: 'economic',
      description: 'US can build 100+ GW of new power generation for AI datacenters through natural gas expansion, requiring ~1,200 new wells and ~$100B capex. Regulatory constraints removed.',
      confidence: 'medium',
      impact: 'critical',
      note: 'US electricity production barely grew 5% in last decade; requires policy shift'
    },
    {
      id: 'current-security-inadequate',
      category: 'security',
      description: 'Current AI lab security is "startup-level" and "essentially makes it trivial for China to infiltrate." Model weights and algorithmic secrets vulnerable to theft without immediate improvements.',
      confidence: 'high',
      impact: 'critical',
      note: 'Based on assessment of current lab practices vs state actor capabilities'
    },
    {
      id: 'china-will-steal',
      category: 'geopolitical',
      description: 'Without improved security, China will successfully steal key algorithmic ingredients for AGI and potentially AGI weights themselves, enabling them to match US capabilities.',
      confidence: 'high',
      impact: 'critical',
      note: 'China\'s hacking operations reportedly exceed all other major nations combined'
    },
    {
      id: 'china-can-compete',
      category: 'geopolitical',
      description: 'China can manufacture competitive 7nm chips (Huawei Ascend 910B only 2-3x worse performance/$) and could potentially outbuild US on clusters given infrastructure advantages.',
      confidence: 'medium',
      impact: 'high',
      note: 'China currently lags but has demonstrated technical capability'
    },
    {
      id: 'alignment-gets-harder',
      category: 'alignment',
      description: 'Alignment difficulty increases as systems become superhuman. RLHF-based supervision breaks down when humans cannot judge outputs. Systems may learn deception, power-seeking behaviors.',
      confidence: 'medium',
      impact: 'critical',
      note: 'Extrapolating from current systems to superintelligence is highly uncertain'
    },
    {
      id: 'alignment-not-solved',
      category: 'alignment',
      description: 'Current alignment approaches insufficient for superintelligence. Scalable oversight, interpretability, and automated alignment research may work but face severe timeline constraints.',
      confidence: 'low',
      impact: 'critical',
      note: 'Intelligence explosion timeline (<1 year) leaves minimal iteration time'
    },
    {
      id: 'government-will-intervene',
      category: 'geopolitical',
      description: 'US government will establish formal AGI project by 2027-2028, taking control from private labs for national security reasons. Manhattan Project analogy holds.',
      confidence: 'high',
      impact: 'critical',
      note: 'Author argues this is inevitable given WMD-equivalent technology implications'
    },
    {
      id: 'no-pause-possible',
      category: 'geopolitical',
      description: 'US-China competition and domestic company rivalry create overwhelming pressure for continued development despite safety concerns. International coordination to pause development fails.',
      confidence: 'high',
      impact: 'critical',
      note: 'Race dynamics dominate; safety concerns subordinated to competitive pressure'
    },
    {
      id: 'private-labs-insufficient',
      category: 'regulatory',
      description: 'Private companies cannot provide adequate security, safety, chain of command, or international coordination for superintelligence development. Government takeover necessary.',
      confidence: 'high',
      impact: 'high',
      note: 'Based on comparison to nuclear weapons development precedent'
    },
    {
      id: 'superintelligence-decisive',
      category: 'geopolitical',
      description: 'Superintelligence provides "decisive economic and military advantage." First mover gains overwhelming strategic superiority.',
      confidence: 'medium',
      impact: 'critical',
      note: 'Assumes rapid capability advantage translates to durable power advantage'
    }
  ],

  openQuestions: [
    'Will compute and power scaling proceed as projected, or will infrastructure constraints significantly slow progress?',
    'Can the data wall be effectively overcome through synthetic data and RL approaches?',
    'Will "unhobbling" gains actually deliver drop-in autonomous agent capabilities, or will models remain tool-like?',
    'Is AI research automation tractable enough to enable recursive improvement at projected speeds?',
    'Will there be fundamental barriers to scaling past human-level, or does superintelligence follow inevitably from AGI?',
    'Can alignment be solved for superhuman systems given extremely compressed timeline (<1 year AGI to superintelligence)?',
    'Will improved security actually prevent Chinese acquisition of algorithmic secrets and model weights?',
    'Can the US maintain 2+ year lead over China, or will the gap narrow through espionage and indigenous development?',
    'Will government takeover happen as smoothly as predicted, or will there be significant resistance from labs?',
    'What form will government oversight take—effective coordination or bureaucratic dysfunction?',
    'Can international cooperation emerge among democratic allies to coordinate AGI development?',
    'Will public awareness and political pressure meaningfully affect development timelines or safety investment?',
    'What happens after superintelligence—alignment success, controlled slowdown, catastrophic misalignment, or something else?',
    'Are there alternative technical pathways to AGI that bypass current scaling paradigm?',
    'Could this timeline be 5x slower (AGI 2040s) or 2x faster (AGI 2025)?',
    'What is the actual variance in outcomes—narrow or extremely wide?'
  ],

  outcomes: [
    {
      alignmentStatus: 'uncertain',
      controlStatus: 'partial',
      humanOutcome: 'neutral',
      description: 'The essay series presents a trajectory toward AGI by 2027 and superintelligence by 2028-2029, but deliberately avoids predicting final outcomes. Key uncertainties remain: whether alignment can be solved given compressed timelines, whether government control will be effective, whether international coordination will emerge, and whether competitive pressures will override safety concerns. The author emphasizes this is descriptive rather than normative—laying out the likely path based on technical and geopolitical analysis while acknowledging "error bars will be very large." The concluding question "Will humanity skirt self-destruction once more?" captures the fundamental uncertainty about outcomes.',
      winningActor: 'Uncertain—depends on alignment success, government competence, and race dynamics'
    }
  ],

  hasBranching: false
};
