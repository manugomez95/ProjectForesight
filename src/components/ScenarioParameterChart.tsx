import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { ScenarioParameter, AIScenario } from '../types/scenario';

interface ScenarioParameterChartProps {
  parameter: ScenarioParameter;
  scenario?: AIScenario;
}

// Branch path colors for consistent visualization
const BRANCH_COLORS: Record<string, string> = {
  'branch-race': '#dc2626', // Red for catastrophic race ending
  'branch-slowdown': '#059669', // Green for prosperity ending
};

export default function ScenarioParameterChart({ parameter, scenario }: ScenarioParameterChartProps) {
  // Check if this scenario has branching and if branch paths have parameters
  const hasBranchingParameters =
    scenario?.hasBranching &&
    scenario.branches?.[0]?.paths.some(path =>
      path.parameters?.some(p => p.id === parameter.id)
    );

  if (!hasBranchingParameters) {
    // Simple case: no branching, render single line
    const chartData = parameter.data.map((point) => ({
      date: point.date,
      value: point.value,
      label: point.label || '',
    }));

    return (
      <div className="parameter-chart">
        <div className="chart-header">
          <h4>{parameter.name}</h4>
          <p className="chart-description">{parameter.description}</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: '12px' }}
              label={{ value: parameter.unit, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${value} ${parameter.unit}`, parameter.name]}
            />
            <Legend />
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
        </ResponsiveContainer>
      </div>
    );
  }

  // Complex case: branching scenario with diverging parameters
  const branchDate = scenario.branches![0].branchDate;

  // Get base parameter data (before branching)
  const baseData = parameter.data.filter(point => point.date <= branchDate);

  // Get branch paths and their parameters
  const branchPaths = scenario.branches![0].paths;

  // Create merged dataset with all dates
  const dateMap = new Map<string, any>();

  // Add base data points
  baseData.forEach(point => {
    dateMap.set(point.date, {
      date: point.date,
      base: point.value,
      label: point.label,
    });
  });

  // Add branch-specific data points
  branchPaths.forEach(path => {
    const pathParam = path.parameters?.find(p => p.id === parameter.id);
    if (pathParam) {
      pathParam.data.forEach(point => {
        const existing = dateMap.get(point.date) || { date: point.date };
        existing[path.id] = point.value;
        existing[`${path.id}_label`] = point.label;
        dateMap.set(point.date, existing);
      });
    }
  });

  // Convert to array and sort by date
  const chartData = Array.from(dateMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <div className="parameter-chart">
      <div className="chart-header">
        <h4>{parameter.name}</h4>
        <p className="chart-description">{parameter.description}</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="date"
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: '12px' }}
            label={{ value: parameter.unit, angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
            }}
            formatter={(value: number, name: string) => {
              const pathName = branchPaths.find(p => p.id === name)?.name || parameter.name;
              return [`${value} ${parameter.unit}`, pathName];
            }}
          />
          <Legend
            formatter={(value: string) => {
              if (value === 'base') return 'Common Timeline';
              const path = branchPaths.find(p => p.id === value);
              return path?.name || value;
            }}
          />

          {/* Base line (common timeline before branching) */}
          <Line
            type="monotone"
            dataKey="base"
            stroke={parameter.color || '#8b5cf6'}
            strokeWidth={2}
            dot={{ fill: parameter.color || '#8b5cf6', r: 4 }}
            activeDot={{ r: 6 }}
            name="base"
            connectNulls={false}
          />

          {/* Branch path lines */}
          {branchPaths.map((path) => (
            <Line
              key={path.id}
              type="monotone"
              dataKey={path.id}
              stroke={BRANCH_COLORS[path.id] || path.id === 'branch-race' ? '#dc2626' : '#059669'}
              strokeWidth={2}
              strokeDasharray={path.id === 'branch-race' ? '5 5' : '0'}
              dot={{ fill: BRANCH_COLORS[path.id] || '#8b5cf6', r: 4 }}
              activeDot={{ r: 6 }}
              name={path.id}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {hasBranchingParameters && (
        <div className="branch-indicator" style={{
          marginTop: '8px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.6)',
          fontStyle: 'italic'
        }}>
          ↳ Branching point: {branchDate}
        </div>
      )}
    </div>
  );
}
