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
import type { ScenarioParameter } from '../types/scenario';

interface ScenarioParameterChartProps {
  parameter: ScenarioParameter;
}

export default function ScenarioParameterChart({ parameter }: ScenarioParameterChartProps) {
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
