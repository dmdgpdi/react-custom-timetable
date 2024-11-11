'use client';

import { useCallback, useRef } from 'react';
import { BaseTask } from '../types/baseTask';
import { getSortedTaskList, convertToFlatTaskList } from '../utils';

import getGroupedTaskListWithAutoPosition from '../utils/position/getGroupedTaskListWithAutoPosition';
import groupByOverlappingTimeRange from '../utils/position/groupByOverlappingTimesRange';

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

  // sorting
  const sortedTaskList = getSortedTaskList(taskList);
  // 그룹 묶기.
  const groupedTaskList = groupByOverlappingTimeRange(sortedTaskList);

  // horizon, vertical position 부여하기
  const groupedTaskListWithAutoPosition = getGroupedTaskListWithAutoPosition({
    groupedTaskList,
    startTime,
    endTime,
  });

  // 일차원배열로 만들기.
  const taskListWithAutoPosition = convertToFlatTaskList(
    groupedTaskListWithAutoPosition,
  );

  const timeTableCallbackRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      timeTableRef.current = node;
    }
  }, []);

  return {
    timeTableCallbackRef,
    taskListWithAutoPosition,
  };
}

export default useTimeTable;
