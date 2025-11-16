import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { ScenarioParameter, AIScenario } from '../types/scenario';
import { createBranchingChartData } from '../utils/parameterUtils';
import { getYAxisProps, formatTickValue, formatTooltipValue } from '../utils/chartUtils';
import ScaleToggleButton from './ScaleToggleButton';

interface ScenarioParameterChartProps {
  parameter: ScenarioParameter;
  scenario?: AIScenario;
}

export default function ScenarioParameterChart({ parameter, scenario }: ScenarioParameterChartProps) {
  const [isLogScale, setIsLogScale] = useState(false);
  if (!scenario) {
    // No scenario provided, render simple chart
    const chartData = parameter.data.map((point) => ({
      date: point.date,
      value: point.value,
      label: point.label || '',
    }));

    return (
      <div className="parameter-chart">
        <div className="chart-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4>{parameter.name}</h4>
              <p className="chart-description">{parameter.description}</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
          <ScaleToggleButton
            isLogScale={isLogScale}
            onToggle={() => setIsLogScale(!isLogScale)}
          />
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
              {...getYAxisProps(isLogScale)}
              tickFormatter={(value) => formatTickValue(value, isLogScale)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [
                `${formatTooltipValue(value)} ${parameter.unit}`,
                parameter.name
              ]}
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

  // Use utility function to handle branching logic
  const { chartData, branchPaths, branchDate } = createBranchingChartData(scenario, parameter);

  // Simple case: no branching
  if (branchPaths.length === 0) {
    return (
      <div className="parameter-chart">
      <div className="chart-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h4>{parameter.name}</h4>
            <p className="chart-description">{parameter.description}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
        <ScaleToggleButton
          isLogScale={isLogScale}
          onToggle={() => setIsLogScale(!isLogScale)}
        />
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
              {...getYAxisProps(isLogScale)}
              tickFormatter={(value) => formatTickValue(value, isLogScale)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [
                `${formatTooltipValue(value)} ${parameter.unit}`,
                parameter.name
              ]}
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

  return (
    <div className="parameter-chart">
      <div className="chart-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h4>{parameter.name}</h4>
            <p className="chart-description">{parameter.description}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
        <ScaleToggleButton
          isLogScale={isLogScale}
          onToggle={() => setIsLogScale(!isLogScale)}
        />
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
            {...getYAxisProps(isLogScale)}
            tickFormatter={(value) => formatTickValue(value, isLogScale)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
            }}
            formatter={(value: number, name: string) => {
              const pathName = branchPaths.find(p => p.id === name)?.name || parameter.name;
              return [`${formatTooltipValue(value)} ${parameter.unit}`, pathName];
            }}
          />
          <Legend
            formatter={(value: string) => {
              const path = branchPaths.find(p => p.id === value);
              return path?.name || value;
            }}
          />

          {/* Mark the branching point with a vertical line */}
          <ReferenceLine
            x={branchDate}
            stroke="rgba(255,255,255,0.3)"
            strokeDasharray="3 3"
            label={{
              value: '⚡ Branch',
              position: 'top',
              fill: 'rgba(255,255,255,0.6)',
              fontSize: 11
            }}
          />

          {/* Render one continuous line per branch path */}
          {branchPaths.map((path) => (
            <Line
              key={path.id}
              type="monotone"
              dataKey={path.id}
              stroke={path.color}
              strokeWidth={2.5}
              dot={{ fill: path.color, r: 4 }}
              activeDot={{ r: 6 }}
              name={path.id}
              connectNulls={true}
            />
          ))}
        </LineChart>
        </ResponsiveContainer>

      {branchDate && (
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
