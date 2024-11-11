import type { BaseTask } from '../types/baseTask';
import type { ReturnTaskType } from '../types/taskReturnType';

export const getSortedTaskList = <T extends BaseTask>(taskList: T[]) => {
  const sortedTaskList = taskList.sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime(),
  );

  return sortedTaskList;
};

export const convertToFlatTaskList = <T extends BaseTask>(
  groupedTaskListWithAutoPosition: ReturnTaskType<T>[][],
) => {
  const taskListWithAutoPosition = groupedTaskListWithAutoPosition.flatMap(
    (group) => group,
  );

  return taskListWithAutoPosition;
};
