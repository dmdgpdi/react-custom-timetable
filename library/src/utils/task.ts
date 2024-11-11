import type { BaseTask } from '../types/baseTask';

export const getSortedTaskList = <T extends BaseTask>(taskList: T[]) => {
  const sortedTaskList = taskList.sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime(),
  );

  return sortedTaskList;
};
