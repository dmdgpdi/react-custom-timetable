import { MILLISECONDS_IN_DAY } from '@/constants';

/**
 * Calculates the percentage of the target time within the given time range.
 *
 * @param {Object} params - The parameters for the calculation
 * @param {Date} params.startTime - The start time of the overall time range
 * @param {Date} params.endTime - The end time of the overall time range
 * @param {Date} params.targetStartTime - The start time of the target period
 * @param {Date} params.targetEndTime - The end time of the target period
 * @returns {number} The percentage of the target time relative to the overall time range
 *
 * @example
 * const result = getTargetHeightPercent({
 *   startTime: new Date(2023, 0, 1, 9, 0), // 09:00
 *   endTime: new Date(2023, 0, 1, 17, 0), // 17:00
 *   targetStartTime: new Date(2023, 0, 1, 10, 0), // 10:00
 *   targetEndTime: new Date(2023, 0, 1, 12, 0), // 12:00
 * });
 * console.log(result); // 25 (2 hours / 8 hours * 100)
 */
export const getTargetHeightPercent = ({
  startTime,
  endTime,
  targetStartTime,
  targetEndTime,
}: CalculateTargetPositionParams) => {
  const startMilliseconds = startTime.getTime();
  const endMilliseconds = endTime.getTime();
  let targetStartMilliseconds = targetStartTime.getTime();
  let targetEndMilliseconds = targetEndTime.getTime();

  // Calculate slot time
  let slotTime = endMilliseconds - startMilliseconds;
  if (slotTime < 0) {
    slotTime += MILLISECONDS_IN_DAY;
  }

  // Adjust target times if they cross midnight
  if (targetStartMilliseconds < startMilliseconds) {
    targetStartMilliseconds += MILLISECONDS_IN_DAY;
  }
  if (targetEndMilliseconds < targetStartMilliseconds) {
    targetEndMilliseconds += MILLISECONDS_IN_DAY;
  }

  // Calculate target time
  const targetTime = targetEndMilliseconds - targetStartMilliseconds;

  return (targetTime / slotTime) * 100;
};

interface CalculateTargetPositionParams {
  startTime: Date;
  endTime: Date;
  targetStartTime: Date;
  targetEndTime: Date;
}
