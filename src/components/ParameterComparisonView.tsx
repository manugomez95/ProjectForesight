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
import { expandParameterWithBranching, mergeExpandedParameters } from '../utils/parameterUtils';
import { getYAxisProps, formatTickValue, formatTooltipValue } from '../utils/chartUtils';
import ScaleToggleButton from './ScaleToggleButton';

type ComparisonData = {
  chartData: Array<{ date: string; [key: string]: string | number }>;
  paths: Array<{
    pathId: string;
    pathName: string;
    color: string;
  }>;
};

export default function ParameterComparisonView() {
  const allParameters = getAllParameters();
  const [selectedParameterName, setSelectedParameterName] = useState<string>(
    allParameters[0]?.name || ''
  );
  const [isLogScale, setIsLogScale] = useState(false);

  const selectedParameter = allParameters.find(p => p.name === selectedParameterName);

  // Get all data points for the selected parameter across scenarios
  const getComparisonData = (): ComparisonData => {
    if (!selectedParameter) {
      return { chartData: [], paths: [] };
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

    return { chartData, paths };
  };

  const { chartData, paths } = getComparisonData();

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
          <div className="comparison-chart">
            <div className="chart-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4>{selectedParameter.name}</h4>
                  <p className="chart-description">
                    {selectedParameter.description} • Unit: <strong>{selectedParameter.unit}</strong> •
                    Available in <strong>{selectedParameter.scenarioCount}</strong> scenario{selectedParameter.scenarioCount > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
              <ScaleToggleButton
                isLogScale={isLogScale}
                onToggle={() => setIsLogScale(!isLogScale)}
              />
            </div>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart
                  data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="date"
                    stroke="rgba(255,255,255,0.5)"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.5)"
                    style={{ fontSize: '12px' }}
                    label={{
                      value: selectedParameter.unit,
                      angle: -90,
                      position: 'insideLeft',
                    }}
                    {...getYAxisProps(isLogScale)}
                    tickFormatter={(value) => formatTickValue(value, isLogScale)}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.9)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number, name: string) => {
                      const path = paths.find(p => p.pathId === name);
                      return [
                        `${formatTooltipValue(value)} ${selectedParameter.unit}`,
                        path?.pathName || name,
                      ];
                    }}
                  />
                <Legend formatter={(value: string) => {
                  const path = paths.find(p => p.pathId === value);
                  return path?.pathName || value;
                }} />
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
              </LineChart>
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
          </div>
        </div>
      )}
    </div>
  );
}
