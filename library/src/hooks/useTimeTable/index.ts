import { useEffect, useRef } from 'react';
import { BaseTask } from '../../components/Timetable.type';
import { calculateTargetPosition } from '../../utils';

const getTaskListWithRef = <T extends BaseTask>(taskList: T[]) => {
  const taskListWithRef: taskWithRef<T>[] = taskList.map((task) => ({
    ...task,
    ref: (node: HTMLElement | null) => {
      if (!node) {
        return;
      }

      console.log('task ref', node);
    },
    style: { backgroundColor: 'orange' } as React.CSSProperties,
  }));

  return taskListWithRef;
};

export function useTimeTable<T extends BaseTask>({
  taskList,
  startTime = new Date(new Date().setHours(0, 0, 0, 0)), // 기본값: 오늘 00:00:00
  endTime = new Date(new Date().setHours(23, 59, 59, 999)), // 기본값: 오늘 23:59:59.999
}: UseTimeTableOption<T>): UseTimeTableReturn<T> {
  const timeTableRef = useRef<HTMLElement | null>(null);
  const timeTableStyle = useRef<React.CSSProperties>({});
  const taskListWithRef = getTaskListWithRef(taskList);

  const setTaskSize = (task: T) => {
    // 각 size를 구해서 offset으로 구하기.
    const { startPercent, endPercent } = calculateTargetPosition(
      startTime,
      endTime,
      task.startTime!,
      task.endTime!,
    );

    const taskStyle: React.CSSProperties = {
      top: `${startPercent}%`,
      height: `${endPercent}%`,
    };

    return taskStyle;
  };

  useEffect(() => {
    // Todo
    // 1. window resize 때마다 감지.
    // 2. 높이 값을 기준으로 taskList의 각 높이 지정하기.
  }, []);

  return {
    timeTableRef: (node: HTMLElement | null) => {
      if (!node) {
        return;
      }

      timeTableRef.current = node;
      timeTableStyle.current = { position: 'relative' };

      console.log('timeTableRef', timeTableRef.current);
      console.log(
        'getBoundingClientRect',
        timeTableRef.current.getBoundingClientRect(),
      );
    },
    timeTableStyle: timeTableStyle.current,
    taskListWithRef,
  };
}

type UseTimeTableOption<T extends BaseTask> = {
  taskList: T[];
  startTime?: Date;
  endTime?: Date;
  // 나머지 인자는 나중에 선택적 옵션으로 주면 될 것 같음.
  // 그리고 initial value로 없으면 초기화.
};

type CallbackRef = (node: HTMLElement | null) => void;

type taskWithRef<T extends BaseTask> = T & {
  ref: CallbackRef;
  style: React.CSSProperties;
};

type UseTimeTableReturn<T extends BaseTask> = {
  timeTableRef: CallbackRef;
  timeTableStyle: React.CSSProperties;
  taskListWithRef: taskWithRef<T>[];
};
