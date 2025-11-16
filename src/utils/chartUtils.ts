/**
 * Chart utility functions for logarithmic scale support and value formatting
 */

/**
 * Get YAxis props for logarithmic or linear scale
 */
export function getYAxisProps(isLogScale: boolean) {
  return {
    scale: isLogScale ? ('log' as const) : ('linear' as const),
    domain: isLogScale ? (['auto', 'auto'] as const) : undefined,
  };
}

/**
 * Format large numbers with SI prefixes (K, M, G, T, P, E, Z, Y)
 * Especially useful for FLOP values
 */
export function formatWithSIPrefix(value: number, precision: number = 2): string {
  if (value === 0) return '0';

  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  const prefixes = [
    { threshold: 1e24, suffix: 'Y' }, // Yotta
    { threshold: 1e21, suffix: 'Z' }, // Zetta
    { threshold: 1e18, suffix: 'E' }, // Exa
    { threshold: 1e15, suffix: 'P' }, // Peta
    { threshold: 1e12, suffix: 'T' }, // Tera
    { threshold: 1e9, suffix: 'G' },  // Giga
    { threshold: 1e6, suffix: 'M' },  // Mega
    { threshold: 1e3, suffix: 'K' },  // Kilo
  ];

  for (const { threshold, suffix } of prefixes) {
    if (absValue >= threshold) {
      const scaled = absValue / threshold;
      // Remove trailing zeros and decimal point if not needed
      const formatted = scaled.toFixed(precision).replace(/\.?0+$/, '');
      return `${sign}${formatted}${suffix}`;
    }
  }

  return sign + absValue.toLocaleString();
}

/**
 * Format tick values for display
 * Uses SI prefixes for large numbers, regular formatting for small numbers
 */
export function formatTickValue(value: number, isLogScale: boolean): string {
  if (isLogScale && value >= 1000) {
    return formatWithSIPrefix(value, 1);
  }
  if (value >= 1000) {
    return formatWithSIPrefix(value, 1);
  }
  return value.toLocaleString();
}

/**
 * Format tooltip values for display
 * More precision than tick values
 */
export function formatTooltipValue(value: number): string {
  if (value >= 1000) {
    return formatWithSIPrefix(value, 2);
  }
  return value.toLocaleString();
}
