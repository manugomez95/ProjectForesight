import type { AIScenario, FlexibleScenario } from '../types/scenario';
import { useState, useMemo } from 'react';
import TimelineView from './TimelineView';
import BranchingView from './BranchingView';
import ScenarioParameterChart from './ScenarioParameterChart';
import { getAllAssumptions } from '../utils/resolveAssumptions';

interface ScenarioViewerProps {
  scenario: FlexibleScenario;
}

type ViewMode = 'timeline' | 'parameters' | 'assumptions' | 'outcomes';

export default function ScenarioViewer({ scenario }: ScenarioViewerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');

  // Resolve assumptions from both inline and repository references
  const assumptions = useMemo(() => {
    const aiScenario = scenario as AIScenario;
    const repoScenario = scenario as any; // RepositoryBasedScenario
    return getAllAssumptions(aiScenario.assumptions, repoScenario.assumptionRefs);
  }, [scenario]);

  return (
    <div className="scenario-viewer">
      <div className="view-mode-selector">
        <button
          className={`view-mode-button ${viewMode === 'timeline' ? 'active' : ''}`}
          onClick={() => setViewMode('timeline')}
        >
          📅 Timeline
        </button>
        <button
          className={`view-mode-button ${viewMode === 'parameters' ? 'active' : ''}`}
          onClick={() => setViewMode('parameters')}
        >
          📊 Parameters
        </button>
        <button
          className={`view-mode-button ${viewMode === 'assumptions' ? 'active' : ''}`}
          onClick={() => setViewMode('assumptions')}
        >
          🔍 Assumptions
        </button>
        <button
          className={`view-mode-button ${viewMode === 'outcomes' ? 'active' : ''}`}
          onClick={() => setViewMode('outcomes')}
        >
          🎯 Outcomes
        </button>
      </div>

      <div className="view-content">
        {viewMode === 'timeline' && (
          <div className="timeline-section">
            <TimelineView periods={scenario.periods} milestones={scenario.milestones} />

            {scenario.hasBranching && scenario.branches && (
              <div className="branches-section">
                <h3>Scenario Branches</h3>
                {scenario.branches.map((branch) => (
                  <BranchingView key={branch.id} branch={branch} />
                ))}
              </div>
            )}
          </div>
        )}

        {viewMode === 'parameters' && (
          <div className="parameters-section">
            <h3>Tracked Parameters</h3>
            <div className="parameters-grid">
              {scenario.parameters.map((parameter) => (
                <ScenarioParameterChart key={parameter.id} parameter={parameter} scenario={scenario} />
              ))}
            </div>
          </div>
        )}

        {viewMode === 'assumptions' && (
          <div className="assumptions-section">
            <h3>Key Assumptions</h3>
            {assumptions.length === 0 ? (
              <p className="no-data">No assumptions specified for this scenario.</p>
            ) : (
              <div className="assumptions-list">
                {assumptions.map((assumption) => (
                  <div key={assumption.id} className="assumption-card">
                    <div className="assumption-header">
                      <span className={`badge ${assumption.category}`}>
                        {assumption.category}
                      </span>
                      <div className="assumption-badges">
                        <span className={`badge confidence-${assumption.confidence}`}>
                          Confidence: {assumption.confidence}
                        </span>
                        <span className={`badge impact-${assumption.impact}`}>
                          Impact: {assumption.impact}
                        </span>
                      </div>
                    </div>
                    <p className="assumption-description">{assumption.description}</p>
                  </div>
                ))}
              </div>
            )}

            {scenario.openQuestions && scenario.openQuestions.length > 0 && (
              <div className="open-questions">
                <h4>Open Questions</h4>
                <ul>
                  {scenario.openQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {viewMode === 'outcomes' && (
          <div className="outcomes-section">
            <h3>Scenario Outcomes</h3>
            {Array.isArray(scenario.outcomes) ? (
              <div className="outcomes-list">
                {scenario.outcomes.map((outcome, index) => (
                  <div key={index} className="outcome-card">
                    <h4>Outcome {index + 1}</h4>
                    <div className="outcome-metrics">
                      <div className="outcome-metric">
                        <span className="metric-label">Alignment:</span>
                        <span className={`badge ${outcome.alignmentStatus}`}>
                          {outcome.alignmentStatus}
                        </span>
                      </div>
                      <div className="outcome-metric">
                        <span className="metric-label">Control:</span>
                        <span className={`badge ${outcome.controlStatus}`}>
                          {outcome.controlStatus}
                        </span>
                      </div>
                      <div className="outcome-metric">
                        <span className="metric-label">Human Outcome:</span>
                        <span className={`badge ${outcome.humanOutcome}`}>
                          {outcome.humanOutcome}
                        </span>
                      </div>
                      {outcome.winningActor && (
                        <div className="outcome-metric">
                          <span className="metric-label">Winning Actor:</span>
                          <span className="value">{outcome.winningActor}</span>
                        </div>
                      )}
                    </div>
                    <p className="outcome-description">{outcome.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="outcome-card">
                <div className="outcome-metrics">
                  <div className="outcome-metric">
                    <span className="metric-label">Alignment:</span>
                    <span className={`badge ${scenario.outcomes.alignmentStatus}`}>
                      {scenario.outcomes.alignmentStatus}
                    </span>
                  </div>
                  <div className="outcome-metric">
                    <span className="metric-label">Control:</span>
                    <span className={`badge ${scenario.outcomes.controlStatus}`}>
                      {scenario.outcomes.controlStatus}
                    </span>
                  </div>
                  <div className="outcome-metric">
                    <span className="metric-label">Human Outcome:</span>
                    <span className={`badge ${scenario.outcomes.humanOutcome}`}>
                      {scenario.outcomes.humanOutcome}
                    </span>
                  </div>
                  {scenario.outcomes.winningActor && (
                    <div className="outcome-metric">
                      <span className="metric-label">Winning Actor:</span>
                      <span className="value">{scenario.outcomes.winningActor}</span>
                    </div>
                  )}
                </div>
                <p className="outcome-description">{scenario.outcomes.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
