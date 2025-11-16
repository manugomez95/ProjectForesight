import { useState } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
  ComposedChart,
} from 'recharts';
import { getAllParameters, scenarios } from '../data/scenarios';
import { expandParameterWithBranching, mergeExpandedParameters } from '../utils/parameterUtils';

type ComparisonData = {
  chartData: Array<{ date: string; [key: string]: string | number }>;
  metricData: Array<{ date: string; value: number; scenario: string }>;
  paths: Array<{
    pathId: string;
    pathName: string;
    color: string;
  }>;
};

export default function ParameterComparisonView() {
  const allParameters = getAllParameters();

  console.log('All Parameters:', allParameters.length);
  console.log('First 3 parameters:', allParameters.slice(0, 3));

  const [selectedParameterName, setSelectedParameterName] = useState<string>(
    allParameters[0]?.name || ''
  );

  const selectedParameter = allParameters.find(p => p.name === selectedParameterName);

  // Get all data points for the selected parameter across scenarios
  const getComparisonData = (): ComparisonData => {
    if (!selectedParameter) {
      return { chartData: [], metricData: [], paths: [] };
    }

    // Expand parameters to include branch-specific data
    const expandedParams = selectedParameter.parameterIds.map(({ scenarioId, parameterId }) => {
      const scenario = scenarios.find(s => s.id === scenarioId);
      const parameter = scenario?.parameters.find(p => p.id === parameterId);

      if (!scenario || !parameter) {
        return null;
      }

      return expandParameterWithBranching(scenario, parameter);
    }).filter((ep): ep is NonNullable<typeof ep> => ep !== null);

    // Merge all expanded parameters into a single dataset
    const { chartData, paths } = mergeExpandedParameters(expandedParams);

    // Extract metrics from timeline periods
    const metricData: Array<{ date: string; value: number; scenario: string }> = [];

    selectedParameter.parameterIds.forEach(({ scenarioId, parameterId }) => {
      const scenario = scenarios.find(s => s.id === scenarioId);
      if (!scenario) return;

      // Extract metrics from main timeline periods
      scenario.periods.forEach(period => {
        if (period.metrics && period.metrics[parameterId] !== undefined) {
          metricData.push({
            date: period.startDate,
            value: period.metrics[parameterId] as number,
            scenario: scenario.title,
          });
        }
      });

      // Extract metrics from branch path periods
      if (scenario.branches) {
        scenario.branches.forEach(branch => {
          branch.paths.forEach(path => {
            path.periods.forEach(period => {
              if (period.metrics && period.metrics[parameterId] !== undefined) {
                metricData.push({
                  date: period.startDate,
                  value: period.metrics[parameterId] as number,
                  scenario: `${scenario.title}: ${path.name}`,
                });
              }
            });
          });
        });
      }
    });

    return { chartData, metricData, paths };
  };

  const { chartData, metricData, paths } = getComparisonData();

  console.log('Selected Parameter:', selectedParameter?.name);
  console.log('Chart Data rows:', chartData.length);
  console.log('Paths:', paths.length);
  console.log('Metric Data:', metricData.length);
  if (chartData.length > 0) console.log('Sample chart data:', chartData[0]);
  if (paths.length > 0) console.log('Sample path:', paths[0]);

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
              <ComposedChart
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
                    if (name === 'metricPoints') {
                      return [`${value} ${selectedParameter.unit}`, 'Period Metric'];
                    }
                    const path = paths.find(p => p.pathId === name);
                    return [
                      `${value} ${selectedParameter.unit}`,
                      path?.pathName || name,
                    ];
                  }}
                />
                <Legend
                  formatter={(value: string) => {
                    if (value === 'metricPoints') return 'Period Metrics';
                    const path = paths.find(p => p.pathId === value);
                    return path?.pathName || value;
                  }}
                />
                {paths.map((path) => (
                  <Line
                    key={path.pathId}
                    type="monotone"
                    dataKey={path.pathId}
                    stroke={path.color}
                    strokeWidth={2.5}
                    dot={{ fill: path.color, r: 4 }}
                    activeDot={{ r: 6 }}
                    name={path.pathId}
                    connectNulls
                  />
                ))}
                {metricData.length > 0 && (
                  <Scatter
                    data={metricData}
                    name="metricPoints"
                    fill="#f59e0b"
                    shape="diamond"
                    legendType="diamond"
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="scenario-list">
            <h4>Paths Included:</h4>
            <ul>
              {paths.map((path) => (
                <li key={path.pathId} style={{ color: path.color }}>
                  <strong>{path.pathName}</strong>
                </li>
              ))}
            </ul>
            {metricData.length > 0 && (
              <div className="metric-info">
                <p style={{ marginTop: '1rem', color: '#f59e0b' }}>
                  <strong>◆ Period Metrics ({metricData.length} points)</strong>: Discrete snapshots from timeline periods
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
