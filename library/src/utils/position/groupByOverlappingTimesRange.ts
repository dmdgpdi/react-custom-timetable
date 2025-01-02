import { BaseTask } from '../../types/baseTask';

export default function groupByOverlappingTimeRange<T extends BaseTask>(
  sortedTaskList: T[],
) {
  const groupedTasks: T[][] = [];
  let currentGroup: T[] = [];
  let groupStartTime = Number.MAX_SAFE_INTEGER;
  let groupEndTime = Number.MIN_SAFE_INTEGER;

  sortedTaskList.forEach((task) => {
    const taskStartTime = task.startTime.getTime();
    const taskEndTime = task.endTime.getTime();

    // Case 1: New task starts after current group ends
    if (taskStartTime > groupEndTime) {
      if (currentGroup.length > 0) {
        groupedTasks.push(currentGroup);
      }
      currentGroup = [task];
      groupStartTime = taskStartTime;
      groupEndTime = taskEndTime;
    }
    // Case 2: New task ends before current group starts
    else if (taskEndTime < groupStartTime) {
      if (currentGroup.length > 0) {
        groupedTasks.push(currentGroup);
      }
      currentGroup = [task];
      groupStartTime = taskStartTime;
      groupEndTime = taskEndTime;
    }
    // Case 3: New task overlaps with current group
    else {
      currentGroup.push(task);
      groupStartTime = Math.min(groupStartTime, taskStartTime);
      groupEndTime = Math.max(groupEndTime, taskEndTime);
    }
  });

  // Add the last group
  if (currentGroup.length > 0) {
    groupedTasks.push(currentGroup);
  }

  return groupedTasks;
}
