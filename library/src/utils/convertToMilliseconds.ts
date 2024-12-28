import { hoursToMilliseconds } from './hoursToMilliseconds';
import { minutesToMilliseconds } from './minutesToMilliseconds';
import { secondsToMilliseconds } from './secondsToMilliseconds';

export const convertToMilliseconds = (date: Date) => {
  const hourMilliseconds = hoursToMilliseconds(date.getHours());
  const minutesMilliseconds = minutesToMilliseconds(date.getMinutes());
  const secondsMilliseconds = secondsToMilliseconds(date.getSeconds());

  return hourMilliseconds + minutesMilliseconds + secondsMilliseconds;
};
