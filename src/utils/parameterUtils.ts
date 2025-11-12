import type { AIScenario, ScenarioParameter } from '../types/scenario';

/**
 * Branch path colors for consistent visualization
 */
export const BRANCH_COLORS: Record<string, string> = {
  'branch-race': '#dc2626', // Red for catastrophic race ending
  'branch-slowdown': '#059669', // Green for prosperity ending
};

/**
 * Represents parameter data expanded to include branch-specific trajectories
 */
export interface ExpandedParameterData {
  parameterId: string;
  parameterName: string;
  paths: Array<{
    pathId: string;
    pathName: string;
    color: string;
    data: Array<{
      date: string;
      value: number;
      label?: string;
    }>;
  }>;
}

/**
 * Expands a parameter to include data from all branch paths.
 * For scenarios with branching, this merges the base timeline with each branch's trajectory.
 * For non-branching scenarios, returns a single path with the parameter's data.
 */
export function expandParameterWithBranching(
  scenario: AIScenario,
  parameter: ScenarioParameter
): ExpandedParameterData {
  // Check if this scenario has branching with parameters
  const hasBranchingParameters =
    scenario.hasBranching &&
    scenario.branches?.[0]?.paths.some(path =>
      path.parameters?.some(p => p.id === parameter.id)
    );

  if (!hasBranchingParameters) {
    // Simple case: no branching, return single path
    return {
      parameterId: parameter.id,
      parameterName: parameter.name,
      paths: [
        {
          pathId: scenario.id,
          pathName: scenario.title,
          color: parameter.color || '#8b5cf6',
          data: parameter.data,
        },
      ],
    };
  }

  // Complex case: scenario has branching
  const branchDate = scenario.branches![0].branchDate;
  const baseData = parameter.data.filter(point => point.date <= branchDate);
  const branchPaths = scenario.branches![0].paths;

  // Create a path for each branch
  const paths = branchPaths.map(branchPath => {
    const pathParam = branchPath.parameters?.find(p => p.id === parameter.id);
    const branchSpecificData = pathParam?.data || [];

    // Merge base data + branch-specific data
    const mergedData = [
      ...baseData,
      ...branchSpecificData.filter(point => point.date > branchDate),
    ].sort((a, b) => a.date.localeCompare(b.date));

    const pathColor = BRANCH_COLORS[branchPath.id] ||
      (branchPath.id.includes('race') ? '#dc2626' : '#059669');

    return {
      pathId: `${scenario.id}-${branchPath.id}`,
      pathName: `${scenario.title}: ${branchPath.name}`,
      color: pathColor,
      data: mergedData,
    };
  });

  return {
    parameterId: parameter.id,
    parameterName: parameter.name,
    paths,
  };
}

/**
 * Merges multiple expanded parameters into a single chart dataset.
 * Used for parameter comparison views where multiple scenarios/paths are shown together.
 */
export function mergeExpandedParameters(
  expandedParams: ExpandedParameterData[]
): {
  chartData: Array<{ date: string; [pathId: string]: string | number }>;
  paths: Array<{ pathId: string; pathName: string; color: string }>;
} {
  const dateMap = new Map<string, Record<string, number>>();
  const paths: Array<{ pathId: string; pathName: string; color: string }> = [];

  // Collect all paths and their data
  expandedParams.forEach(expandedParam => {
    expandedParam.paths.forEach(path => {
      paths.push({
        pathId: path.pathId,
        pathName: path.pathName,
        color: path.color,
      });

      path.data.forEach(point => {
        if (!dateMap.has(point.date)) {
          dateMap.set(point.date, {});
        }
        const dateData = dateMap.get(point.date)!;
        dateData[path.pathId] = point.value;
      });
    });
  });

  // Convert to array format for Recharts
  const chartData = Array.from(dateMap.entries())
    .map(([date, values]) => ({
      date,
      ...values,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return { chartData, paths };
}

/**
 * Creates chart data for a single parameter with branching.
 * Returns data in format suitable for Recharts where each branch is a separate series.
 */
export function createBranchingChartData(
  scenario: AIScenario,
  parameter: ScenarioParameter
): {
  chartData: Array<{ date: string; [pathId: string]: string | number }>;
  branchPaths: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  branchDate?: string;
} {
  const hasBranchingParameters =
    scenario.hasBranching &&
    scenario.branches?.[0]?.paths.some(path =>
      path.parameters?.some(p => p.id === parameter.id)
    );

  if (!hasBranchingParameters) {
    // No branching - return simple single-path data
    const chartData = parameter.data.map(point => ({
      date: point.date,
      value: point.value,
    }));

    return {
      chartData,
      branchPaths: [],
    };
  }

  // Has branching - create merged dataset
  const branchDate = scenario.branches![0].branchDate;
  const baseData = parameter.data.filter(point => point.date <= branchDate);
  const branchPaths = scenario.branches![0].paths;

  const dateMap = new Map<string, any>();

  // Add base data to all paths (shared history)
  baseData.forEach(point => {
    const dataPoint: any = { date: point.date, label: point.label };
    branchPaths.forEach(path => {
      dataPoint[path.id] = point.value;
    });
    dateMap.set(point.date, dataPoint);
  });

  // Add branch-specific data
  branchPaths.forEach(path => {
    const pathParam = path.parameters?.find(p => p.id === parameter.id);
    if (pathParam) {
      pathParam.data.forEach(point => {
        const existing = dateMap.get(point.date) || { date: point.date };
        existing[path.id] = point.value;
        existing[`${path.id}_label`] = point.label;
        dateMap.set(point.date, existing);
      });
    }
  });

  const chartData = Array.from(dateMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  const branchPathsWithColors = branchPaths.map(path => ({
    id: path.id,
    name: path.name,
    color: BRANCH_COLORS[path.id] || (path.id.includes('race') ? '#dc2626' : '#059669'),
  }));

  return {
    chartData,
    branchPaths: branchPathsWithColors,
    branchDate,
  };
}
