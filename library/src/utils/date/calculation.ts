import { BaseTask } from '../../types/baseTask';
import { convertToMilliseconds } from './convert';

const calculateTargetPosition = (
  startTime: Date,
  endTime: Date,
  targetStartTime: Date,
  targetEndTime: Date,
) => {
  const startMilliseconds = convertToMilliseconds(startTime);
  const endMilliseconds = convertToMilliseconds(endTime);
  const targetStartMilliseconds = convertToMilliseconds(targetStartTime);
  const targetEndMilliseconds = convertToMilliseconds(targetEndTime);
  const slotTime = endMilliseconds - startMilliseconds;
  let startPercent = 0;
  let totalEndPercent = 100;

  if (startMilliseconds < targetStartMilliseconds) {
    // 슬롯의 시작시간보다 task의 시작 시간이 늦었다면(즉 slot 도중에 시작했다면)
    startPercent =
      ((targetStartMilliseconds - startMilliseconds) / slotTime) * 100;
  }

  if (targetEndMilliseconds < endMilliseconds) {
    // task의 끝나는 시간이 slot의 종료 시간보다 늦다면(즉 slot 도중에 끝난다면)
    totalEndPercent =
      ((targetEndMilliseconds - startMilliseconds) / slotTime) * 100;
  }

  const endPercent = totalEndPercent - startPercent;

  return { startPercent, endPercent };
};

const checkTimeOverlap = (
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

const getTodayFromTime = (hours: number, minutes: number, second: number) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const day = now.getDate().toString().padStart(2, '0');

  const yearMonthDay = `${year}-${month}-${day}`;
  const hourFormat = hours < 10 ? `0${hours}` : hours;
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const secondeFormat = second < 10 ? `0${second}` : second;

  return new Date(
    `${yearMonthDay}T${hourFormat}:${minutesFormat}:${secondeFormat}`,
  );
};

const checkTaskListOverlap = <T extends BaseTask>(taskList: T[]) => {
  let isOverlap = false;

  for (let i = 0; i < taskList.length; i += 1) {
    for (let j = i + 1; j < taskList.length; j += 1) {
      if (
        checkTimeOverlap(
          taskList[i].startTime,
          taskList[i].endTime,
          taskList[j].startTime,
          taskList[j].endTime,
        )
      ) {
        isOverlap = true;
        return isOverlap;
      }
    }
  }

  return false;
};

const calculateCurrentTimePosition = (
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

const checkDateInRange = (startDate: Date, date: Date, endDate: Date) =>
  startDate <= date && date <= endDate;

export {
  calculateCurrentTimePosition,
  calculateTargetPosition,
  checkDateInRange,
  checkTaskListOverlap,
  checkTimeOverlap,
  getTodayFromTime,
};
