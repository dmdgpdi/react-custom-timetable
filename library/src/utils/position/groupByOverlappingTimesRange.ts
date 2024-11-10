import { BaseTask } from '../../types/baseTask';

function groupByOverlappingTimesRange<T extends BaseTask>(
  tasks: (T & {
    ref: (node: HTMLElement | null) => void;
    style: React.CSSProperties;
  })[],
) {
  const sortedTasks = tasks.sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime(),
  );

  // 2. 겹치는 요소들을 그룹화
  const groupedTasks: (T & {
    ref: (node: HTMLElement | null) => void;
    style: React.CSSProperties;
  })[][] = [];

  let currentGroup: typeof tasks = [];

  let groupStartTime: number = Number.MAX_SAFE_INTEGER;
  let groupEndTime: number = Number.MAX_SAFE_INTEGER;

  sortedTasks.forEach((task) => {
    const taskStartTime = task.startTime.getTime();
    const taskEndTime = task.endTime.getTime();

    // 1. groupEndTime보다 taskStartTime이 작고, taskEndTime이 groupEndTime보다 길 경우.
    if (taskStartTime <= groupEndTime && groupEndTime <= taskEndTime) {
      currentGroup.push(task);
      groupEndTime = taskEndTime;
      return;
    }
    // 2. groupStartTime보다 taskStartTime이 크고 groupEndTime보다 taskEndTime이 작을 경우.
    else if (groupStartTime <= taskStartTime && taskEndTime <= groupEndTime) {
      currentGroup.push(task);
      return;
    } else {
      // 3. 겹치지 않으면 현재 그룹을 추가하고 새로운 그룹을 시작
      if (currentGroup.length !== 0) {
        groupedTasks.push(currentGroup);
      }

      currentGroup = [task];
      groupStartTime = task.startTime.getTime();
      groupEndTime = task.endTime.getTime();

      return;
    }
  });

  if (currentGroup.length > 0) {
    groupedTasks.push(currentGroup);
  }

  return groupedTasks;
}

export default groupByOverlappingTimesRange;
