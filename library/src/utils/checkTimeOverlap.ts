import { convertToMilliseconds } from './convertToMilliseconds';

export const checkTimeOverlap = (
  startTime1: Date | null,
  endTime1: Date | null,
  startTime2: Date | null,
  endTime2: Date | null,
): boolean => {
  if (!startTime1 || !endTime1 || !startTime2 || !endTime2) {
    return false;
  }
  const startTime1Milliseconds = convertToMilliseconds(startTime1);
  const endTime1Milliseconds = convertToMilliseconds(endTime1);
  const startTime2Milliseconds = convertToMilliseconds(startTime2);
  const endTime2Milliseconds = convertToMilliseconds(endTime2);

  return (
    startTime1Milliseconds < endTime2Milliseconds &&
    startTime2Milliseconds < endTime1Milliseconds
  );
};
