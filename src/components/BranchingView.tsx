import type { Branch } from '../types/scenario';
import { useState } from 'react';
import TimelineView from './TimelineView';

interface BranchingViewProps {
  branch: Branch;
}

export default function BranchingView({ branch }: BranchingViewProps) {
  const [selectedPath, setSelectedPath] = useState<string>(branch.paths[0].id);

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
          {currentPath.description && (
            <p className="path-description">{currentPath.description}</p>
          )}

          {currentPath.outcome && (
            <div className="path-outcome">
              <h4>Outcome:</h4>
              <p>{currentPath.outcome}</p>
            </div>
          )}

          <div className="path-timeline">
            <TimelineView
              periods={currentPath.periods}
              milestones={currentPath.milestones}
            />
          </div>
        </div>
      )}
    </div>
  );
}
