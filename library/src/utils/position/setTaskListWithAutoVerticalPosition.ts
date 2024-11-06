import { BaseTask } from '../../types/baseTask';
import setTaskVerticalSizeStyle from './setTaskVerticalSizeStyle';

function setTaskListWithAutoVerticalPosition<T extends BaseTask>(
  taskList: T[],
  startTime: Date,
  endTime: Date,
) {
  const taskListWithRef = taskList.map((task) => {
    const taskSizeStyle = setTaskVerticalSizeStyle(task, startTime, endTime);

    return {
      ...task,
      ref: (node: HTMLElement | null) => {
        if (!node) {
          console.log('node is null');
        }
      },

      style: {
        backgroundColor: 'orange',
        position: 'absolute',
        ...taskSizeStyle,
      } as React.CSSProperties,
    };
  });

  return taskListWithRef;
}

export default setTaskListWithAutoVerticalPosition;
