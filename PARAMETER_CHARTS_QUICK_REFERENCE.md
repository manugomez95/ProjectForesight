# Parameter Charts - Quick Reference

## In 30 Seconds

**What**: ProjectForesight visualizes AI scenario forecasts with parameter charts (line graphs)
**How**: Uses Recharts library to render timeline data
**Where**: Two places - individual scenario view and cross-scenario comparison
**Problem**: Branching scenarios only show one timeline, not diverging paths

---

## Key Files

| File | What | Where |
|------|------|-------|
| **ScenarioParameterChart.tsx** | Single parameter line chart component | `/src/components/` |
| **ParameterComparisonView.tsx** | Multi-scenario comparison view | `/src/components/` |
| **scenario.ts** | Type definitions for parameters/data | `/src/types/` |
| **ai-2027-forecast.ts** | AI 2027 scenario with branching | `/src/data/scenarios/` |
| **ScenarioViewer.tsx** | Main scenario view container | `/src/components/` |

---

## Parameter Data Structure

```typescript
// Each parameter is a timeline
ScenarioParameter {
  id: "rd-multiplier"
  name: "AI R&D Progress Multiplier"
  unit: "x faster"
  color: "#ef4444"
  data: [
    { date: '2025-06', value: 1 },
    { date: '2026-01', value: 1.5 },
    ...
  ]
}
```

---

## Chart Rendering

**Single Scenario Chart**
- Component: `ScenarioParameterChart`
- Input: One parameter with 5-7 data points
- Output: 300px height line chart
- Used in: Parameters grid view

**Multi-Scenario Comparison**
- Component: `ParameterComparisonView`
- Input: One parameter from multiple scenarios
- Output: 500px height chart with 3+ lines
- Used in: Parameter Comparison tab

---

## The Branching Issue

**Problem**: AI 2027 scenario has branching at October 2027
- Race Ending path (extinction)
- Slowdown Ending path (prosperity)

**Gap**: Parameters only go to September 2027, don't continue into branches

**Result**: Can't visualize how parameters diverge after branch point

**Location**: `/src/data/scenarios/ai-2027-forecast.ts` lines 452-544 (parameters) vs 792-1223 (branches)

---

## What Works

- Individual scenario parameter charts show up correctly
- Parameter comparison across scenarios works
- Colors and styling are consistent
- Interactive tooltips work
- Multi-line rendering works

---

## What Doesn't Work

- Can't show two diverging lines for branching scenarios
- Branch paths have no parameter data
- Parameter charts don't integrate with branch selector
- No way to visualize "Race vs Slowdown" outcomes in chart form

---

## Component Hierarchy

```
App
└─ ScenarioViewer
   ├─ TimelineView (with BranchingView)
   ├─ ScenarioParameterChart (x7)
   │  └─ Recharts LineChart
   └─ Other tabs

ParameterComparisonView
└─ Recharts LineChart (multi-line)
```

---

## Color Palette

Parameter colors defined in scenario data:
- Alignment Status: `#dc2626` (red)
- R&D Progress: `#ef4444` (bright red)
- Geopolitical Tension: `#7c3aed` (purple)
- Public Awareness: `#0891b2` (cyan)
- Economic Impact: `#10b981` (green)
- Agent Copies: `#8b5cf6` (purple)
- Compute Scale: `#f59e0b` (amber)

Fallback palette for cross-scenario comparison (8 colors)

---

## How Data Flows

```
Scenario File (.ts)
  ↓
AIScenario Type
  ↓
ScenarioViewer Component
  ↓
ScenarioParameterChart
  ↓
Transform: DataPoint[] → ChartData[]
  ↓
Recharts LineChart
  ↓
Browser SVG Rendering
```

---

## Three Viewing Modes

### 1. Single Scenario Parameters
- Location: Scenario View → Parameters Tab
- Shows: Grid of 7 parameter charts
- One chart per parameter
- Data: Single line per chart

### 2. Multi-Scenario Comparison
- Location: Parameter Comparison Tab
- Shows: One parameter across 3 scenarios
- Multiple colored lines
- Dropdown selector

### 3. Branch Timeline (No Parameters)
- Location: Scenario View → Timeline Tab → Scenario Branches
- Shows: Narrative text + milestones
- Two paths (Race / Slowdown)
- No parameter visualization

---

## Data Merging Algorithm

Used in ParameterComparisonView (lines 52-62):

```
For each scenario:
  For each data point:
    If date not in map:
      Create entry
    Add value: { scenarioId: value }

Result: { date: { scenario1: val1, scenario2: val2, ... } }
```

---

## Interactive Features

- **Hover Dots**: Enlarge on hover (r: 4 → r: 6)
- **Tooltip**: Shows value, unit, parameter name
- **Legend**: Click to toggle/highlight
- **Responsive**: Uses ResponsiveContainer
- **Connect Nulls**: Bridges gaps in data

---

## Recharts Configuration

```javascript
<LineChart data={chartData}>
  <CartesianGrid stroke="rgba(255,255,255,0.1)" />
  <XAxis dataKey="date" />
  <YAxis label={{ value: unit }} />
  <Tooltip />
  <Legend />
  <Line
    type="monotone"
    stroke={color}
    strokeWidth={2}
    connectNulls
  />
</LineChart>
```

---

## Known Limitations

1. Parameters don't extend into branching paths
2. No branch-aware parameter component
3. No way to select which branch to view in parameter tab
4. Parameter comparison doesn't indicate which scenarios have branching
5. No visual warning that parameters are incomplete (cut off by branch)

---

## Suggested Improvements

**Quick**: Add parameters to branch path data structures
**Medium**: Create BranchParameterChart component with path selector
**Full**: Implement dual-line rendering + merging logic for branches

---

## Testing Checklist

- [ ] Open AI 2027 Collective Forecast
- [ ] Click Parameters tab - see 7 charts
- [ ] Click Parameter Comparison - see multi-line chart
- [ ] Select AI 2027 again
- [ ] Click Timeline tab
- [ ] Click "Scenario Branches"
- [ ] Select "Race Ending" path
- [ ] Note: No parameter view for branch
- [ ] Go back to Parameters tab
- [ ] Observe: Still shows base timeline, not branch-specific

---

## Quick Debug Tips

**To find where parameters are loaded**: 
- Search for `scenario.parameters` in ScenarioViewer.tsx

**To see where chart data transforms**:
- Line 18 in ScenarioParameterChart.tsx: `chartData = parameter.data.map(...)`

**To find multi-scenario merge logic**:
- Lines 52-62 in ParameterComparisonView.tsx: `dateMap` creation

**To see branch structure**:
- Lines 792-1223 in ai-2027-forecast.ts: `branches` array

---

## References in Codebase

**Type Definitions** (scenario.ts):
- Line 19: ScenarioParameter interface
- Line 9: DataPoint interface
- Line 56: Branch interface

**Components**:
- Line 66 in ScenarioViewer: Maps parameters to charts
- Line 172 in ParameterComparisonView: Maps scenarios to lines

**Scenarios**:
- Line 452 in ai-2027-forecast.ts: Parameters array
- Line 792 in ai-2027-forecast.ts: Branches array

---

**Last Updated**: November 12, 2025
**Branch**: claude/handle-branching-parameters-011CV48fZf64ia9P9mfYoQgo
