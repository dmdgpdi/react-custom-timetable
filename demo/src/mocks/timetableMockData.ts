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

const startTime = getTodayFromTime(0, 0, 1);
const endTime = getTodayFromTime(23, 59, 59);
const slotTime = 60;
const height = '1000px';

const taskList = [
  {
    id: 1,
    title: 'title1',
    content: 'subTitle1',
    taskColor: 'red',
    startTime: getTodayFromTime(11, 0, 0),
    endTime: getTodayFromTime(12, 0, 0),
  },
  {
    id: 2,
    title: 'title2',
    content: 'subTitle2',
    taskColor: 'blue',
    startTime: getTodayFromTime(15, 0, 0),
    endTime: getTodayFromTime(16, 0, 0),
  },
  {
    id: 3,
    title: 'title3',
    content: 'subTitle3',
    taskColor: 'purple',
    startTime: getTodayFromTime(18, 0, 0),
    endTime: getTodayFromTime(20, 0, 0),
  },
  {
    id: 5,
    title: '02:30',
    content: '02:50',
    taskColor: 'green',
    startTime: getTodayFromTime(2, 30, 0),
    endTime: getTodayFromTime(2, 50, 0),
  },
  {
    id: 4,
    title: '01:00',
    content: '02:20',
    taskColor: 'brown',
    startTime: getTodayFromTime(1, 0, 0),
    endTime: getTodayFromTime(2, 20, 0),
  },
];

const duplicatedTimeTaskList = [
  {
    id: 1,
    title: 'title1',
    content: 'subTitle1',
    taskColor: 'red',
    startTime: getTodayFromTime(12, 0, 0),
    endTime: getTodayFromTime(13, 0, 0),
  },
  {
    id: 2,
    title: 'title2',
    content: 'subTitle2',
    taskColor: 'blue',
    startTime: getTodayFromTime(12, 10, 0),
    endTime: getTodayFromTime(12, 30, 0),
  },
  {
    id: 3,
    title: 'title3',
    content: 'subTitle3',
    taskColor: 'purple',
    startTime: getTodayFromTime(18, 0, 0),
    endTime: getTodayFromTime(20, 0, 0),
  },
  {
    id: 5,
    title: '02:30',
    content: '02:50',
    taskColor: 'green',
    startTime: getTodayFromTime(17, 30, 0),
    endTime: getTodayFromTime(18, 30, 0),
  },
  {
    id: 4,
    title: '01:00',
    content: '02:20',
    taskColor: 'brown',
    startTime: getTodayFromTime(19, 30, 0),
    endTime: getTodayFromTime(21, 20, 0),
  },
];

const taskListWithouttaskColor = [
  {
    id: 1,
    title: 'title1',
    content: 'subTitle1',
    startTime: getTodayFromTime(12, 0, 0),
    endTime: getTodayFromTime(13, 0, 0),
  },
  {
    id: 2,
    title: 'title2',
    content: 'subTitle2',
    startTime: getTodayFromTime(15, 0, 0),
    endTime: getTodayFromTime(16, 0, 0),
  },
  {
    id: 3,
    title: 'title3',
    content: 'subTitle3',
    startTime: getTodayFromTime(18, 0, 0),
    endTime: getTodayFromTime(20, 0, 0),
  },
  {
    id: 5,
    title: '02:30',
    content: '02:50',
    startTime: getTodayFromTime(2, 30, 0),
    endTime: getTodayFromTime(2, 50, 0),
  },
  {
    id: 4,
    title: '01:00',
    content: '02:20',
    startTime: getTodayFromTime(1, 0, 0),
    endTime: getTodayFromTime(2, 20, 0),
  },
];

export {
  startTime,
  endTime,
  taskList,
  duplicatedTimeTaskList,
  slotTime,
  height,
  taskListWithouttaskColor,
};
