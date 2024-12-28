export const checkTimeOverlap = (
  startTime1: Date | null,
  endTime1: Date | null,
  startTime2: Date | null,
  endTime2: Date | null,
): boolean => {
  if (!startTime1 || !endTime1 || !startTime2 || !endTime2) {
    return false;
  }
  const startTime1Milliseconds = startTime1.getTime();
  const endTime1Milliseconds = endTime1.getTime();
  const startTime2Milliseconds = startTime2.getTime();
  const endTime2Milliseconds = endTime2.getTime();

  return (
    startTime1Milliseconds < endTime2Milliseconds &&
    startTime2Milliseconds < endTime1Milliseconds
  );
};
