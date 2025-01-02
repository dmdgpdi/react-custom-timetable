import { BaseTask } from '../types/baseTask';

export const checkFirstTaskUnit = <T extends BaseTask>(
  taskItemList: T[],
  uniqueTaskIdMap: Map<unknown, unknown>,
): boolean[] =>
  taskItemList.map((taskItem) => {
    const shouldDisplayTaskContent = !!(
      taskItem?.id && !uniqueTaskIdMap.has(taskItem.id)
    );

    if (taskItem?.id) {
      uniqueTaskIdMap.set(taskItem.id, taskItem.id);
    }

    return shouldDisplayTaskContent;
  });
