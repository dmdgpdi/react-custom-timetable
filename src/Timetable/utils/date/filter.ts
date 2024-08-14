import { BaseTask } from '../../components/Timetable.type';

const selectTaskListByTimeRange = <T extends BaseTask>(
  taskList: T[],
  startHour: number,
  timeRangeByMinutes: number,
): T[] =>
  taskList.filter((task: T) => {
    if (!task.startTime || !task.endTime) {
      return false;
    }

    const taskStartHour = task.startTime.getHours();
    const taskEndHour = task.endTime.getHours();
    const taskEndMinute = task.endTime.getMinutes();

    return (
      taskStartHour <= startHour &&
      taskEndHour >= startHour &&
      !(taskEndHour === startHour && taskEndMinute === timeRangeByMinutes % 60)
    );
  });

const checkFirstTaskUnit = <T extends BaseTask>(
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

export { checkFirstTaskUnit, selectTaskListByTimeRange };
