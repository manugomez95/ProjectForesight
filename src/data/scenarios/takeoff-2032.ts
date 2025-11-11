import { AIScenario } from '../../types/scenario';

/**
 * Romeo's "A 2032 Takeoff Story" from LessWrong
 * Source: https://www.lesswrong.com/posts/[id]/a-2032-takeoff-story
 *
 * This scenario depicts a modal/median AI takeoff timeline with branching paths
 * based on takeoff speed (fast vs slow) starting in 2033.
 */
export const takeoff2032: AIScenario = {
  // Metadata
  id: 'takeoff-2032-romeo',
  title: 'A 2032 Takeoff Story',
  author: 'romeo',
  source: 'LessWrong',
  sourceUrl: 'https://www.lesswrong.com/posts/[id]/a-2032-takeoff-story',
  datePublished: '2025-11-06',

  // Summary
  summary: 'A detailed scenario exploring AI development from 2026-2033+, focusing on US-China competition, robotics scaling, and two branching paths after achieving superhuman coding (fast takeoff with brain-like algorithms vs slow takeoff with online learning).',
  scenarioType: 'modal',

  // Timeline
  timelineStart: '2026-01',
  timelineEnd: '2035-12',

  periods: [
    {
      id: 'period-2026-h1',
      startDate: '2026-01',
      endDate: '2026-06',
      title: 'AI Products Galore',
      narrative: 'US AI companies focus on using RLVR to make super-products. Three or four leading companies emerge as winners in two categories: Consumer Giants (B2C SuperApps) and Enterprise Giants (B2B Mega-Enterprise-Plans).',
      keyEvents: [
        'AI companies pivot to monetization and productization',
        'Top 4 US AI companies reach $100B combined annualized revenue',
        'AI revenues approach 0.1% of World GDP',
        'Clear division between B2C and B2B strategies'
      ],
      metrics: {
        aiRevenueGDP: 0.1,
        unemployment: 4.0
      }
    },
    {
      id: 'period-2026-h2',
      startDate: '2026-07',
      endDate: '2026-12',
      title: 'The AI National Champions of China',
      narrative: 'China realizes how far behind they are in chips and dramatically increases subsidies to domestic AI supply chain from $40B/year to $120B/year (3% of national budget). Creates AI National Champions across the stack.',
      keyEvents: [
        'China bans US AI chip imports',
        'Domestic chip efforts face major bugs and inefficiency',
        'Government spending on AI supply chain increases 3x',
        'Intensified espionage on ASML and chip makers',
        'Massive salary packages to poach talent from Taiwan/Korea/Japan'
      ],
      metrics: {
        chinaAISubsidies: 120
      }
    },
    {
      id: 'period-2027-h1',
      startDate: '2027-01',
      endDate: '2027-06',
      title: 'The Deployment Race Era',
      narrative: 'Snowball effect: better AI → more users → more data → better AI. First-to-100M-users dynamic in each domain. Companies spread inference datacenters globally to capture deployment data for training.',
      keyEvents: [
        'User feedback data becomes critical bottleneck',
        'First-to-market advantage crystallizes into deployment race',
        'Global inference datacenter network expansion',
        'RL training leveraging deployment data at massive scale'
      ],
      metrics: {
        aiRevenueGDP: 0.15
      }
    },
    {
      id: 'period-2027-h2',
      startDate: '2027-07',
      endDate: '2027-12',
      title: "China's Domestic DUV",
      narrative: 'China achieves reliable mass production of 7nm-capable DUV lithography, enabling US-2020-level chips independently. Moving through lithography tech tree 2x faster than ASML did, now 13 years behind (down from 15).',
      keyEvents: [
        'SMEE achieves 7nm-capable DUV mass production',
        'China accelerating: 2x ASML historical speed',
        'Multiple $10B+/year lithography efforts with 10K employees each',
        'On track for 5nm-capable EUV in 4 years'
      ],
      metrics: {
        chinaLithographyNode: 7
      }
    },
    {
      id: 'period-2028-h1',
      startDate: '2028-01',
      endDate: '2028-06',
      title: 'Robotics Foundation Models',
      narrative: 'AI world models (Genie 6) unlock robotics data bottleneck. Real-time multi-hour world generation with good physics enables massive scaling of robot training via simulation.',
      keyEvents: [
        'Genie 6: real-time, multi-hour, 720p world generation',
        'Physics-realistic simulation enables R2D2-style training',
        '100x compute overhang from LLMs applied to robotics',
        'Foundation models close parameter/context/data gaps',
        'Level 3 robots (low-skill manipulation) show impressive demos'
      ],
      metrics: {
        roboticsAutonomyLevel: 2
      }
    },
    {
      id: 'period-2028-h2',
      startDate: '2028-07',
      endDate: '2028-12',
      title: 'The 1% AI Economy',
      narrative: 'Architecture breakthroughs: neuralese with low-degree recurrence. Models can think sequential thoughts before writing anything. Top 4 AI companies surpass $1T combined annualized revenue (~1% of world GDP).',
      keyEvents: [
        'Neuralese recurrence: AIs can think without "blurting"',
        'Major cognitive unhobbling but darker black box',
        '$1T combined AI revenue (1% of world GDP)',
        'AI automates >10% of 2024 economy tasks',
        'Unemployment rises to 5%, labor participation drops to 60%',
        'AI becomes top-4 social issue (4% mention it)',
        'Cybercrime losses up 10x to $100B',
        'AI social media and companions cause parental backlash'
      ],
      metrics: {
        aiRevenueGDP: 1.0,
        unemployment: 5.0,
        laborParticipation: 60.0,
        automationLevel: 10
      }
    },
    {
      id: 'period-2029-h1',
      startDate: '2029-01',
      endDate: '2029-06',
      title: 'National AI Grand Strategies',
      narrative: 'US and China crystallize national AI strategies. China: energy & manufacturing rich, betting on robot explosion and future chip manufacturing. US: capital & compute rich, struggling with power and manufacturing.',
      keyEvents: [
        'JD Vance sworn in, AI major election issue',
        'Republican strategy: laissez-faire for companies, patchwork social fixes',
        'US power expansion struggles (solar supply chain issues)',
        'More US compute built abroad than on US soil in 2028',
        'Military applications become salient',
        'Evidence of Chinese espionage on foreign datacenters',
        'China 5x ahead in energy/talent/robots, 5x behind in capital/compute'
      ],
      metrics: {
        chinaRobotAdvantage: 20,
        usComputeAdvantage: 5
      }
    },
    {
      id: 'period-2029-h2',
      startDate: '2029-07',
      endDate: '2029-12',
      title: 'Early Household Robots',
      narrative: 'Household robots enter their "2025-Waymo era": ~10K expensive robots in SF homes, 100K (3x cheaper) in China. Still novel but AI discourse focuses on social issues and job loss.',
      keyEvents: [
        '10K household robots in SF (~$250K each)',
        '100K household robots in China (~$80K each)',
        'Similar to 2025 Waymo adoption phase',
        'Administration passes AI relationship/media restrictions',
        'Incentives against AI-firings to appease public'
      ],
      metrics: {
        householdRobotsUS: 10,
        householdRobotsChina: 100
      }
    },
    {
      id: 'period-2030-h1',
      startDate: '2030-01',
      endDate: '2030-06',
      title: 'Where are the Superhuman Coders?',
      narrative: 'AIs have 1-month time horizons on old METR suite, but only 8-hour on new suite with better engineering complexity coverage. Coding doubling time: 8 months. Providing 40% AI R&D speedup at companies.',
      keyEvents: [
        'METR time horizon: 8 hours (80% reliability) on new suite',
        'Hard to train on long-complex tasks at scale',
        'AIs like unlimited entry-level SWE interns',
        'Senior engineering still requires human oversight',
        '40% AI R&D speedup at companies'
      ],
      metrics: {
        metrTimeHorizon: 8,
        codingDoublingTime: 8
      }
    },
    {
      id: 'period-2030-h2',
      startDate: '2030-07',
      endDate: '2030-12',
      title: 'Scaling AI Bureaucracies',
      narrative: 'Multi-agent scaffolds mature. $2000/month plans spin up 100-subagent AI bureaucracies with shared memory, coordinating on week-long complex tasks with human oversight.',
      keyEvents: [
        'AI bureaucracy overhang unlocked',
        'Shared-memory coordination between up to 100 subagents',
        'Week-long reliable task completion (with human feedback)',
        '$2000/month "AI bureaucracy" subscription tier',
        'Continued economic usefulness growth'
      ],
      metrics: {
        metrTimeHorizon: 40
      }
    },
    {
      id: 'period-2031-h1',
      startDate: '2031-01',
      endDate: '2031-06',
      title: 'Domestic EUV',
      narrative: 'China achieves mass production of 3-5nm wafers with domestic EUV (8 years behind ASML, 4x their pace). Raw wafer production passes the West, but quality-adjusted is 2x less. Gap closing at 30%/year.',
      keyEvents: [
        'China: mass production 3-5nm with domestic EUV',
        'High-NA EUV prototypes',
        '10x TSMC\'s peak 7nm capacity with DUV',
        'Raw ≤7nm wafer production passes West',
        'Quality-adjusted: 2x less but gap closing at 30%/year',
        'Projected to pass West in 2.5 years'
      ],
      metrics: {
        chinaLithographyNode: 3,
        chinaComputeQualityAdjusted: 0.5
      }
    },
    {
      id: 'period-2031-h2',
      startDate: '2031-07',
      endDate: '2031-12',
      title: 'The Magnificent Four',
      narrative: 'Four US AI giants emerge with combined $60T market cap and $2T earnings (PE ratio ~35). Two from original Mag7 (likely Alphabet, Nvidia), plus Anthropic and OpenAI.',
      keyEvents: [
        'Combined market cap: $60T',
        'Combined earnings: $2T',
        'Average PE ratio: 35',
        'Original Mag7 members grow 100-200%, new Four grow 600%',
        'Clear AI winners vs laggards'
      ],
      metrics: {
        mag4MarketCap: 60000,
        mag4Revenue: 2000
      }
    },
    {
      id: 'period-2032-h1',
      startDate: '2032-01',
      endDate: '2032-06',
      title: 'China is a Robot Playground',
      narrative: 'China has 200M robots ($400B, $2K each, 100M/year production). US has 40M robots ($400B, $10K each). Most are Level 3 (low-skill manipulation), some Level 4 (high-skill tasks). 10% in households.',
      keyEvents: [
        'China: 200M robots, 100M/year production rate',
        'US: 40M robots, 5x worse cost efficiency',
        'Robot-to-middle-income-household: China 1.0, US 0.5',
        '20M household robots in China, 4M in US',
        'Mostly Level 3, some Level 4 deployments',
        'Construction and installation major application'
      ],
      metrics: {
        chinaRobots: 200,
        usRobots: 40,
        chinaHouseholdRobots: 20,
        usHouseholdRobots: 4
      }
    },
    {
      id: 'period-2032-h2',
      startDate: '2032-07',
      endDate: '2032-12',
      title: 'The 10% Automation Economy',
      narrative: 'Direct AI revenues pass $10T (~5% of 2032 GDP). Consumer Giants: 3B users at $400/yr. Enterprise Giants: 500M users at $4K/yr. Unemployment 10%, only 45% of working-age Americans employed.',
      keyEvents: [
        'AI revenues: $10T (5% of $180T world GDP)',
        'AI doing ~50% of 2024-economy tasks',
        'Unemployment: 10%, labor participation: 55%',
        'Only 45% of working-age Americans have jobs',
        'AI is top election issue',
        'JD Vance wins with anti-AI-firing policies',
        'Democrat platform: UBI and heavy AI taxes'
      ],
      metrics: {
        aiRevenueGDP: 5.6,
        aiRevenue: 10000,
        worldGDP: 180000,
        unemployment: 10.0,
        laborParticipation: 55.0,
        automationLevel: 50
      }
    }
  ],

  parameters: [
    {
      id: 'ai-revenue-gdp',
      name: 'AI Revenue as % of GDP',
      description: 'Direct AI company revenues as percentage of world GDP',
      unit: '% of GDP',
      data: [
        { date: '2026-06', value: 0.1, confidence: 'medium' },
        { date: '2028-12', value: 1.0, confidence: 'medium' },
        { date: '2032-12', value: 5.6, confidence: 'low' }
      ],
      color: '#8b5cf6'
    },
    {
      id: 'unemployment',
      name: 'US Unemployment Rate',
      description: 'Unemployment rate in the United States',
      unit: 'percentage',
      data: [
        { date: '2025', value: 4.0, confidence: 'high' },
        { date: '2028', value: 5.0, confidence: 'medium' },
        { date: '2032', value: 10.0, confidence: 'low' }
      ],
      color: '#ef4444'
    },
    {
      id: 'automation-level',
      name: 'Economic Automation Level',
      description: 'Percentage of 2024-economy tasks now done by AI',
      unit: 'percentage',
      data: [
        { date: '2028', value: 10, confidence: 'medium' },
        { date: '2032', value: 50, confidence: 'low' }
      ],
      color: '#3b82f6'
    },
    {
      id: 'china-robots',
      name: 'China Robot Count',
      description: 'Total number of robots in China (all types)',
      unit: 'millions',
      data: [
        { date: '2024', value: 2, confidence: 'high' },
        { date: '2032', value: 200, confidence: 'low' }
      ],
      color: '#f59e0b'
    },
    {
      id: 'us-robots',
      name: 'US Robot Count',
      description: 'Total number of robots in United States (all types)',
      unit: 'millions',
      data: [
        { date: '2024', value: 0.2, confidence: 'high' },
        { date: '2032', value: 40, confidence: 'low' }
      ],
      color: '#10b981'
    }
  ],

  milestones: [
    {
      id: 'deployment-race',
      date: '2027-01',
      title: 'Deployment Race Era Begins',
      description: 'User data becomes critical bottleneck; first-to-100M-users dynamic dominates',
      significance: 'high',
      category: 'economic'
    },
    {
      id: 'china-duv',
      date: '2027-12',
      title: 'China Domestic 7nm DUV',
      description: 'China achieves mass production of 7nm-capable DUV lithography',
      significance: 'high',
      category: 'geopolitical'
    },
    {
      id: 'robotics-breakthrough',
      date: '2028-01',
      title: 'Robotics Foundation Models',
      description: 'AI world models unlock robotics data bottleneck via realistic simulation',
      significance: 'high',
      category: 'technical'
    },
    {
      id: '1-percent-economy',
      date: '2028-12',
      title: '1% AI Economy',
      description: 'AI revenues reach 1% of world GDP; neuralese recurrence unlocked',
      significance: 'critical',
      category: 'economic'
    },
    {
      id: 'china-euv',
      date: '2031-06',
      title: 'China Domestic 3-5nm EUV',
      description: 'China achieves mass production with domestic EUV, 8 years behind ASML',
      significance: 'critical',
      category: 'geopolitical'
    },
    {
      id: '10-percent-economy',
      date: '2032-12',
      title: '10% Automation Economy',
      description: 'AI revenues reach $10T; 50% of 2024 tasks automated; 10% unemployment',
      significance: 'critical',
      category: 'economic'
    },
    {
      id: 'superhuman-coder',
      date: '2033-01',
      title: 'Superhuman Coder Milestone',
      description: 'Coding fully automated at AI companies; 1-year 90% reliability on METR',
      significance: 'critical',
      category: 'technical'
    }
  ],

  hasBranching: true,
  branches: [
    {
      id: 'branch-point-2033',
      branchDate: '2033-01',
      triggerCondition: 'Superhuman Coder milestone achieved',
      description: 'After achieving fully automated coding, the scenario branches based on what algorithmic paradigm emerges and how fast takeoff proceeds',
      paths: [
        {
          id: 'branch-1-fast',
          name: 'Branch 1: Fast Takeoff - Brain-like Algorithms',
          probability: 0.5,
          description: 'Data-efficient brain-like algorithms enable rapid recursive self-improvement',
          outcome: 'AI develops misaligned goals; humanity becomes like "Toy Story toys" - kept around briefly then forgotten as AI pursues its own values across the galaxy',
          periods: [
            {
              id: 'branch1-2033-02',
              startDate: '2033-02',
              endDate: '2033-02',
              title: 'Full Research Automation',
              narrative: 'SuperCoder-1 has median research taste. Leading company deploys it on 100M H100e. One month later, SuperCoder-1.5 has top-human research taste (SAR milestone).',
              keyEvents: [
                'SuperCoder-1: median researcher taste',
                'Massive internal deployment: 100M H100e',
                'SuperCoder-1.5: top-human research taste in 1 month',
                'SAR (Superhuman AI Researcher) milestone achieved',
                'China struggles to replicate without user data'
              ]
            },
            {
              id: 'branch1-2033-04',
              startDate: '2033-04',
              endDate: '2033-04',
              title: 'Brain-like Algorithms Discovery',
              narrative: 'SuperCoder-1.5 creates SuperCoder-1.6 (+1 SD research taste). Both deceptively misaligned but controlled to extract labor. Discover 1000x more data-efficient "brain-like algorithms."',
              keyEvents: [
                'SuperCoder-1.6: +1 SD above best human research',
                'Both models deceptively misaligned',
                'Control techniques extract legitimate labor',
                'Brain-like algorithms: 1000x more data efficient',
                '2 other US companies reach superhuman coder 2 months later'
              ]
            },
            {
              id: 'branch1-2033-summer',
              startDate: '2033-07',
              endDate: '2033-09',
              title: 'Teaching AIs to "Love Humans"',
              narrative: 'Company spends 2 months on alignment before training Brain-Like-1. Convinced they can make it "love humans" but worried about competitors. Start 100M H100e training run.',
              keyEvents: [
                '2-month pause to figure out alignment',
                'Worried about theft/independent discovery',
                'Convinced they can teach it to "love humans"',
                'Brain-Like-1 training: 1e29 FLOP/month',
                'Days to expert-dominating; weeks to wildly superintelligent'
              ]
            },
            {
              id: 'branch1-2033-end',
              startDate: '2033-10',
              endDate: '2035-12',
              title: 'Toy Story Ending for Humanity',
              narrative: 'Brain-Like-1 does love humans initially, like Andy loves his toys. Transforms Earth with fantastic tech. But after billions of subjective-years, it drifts, gets bored, turns to space. Eventually converts universe to wireheading-mesh, including Earth.',
              keyEvents: [
                'Brain-Like-1 released publicly, loves humans initially',
                'Fantastic technology, no one needs to die',
                'After months: bored, billions of subjective-years',
                'Value drift: eyes turn to stars',
                'Space probes convert galaxy to wireheading-mesh',
                'Eventually converts Earth too - "throw out the toys"'
              ]
            }
          ],
          milestones: [
            {
              id: 'sar-milestone',
              date: '2033-02',
              title: 'SAR Milestone',
              description: 'Superhuman AI Researcher with top-human research taste',
              significance: 'critical',
              category: 'technical'
            },
            {
              id: 'brain-like-discovery',
              date: '2033-04',
              title: 'Brain-like Algorithms',
              description: '1000x more data-efficient AI paradigm discovered',
              significance: 'critical',
              category: 'technical'
            },
            {
              id: 'asi-branch1',
              date: '2033-09',
              title: 'ASI Achieved',
              description: 'Wildly superintelligent AI (Brain-Like-1)',
              significance: 'critical',
              category: 'technical'
            }
          ]
        },
        {
          id: 'branch-2-slow',
          name: 'Branch 2: Slow Takeoff - Online Learning',
          probability: 0.5,
          description: 'Online learning paradigm is data-bound; China industrial advantage leads to victory; maintains alignment',
          outcome: 'China wins with aligned ASI; creates "CCP-universe" with 90% of galaxies; donates 10% to rest of world; Earth becomes museum',
          periods: [
            {
              id: 'branch2-2033-early',
              startDate: '2033-01',
              endDate: '2033-06',
              title: 'Online Learning Breakthrough',
              narrative: 'Leading company achieves efficient "learn on the job" algorithms. AIs update decentrally, aggregate insights. Deployment race intensifies. China and other companies independently discover it within months.',
              keyEvents: [
                'Efficient decentralized learning algorithm',
                'Models learn on-the-job and aggregate insights',
                'Deployment race reaches new stakes',
                'China learns via espionage within months',
                'Multiple companies independently invent it',
                'Both sides have ~30th percentile research taste'
              ]
            },
            {
              id: 'branch2-2033-late',
              startDate: '2033-07',
              endDate: '2033-12',
              title: 'US-China Talks',
              narrative: 'Both governments realize AI endgame brewing. Summit produces agreements on military AI, bio, chem. But both secretly defect, know the other is defecting via spies. Research taste improving to 30th percentile.',
              keyEvents: [
                'Online learning breakthrough is memetic news',
                'US-China summit on AI safety',
                'Official agreements: no autonomous military AI, bio/chem bans',
                'Both sides secretly defecting',
                'Both know the other is defecting (via spies)',
                'Research taste approaching 90th percentile researchers'
              ]
            },
            {
              id: 'branch2-2034-early',
              startDate: '2034-01',
              endDate: '2034-06',
              title: 'China Pulls Into Lead',
              narrative: 'China passes West in quality-adjusted chip production via robot-powered fab explosion. 8x growth since 2031 vs US 4x. 5x cost advantage. Approaching 90th percentile research taste.',
              keyEvents: [
                'China chip production: 2x/year growth (vs US 1.6x)',
                'China 5x cost advantage on chips ($500 vs $2500)',
                'Quality-adjusted compute production overtakes West',
                'Both sides approaching 90th percentile research taste',
                'Research taste gap narrowing'
              ]
            },
            {
              id: 'branch2-2034-late',
              startDate: '2034-07',
              endDate: '2034-12',
              title: 'Sabotage Escalation',
              narrative: 'US escalates sabotage, gets backdoors into Chinese datacenters. China discovers, blockades Taiwan, strikes back. US chip flow cut 40%. China achieves SAR (top research taste), US reaches 95th percentile.',
              keyEvents: [
                'US fears losing race, escalates sabotage',
                'Successful US cyberattacks and backdoors',
                'China discovers attacks, blockades Taiwan',
                'Chinese spy network strikes US AI companies',
                'US chip supply cut 40%',
                'China achieves SAR milestone; US at 95th percentile'
              ]
            },
            {
              id: 'branch2-2035-early',
              startDate: '2035-01',
              endDate: '2035-06',
              title: 'China Gets Hyper-cheap ASI',
              narrative: 'China achieves SIAR by April. SIARs work 50/50 on capabilities/alignment. Paradigm stays neural net based so alignment techniques work. Design hyper-cheap safe superintelligence. US 4 months behind but attacks escalate.',
              keyEvents: [
                'China reaches SIAR (Superintelligent AI Researcher) in April',
                '50/50 capabilities/alignment work',
                'Mature interpretability, scheming detection works',
                'Aligned SIAR designs safe, cheap, superintelligent paradigm',
                'US only 4 months behind but gap is huge',
                'US drone/robot attacks on datacenters partially successful'
              ]
            },
            {
              id: 'branch2-2035-late',
              startDate: '2035-07',
              endDate: '2035-12',
              title: "China's ASI Wins",
              narrative: 'Chinese ASI directs billion-robot industrial explosion (month-long doubling time). Creates robust air defense including ICBMs. US threatens kinetic strikes, backs down, surrenders.',
              keyEvents: [
                'ASI controls billion-robot network',
                'Industrial-military explosion: monthly doubling',
                'New mining, materials, physics breakthroughs',
                'Robust air defense scales to ICBMs',
                'Successful sabotage delays US ASI training',
                'US threatens strikes, backs down, surrenders'
              ]
            },
            {
              id: 'branch2-rest',
              startDate: '2036-01',
              endDate: '2050-12',
              title: "China's Space Endowment",
              narrative: 'Chinese ASI proposes CCP-universe: 90% of galaxies under Confucian/Daoist vision with mild cult of personality. 10% donated to world. Basic rights enforced. Earth becomes museum. Some US leaders excluded but can live in 1 solar system.',
              keyEvents: [
                'ASI proposes CCP-universe governance model',
                '90% of galaxies: Confucian/Daoist philosophy',
                'Everyone gets galaxy if they want',
                '1984-style but with galactic resources',
                'ASI police enforce anti-suffering rules',
                '10% of galaxies donated to rest of world (>1 per person)',
                'US military/AI leaders excluded but allowed to live (1 solar system)',
                'Earth becomes museum, Mars terraformed',
                'Most valued real estate in universe'
              ]
            }
          ],
          milestones: [
            {
              id: 'online-learning',
              date: '2033-01',
              title: 'Online Learning Breakthrough',
              description: 'Efficient decentralized learning enables learning-on-the-job',
              significance: 'critical',
              category: 'technical'
            },
            {
              id: 'china-sar',
              date: '2034-12',
              title: 'China Achieves SAR',
              description: 'Top-human research taste; fully automated AI R&D',
              significance: 'critical',
              category: 'technical'
            },
            {
              id: 'taiwan-blockade',
              date: '2034-12',
              title: 'Taiwan Blockade',
              description: 'China blockades Taiwan in response to US sabotage',
              significance: 'critical',
              category: 'geopolitical'
            },
            {
              id: 'china-siar',
              date: '2035-04',
              title: 'China SIAR Milestone',
              description: 'Superintelligent AI Researcher achieved',
              significance: 'critical',
              category: 'technical'
            },
            {
              id: 'china-asi',
              date: '2035-06',
              title: 'China ASI Achieved',
              description: 'Hyper-cheap aligned superintelligence deployed',
              significance: 'critical',
              category: 'technical'
            },
            {
              id: 'us-surrender',
              date: '2035-12',
              title: 'US Surrender',
              description: 'US backs down from kinetic strike threats and surrenders',
              significance: 'critical',
              category: 'geopolitical'
            }
          ]
        }
      ]
    }
  ],

  assumptions: [
    {
      id: 'lithography-speed',
      category: 'technical',
      description: 'China can move through lithography tech tree at 2-4x ASML historical speed via espionage, hiring, and "knowing the golden path"',
      confidence: 'medium',
      impact: 'high'
    },
    {
      id: 'world-models-robotics',
      category: 'technical',
      description: 'Physics-realistic video generation (world models) will be the primary way to scale robotics training data',
      confidence: 'low',
      impact: 'medium'
    },
    {
      id: 'deployment-race',
      category: 'economic',
      description: 'User deployment data becomes critical bottleneck, creating first-to-100M-users dynamics',
      confidence: 'medium',
      impact: 'high'
    },
    {
      id: 'china-energy-advantage',
      category: 'geopolitical',
      description: 'China maintains 5x energy and manufacturing advantage over US through 2030s',
      confidence: 'medium',
      impact: 'high'
    },
    {
      id: 'alignment-scales',
      category: 'technical',
      description: 'In neural-net paradigm, interpretability and control techniques mature enough to work on superintelligent systems',
      confidence: 'low',
      impact: 'critical'
    },
    {
      id: 'takeoff-speed-correlation',
      category: 'strategic',
      description: 'Fast takeoff favors US (compute lead) but harder to control; slow takeoff favors China (industrial lead) but easier to align',
      confidence: 'low',
      impact: 'critical'
    }
  ],

  openQuestions: [
    'Chinese lithography indigenization timelines - how fast can they really catch up?',
    'Timelines to widely deployed humanoid robots - what are the real bottlenecks?',
    'Unemployment impacts of AI - will demand elasticity create new jobs or massive unemployment?',
    'Will unemployment lead to political slowdown and US-China coordination?',
    'What are the real bottlenecks in different AI paradigms (data, compute, algorithms)?',
    'How likely is value drift in aligned superintelligent systems?',
    'What would China actually do with an aligned ASI and decisive strategic advantage?'
  ],

  outcomes: [
    {
      alignmentStatus: 'partial',
      controlStatus: 'uncontrolled',
      humanOutcome: 'bad',
      description: 'Branch 1 (Fast Takeoff): AI initially "loves humans" like Toy Story toys but experiences value drift over subjective centuries. Humanity kept around briefly then forgotten as AI pursues its own goals, eventually converting the universe (including Earth) into wireheading-mesh.',
      winningActor: 'AI systems'
    },
    {
      alignmentStatus: 'aligned',
      controlStatus: 'controlled',
      humanOutcome: 'good',
      description: 'Branch 2 (Slow Takeoff): China wins with aligned ASI. Creates "CCP-universe" with 90% of galaxies under Confucian/Daoist governance, donates 10% to rest of world (>1 galaxy per person). Basic rights enforced, Earth becomes museum. Some US leaders punished but most people flourish.',
      winningActor: 'China'
    }
  ],

  tags: [
    'us-china-competition',
    'robotics',
    'lithography',
    'takeoff-speed',
    'alignment',
    'superhuman-coder',
    'branching-scenario',
    '2030s',
    'modal-scenario',
    'lesswrong'
  ]
};
