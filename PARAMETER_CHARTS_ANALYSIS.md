# Parameter Charts Implementation Analysis

## Executive Summary

The ProjectForesight codebase implements parameter visualization through Recharts LineChart components. The current implementation renders individual scenario parameters in isolation, but **has a critical limitation with branching scenarios**: parameters are only defined at the scenario level and don't account for diverging paths after a branch point.

---

## 1. WHERE PARAMETER CHARTS ARE RENDERED

### Primary Component: `ScenarioParameterChart.tsx`
**File**: `/home/user/ProjectForesight/src/components/ScenarioParameterChart.tsx`

```typescript
// Single parameter line chart for individual scenario
<LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <Line
    type="monotone"
    dataKey="value"
    stroke={parameter.color || '#8b5cf6'}
    strokeWidth={2}
    dot={{ fill: parameter.color || '#8b5cf6', r: 4 }}
    activeDot={{ r: 6 }}
    name={parameter.name}
  />
</LineChart>
```

**Purpose**: Renders a single parameter's timeline for one scenario
**Data Structure**: Converts `ScenarioParameter.data` (array of DataPoint objects) to chart format
**Dimensions**: 300px height, responsive width
**Features**:
- X-axis: Date values from data points
- Y-axis: Numeric values with parameter unit label
- Tooltip: Shows value with parameter name and unit
- Legend: Displays parameter name
- Interactive dots: Highlight on hover

**Used In**:
- `ScenarioViewer.tsx` (line 66) - Parameters view tab
- Grid layout rendering multiple parameters

---

### Secondary Component: `ParameterComparisonView.tsx`
**File**: `/home/user/ProjectForesight/src/components/ParameterComparisonView.tsx`

```typescript
// Multi-scenario parameter comparison
<LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
  {scenariosWithParameter.map(({ scenario, parameter }, index) => (
    <Line
      key={scenario.id}
      type="monotone"
      dataKey={scenario.id}  // Each scenario is a separate line
      stroke={parameter.color || colors[index % colors.length]}
      strokeWidth={2}
      connectNulls  // Important: connects across missing data points
      name={scenario.id}
    />
  ))}
</LineChart>
```

**Purpose**: Compares same parameter across multiple scenarios
**Data Structure**: Merged data from multiple scenarios by date
**Dimensions**: 500px height, responsive width
**Features**:
- Multiple colored lines (one per scenario)
- Smart data merging (DateMap approach)
- Legend with scenario titles
- Parameter selector dropdown
- Scenario list display

**Data Merging Logic** (lines 52-62):
```typescript
const dateMap = new Map<string, Record<string, number>>();

scenariosWithParameter.forEach(({ scenario, parameter }) => {
  parameter.data.forEach(point => {
    if (!dateMap.has(point.date)) {
      dateMap.set(point.date, {});
    }
    const dateData = dateMap.get(point.date)!;
    dateData[scenario.id] = point.value;  // Use scenario ID as key
  });
});
```

---

## 2. HOW PARAMETER DATA IS STRUCTURED AND DISPLAYED

### Data Type Definition: `ScenarioParameter`
**File**: `/home/user/ProjectForesight/src/types/scenario.ts` (lines 18-26)

```typescript
export interface ScenarioParameter {
  id: string;                    // Unique within scenario
  name: string;                  // e.g., "AI R&D Progress Multiplier"
  description: string;           // "How much faster AI research progresses..."
  unit: string;                  // e.g., "x faster", "% of GDP", "millions"
  data: DataPoint[];             // Timeline data points
  color?: string;                // e.g., "#ef4444" (red)
}

export interface DataPoint {
  date: string;                  // ISO date or year "2025-06"
  value: number;                 // Numeric value on Y-axis
  label?: string;                // Optional label at point
  confidence?: 'low' | 'medium' | 'high';  // Data confidence
}
```

### Data Flow in Components

1. **Scenario Loading** (ScenarioViewer.tsx)
   ```
   ScenarioViewer receives AIScenario prop
   ↓
   Extracts scenario.parameters array
   ↓
   Maps each parameter to ScenarioParameterChart
   ↓
   Renders in grid layout
   ```

2. **Parameter Comparison** (ParameterComparisonView.tsx)
   ```
   getAllParameters() called (from scenarios/index.ts)
   ↓
   Groups parameters by name across all scenarios
   ↓
   User selects parameter from dropdown
   ↓
   Finds all scenarios with that parameter
   ↓
   Merges data by date into unified chart data
   ↓
   Renders multiple lines (one per scenario)
   ```

3. **Chart Data Transformation**
   
   Input (ScenarioParameterChart):
   ```typescript
   parameter.data = [
     { date: '2025-06', value: 1, confidence: 'high' },
     { date: '2026-01', value: 1.5, confidence: 'high' },
   ]
   ```
   
   Transformed to:
   ```typescript
   chartData = [
     { date: '2025-06', value: 1, label: '' },
     { date: '2026-01', value: 1.5, label: '' }
   ]
   ```

### Color Coding
**In ScenarioParameterChart**: Uses parameter.color property (defined per parameter)
- Alignment Status: `#dc2626` (red)
- R&D Progress: `#ef4444` (bright red)
- Geopolitical Tension: `#7c3aed` (purple)

**In ParameterComparisonView**: Uses scenario parameter colors with fallback to palette
```typescript
const colors = [
  '#8b5cf6', // purple
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
];
```

---

## 3. CRITICAL ISSUE: BRANCHING SCENARIOS SHOWING ONLY ONE LINE

### The Problem

In the AI 2027 Collective Forecast scenario (`ai-2027-forecast.ts`), there's a **branching point at October 2027** that splits into two paths:

1. **Race Ending** (Extinction): OpenBrain continues despite misalignment
2. **Slowdown Ending** (Prosperity): Government enforces safety pause

**Current Limitation**: 
- Parameters are defined ONLY at scenario level (lines 452-544)
- Parameter data ends at **2027-09** (before branch point)
- Branch paths contain timeline periods/milestones, but NO parameters
- Charts cannot show diverging lines for Race vs Slowdown paths

### Evidence from Code

**Branch Definition** (lines 792-1223):
```typescript
hasBranching: true,

branches: [
  {
    id: 'branch-point-oct-2027',
    branchDate: '2027-10',
    paths: [
      {
        id: 'branch-race',
        name: 'Race Ending: Continued Competition',
        periods: [...],      // Has timeline periods
        milestones: [...]    // Has milestones
        // NO parameters property!
      },
      {
        id: 'branch-slowdown',
        name: 'Slowdown Ending: Coordinated Safety',
        periods: [...],
        milestones: [...]
        // NO parameters property!
      }
    ]
  }
]
```

**Parameter Data** (lines 454-466):
```typescript
{
  id: 'rd-multiplier',
  name: 'AI R&D Progress Multiplier',
  data: [
    { date: '2025-06', value: 1 },
    { date: '2026-01', value: 1.5 },
    { date: '2027-03', value: 4 },
    { date: '2027-06', value: 10 },
    { date: '2027-08', value: 25 },
    { date: '2027-09', value: 50 }  // STOPS BEFORE BRANCH POINT
  ]
}
```

### What SHOULD Happen

For Alignment Status parameter:
- **Shared pre-2027-10**: Same line from 2025-06 to 2027-09
- **After 2027-10 divergence**:
  - Race path: continues to 0 (adversarial)
  - Slowdown path: improves to 90+ (aligned)

Visual expectation: Chart with two lines diverging at October 2027

### Actual Behavior

Chart shows only the base scenario parameters with single lines ending in September 2027. Branch paths are NOT visualized in charts at all - only in timeline view.

---

## 4. RELATIONSHIP BETWEEN SCENARIOS AND PARAMETER VISUALIZATION

### Type Hierarchy
```
AIScenario
├── id, title, author, metadata
├── parameters: ScenarioParameter[]  ← Direct chart rendering
├── periods: TimelinePeriod[]        ← Narrative timeline
├── milestones: Milestone[]          ← Event markers
├── hasBranching: boolean
└── branches?: Branch[]              ← Branching paths
    └── paths: BranchPath[]
        ├── periods: TimelinePeriod[]
        ├── milestones: Milestone[]
        └── (NO parameters)  ← MISSING!
```

### Scenario Registry
**File**: `/home/user/ProjectForesight/src/data/scenarios/index.ts`

```typescript
// Global parameters function - aggregates across ALL scenarios
export function getAllParameters() {
  const parameterMap = new Map();
  
  scenarios.forEach(scenario => {
    scenario.parameters.forEach(param => {
      // Groups by name for cross-scenario comparison
      existing.parameterIds.push({
        scenarioId: scenario.id,
        parameterId: param.id
      });
    });
  });
}
```

### Three Viewing Modes

1. **Scenario View** (ScenarioViewer.tsx)
   - Shows all parameters for ONE scenario
   - Grid layout with individual charts
   - Parameters button shows "Tracked Parameters" section
   - Does NOT differentiate or handle branching

2. **Parameter Comparison** (ParameterComparisonView.tsx)
   - Compares ONE parameter across multiple scenarios
   - Multi-line chart with legend
   - Parameter selector dropdown
   - Does NOT handle branch divergence

3. **Branch/Timeline View** (BranchingView.tsx + TimelineView.tsx)
   - Shows narrative timeline for branch paths
   - NO parameter visualization
   - Milestones and key events only

---

## 5. TECHNICAL ARCHITECTURE

### Recharts Configuration

**Chart Type**: LineChart with monotone interpolation
```typescript
<LineChart
  data={chartData}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
>
  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
  <XAxis dataKey="date" />
  <YAxis label={{ value: parameter.unit, angle: -90 }} />
  <Tooltip formatter={(value) => [`${value} ${unit}`, name]} />
  <Legend />
  <Line
    type="monotone"
    dataKey="value"  // or scenario.id for comparisons
    stroke={color}
    strokeWidth={2}
    connectNulls  // Bridges gaps in data
  />
</LineChart>
```

### Data Flow Pipeline

```
Scenario Data File (TypeScript)
    ↓
AIScenario Type (loaded in memory)
    ↓
ScenarioViewer / ParameterComparisonView (React component)
    ↓
Array transformation (DataPoint[] → Chart format)
    ↓
Recharts LineChart (renders SVG)
    ↓
Interactive visualization (tooltips, hover)
```

### Styling & Theming
- **Dark theme enforced** throughout (see App.css)
- **Parameter colors** defined per parameter in scenario data
- **Tooltip styling**: Dark background with light border
- **Responsive**: Uses ResponsiveContainer for width adaptation

---

## 6. MISSING PIECES FOR BRANCHING VISUALIZATION

### Current Gaps

1. **No BranchParameter Type**
   - Branch paths need their own parameters
   - Type system doesn't support per-path parameters

2. **No Parameter Merging Logic**
   - Can't combine base parameters with branch-specific data
   - No mechanism to show two diverging lines after branch point

3. **No Branch-Aware Chart Component**
   - `ScenarioParameterChart` doesn't understand branching
   - No conditional rendering for path selection

4. **No Dashboard Integration**
   - Parameter view doesn't show which scenario has branching
   - Can't select branch path in parameter visualization
   - No warning when parameters are incomplete (cut off by branch)

### What Would Be Needed

```typescript
// Proposed: Extend Branch type to include parameters
export interface Branch {
  id: string;
  branchDate: string;
  paths: {
    id: string;
    name: string;
    periods: TimelinePeriod[];
    milestones: Milestone[];
    parameters?: ScenarioParameter[];  // NEW: diverging parameters
  }[];
}

// Proposed: Component to handle branch visualization
<BranchParameterChart 
  parameter={parameter}
  scenario={scenario}
  selectedBranchPath={selectedBranchPath}
/>
```

---

## 7. CURRENT SCENARIOS & PARAMETER STATUS

### AI 2027 Collective Forecast
- **Branching**: YES (October 2027)
- **Parameters**: 7 tracked
- **Parameter data**: Ends September 2027
- **Issue**: Race/Slowdown paths invisible in parameter charts

### Other Scenarios
- **AI Takeover 2027** (joshc): No branching, parameters defined
- **Takeoff 2032**: No branching, parameters defined

---

## 8. COMPONENT DEPENDENCIES

```
App.tsx
├── ScenarioSelector (displays scenario list)
├── ScenarioViewer (main view)
│   ├── BranchingView (for hasBranching scenarios)
│   │   └── TimelineView (shows branch paths)
│   ├── TimelineView (base timeline)
│   └── ScenarioParameterChart (parameter grids)
│       └── Recharts LineChart
└── ParameterComparisonView
    └── Recharts LineChart with multiple lines
```

---

## 9. KEY FILES SUMMARY

| File | Purpose | Lines |
|------|---------|-------|
| `src/types/scenario.ts` | Type definitions | 151 |
| `src/components/ScenarioParameterChart.tsx` | Single param chart | 67 |
| `src/components/ParameterComparisonView.tsx` | Multi-scenario comparison | 204 |
| `src/components/BranchingView.tsx` | Branch path selector | 76 |
| `src/components/TimelineView.tsx` | Timeline rendering | 112 |
| `src/components/ScenarioViewer.tsx` | Main scenario view | 184 |
| `src/data/scenarios/ai-2027-forecast.ts` | AI 2027 scenario with branching | 1242 |
| `src/data/scenarios/index.ts` | Scenario registry & utilities | 111 |

---

## 10. RECOMMENDATIONS

### Issue Priority: HIGH

The branching scenario feature (added in commit 5d2d34c) exposes a gap in the parameter visualization system. After October 2027, two completely different futures unfold, but the charts cannot represent this divergence.

### Solutions

1. **Quick Fix**: Add parameters to branch paths in data structure
2. **Medium Fix**: Create `BranchParameterChart` component with path selector
3. **Full Fix**: Implement parameter merging and dual-line rendering in chart component

