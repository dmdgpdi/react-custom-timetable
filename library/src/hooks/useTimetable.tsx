'use client';

import { useCallback, useEffect, useRef } from 'react';

import { calculateTargetPosition } from '../utils';

// ----
interface BaseTask {
  id: number | string;
  startTime: Date;
  endTime: Date;
}

type UseTimeTableOption<T extends BaseTask> = {
  taskList: T[];
  startTime?: Date;
  endTime?: Date;
  title?: string;
  // 나머지 인자는 나중에 선택적 옵션으로 주면 될 것 같음.
  // 그리고 initial value로 없으면 초기화.
};

const setTaskSizeStyle = <T extends BaseTask>(
  task: T,
  startTime: Date,
  endTime: Date,
) => {
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

// ----
const setTaskListWithAutoVerticalPosition = <T extends BaseTask>(
  taskList: T[],
  startTime: Date,
  endTime: Date,
) => {
  const taskListWithRef = taskList.map((task) => {
    const taskSizeStyle = setTaskSizeStyle(task, startTime, endTime);
    // 각 할일에 대한 사이즈를 재서 넣어줌.
    // 여기서 각 할일에 대한 사이즐르 넣어주면서, 겹치는 요소가 있다면, 해당 요소의 파악해야함.
    // 만약 요소를 줄 세우는데 겹치는 게 있으면 해당 요소를 하나의 리스트로 만들어서 정렬을 해
    // 나머지는 그냥 위치에 맞게 넣고
    // 그리고 렌더링을 할 때 그냥 요소들을 뿌리는 것과 리스트에서 한 요소를 꺼내는 것과 달리 처리
    return {
      ...task,
      ref: (node: HTMLElement | null) => {
        if (!node) {
          console.log('node is null');
        }
      },

      style: {
        backgroundColor: 'orange',
        position: 'absolute',
        ...taskSizeStyle,
      } as React.CSSProperties,
    };
  });

  return taskListWithRef;
};

function groupByOverlappingTimesRange<T extends BaseTask>(
  test: (T & {
    ref: (node: HTMLElement | null) => void;
    style: React.CSSProperties;
  })[],
) {
  const sortedTasks = [...test].sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime(),
  );

  // 2. 겹치는 요소들을 그룹화
  const groupedTasks: (T & {
    ref: (node: HTMLElement | null) => void;
    style: React.CSSProperties;
  })[][] = [];

  let currentGroup: typeof test = [];

  sortedTasks.forEach((task) => {
    if (currentGroup.length === 0) {
      currentGroup.push(task);
      return;
    }

    const lastTaskInGroup = currentGroup[currentGroup.length - 1];
    //[TODO]
    // 그룹핑 요소에서 Start, End를 확장시키는 로직이 필요함.
    // const startTaskInGroup = currentGroup[currentGroup.length - 1];
    // const lastTaskInGroup = currentGroup[currentGroup.length - 1];

    // 현재 요소가 그룹의 마지막 요소와 겹치는지 확인
    if (task.startTime < lastTaskInGroup.endTime) {
      currentGroup.push(task);
    } else {
      // 겹치지 않으면 현재 그룹을 추가하고 새로운 그룹을 시작
      groupedTasks.push(currentGroup);
      currentGroup = [task];
    }
  });

  if (currentGroup.length > 0) {
    groupedTasks.push(currentGroup);
  }

  return groupedTasks;
}
// ----

function setTaskListWithAutoHorizonPosition<T extends BaseTask>(
  test: (T & {
    ref: (node: HTMLElement | null) => void;
    style: React.CSSProperties;
  })[][],
) {
  const finalTemp: (T & {
    ref: (node: HTMLElement | null) => void;
    style: React.CSSProperties;
  })[] = [];

  test.forEach((group) => {
    const autoPositionedGroup = group.map((task, index) => {
      const taskStyle = {
        ...task.style,
        left: `${(100 / group.length) * index}%`,
        width: `${100 / group.length}%`,
      };

      return {
        ...task,
        style: taskStyle,
      };
    });

    finalTemp.push(...autoPositionedGroup); // 1차원 배열로 펼쳐 넣기
  });

  return finalTemp;
}

// -----
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
  console.log(
    'taskListWithAutoVerticalPosition',
    taskListWithAutoVerticalPosition,
  );
  const groupedTaskList = groupByOverlappingTimesRange(
    taskListWithAutoVerticalPosition,
  );
  console.log('groupedTaskList', groupedTaskList);

  const taskListAutoPosition =
    setTaskListWithAutoHorizonPosition(groupedTaskList);
  console.log('taskListAutoPosition', taskListAutoPosition);

  useEffect(() => {
    // Todo
    // 1. window resize 때마다 감지.
    // 2. 높이 값을 기준으로 taskList의 각 높이 지정하기.
  }, []);

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
