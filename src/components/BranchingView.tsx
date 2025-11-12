import type { Branch, AIScenario } from '../types/scenario';
import { useState } from 'react';
import TimelineView from './TimelineView';
import ScenarioParameterChart from './ScenarioParameterChart';

interface BranchingViewProps {
  branch: Branch;
  scenario?: AIScenario;
}

export default function BranchingView({ branch, scenario }: BranchingViewProps) {
  const [selectedPath, setSelectedPath] = useState<string>(branch.paths[0].id);
  const [viewMode, setViewMode] = useState<'timeline' | 'parameters'>('timeline');

  const currentPath = branch.paths.find(p => p.id === selectedPath);

  return (
    <div className="branching-view">
      <div className="branch-point">
        <div className="branch-point-header">
          <h3>⚡ Branching Point</h3>
          <div className="branch-date">{branch.branchDate}</div>
        </div>

        <div className="branch-point-content">
          <div className="trigger-condition">
            <h4>Trigger Condition:</h4>
            <p>{branch.triggerCondition}</p>
          </div>

          <div className="branch-description">
            <p>{branch.description}</p>
          </div>
        </div>
      </div>

      <div className="path-selector">
        <h4>Choose a path:</h4>
        <div className="path-buttons">
          {branch.paths.map((path) => (
            <button
              key={path.id}
              className={`path-button ${selectedPath === path.id ? 'active' : ''}`}
              onClick={() => setSelectedPath(path.id)}
            >
              <div className="path-name">{path.name}</div>
              {path.probability && (
                <div className="path-probability">{(path.probability * 100).toFixed(0)}%</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {currentPath && (
        <div className="path-content">
          <div className="path-header">
            <h3>{currentPath.name}</h3>
            <p className="path-description">{currentPath.description}</p>
          </div>

          <div className="path-outcome">
            <h4>Outcome:</h4>
            <p>{currentPath.outcome}</p>
          </div>

          {/* View mode selector */}
          {currentPath.parameters && currentPath.parameters.length > 0 && (
            <div className="branch-view-mode-selector">
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
            </div>
          )}

          {viewMode === 'timeline' && (
            <div className="path-timeline">
              <TimelineView
                periods={currentPath.periods}
                milestones={currentPath.milestones}
                branchName={currentPath.name}
              />
            </div>
          )}

          {viewMode === 'parameters' && currentPath.parameters && (
            <div className="path-parameters">
              <h4>Parameters for this path</h4>
              <div className="parameters-grid">
                {currentPath.parameters.map((parameter) => (
                  <ScenarioParameterChart
                    key={parameter.id}
                    parameter={parameter}
                    scenario={scenario}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
