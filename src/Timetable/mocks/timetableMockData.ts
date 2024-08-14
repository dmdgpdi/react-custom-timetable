import { getDateFromTime } from '../utils';

const startTime = getDateFromTime(0, 0, 1);
const endTime = getDateFromTime(23, 59, 59);
const slotTime = 60;
const height = '1000px';

const taskList = [
  {
    id: 1,
    title: 'title1',
    content: 'subTitle1',
    taskColor: 'red',
    startTime: getDateFromTime(11, 0, 0),
    endTime: getDateFromTime(12, 0, 0),
  },
  {
    id: 2,
    title: 'title2',
    content: 'subTitle2',
    taskColor: 'blue',
    startTime: getDateFromTime(15, 0, 0),
    endTime: getDateFromTime(16, 0, 0),
  },
  {
    id: 3,
    title: 'title3',
    content: 'subTitle3',
    taskColor: 'purple',
    startTime: getDateFromTime(18, 0, 0),
    endTime: getDateFromTime(20, 0, 0),
  },
  {
    id: 5,
    title: '02:30',
    content: '02:50',
    taskColor: 'green',
    startTime: getDateFromTime(2, 30, 0),
    endTime: getDateFromTime(2, 50, 0),
  },
  {
    id: 4,
    title: '01:00',
    content: '02:20',
    taskColor: 'brown',
    startTime: getDateFromTime(1, 0, 0),
    endTime: getDateFromTime(2, 20, 0),
  },
];

const duplicatedTimeTaskList = [
  {
    id: 1,
    title: 'title1',
    content: 'subTitle1',
    taskColor: 'red',
    startTime: getDateFromTime(12, 0, 0),
    endTime: getDateFromTime(13, 0, 0),
  },
  {
    id: 2,
    title: 'title2',
    content: 'subTitle2',
    taskColor: 'blue',
    startTime: getDateFromTime(12, 10, 0),
    endTime: getDateFromTime(12, 30, 0),
  },
  {
    id: 3,
    title: 'title3',
    content: 'subTitle3',
    taskColor: 'purple',
    startTime: getDateFromTime(18, 0, 0),
    endTime: getDateFromTime(20, 0, 0),
  },
  {
    id: 5,
    title: '02:30',
    content: '02:50',
    taskColor: 'green',
    startTime: getDateFromTime(17, 30, 0),
    endTime: getDateFromTime(18, 30, 0),
  },
  {
    id: 4,
    title: '01:00',
    content: '02:20',
    taskColor: 'brown',
    startTime: getDateFromTime(19, 30, 0),
    endTime: getDateFromTime(21, 20, 0),
  },
];

const taskListWithouttaskColor = [
  {
    id: 1,
    title: 'title1',
    content: 'subTitle1',
    startTime: getDateFromTime(12, 0, 0),
    endTime: getDateFromTime(13, 0, 0),
  },
  {
    id: 2,
    title: 'title2',
    content: 'subTitle2',
    startTime: getDateFromTime(15, 0, 0),
    endTime: getDateFromTime(16, 0, 0),
  },
  {
    id: 3,
    title: 'title3',
    content: 'subTitle3',
    startTime: getDateFromTime(18, 0, 0),
    endTime: getDateFromTime(20, 0, 0),
  },
  {
    id: 5,
    title: '02:30',
    content: '02:50',
    startTime: getDateFromTime(2, 30, 0),
    endTime: getDateFromTime(2, 50, 0),
  },
  {
    id: 4,
    title: '01:00',
    content: '02:20',
    startTime: getDateFromTime(1, 0, 0),
    endTime: getDateFromTime(2, 20, 0),
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
