import { BaseTask } from '../types/baseTask';

export const selectTaskListByTimeRange = <T extends BaseTask>(
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
