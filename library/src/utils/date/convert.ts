import {
  hoursToMilliseconds,
  minutesToMilliseconds,
  secondsToMilliseconds,
} from 'date-fns';

/**
 *
 * @deprecated 더이상 사용되지 않습니다.
 *
 * 만약 사용하고 싶다면 date-fns의 의존성을 없애야합니다.
 */
const formatHourAndMinutes = (data: Date) => {
  const hours = data.getHours();
  const minutes = data.getMinutes();
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const currentTime = minutes === 0 ? hours : `${hours}:${minutesFormat}`;

  return currentTime; // HH:MM
};

/**
 *
 * @deprecated 더이상 사용되지 않습니다.
 *
 * 만약 사용하고 싶다면 date-fns의 의존성을 없애야합니다.
 */
const convertToMilliseconds = (date: Date) => {
  const hourMilliseconds = hoursToMilliseconds(date.getHours());
  const minutesMilliseconds = minutesToMilliseconds(date.getMinutes());
  const secondsMilliseconds = secondsToMilliseconds(date.getSeconds());

  return hourMilliseconds + minutesMilliseconds + secondsMilliseconds;
};

export { formatHourAndMinutes, convertToMilliseconds };
