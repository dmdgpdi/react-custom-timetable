'use client';

import { useCallback, useRef } from 'react';
import { BaseTask } from '../types/baseTask';

import setTaskListWithAutoVerticalPosition from '../utils/position/setTaskListWithAutoVerticalPosition';
import setTaskListWithAutoHorizonPosition from '../utils/position/setTaskListWithAutoHorizonPosition';
import groupByOverlappingTimesRange from '../utils/position/groupByOverlappingTimesRange';

type UseTimeTableOption<T extends BaseTask> = {
  taskList: T[];
  startTime?: Date;
  endTime?: Date;
  title?: string;
  // 나머지 인자는 나중에 선택적 옵션으로 주면 될 것 같음.
  // 그리고 initial value로 없으면 초기화.
};

function useTimeTable<T extends BaseTask>({
  taskList,
  startTime = new Date(new Date().setHours(0, 0, 0, 0)), // 기본값: 오늘 00:00:00
  endTime = new Date(new Date().setHours(23, 59, 59, 999)), // 기본값: 오늘 23:59:59.999
}: UseTimeTableOption<T>) {
  const timeTableRef = useRef<HTMLDivElement | null>(null);

  const taskListWithAutoVerticalPosition = setTaskListWithAutoVerticalPosition(
    taskList,
    startTime,
    endTime,
  );

  const groupedTaskList = groupByOverlappingTimesRange(
    taskListWithAutoVerticalPosition,
  );

  const taskListAutoPosition =
    setTaskListWithAutoHorizonPosition(groupedTaskList);

  const timeTableCallbackRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      timeTableRef.current = node;
    }
  }, []);

  return {
    timeTableCallbackRef,
    setTaskListWithAutoVerticalPosition,
    groupedTaskList,
    taskListAutoPosition,
  };
}

export default useTimeTable;
