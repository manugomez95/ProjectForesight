import type { TimelinePeriod, Milestone } from '../types/scenario';
import { useState } from 'react';
import { getMilestoneDefinition } from '../data/repository/milestones';
import { getParameterDefinition } from '../data/repository/parameters';

interface TimelineViewProps {
  periods: TimelinePeriod[];
  milestones: Milestone[];
  branchName?: string;
}

export default function TimelineView({ periods, milestones, branchName }: TimelineViewProps) {
  const [expandedPeriods, setExpandedPeriods] = useState<Set<string>>(new Set());

  const togglePeriod = (periodId: string) => {
    const newExpanded = new Set(expandedPeriods);
    if (newExpanded.has(periodId)) {
      newExpanded.delete(periodId);
    } else {
      newExpanded.add(periodId);
    }
    setExpandedPeriods(newExpanded);
  };

  const formatStatus = (status?: string): string => {
    if (!status) return 'Unknown';
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getStatusEmoji = (status?: string): string => {
    switch (status) {
      case 'achieved': return '✅';
      case 'in-progress': return '🔄';
      case 'not-achieved': return '⏸️';
      default: return '❓';
    }
  };

  return (
    <div className="timeline-view">
      {branchName && (
        <div className="branch-header">
          <h3>{branchName}</h3>
        </div>
      )}

      <div className="timeline-container">
        {periods.map((period, index) => {
          const isExpanded = expandedPeriods.has(period.id);
          const periodMilestones = milestones.filter(m => {
            const mDate = new Date(m.date);
            const pStart = new Date(period.startDate);
            const pEnd = new Date(period.endDate);
            return mDate >= pStart && mDate <= pEnd;
          });

          return (
            <div key={period.id} className="timeline-period">
              <div className="period-connector">
                {index > 0 && <div className="connector-line" />}
                <div className="period-dot" />
              </div>

              <div className="period-card" onClick={() => togglePeriod(period.id)}>
                <div className="period-header">
                  <div className="period-date">
                    {period.startDate} → {period.endDate}
                  </div>
                  <h4 className="period-title">{period.title}</h4>
                  <div className="expand-icon">{isExpanded ? '−' : '+'}</div>
                </div>

                {isExpanded && (
                  <div className="period-content">
                    <div className="period-narrative">
                      <p>{period.narrative}</p>
                    </div>

                    {period.keyEvents.length > 0 && (
                      <div className="period-events">
                        <h5>Key Events:</h5>
                        <ul>
                          {period.keyEvents.map((event, i) => (
                            <li key={i}>{event}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {period.metrics && Object.keys(period.metrics).length > 0 && (
                      <div className="period-metrics">
                        <h5>Metrics:</h5>
                        <div className="metrics-grid">
                          {Object.entries(period.metrics).map(([key, value]) => {
                            const parameterDefinition = getParameterDefinition(key);
                            const currentValue = parameterDefinition?.currentValue;

                            return (
                              <div key={key} className="metric-item has-tooltip">
                                <span className="metric-key">{parameterDefinition?.name || key}:</span>
                                <span className="metric-value">{value}</span>
                                {currentValue && (
                                  <div className="tooltip">
                                    <div className="tooltip-row">
                                      <strong>Current Value:</strong>
                                      <span>{currentValue}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {periodMilestones.length > 0 && (
                      <div className="period-milestones">
                        <h5>Milestones:</h5>
                        {periodMilestones.map((milestone) => {
                          const milestoneDefinition = getMilestoneDefinition(milestone.id);
                          const currentStatus = milestoneDefinition?.currentStatus;

                          return (
                            <div
                              key={milestone.id}
                              className={`milestone-badge ${milestone.significance} has-tooltip`}
                            >
                              <span className="milestone-title">{milestone.title}</span>
                              <span className="milestone-date">{milestone.date}</span>
                              <div className="tooltip">
                                <div className="tooltip-row">
                                  <strong>Current Status:</strong>
                                  <span>{getStatusEmoji(currentStatus)} {formatStatus(currentStatus)}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
