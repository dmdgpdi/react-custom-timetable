'use client';

import { useCallback } from 'react';
import { eachMinuteOfInterval } from 'date-fns';
import {
  parseSize,
  distributeSize,
  checkTaskListOverlap,
  getClassNameByType,
  selectTaskListByTimeRange,
  checkFirstTaskUnit,
  checkDateInRange,
} from '../utils';
import {
  PopoverType,
  BaseTask,
  TimetableDirectionType,
  TaskThemeType,
} from './Timetable.type';
import { ContextProvider } from '../contexts';
import CurrentTimeLine from './CurrentTimeLine';
import Slot from './Slot';
import styles from './Timetable.module.scss';

interface TimetableProps<T extends BaseTask> {
  totalStartTime: Date;
  totalEndTime: Date;
  slotRange: number;
  timeTableSize: string;
  timetableDirection: TimetableDirectionType;
  taskList: T[];
  ellipsisText?: string;
  displayCurrentTime?: boolean;
  currentTimeLineStyle?: string;
  popoverType?: PopoverType;
  timeTableStyle?: React.CSSProperties;
  timeSlotStyle?: React.CSSProperties;
  taskSlotStyle?: React.CSSProperties;
  slotStyle?: React.CSSProperties;
  taskTheme?: TaskThemeType;
}

function Timetable<T extends BaseTask>({
  totalStartTime,
  totalEndTime,
  slotRange,
  timeTableSize,
  timetableDirection,
  taskList,
  ellipsisText = '...',
  displayCurrentTime = false,
  currentTimeLineStyle,
  popoverType = 'CLICK',
  taskTheme,
  timeTableStyle = { backgroundColor: 'white' },
  timeSlotStyle = { color: 'black' },
  taskSlotStyle = { color: 'black' },
  slotStyle = {},
}: TimetableProps<T>) {
  const { value, format } = parseSize(timeTableSize);

  const timeSlots = eachMinuteOfInterval(
    {
      start: totalStartTime,
      end: totalEndTime,
    },
    { step: slotRange },
  );

  const slotSize = distributeSize(value, timeSlots.length, format);
  const uniqueTaskIdMap = new Map();
  const isCurrentTimeVisible =
    displayCurrentTime &&
    checkDateInRange(timeSlots[0], new Date(), timeSlots[timeSlots.length - 1]);
  const checkOverlapFromTaskList = useCallback(
    (currentTaskList: T[]) => checkTaskListOverlap(currentTaskList),
    [taskList],
  );

  if (checkOverlapFromTaskList(taskList)) {
    throw new Error('task time is overlap. please check your taskList');
  }

  return (
    <ContextProvider
      TimetableDirection={timetableDirection}
      popoverType={popoverType}
      contextValue={{
        ellipsisText,
      }}
      taskTheme={taskTheme}
    >
      <div
        className={getClassNameByType(styles, 'container', timetableDirection)}
        style={timeTableStyle}
      >
        {isCurrentTimeVisible && (
          <CurrentTimeLine
            startTime={totalStartTime}
            endTime={totalEndTime}
            timeTableSize={timeTableSize}
            currentTimeLineStyle={currentTimeLineStyle}
          />
        )}
        {timeSlots.map((time, index) => {
          const key = `${time.toDateString()}${index}`;
          const taskItemList = selectTaskListByTimeRange(
            taskList,
            time.getHours(),
            slotRange,
          );
          const isFirstTaskUnitList = checkFirstTaskUnit(
            taskItemList,
            uniqueTaskIdMap,
          );

          return (
            <Slot
              key={key}
              slotStartTime={time}
              slotSize={slotSize}
              slotRange={slotRange}
              timeSlotStyle={timeSlotStyle}
              isFirstTaskUnitList={isFirstTaskUnitList}
              taskItemList={taskItemList}
              taskSlotStyle={taskSlotStyle}
              slotStyle={slotStyle}
            />
          );
        })}
      </div>
    </ContextProvider>
  );
}

export default Timetable;
