import type { AIScenario } from '../types/scenario';

interface ScenarioSelectorProps {
  scenarios: AIScenario[];
  selectedScenarioId: string;
  onSelectScenario: (scenarioId: string) => void;
}

export default function ScenarioSelector({
  scenarios,
  selectedScenarioId,
  onSelectScenario,
}: ScenarioSelectorProps) {
  const selectedScenario = scenarios.find(s => s.id === selectedScenarioId);

  return (
    <div className="scenario-selector">
      <div className="selector-header">
        <h2>AI Forecast Scenarios</h2>
        <p className="subtitle">Compare and explore different AI future timelines</p>
      </div>

      <div className="scenario-dropdown">
        <label htmlFor="scenario-select">Select Scenario:</label>
        <select
          id="scenario-select"
          value={selectedScenarioId}
          onChange={(e) => onSelectScenario(e.target.value)}
          className="scenario-select"
        >
          {scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.title} - {scenario.author} ({scenario.scenarioType})
            </option>
          ))}
        </select>
      </div>

      {selectedScenario && (
        <div className="scenario-info">
          <div className="info-row">
            <span className="label">Author:</span>
            <span className="value">{selectedScenario.author}</span>
          </div>
          <div className="info-row">
            <span className="label">Source:</span>
            <span className="value">
              {selectedScenario.sourceUrl ? (
                <a href={selectedScenario.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {selectedScenario.source}
                </a>
              ) : (
                selectedScenario.source
              )}
            </span>
          </div>
          <div className="info-row">
            <span className="label">Type:</span>
            <span className={`badge ${selectedScenario.scenarioType}`}>
              {selectedScenario.scenarioType}
            </span>
          </div>
          <div className="info-row">
            <span className="label">Timeline:</span>
            <span className="value">
              {selectedScenario.timelineStart} → {selectedScenario.timelineEnd}
            </span>
          </div>
          {selectedScenario.hasBranching && (
            <div className="info-row">
              <span className="badge branching">Branching Scenario</span>
            </div>
          )}
        </div>
      )}

      {selectedScenario && (
        <div className="scenario-summary">
          <h3>Summary</h3>
          <p>{selectedScenario.summary}</p>
        </div>
      )}
    </div>
  );
}
