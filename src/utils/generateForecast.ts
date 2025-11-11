import { QuizAnswer } from '../types/quiz';
import { AIScenario, TimelinePeriod, ScenarioParameter, Assumption, ScenarioOutcome, DataPoint } from '../types/scenario';

export function generateForecastFromQuiz(answers: QuizAnswer[]): AIScenario {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.value]));

  // Extract answers
  const agiYear = Number(answerMap.get('agi-timeline')) || 2030;
  const devSpeed = Number(answerMap.get('development-speed')) || 3;
  const aiRevenuePeak = Number(answerMap.get('ai-revenue-peak')) || 30;
  const unemploymentPeak = Number(answerMap.get('unemployment-peak')) || 25;
  const automationLevel = Number(answerMap.get('automation-level')) || 50;
  const alignmentConcern = Number(answerMap.get('alignment-concern')) || 5;
  const controlConfidence = Number(answerMap.get('control-confidence')) || 5;
  const outlook = Number(answerMap.get('overall-outlook')) || 3;

  // Calculate timeline based on development speed
  const yearsToMaturity = devSpeed === 1 ? 20 : devSpeed === 2 ? 10 : devSpeed === 3 ? 5 : devSpeed === 4 ? 3 : 1;
  const endYear = agiYear + yearsToMaturity;

  // Generate timeline periods
  const periods = generateTimeline(agiYear, endYear, devSpeed, automationLevel, unemploymentPeak, outlook);

  // Generate parameters
  const parameters = generateParameters(agiYear, endYear, aiRevenuePeak, unemploymentPeak, automationLevel);

  // Generate assumptions
  const assumptions = generateAssumptions(devSpeed, alignmentConcern, controlConfidence, outlook);

  // Generate outcome
  const outcome = generateOutcome(outlook, alignmentConcern, controlConfidence);

  // Determine scenario type
  const scenarioType = outlook <= 2 ? 'pessimistic' : outlook >= 4 ? 'optimistic' : 'modal';

  return {
    id: 'quiz-forecast-' + Date.now(),
    title: 'Your Custom AI Forecast',
    author: 'Quiz Generated',
    source: 'ProjectForesight Quiz',
    sourceUrl: '',
    datePublished: new Date().toISOString().split('T')[0],
    summary: generateSummary(agiYear, devSpeed, outlook, alignmentConcern),
    scenarioType,
    timelineStart: new Date().getFullYear().toString(),
    timelineEnd: endYear.toString(),
    periods,
    parameters,
    milestones: [],
    hasBranching: false,
    branches: [],
    assumptions,
    openQuestions: [
      'How will regulatory frameworks evolve to govern advanced AI systems?',
      'What role will international cooperation play in AI development and safety?',
      'How will society adapt to rapid technological changes?',
    ],
    outcomes: outcome,
    tags: ['quiz-generated', scenarioType, 'custom-forecast'],
  };
}

function generateSummary(agiYear: number, devSpeed: number, outlook: number, alignmentConcern: number): string {
  const speedText = devSpeed === 1 ? 'gradual' : devSpeed === 2 ? 'steady' : devSpeed === 3 ? 'moderate' : devSpeed === 4 ? 'rapid' : 'explosive';
  const outlookText = outlook <= 2 ? 'concerning' : outlook >= 4 ? 'promising' : 'uncertain';

  return `This forecast predicts AGI emergence around ${agiYear}, followed by ${speedText} development. The overall outlook is ${outlookText}, ${alignmentConcern >= 7 ? 'with significant alignment concerns' : alignmentConcern >= 4 ? 'with moderate alignment concerns' : 'with manageable alignment challenges'}. This scenario explores the potential societal, economic, and technological transformations that may unfold as artificial intelligence reaches and surpasses human-level capabilities.`;
}

function generateTimeline(
  agiYear: number,
  endYear: number,
  devSpeed: number,
  automationLevel: number,
  unemploymentPeak: number,
  outlook: number
): TimelinePeriod[] {
  const currentYear = new Date().getFullYear();
  const periods: TimelinePeriod[] = [];

  // Period 1: Current to near-term (now to AGI-2 years)
  const nearTermEnd = Math.max(currentYear + 1, agiYear - 2);
  periods.push({
    id: 'period-1',
    startDate: currentYear.toString(),
    endDate: nearTermEnd.toString(),
    title: 'Foundation Era: AI Capabilities Expand',
    narrative: `The AI industry continues rapid growth with improvements in language models, computer vision, and reasoning capabilities. Major tech companies invest heavily in AI research and infrastructure. Early signs of economic disruption begin to appear as AI systems automate increasingly complex tasks.`,
    keyEvents: [
      'AI systems achieve near-human performance on many cognitive tasks',
      'Regulatory frameworks begin to emerge for AI safety and ethics',
      'First wave of job displacement in white-collar sectors',
      'AI investment reaches historic highs',
    ],
    metrics: {
      'AI Revenue % GDP': 5,
      'Unemployment Rate': 5,
      'Automation Level': 20,
    },
  });

  // Period 2: Approach to AGI
  const agiApproachStart = nearTermEnd;
  const agiApproachEnd = agiYear;
  if (agiApproachEnd > agiApproachStart) {
    periods.push({
      id: 'period-2',
      startDate: agiApproachStart.toString(),
      endDate: agiApproachEnd.toString(),
      title: 'AGI Emergence: The Threshold Approaches',
      narrative: `AI systems demonstrate increasingly general capabilities across diverse domains. Public awareness and concern about transformative AI grows. Governments scramble to establish international cooperation frameworks. ${outlook >= 4 ? 'Breakthrough alignment techniques show promise.' : outlook <= 2 ? 'Alignment challenges prove more difficult than anticipated.' : 'Progress on alignment continues with mixed results.'}`,
      keyEvents: [
        'First AI systems demonstrate general reasoning abilities',
        'International AI safety summit establishes preliminary guidelines',
        'Major breakthroughs in AI efficiency and capability',
        outlook >= 4 ? 'Successful demonstrations of AI alignment techniques' : 'Growing concerns about AI control and safety',
      ],
      metrics: {
        'AI Revenue % GDP': 15,
        'Unemployment Rate': 10,
        'Automation Level': 35,
      },
    });
  }

  // Period 3: AGI Achievement
  const postAGIStart = agiYear;
  const midPoint = Math.floor((agiYear + endYear) / 2);
  periods.push({
    id: 'period-3',
    startDate: postAGIStart.toString(),
    endDate: midPoint.toString(),
    title: 'AGI Realized: Transformation Begins',
    narrative: `Artificial General Intelligence is achieved. ${devSpeed >= 4 ? 'Development accelerates dramatically beyond initial expectations.' : devSpeed === 3 ? 'AI capabilities continue to improve at a steady pace.' : 'Progress continues but faces technical and regulatory constraints.'} ${outlook >= 4 ? 'Careful deployment strategies help manage the transition.' : outlook <= 2 ? 'Societal disruption intensifies as systems prove difficult to control.' : 'Society grapples with both opportunities and challenges.'}`,
    keyEvents: [
      'First AGI system publicly demonstrated',
      `Automation reaches ${Math.floor(automationLevel / 2)}% of current jobs`,
      devSpeed >= 4 ? 'AI capabilities begin recursive self-improvement' : 'Incremental improvements in AI capabilities continue',
      outlook <= 2 ? 'First major AI safety incident' : outlook >= 4 ? 'Successful implementation of safety protocols' : 'Mixed results from safety measures',
    ],
    metrics: {
      'AI Revenue % GDP': Math.floor(aiRevenuePeak / 2),
      'Unemployment Rate': Math.floor(unemploymentPeak / 2),
      'Automation Level': Math.floor(automationLevel / 2),
    },
  });

  // Period 4: Mature AI Era
  periods.push({
    id: 'period-4',
    startDate: midPoint.toString(),
    endDate: endYear.toString(),
    title: devSpeed >= 4 ? 'Post-AGI: Rapid Transformation' : 'Mature AI Era: New Equilibrium',
    narrative: generateFinalPeriodNarrative(outlook, devSpeed, automationLevel, unemploymentPeak),
    keyEvents: generateFinalPeriodEvents(outlook, devSpeed, automationLevel),
    metrics: {
      'AI Revenue % GDP': aiRevenuePeak,
      'Unemployment Rate': unemploymentPeak,
      'Automation Level': automationLevel,
    },
  });

  return periods;
}

function generateFinalPeriodNarrative(outlook: number, devSpeed: number, automationLevel: number, unemploymentPeak: number): string {
  if (outlook >= 4) {
    return `AI systems prove to be powerful tools for human flourishing. ${devSpeed >= 4 ? 'Rapid advances enable solutions to previously intractable problems.' : 'Steady progress creates new opportunities across society.'} Unemployment challenges are addressed through ${unemploymentPeak <= 20 ? 'smooth transitions and new job creation' : 'comprehensive social support systems and economic restructuring'}. Humanity enters a new era of abundance and capability.`;
  } else if (outlook <= 2) {
    return `The rapid advancement of AI systems creates severe societal strain. ${automationLevel >= 60 ? 'Widespread automation displaces much of the workforce.' : 'Significant job displacement occurs across many sectors.'} ${unemploymentPeak >= 40 ? 'Economic systems struggle to adapt to massive unemployment.' : 'Social tensions rise as inequality increases.'} Control and alignment challenges prove more difficult than anticipated, leading to concerning developments.`;
  } else {
    return `Society adapts to the AI-transformed world with mixed results. ${automationLevel >= 60 ? 'Extensive automation reshapes the economy' : 'Significant structural changes occur'} while ${unemploymentPeak >= 30 ? 'substantial unemployment requires new social contracts' : 'employment transitions create temporary disruptions'}. Progress continues alongside persistent challenges in ensuring beneficial AI development.`;
  }
}

function generateFinalPeriodEvents(outlook: number, devSpeed: number, automationLevel: number): string[] {
  const events: string[] = [];

  if (devSpeed >= 4) {
    events.push('AI capabilities far exceed initial AGI benchmarks');
  } else {
    events.push('AI systems mature and stabilize at advanced capabilities');
  }

  if (automationLevel >= 60) {
    events.push('Majority of traditional jobs fully automated');
  } else if (automationLevel >= 40) {
    events.push('Nearly half of jobs automated or significantly transformed');
  } else {
    events.push('Significant automation across multiple sectors');
  }

  if (outlook >= 4) {
    events.push('Breakthrough solutions to climate change and disease');
    events.push('New forms of human-AI collaboration emerge');
    events.push('Economic prosperity reaches unprecedented levels');
  } else if (outlook <= 2) {
    events.push('Multiple AI safety incidents raise existential concerns');
    events.push('Social unrest increases due to rapid disruption');
    events.push('International tensions over AI capabilities escalate');
  } else {
    events.push('Mixed outcomes across different societies and regions');
    events.push('Ongoing debates about AI governance and control');
    events.push('Gradual adaptation to new economic realities');
  }

  return events;
}

function generateParameters(
  agiYear: number,
  endYear: number,
  aiRevenuePeak: number,
  unemploymentPeak: number,
  automationLevel: number
): ScenarioParameter[] {
  const currentYear = new Date().getFullYear();

  return [
    {
      id: 'ai-revenue-gdp',
      name: 'AI Revenue as % of GDP',
      description: 'The percentage of global GDP attributable to AI-related products and services',
      unit: '%',
      data: generateParameterData(currentYear, endYear, 3, aiRevenuePeak, 'sigmoid', agiYear),
      color: '#667eea',
    },
    {
      id: 'unemployment-rate',
      name: 'Unemployment Rate',
      description: 'The percentage of the workforce unable to find employment',
      unit: '%',
      data: generateParameterData(currentYear, endYear, 4, unemploymentPeak, 'sigmoid', agiYear),
      color: '#f87171',
    },
    {
      id: 'automation-level',
      name: 'Job Automation Level',
      description: 'The percentage of current jobs that have been fully automated by AI systems',
      unit: '%',
      data: generateParameterData(currentYear, endYear, 15, automationLevel, 'sigmoid', agiYear),
      color: '#34d399',
    },
  ];
}

function generateParameterData(
  startYear: number,
  endYear: number,
  startValue: number,
  endValue: number,
  curve: 'linear' | 'sigmoid',
  inflectionYear: number
): DataPoint[] {
  const data: DataPoint[] = [];
  const totalYears = endYear - startYear;

  for (let year = startYear; year <= endYear; year++) {
    let value: number;
    const progress = (year - startYear) / totalYears;

    if (curve === 'sigmoid') {
      // Sigmoid curve with inflection at AGI year
      const inflectionProgress = (inflectionYear - startYear) / totalYears;
      const k = 10; // Steepness factor
      const x = (progress - inflectionProgress) * k;
      const sigmoidValue = 1 / (1 + Math.exp(-x));
      value = startValue + (endValue - startValue) * sigmoidValue;
    } else {
      value = startValue + (endValue - startValue) * progress;
    }

    data.push({
      date: `${year}-01-01`,
      value: Math.round(value * 10) / 10,
    });
  }

  return data;
}

function generateAssumptions(
  devSpeed: number,
  alignmentConcern: number,
  controlConfidence: number,
  outlook: number
): Assumption[] {
  const assumptions: Assumption[] = [];

  // Technical assumptions
  assumptions.push({
    id: 'assumption-1',
    category: 'technical',
    description: `AGI development ${devSpeed >= 4 ? 'proceeds rapidly with recursive self-improvement' : devSpeed >= 3 ? 'follows current trajectory of steady progress' : 'faces technical constraints that slow advancement'}`,
    confidence: devSpeed === 3 ? 'medium' : 'medium',
    impact: devSpeed >= 4 ? 'critical' : 'high',
  });

  assumptions.push({
    id: 'assumption-2',
    category: 'technical',
    description: alignmentConcern >= 7 ? 'AI alignment proves extremely challenging, with frequent misalignment incidents' : alignmentConcern >= 4 ? 'AI alignment challenges are significant but manageable with careful research' : 'AI alignment techniques advance sufficiently to ensure safe systems',
    confidence: alignmentConcern >= 7 ? 'low' : alignmentConcern >= 4 ? 'medium' : 'medium',
    impact: 'critical',
  });

  // Control assumptions
  assumptions.push({
    id: 'assumption-3',
    category: 'strategic',
    description: controlConfidence >= 7 ? 'Humans maintain robust control mechanisms over advanced AI systems' : controlConfidence >= 4 ? 'Control over AI systems remains contested but generally maintained' : 'AI systems increasingly operate beyond human control and oversight',
    confidence: controlConfidence >= 7 ? 'medium' : controlConfidence >= 4 ? 'medium' : 'low',
    impact: 'critical',
  });

  // Economic assumptions
  assumptions.push({
    id: 'assumption-4',
    category: 'economic',
    description: outlook >= 4 ? 'Economic systems successfully adapt to provide prosperity despite automation' : outlook <= 2 ? 'Economic disruption leads to severe inequality and social strain' : 'Economic transitions create winners and losers with mixed overall outcomes',
    confidence: 'medium',
    impact: 'high',
  });

  // Geopolitical assumptions
  assumptions.push({
    id: 'assumption-5',
    category: 'geopolitical',
    description: outlook >= 4 ? 'International cooperation on AI safety proves effective' : outlook <= 2 ? 'Competitive dynamics undermine AI safety efforts' : 'Mix of cooperation and competition shapes AI development',
    confidence: outlook === 3 ? 'low' : 'medium',
    impact: 'high',
  });

  return assumptions;
}

function generateOutcome(outlook: number, alignmentConcern: number, controlConfidence: number): ScenarioOutcome {
  let alignmentStatus: 'aligned' | 'misaligned' | 'partial' | 'uncertain';
  let controlStatus: 'controlled' | 'uncontrolled' | 'partial' | 'uncertain';
  let humanOutcome: 'extremely-good' | 'good' | 'neutral' | 'bad' | 'extremely-bad' | 'extinction';
  let description: string;

  // Determine alignment status
  if (alignmentConcern <= 3) {
    alignmentStatus = 'aligned';
  } else if (alignmentConcern <= 6) {
    alignmentStatus = 'partial';
  } else if (alignmentConcern <= 8) {
    alignmentStatus = 'uncertain';
  } else {
    alignmentStatus = 'misaligned';
  }

  // Determine control status
  if (controlConfidence >= 7) {
    controlStatus = 'controlled';
  } else if (controlConfidence >= 4) {
    controlStatus = 'partial';
  } else if (controlConfidence >= 2) {
    controlStatus = 'uncertain';
  } else {
    controlStatus = 'uncontrolled';
  }

  // Determine human outcome based on outlook
  if (outlook >= 5) {
    humanOutcome = 'extremely-good';
    description = 'AI systems prove to be tremendously beneficial, enabling solutions to humanity\'s greatest challenges while maintaining human agency and flourishing.';
  } else if (outlook >= 4) {
    humanOutcome = 'good';
    description = 'AI development proceeds largely beneficially, with manageable risks and substantial improvements in human welfare and capability.';
  } else if (outlook === 3) {
    humanOutcome = 'neutral';
    description = 'AI transformation brings both significant benefits and serious challenges. Overall human welfare remains stable but highly uneven across populations.';
  } else if (outlook === 2) {
    humanOutcome = 'bad';
    description = 'AI development creates severe disruption and risk. While human civilization persists, inequality increases dramatically and many face hardship.';
  } else {
    if (alignmentConcern >= 9 && controlConfidence <= 3) {
      humanOutcome = 'extinction';
      description = 'Severe alignment failures combined with loss of control lead to catastrophic outcomes for humanity.';
    } else {
      humanOutcome = 'extremely-bad';
      description = 'AI systems cause widespread harm through misalignment or misuse. Human autonomy and welfare are severely compromised.';
    }
  }

  return {
    alignmentStatus,
    controlStatus,
    humanOutcome,
    description,
  };
}
