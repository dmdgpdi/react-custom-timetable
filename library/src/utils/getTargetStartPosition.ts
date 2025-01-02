import { MILLISECONDS_IN_DAY } from '@/constants';

/**
 * Calculates the start position of a target time within a given time slot as a percentage.
 *
 * @param {Object} params - The parameters for the calculation
 * @param {Date} params.startTime - The start time of the overall time slot
 * @param {Date} params.endTime - The end time of the overall time slot
 * @param {Date} params.targetStartTime - The start time of the target period
 * @returns {number} The start position of the target time as a percentage of the overall time slot
 *
 * @example
 * const result = getTargetStartPosition({
 *   startTime: new Date(2023, 0, 1, 9, 0), // 09:00
 *   endTime: new Date(2023, 0, 1, 17, 0), // 17:00
 *   targetStartTime: new Date(2023, 0, 1, 13, 0), // 13:00
 * });
 * console.log(result); // 50 (4 hours / 8 hours * 100)
 */
export const getTargetStartPosition = ({
  startTime,
  endTime,
  targetStartTime,
}: CalculateTargetStartPositionParams): number => {
  const startMilliseconds = startTime.getTime();
  const endMilliseconds = endTime.getTime();
  let targetStartMilliseconds = targetStartTime.getTime();

  // Calculate the total duration of the time slot
  let slotTime = endMilliseconds - startMilliseconds;
  if (slotTime < 0) {
    slotTime += MILLISECONDS_IN_DAY;
  }

  // Adjust the target start time if it's before the slot start time (crossing midnight)
  if (targetStartMilliseconds < startMilliseconds) {
    targetStartMilliseconds += MILLISECONDS_IN_DAY;
  }

  // Calculate the start position as a percentage
  const startPositionPercent =
    ((targetStartMilliseconds - startMilliseconds) / slotTime) * 100;

  return startPositionPercent;
};

interface CalculateTargetStartPositionParams {
  startTime: Date;
  endTime: Date;
  targetStartTime: Date;
}
