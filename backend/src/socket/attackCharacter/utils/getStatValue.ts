/**
 * Returns the value of a statistic based on the current HP percentage and the statistic's name.
 *
 * - If `currentHPPercentage` is less than 0, returns `Math.floor(baseStatValue / 3)`.
 * - If `currentHPPercentage` is less than 50 and the statistic is one of the `deepWoundsAffectedStats`
 *   (`"reflex"`, `"will"`, `"dexterity"`, or `"intelligence"`), returns `Math.floor(baseStatValue / 2)`.
 * - Otherwise, returns `baseStatValue`.
 *
 * @param params - The properties required to calculate the statistic value.
 * @param params.baseStatValue - The base value of the statistic.
 * @param params.currentHPPercentage - The current HP as a percentage (0-100).
 * @param params.statsName - The name of the statistic.
 * @returns The calculated statistic value based on the provided parameters.
 */
export function getStatValue(
  baseStatValue: number,
  currentHPPercentage: number,
  statsName: string
): number {
  const deepWoundsAffectedStats = [
    "reflex",
    "will",
    "dexterity",
    "intelligence",
  ];

  if (currentHPPercentage < 0) {
    return Math.floor(baseStatValue / 3);
  }
  if (currentHPPercentage < 50 && deepWoundsAffectedStats.includes(statsName)) {
    return Math.floor(baseStatValue / 2);
  }
  return baseStatValue;
}
