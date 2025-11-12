# Parameter Charts - Visual Guide

## Chart Rendering Flowchart

```
┌─────────────────────────────────────────────────────────────────────┐
│                            App.tsx                                   │
│                   (Router & State Manager)                           │
└────┬────────────────────────────────────────────────────────────────┘
     │
     ├─────────────────────────┬──────────────────────────┬─────────────────┐
     │                         │                          │                 │
     v                         v                          v                 v
  Scenario View        Parameter Comparison              Quiz View      Branch Paths
  (Single Scenario)    (Multi-Scenario)              (Generated)      (Timeline Only)
     │                         │
     v                         v
┌──────────────────────┐   ┌──────────────────────┐
│  ScenarioViewer.tsx  │   │ParameterComparison   │
│  - Tabs UI           │   │  View.tsx            │
│  - Timeline          │   │ - Parameter selector │
│  - Parameters        │   │ - Merged data       │
│  - Assumptions       │   │ - Multi-line chart  │
│  - Outcomes          │   │ - Legend            │
└──────────┬───────────┘   └──────────┬──────────┘
           │                          │
           v                          v
    ScenarioParameterChart      LineChart (Recharts)
    (Grid layout)               (500px height)
    - Individual charts
    - 300px each
           │
           v
    LineChart (Recharts)
    (Single line)
```

---

## Data Structure: From File to Chart

```
SCENARIO FILE (ai-2027-forecast.ts)
│
├─ metadata: id, title, author, ...
│
├─ parameters: [
│  {
│    id: "rd-multiplier"
│    name: "AI R&D Progress Multiplier"
│    unit: "x faster"
│    color: "#ef4444"
│    data: [
│      ├─ {date: '2025-06', value: 1}
│      ├─ {date: '2026-01', value: 1.5}
│      ├─ {date: '2027-03', value: 4}
│      ├─ {date: '2027-06', value: 10}
│      ├─ {date: '2027-08', value: 25}
│      └─ {date: '2027-09', value: 50}  ⚠️ STOPS HERE
│    ]
│  }
│  ... (6 more parameters)
│]
│
├─ branches: [
│  {
│    id: "branch-point-oct-2027"
│    branchDate: "2027-10"
│    paths: [
│      {
│        name: "Race Ending (Extinction)"
│        periods: [...], milestones: [...]
│        ❌ NO PARAMETERS!
│      },
│      {
│        name: "Slowdown Ending (Prosperity)"
│        periods: [...], milestones: [...]
│        ❌ NO PARAMETERS!
│      }
│    ]
│  }
│]
│
└─ outcomes: [...]


          ↓ (Type: AIScenario)


REACT COMPONENT RECEIVES DATA
│
├─ ScenarioParameterChart receives: single parameter
│  Input: {
│    id: "rd-multiplier",
│    name: "AI R&D Progress Multiplier",
│    data: [{date, value}, ...]
│  }
│
├─ Transform: DataPoint[] → ChartData[]
│  [
│    {date: '2025-06', value: 1, label: ''}
│    {date: '2026-01', value: 1.5, label: ''}
│    ...
│  ]
│
└─ Pass to Recharts
   ├─ XAxis: date
   ├─ YAxis: value (0-50)
   └─ Line: monotone interpolation


          ↓ (Browser Rendering)


RENDERED CHART
│
├─ Title: "AI R&D Progress Multiplier"
├─ X-Axis: 2025-06 ... 2027-09 (dates)
├─ Y-Axis: 0 to 50 (x faster)
├─ Single Red Line (#ef4444)
├─ Data Points: 6 dots
├─ Interactive: hover for tooltip
└─ Legend: shows parameter name
```

---

## Multi-Scenario Parameter Comparison

```
Parameter Comparison View
│
├─ Dropdown: Select Parameter
│  └─ "AI R&D Progress Multiplier"
│
├─ Query: getAllParameters()
│  └─ Finds all scenarios with this parameter
│     ├─ ai-2027-forecast.ts ✓
│     ├─ ai-takeover-2027.ts ✓
│     └─ takeoff-2032.ts ✓
│
├─ Data Merge: Combine by Date
│  Input: 3 scenarios, different dates
│  └─ dateMap = {
│      '2025-06': {'ai-2027-forecast': 1},
│      '2026-01': {
│        'ai-2027-forecast': 1.5,
│        'ai-takeover-2027': 1.2
│      },
│      ...
│    }
│
└─ Render: Multi-line Chart
   ├─ AI 2027 Forecast: Red line (#ef4444)
   ├─ AI Takeover 2027: Blue line (#3b82f6)
   ├─ Takeoff 2032: Green line (#10b981)
   └─ connectNulls: YES (bridges gaps)
```

---

## Branching Issue: The Gap

```
CURRENT TIMELINE (What is visualized):

2025     2026     2027              2027-10  2028     2029     2030
│────────│────────│─────┬───────────┼────────────────────────────→
│        │        │     │           │
└─ Parameters defined ──┘  BRANCH POINT  Branch paths continue...
                          BUT NO PARAMS!


EXPECTED TIMELINE (What should be visualized):

2025     2026     2027    2027-10   2028     2029     2030
         │────────────────┼──────────────────────────→ Race Path
         │                │         R&D Multiplier: 50→100→200
         │                │         Alignment: 0→0→0
         │                │
         └────────────────┼──────────────────────────→ Slowdown Path
                          │         R&D Multiplier: 50→60→70
                          │         Alignment: 0→60→90
                          
             [TWO DIVERGING LINES AFTER BRANCH]


CURRENT LIMITATION:

Single parameter chart:
  ├─ Ends at 2027-09
  └─ No mechanism to show two lines

Branch paths:
  ├─ Visualized in timeline view
  └─ No parameter data at all
```

---

## Component Architecture

```
┌────────────────────────────────────────────────────────┐
│              ScenarioViewer.tsx                         │
│  - Manages view mode (timeline/parameters/outcomes)    │
│  - Route to appropriate component                      │
└────────────┬──────────────────────────────────────────┘
             │
      ┌──────┴─────────┬──────────────┬──────────────┐
      │                │              │              │
      v                v              v              v
  Timeline         Parameters      Assumptions    Outcomes
  View             View            View           View
      │                │
      v                v
  TimelineView     Grid of
  + BranchingView  Scenario
  (if branching)   ParameterChart
                        │
                        v
                   Recharts
                   LineChart
                   (300px height)
```

---

## Where Parameters Show

```
🟢 WORKING - Individual Scenario View
   App > ScenarioViewer > Parameters Tab
   │
   └─ Shows grid of charts
      ├─ AI R&D Progress Multiplier (line chart)
      ├─ Training Compute Scale (line chart)
      ├─ Parallel AI Agent Copies (line chart)
      ├─ Alignment Status (line chart)
      ├─ Geopolitical Tension (line chart)
      ├─ Public Awareness (line chart)
      └─ Global AI Capex (line chart)


🟢 WORKING - Parameter Comparison View
   App > Parameter Comparison Tab
   │
   └─ Dropdown selector + Multi-line chart
      Selected: "AI R&D Progress Multiplier"
      ├─ AI 2027 Forecast line (red)
      ├─ AI Takeover 2027 line (blue)
      └─ Takeoff 2032 line (green)


🔴 NOT WORKING - Branching Scenario Parameters
   App > ScenarioViewer > Timeline Tab
   │
   ├─ Main timeline (2025-2027-09) ✓
   │
   ├─ Branching View ✓
   │  ├─ Path selector buttons ✓
   │  └─ TimelineView with narrative ✓
   │
   └─ Parameter Tab ❌
      └─ Still shows base scenario only
         No Race/Slowdown divergence!
```

---

## Code Location Reference

```
Component Hierarchy:
├─ /src/App.tsx (360 lines)
│  └─ Routing and state management
│
├─ /src/components/
│  ├─ ScenarioViewer.tsx (184 lines)
│  │  ├─ Conditional rendering of view modes
│  │  ├─ Parameters grid rendering (line 61-69)
│  │  └─ Branching section (line 50-56)
│  │
│  ├─ ScenarioParameterChart.tsx (67 lines) ⭐
│  │  ├─ LineChart setup
│  │  ├─ Data transformation
│  │  └─ Styling & tooltips
│  │
│  ├─ ParameterComparisonView.tsx (204 lines) ⭐
│  │  ├─ Parameter selection
│  │  ├─ Data merging logic (line 52-62)
│  │  ├─ Multi-line rendering
│  │  └─ Legend & colors
│  │
│  ├─ BranchingView.tsx (76 lines)
│  │  ├─ Branch path selector
│  │  ├─ Path button toggle
│  │  └─ TimelineView integration (line 65-69)
│  │
│  └─ TimelineView.tsx (112 lines)
│     ├─ Period rendering
│     ├─ Milestone filtering
│     └─ Collapsible periods
│
├─ /src/types/
│  └─ scenario.ts (151 lines) ⭐
│     ├─ DataPoint interface
│     ├─ ScenarioParameter interface
│     ├─ Branch interface
│     └─ AIScenario interface
│
└─ /src/data/scenarios/
   ├─ index.ts (111 lines)
   │  └─ getAllParameters() function
   │
   └─ ai-2027-forecast.ts (1242 lines) ⭐
      ├─ Parameters array (line 452-544)
      ├─ Branch definition (line 792-1223)
      └─ Race & Slowdown paths
```

---

## Key Problem Summary

```
ISSUE: Branch paths don't have parameters
WHERE: ai-2027-forecast.ts, lines 792-1223
SYMPTOM: Parameter charts only show to 2027-09
IMPACT: Can't visualize Race vs Slowdown outcomes

EXAMPLE - Alignment Status (what we want vs what we have):

DESIRED:
┌─────────────────────────────────────────┐
│ Alignment Status                        │
├─────────────────────────────────────────┤
│ 100 │     ╱╲                            │
│     │    ╱  ╲                           │
│  50 │   ╱    ╲  ╭─────── Slowdown      │
│     │  ╱      ╲ │                       │
│   0 │─────────∩─┴────────── Race        │
│     └─────────────────────────────────┘ │
│      2025   2027-10  2028   2029        │
└─────────────────────────────────────────┘

ACTUAL:
┌─────────────────────────────────────────┐
│ Alignment Status                        │
├─────────────────────────────────────────┤
│ 100 │     ╱                             │
│     │    ╱                              │
│  50 │   ╱                               │
│     │  ╱                                │
│   0 │─╱                                 │
│     └─────────────────────────────────┘ │
│      2025       2027-09    ❌ STOPS     │
└─────────────────────────────────────────┘
```

---

## Testing the System

### View Single Parameter Chart
1. App > Scenario View
2. Select "AI 2027 Collective Forecast"
3. Click "Parameters" tab
4. See 7 parameter charts in grid

### View Multi-Scenario Comparison
1. App > Parameter Comparison tab
2. Select parameter from dropdown
3. See multiple lines (one per scenario)
4. Hover to see values

### Try to View Branch Parameters
1. App > Scenario View
2. Select "AI 2027 Collective Forecast"
3. Click "Parameters" tab
4. Note: Parameters don't diverge for Race vs Slowdown
5. Click "Timeline" tab
6. Click "Scenario Branches"
7. Select "Race Ending" path
8. See timeline but no parameter data

