import {
  hoursToMilliseconds,
  minutesToMilliseconds,
  secondsToMilliseconds,
} from 'date-fns';

const formatHourAndMinutes = (data: Date) => {
  const hours = data.getHours();
  const minutes = data.getMinutes();
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const currentTime = minutes === 0 ? hours : `${hours}:${minutesFormat}`;

  return currentTime; // HH:MM
};

const convertToMilliseconds = (date: Date) => {
  const hourMilliseconds = hoursToMilliseconds(date.getHours());
  const minutesMilliseconds = minutesToMilliseconds(date.getMinutes());
  const secondsMilliseconds = secondsToMilliseconds(date.getSeconds());

  return hourMilliseconds + minutesMilliseconds + secondsMilliseconds;
};

export { formatHourAndMinutes, convertToMilliseconds };
