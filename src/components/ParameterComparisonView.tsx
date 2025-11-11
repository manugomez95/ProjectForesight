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
} from 'recharts';
import { getAllParameters, scenarios } from '../data/scenarios';
import type { AIScenario, ScenarioParameter } from '../types/scenario';

type ComparisonData = {
  chartData: Array<{ date: string; [key: string]: string | number }>;
  scenariosWithParameter: Array<{
    scenario: AIScenario;
    parameter: ScenarioParameter;
  }>;
};

export default function ParameterComparisonView() {
  const allParameters = getAllParameters();
  const [selectedParameterName, setSelectedParameterName] = useState<string>(
    allParameters[0]?.name || ''
  );

  const selectedParameter = allParameters.find(p => p.name === selectedParameterName);

  // Get all data points for the selected parameter across scenarios
  const getComparisonData = (): ComparisonData => {
    if (!selectedParameter) {
      return { chartData: [], scenariosWithParameter: [] };
    }

    // Collect all scenarios that have this parameter
    const scenariosWithParameter: Array<{
      scenario: AIScenario;
      parameter: ScenarioParameter;
    }> = [];

    selectedParameter.parameterIds.forEach(({ scenarioId, parameterId }) => {
      const scenario = scenarios.find(s => s.id === scenarioId);
      const parameter = scenario?.parameters.find(p => p.id === parameterId);
      if (scenario && parameter) {
        scenariosWithParameter.push({ scenario, parameter });
      }
    });

    // Merge data points from all scenarios
    const dateMap = new Map<string, Record<string, number>>();

    scenariosWithParameter.forEach(({ scenario, parameter }) => {
      parameter.data.forEach(point => {
        if (!dateMap.has(point.date)) {
          dateMap.set(point.date, {});
        }
        const dateData = dateMap.get(point.date)!;
        dateData[scenario.id] = point.value;
      });
    });

    // Convert to array format for Recharts
    const chartData = Array.from(dateMap.entries())
      .map(([date, values]) => ({
        date,
        ...values,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return { chartData, scenariosWithParameter };
  };

  const { chartData, scenariosWithParameter } = getComparisonData();

  // Color palette for different scenarios
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

  return (
    <div className="parameter-comparison-view">
      <div className="comparison-header">
        <div>
          <h2>Parameter Comparison</h2>
          <p className="subtitle">
            Compare how different parameters evolve across all scenarios
          </p>
        </div>

        <div className="parameter-selector">
          <label htmlFor="parameter-select">Select Parameter:</label>
          <select
            id="parameter-select"
            value={selectedParameterName}
            onChange={(e) => setSelectedParameterName(e.target.value)}
            className="parameter-select"
          >
            {allParameters.map((param) => (
              <option key={param.name} value={param.name}>
                {param.name} ({param.scenarioCount} scenario{param.scenarioCount > 1 ? 's' : ''})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedParameter && (
        <div className="comparison-content">
          <div className="parameter-info">
            <h3>{selectedParameter.name}</h3>
            <p className="parameter-description">{selectedParameter.description}</p>
            <p className="parameter-unit">
              Unit: <strong>{selectedParameter.unit}</strong>
            </p>
            <p className="scenario-count">
              Available in <strong>{selectedParameter.scenarioCount}</strong> scenario
              {selectedParameter.scenarioCount > 1 ? 's' : ''}
            </p>
          </div>

          <div className="comparison-chart">
            <ResponsiveContainer width="100%" height={500}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '12px' }}
                  label={{ value: 'Date', position: 'insideBottom', offset: -10 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '12px' }}
                  label={{
                    value: selectedParameter.unit,
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number, name: string) => {
                    const scenario = scenarios.find(s => s.id === name);
                    return [
                      `${value} ${selectedParameter.unit}`,
                      scenario?.title || name,
                    ];
                  }}
                />
                <Legend
                  formatter={(value: string) => {
                    const scenario = scenarios.find(s => s.id === value);
                    return scenario?.title || value;
                  }}
                />
                {scenariosWithParameter.map(({ scenario, parameter }: { scenario: AIScenario; parameter: ScenarioParameter }, index: number) => (
                  <Line
                    key={scenario.id}
                    type="monotone"
                    dataKey={scenario.id}
                    stroke={parameter.color || colors[index % colors.length]}
                    strokeWidth={2}
                    dot={{ fill: parameter.color || colors[index % colors.length], r: 4 }}
                    activeDot={{ r: 6 }}
                    name={scenario.id}
                    connectNulls
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="scenario-list">
            <h4>Scenarios Included:</h4>
            <ul>
              {scenariosWithParameter.map(({ scenario }: { scenario: AIScenario }) => (
                <li key={scenario.id}>
                  <strong>{scenario.title}</strong> by {scenario.author} ({scenario.scenarioType})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
