import { convertToMilliseconds } from './convertToMilliseconds';

export const calculateCurrentTimePosition = (
  currentTime: Date | null,
  startTime: Date,
  endTime: Date,
) => {
  let currentTimePosition = 0;

  if (!currentTime) {
    return { currentTimePosition };
  }

  const currentMilliseconds = convertToMilliseconds(currentTime); // 현재 시간
  const startMilliseconds = convertToMilliseconds(startTime); // 슬롯의 시작 시간
  const endMilliseconds = convertToMilliseconds(endTime); // 슬롯의 종료 시간
  currentTimePosition =
    ((currentMilliseconds - startMilliseconds) /
      (endMilliseconds - startMilliseconds)) *
    100;

  return { currentTimePosition };
};
