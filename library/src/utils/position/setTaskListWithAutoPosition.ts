import type { BaseTask } from '../../types/baseTask';
import type { ReturnTaskType } from '../../types/taskReturnType';
import getTaskVerticalSizeStyle from './getTaskVerticalSizeStyle';

export default function setTaskListWithAutoPosition<T extends BaseTask>({
  groupedTaskList,
  startTime,
  endTime,
}: setTaskListWithAutoPositionParameter<T>): ReturnTaskType<T>[][] {
  const groupedTaskListWithAutoPosition = groupedTaskList.map((group) => {
    const autoPositionedGroup = group.map((task, index) => {
      const taskVerticalStyle = getTaskVerticalSizeStyle(
        task,
        startTime,
        endTime,
      );

      const style: React.CSSProperties = {
        position: 'absolute',
        left: `${(100 / group.length) * index}%`,
        width: `${100 / group.length}%`,
        ...taskVerticalStyle,
      };

      return {
        ...task,
        style,
      };
    });

    return autoPositionedGroup;
  });

  return groupedTaskListWithAutoPosition;
}

interface setTaskListWithAutoPositionParameter<T extends BaseTask> {
  groupedTaskList: T[][];
  startTime: Date;
  endTime: Date;
}
