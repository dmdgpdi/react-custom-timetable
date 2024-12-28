import { BaseTask } from '../types/baseTask';
import { checkTimeOverlap } from './checkTimeOverlap';

export const checkTaskListOverlap = <T extends BaseTask>(taskList: T[]) => {
  let isOverlap = false;

  for (let i = 0; i < taskList.length; i += 1) {
    for (let j = i + 1; j < taskList.length; j += 1) {
      if (
        checkTimeOverlap(
          taskList[i].startTime,
          taskList[i].endTime,
          taskList[j].startTime,
          taskList[j].endTime,
        )
      ) {
        isOverlap = true;
        return isOverlap;
      }
    }
  }

  return false;
};
