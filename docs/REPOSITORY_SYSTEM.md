# Centralized Repository System

## Overview

The ProjectForesight platform now uses a **centralized repository system** for parameters, milestones, and metrics. This eliminates duplication across scenarios and ensures consistency.

## Key Benefits

1. **No Duplication**: Parameters like "Public Awareness of AI Risk" are defined once and reused across scenarios
2. **Consistency**: All scenarios use the same names, descriptions, and units for common concepts
3. **Smaller Scenarios**: Scenario files are ~50-70% smaller since they only reference parameters instead of defining them
4. **Easy Comparison**: Parameters with the same ID can be easily compared across scenarios
5. **Automatic Deduplication**: New parameters are checked against existing ones to prevent duplicates

## Architecture

### Repository Structure

```
src/
├── types/
│   ├── repository.ts          # Types for repository system
│   └── scenario.ts            # Extended scenario types
├── data/
│   └── repository/
│       ├── index.ts           # Main exports
│       ├── parameters.ts      # Parameter definitions
│       └── milestones.ts      # Milestone definitions
└── utils/
    ├── repositoryMatching.ts  # Similarity algorithms
    ├── repositoryFactory.ts   # Find-or-create utilities
    └── repositoryConverter.ts # Format conversion
```

### Key Concepts

#### 1. Parameter Repository

**Location**: `src/data/repository/parameters.ts`

All parameter definitions live here. Each parameter has:
- `id`: Unique identifier (e.g., `'ai-capability-multiplier'`)
- `name`: Display name
- `description`: What this parameter measures
- `unit`: Unit of measurement
- `color`: Default visualization color
- `category`: Grouping category
- `tags`: Searchable tags
- `aliases`: Alternative names (for matching)

**Example**:
```typescript
{
  id: 'public-awareness-ai-risk',
  name: 'Public Awareness of AI Risk',
  description: 'Public awareness and understanding of AI existential risk',
  unit: '% aware',
  color: '#0891b2',
  category: 'social',
  tags: ['social', 'awareness', 'risk', 'public'],
  aliases: ['Public Awareness of Risk', 'AI Risk Awareness'],
}
```

#### 2. Milestone Repository

**Location**: `src/data/repository/milestones.ts`

All milestone definitions live here. Each milestone has:
- `id`: Unique identifier
- `name`: Display name
- `description`: What this milestone represents
- `category`: Type of milestone
- `defaultSignificance`: Typical importance level
- `tags`: Searchable tags
- `aliases`: Alternative names
- `relatedParameters`: Parameters that typically change with this milestone

#### 3. Repository-Based Scenarios

**New Format**:
```typescript
import type { RepositoryBasedScenario } from '../../types/scenario';

export const myScenario: RepositoryBasedScenario = {
  // ... metadata ...

  // Reference parameters from repository
  parameterRefs: [
    {
      parameterId: 'ai-capability-multiplier',
      data: [
        { date: '2025-01', value: 10, confidence: 'high' },
        { date: '2026-01', value: 100, confidence: 'medium' },
      ]
    }
  ],

  // Reference milestones from repository
  milestoneRefs: [
    {
      milestoneId: 'agi-achieved',
      date: '2026-06',
      significance: 'critical',
    }
  ],
};
```

**Old Format** (still supported):
```typescript
export const myScenario: AIScenario = {
  // ... metadata ...

  parameters: [
    {
      id: 'ai-capability-multiplier',
      name: 'AI Capability Multiplier',
      description: 'How much faster AI systems work...',
      unit: 'x faster',
      color: '#8b5cf6',
      data: [...]
    }
  ],

  milestones: [
    {
      id: 'agi-2026',
      date: '2026-06',
      title: 'AGI Achieved',
      description: '...',
      significance: 'critical',
    }
  ],
};
```

## How to Add New Content

### Adding a New Parameter

**Step 1**: Check if it already exists

```typescript
import { findOrCreateParameter } from '../utils/repositoryFactory';

const result = findOrCreateParameter({
  name: 'AI Agent Deployment',
  description: 'Number of AI agents deployed globally',
  unit: 'millions',
  tags: ['deployment', 'agents']
});

console.log(result.message);
// If similar found: "Found very similar parameter: 'Parallel AI Agent Copies' (ID: ai-agent-copies)"
// If new: "No similar parameters found. Creating new parameter..."
```

**Step 2**: Add to repository (if truly new)

Edit `src/data/repository/parameters.ts`:

```typescript
{
  id: 'my-new-parameter',
  name: 'My New Parameter',
  description: 'Clear description of what this measures',
  unit: 'units',
  color: '#3b82f6',
  category: 'capability', // or 'economic', 'social', 'safety', 'geopolitical', 'other'
  tags: ['relevant', 'tags'],
  aliases: ['Alternative Name 1', 'Alternative Name 2'],
  range: { min: 0, max: 100 },
  usesConfidence: true,
}
```

**Step 3**: Use in your scenario

```typescript
parameterRefs: [
  {
    parameterId: 'my-new-parameter',
    data: [
      { date: '2025-01', value: 50, confidence: 'medium' }
    ]
  }
]
```

### Adding a New Milestone

**Step 1**: Check if it already exists

```typescript
import { findOrCreateMilestone } from '../utils/repositoryFactory';

const result = findOrCreateMilestone({
  name: 'AI Safety Breakthrough',
  description: 'Major breakthrough in AI alignment',
  tags: ['safety', 'alignment']
});
```

**Step 2**: Add to repository (if truly new)

Edit `src/data/repository/milestones.ts`:

```typescript
{
  id: 'my-new-milestone',
  name: 'My New Milestone',
  description: 'What this milestone represents',
  category: 'capability', // or 'deployment', 'societal', 'regulatory', 'incident', 'other'
  defaultSignificance: 'high',
  tags: ['relevant', 'tags'],
  aliases: ['Alternative Name'],
  relatedParameters: ['parameter-id-1', 'parameter-id-2'],
}
```

**Step 3**: Use in your scenario

```typescript
milestoneRefs: [
  {
    milestoneId: 'my-new-milestone',
    date: '2026-03',
    significance: 'critical',
    // Optional overrides if scenario-specific details differ
    titleOverride: 'Scenario-Specific Title',
    descriptionOverride: 'Additional context for this scenario',
  }
]
```

### Creating a New Scenario

**Recommended approach** (using repository):

```typescript
import type { RepositoryBasedScenario } from '../../types/scenario';

export const myNewScenario: RepositoryBasedScenario = {
  id: 'my-scenario-id',
  title: 'My Scenario Title',
  author: 'Author Name',
  source: 'Source',
  datePublished: '2025-01-01',
  summary: 'Brief summary...',
  scenarioType: 'modal',

  timelineStart: '2025-01',
  timelineEnd: '2030-12',

  periods: [
    // Timeline periods...
  ],

  parameterRefs: [
    // Reference existing parameters
    {
      parameterId: 'ai-capability-multiplier',
      data: [/* your data points */]
    }
  ],

  milestoneRefs: [
    // Reference existing milestones
    {
      milestoneId: 'agi-achieved',
      date: '2026-06',
      significance: 'critical'
    }
  ],

  hasBranching: false,
  assumptions: [/* ... */],
  outcomes: {/* ... */},
  tags: ['tag1', 'tag2'],
};
```

**Register your scenario** in `src/data/scenarios/index.ts`:

```typescript
import { myNewScenario } from './my-new-scenario';

const rawScenarios: FlexibleScenario[] = [
  // ... existing scenarios ...
  myNewScenario,
];
```

## Utilities

### Finding Similar Items

```typescript
import { findSimilarItems } from '../utils/repositoryMatching';
import { PARAMETER_REPOSITORY } from '../data/repository/parameters';

const similar = findSimilarItems(
  { name: 'Public AI Risk Awareness', description: '...' },
  PARAMETER_REPOSITORY,
  0.7 // similarity threshold (0-1)
);

similar.forEach(match => {
  console.log(`${match.item.name} - ${(match.score * 100).toFixed(0)}% match`);
  console.log(`Reason: ${match.reason}`);
});
```

### Analyzing Existing Scenarios

```typescript
import { analyzeScenarioParameters } from '../utils/repositoryFactory';

const analysis = analyzeScenarioParameters([
  { name: 'AI Capability', description: '...' },
  { name: 'Public Awareness of Risk', description: '...' },
]);

console.log('Exact matches:', analysis.matched);
console.log('Similar items:', analysis.similar);
console.log('New items:', analysis.new);
```

### Converting Scenarios

```typescript
import { convertToRepositoryScenario } from '../utils/repositoryConverter';
import { myOldScenario } from './my-old-scenario';

const result = convertToRepositoryScenario(myOldScenario, {
  createOverrides: true,
  matchThreshold: 0.7
});

console.log('Warnings:', result.warnings);
console.log('Unmatched parameters:', result.unmatchedParameters);
console.log('New scenario:', result.scenario);
```

## Best Practices

### 1. Always Check Before Creating

Before adding a new parameter or milestone, **always** check if it already exists:

```typescript
const existing = findParameterByName('Public Awareness');
if (existing) {
  // Use existing.id
} else {
  // Create new
}
```

### 2. Use Descriptive IDs

Parameter IDs should be:
- Lowercase
- Hyphen-separated
- Descriptive
- Stable (don't change once scenarios use them)

Good: `ai-capability-multiplier`
Bad: `param1`, `cap`, `ai_cap`

### 3. Add Aliases for Similar Concepts

If a concept has multiple names, add them as aliases:

```typescript
{
  id: 'public-awareness-ai-risk',
  name: 'Public Awareness of AI Risk',
  aliases: ['Public Awareness of Risk', 'AI Risk Awareness', 'Public AI Safety Awareness']
}
```

### 4. Use Overrides Sparingly

Only override names/descriptions when the scenario genuinely needs different wording:

```typescript
// Good - scenario-specific detail
{
  milestoneId: 'agi-achieved',
  titleOverride: 'GPT-7 Achieves AGI',  // Specific system name
  descriptionOverride: 'OpenAI announces GPT-7 has achieved AGI...'
}

// Bad - just rewording for no reason
{
  milestoneId: 'agi-achieved',
  titleOverride: 'AGI is Achieved',  // Unnecessary
}
```

### 5. Keep Repository Organized

Parameters and milestones in the repository should be:
- Grouped by category
- Well-documented
- Include all relevant metadata
- Have clear, concise descriptions

## Migration Guide

### Migrating an Existing Scenario

1. **Analyze your scenario**:
   ```bash
   # Compare your parameters to repository
   node scripts/analyze-scenario.js ./src/data/scenarios/my-scenario.ts
   ```

2. **Map parameters**:
   - For each parameter, find the matching repository ID
   - Create overrides only if needed
   - Add new parameters to repository if they don't exist

3. **Map milestones**:
   - For each milestone, find the matching repository ID
   - Create overrides for scenario-specific details

4. **Create refactored version**:
   - Copy scenario file to `*-refactored.ts`
   - Change type to `RepositoryBasedScenario`
   - Replace `parameters` with `parameterRefs`
   - Replace `milestones` with `milestoneRefs`

5. **Test**:
   - Update scenario registry
   - Verify visualizations work
   - Check parameter comparisons

6. **Switch**:
   - Comment out old scenario
   - Use refactored version

## Troubleshooting

### "Parameter definition not found"

You referenced a parameter ID that doesn't exist in the repository.

**Solution**: Check the ID spelling, or add the parameter to `src/data/repository/parameters.ts`

### "Milestone definition not found"

You referenced a milestone ID that doesn't exist in the repository.

**Solution**: Check the ID spelling, or add the milestone to `src/data/repository/milestones.ts`

### Parameters not showing up in comparison view

Ensure the parameter ID is consistent across scenarios.

**Bad**:
- Scenario 1: `parameterId: 'ai-capability'`
- Scenario 2: `parameterId: 'ai-capabilities'`

**Good**:
- Both use: `parameterId: 'ai-capability-multiplier'`

### Similar items not being detected

The similarity threshold might be too high, or the descriptions are too different.

**Solution**: Lower the threshold or add more aliases:

```typescript
aliases: [
  'AI Speed vs Humans',
  'AI Capability Multiplier',
  'AI Performance',
  'AI vs Human Speed'
]
```

## Future Enhancements

- [ ] Metric repository (for timeline period metrics)
- [ ] Automated deduplication suggestions
- [ ] Visual parameter browser
- [ ] Batch scenario migration tool
- [ ] Parameter versioning
- [ ] Community contributions via PR templates
