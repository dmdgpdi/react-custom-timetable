import type { BaseTask } from '../../types/baseTask';
import type { ReturnTaskType } from '../../types/taskReturnType';
import setTaskVerticalSizeStyle from './setTaskVerticalSizeStyle';

export default function setTaskListWithAutoPosition<T extends BaseTask>({
  groupedTaskList,
  startTime,
  endTime,
}: setTaskListWithAutoHorizonPositionParameter<T>): ReturnTaskType<T>[][] {
  const groupedTaskListWithHorizonPosition = groupedTaskList.map((group) => {
    const autoPositionedGroup = group.map((task, index) => {
      const taskSizeStyle = setTaskVerticalSizeStyle(task, startTime, endTime);

      const taskStyle = {
        position: 'absolute',
        left: `${(100 / group.length) * index}%`,
        width: `${100 / group.length}%`,
        ...taskSizeStyle,
      } as React.CSSProperties;

      return {
        ...task,
        style: taskStyle,
      };
    });

    return autoPositionedGroup;
  });

  return groupedTaskListWithHorizonPosition;
}

interface setTaskListWithAutoHorizonPositionParameter<T extends BaseTask> {
  groupedTaskList: T[][];
  startTime: Date;
  endTime: Date;
}
