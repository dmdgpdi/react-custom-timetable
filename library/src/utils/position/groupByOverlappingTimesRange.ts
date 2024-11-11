import { BaseTask } from '../../types/baseTask';

export default function groupByOverlappingTimeRange<T extends BaseTask>(
  sortedTaskList: T[],
) {
  const groupedTasks: T[][] = [];
  let currentGroup: T[] = [];
  let groupStartTime: number = Number.MAX_SAFE_INTEGER;
  let groupEndTime: number = Number.MAX_SAFE_INTEGER;

  sortedTaskList.forEach((task) => {
    const taskStartTime = task.startTime.getTime();
    const taskEndTime = task.endTime.getTime();

    // 1. groupEndTime보다 taskStartTime이 작고, taskEndTime이 groupEndTime보다 길 경우.
    if (taskStartTime <= groupEndTime && groupEndTime <= taskEndTime) {
      currentGroup.push(task);
      groupEndTime = taskEndTime;

      return;
    }
    // 2. groupStartTime보다 taskStartTime이 크고 groupEndTime보다 taskEndTime이 작을 경우.
    if (groupStartTime <= taskStartTime && taskEndTime <= groupEndTime) {
      currentGroup.push(task);

      return;
    }

    // 3. 겹치지 않으면 현재 그룹을 추가하고 새로운 그룹을 시작
    if (currentGroup.length !== 0) {
      groupedTasks.push(currentGroup);
    }

    currentGroup = [task];
    groupStartTime = task.startTime.getTime();
    groupEndTime = task.endTime.getTime();

    return;
  });

  if (currentGroup.length > 0) {
    groupedTasks.push(currentGroup);
  }

  return groupedTasks;
}
