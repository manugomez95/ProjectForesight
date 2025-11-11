# ProjectForesight

> An interactive platform for comparing, analyzing, and exploring AI development scenarios

ProjectForesight is a web application designed to help researchers, strategists, and stakeholders **compare different AI future scenarios** and extract insights about common parameters, metrics, and milestones. The goal is to enable scenario analysis, combination, and comparative exploration to better understand potential AI development trajectories.

## Vision

ProjectForesight aims to:

- **Compare scenarios** side-by-side to identify divergence points and common patterns
- **Extract common parameters** across multiple forecasts (GDP impact, automation levels, deployment timelines)
- **Identify shared milestones** that appear across different scenarios
- **Combine scenarios** to create hybrid forecasts based on different assumptions
- **Analyze trends** in parameters and outcomes across the scenario landscape
- **Explore branching paths** to understand how different decisions lead to different outcomes

## Current Features

### Scenario Visualization

- **Timeline View**: Interactive chronological exploration with expandable periods
- **Parameters View**: Track quantitative metrics over time with interactive charts
- **Assumptions View**: Review key assumptions with confidence and impact ratings
- **Outcomes View**: Examine final scenario outcomes and alignment status

### Branching Scenarios

- Explore decision points where scenarios diverge into multiple paths
- Compare probability-weighted outcomes
- Navigate between different futures based on trigger conditions

### Data-Driven Insights

- Chart multiple parameters simultaneously (AI Revenue, Unemployment, Automation Levels, Robot Counts)
- Track milestones by significance level (CRITICAL, HIGH, MEDIUM, LOW)
- View metrics snapshots at each timeline period
- Export and analyze scenario data

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/manugomez95/ProjectForesight.git
cd ProjectForesight

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## Technology Stack

- **React 19** with TypeScript for the UI
- **Vite** for fast development and building
- **Recharts** for data visualization
- **Framer Motion** for smooth animations
- **D3** for advanced visualizations

## Project Structure

```
ProjectForesight/
├── src/
│   ├── components/          # React components
│   │   ├── ScenarioSelector.tsx
│   │   ├── ScenarioViewer.tsx
│   │   ├── TimelineView.tsx
│   │   ├── BranchingView.tsx
│   │   ├── ScenarioParameterChart.tsx
│   │   └── ...
│   ├── data/
│   │   └── scenarios/       # Scenario definitions
│   │       ├── index.ts     # Registry and utility functions
│   │       └── *.ts         # Individual scenario files
│   ├── types/
│   │   └── scenario.ts      # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
└── index.html              # HTML template
```

## Working with Scenarios

### Scenario Structure

Each scenario in ProjectForesight follows a standardized schema:

```typescript
interface AIScenario {
  // Metadata
  id: string;
  title: string;
  author: string;
  source: string;

  // Timeline
  timelineStart: string;
  timelineEnd: string;
  periods: TimelinePeriod[];

  // Quantitative Tracking
  parameters: ScenarioParameter[];  // GDP %, unemployment, automation levels
  milestones: Milestone[];          // Key events with dates and significance

  // Branching Logic
  hasBranching: boolean;
  branches?: Branch[];

  // Context
  assumptions: Assumption[];
  openQuestions?: string[];

  // Results
  outcomes: ScenarioOutcome | ScenarioOutcome[];

  // Organization
  tags: string[];
  scenarioType: 'optimistic' | 'pessimistic' | 'modal' | 'median' | 'worst-case' | 'best-case';
}
```

### Adding a New Scenario

1. Create a new TypeScript file in `src/data/scenarios/`
2. Define your scenario following the `AIScenario` interface
3. Import and add it to the scenarios array in `src/data/scenarios/index.ts`

Example:

```typescript
import type { AIScenario } from '../../types/scenario';

export const myScenario: AIScenario = {
  id: 'my-scenario-2025',
  title: 'My AI Future Scenario',
  author: 'Your Name',
  source: 'Research Paper',
  timelineStart: '2025',
  timelineEnd: '2035',
  periods: [
    {
      startDate: '2025-01',
      endDate: '2026-01',
      title: 'Early AI Adoption',
      narrative: 'Description of what happens...',
      keyEvents: ['Event 1', 'Event 2'],
      metricsSnapshot: {
        'ai-gdp': 0.5,
        'unemployment': 4.2
      }
    }
  ],
  parameters: [
    {
      id: 'ai-gdp',
      name: 'AI Revenue as % of GDP',
      unit: '% of GDP',
      color: '#8b5cf6',
      dataPoints: [
        { date: '2025-01', value: 0.2, confidenceLevel: 'medium' }
      ]
    }
  ],
  milestones: [
    {
      date: '2026-06',
      title: 'First Major Milestone',
      description: 'Description...',
      significanceLevel: 'high',
      category: 'technological'
    }
  ],
  assumptions: [],
  outcomes: {
    alignmentStatus: 'aligned',
    humanOutcome: 'positive',
    controlStatus: 'maintained'
  },
  tags: ['ai', 'economics'],
  scenarioType: 'modal',
  hasBranching: false
};
```

### Utility Functions

The scenarios registry provides helper functions:

```typescript
import { getScenarioById, getScenariosByTag, getScenariosByType } from './data/scenarios';

// Get a specific scenario
const scenario = getScenarioById('2032-takeoff-story');

// Filter by tags
const economicScenarios = getScenariosByTag('economics');

// Filter by type
const optimisticScenarios = getScenariosByType('optimistic');
```

## Common Parameters & Metrics

ProjectForesight tracks these common parameters across scenarios:

### Economic Indicators
- **AI Revenue as % of GDP**: Market penetration and economic impact
- **Unemployment Rate**: Labor market disruption
- **Economic Automation Level**: Percentage of tasks automated

### Technological Progress
- **Robot Deployment Counts**: Physical automation scale
- **Compute Capabilities**: Training and inference capacity
- **Research Automation**: Level of automated R&D

### Strategic Metrics
- **Lithography Advancement**: Chip manufacturing capabilities
- **Geopolitical Positioning**: Regional AI leadership
- **Alignment Progress**: Safety and control measures

## Roadmap & Future Features

### Scenario Comparison (Planned)
- Side-by-side timeline comparison
- Parameter overlay charts across multiple scenarios
- Divergence point identification
- Common milestone extraction

### Scenario Synthesis (Planned)
- Combine parameters from different scenarios
- Create hybrid forecasts with mixed assumptions
- Merge branching paths from multiple sources
- Generate consensus timelines

### Advanced Analysis (Planned)
- Statistical analysis of parameter distributions
- Sensitivity analysis for key assumptions
- Outcome clustering and pattern recognition
- Export scenario data for external analysis

### Collaboration Features (Planned)
- Scenario commenting and annotations
- Version control for scenario updates
- Community contributions and peer review
- Scenario voting and confidence aggregation

## Contributing

We welcome contributions! Whether you're adding new scenarios, improving visualizations, or building comparison features, please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution

- **Scenario Content**: Add new AI forecast scenarios from published research
- **Visualization**: Improve charts, timelines, and comparison views
- **Analysis Tools**: Build features for extracting insights across scenarios
- **Data Export**: Add CSV, JSON, or API export capabilities
- **Documentation**: Improve guides and examples

## Current Scenarios

### A 2032 Takeoff Story
**Author**: Romeo (LessWrong)
**Timeline**: 2026-2035
**Type**: Modal scenario with branching outcomes

A detailed exploration of AI development through economic penetration, robotics deployment, and geopolitical competition, culminating in a branching point between fast and slow takeoff scenarios.

**Key Features**:
- 12 timeline periods with detailed narratives
- 5 tracked parameters (AI GDP %, unemployment, automation, robot counts)
- 16+ milestones across technology, economics, and geopolitics
- Branching at 2033 into "Fast Takeoff" and "Slow Takeoff" paths
- 6 core assumptions with confidence ratings
- 7 open strategic questions

## License

MIT License - see LICENSE file for details

## Acknowledgments

- **Romeo** for the "A 2032 Takeoff Story" scenario
- The LessWrong AI forecasting community
- Contributors to AI scenario research and foresight

---

**Built with care for better AI futures planning**
