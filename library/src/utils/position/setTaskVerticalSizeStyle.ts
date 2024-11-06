import { BaseTask } from '../../types/baseTask';
import { calculateTargetPosition } from '../date/calculation';

function setTaskVerticalSizeStyle<T extends BaseTask>(
  task: T,
  startTime: Date,
  endTime: Date,
) {
  const { startPercent, endPercent } = calculateTargetPosition(
    startTime,
    endTime,
    task.startTime!,
    task.endTime!,
  );

  const taskStyle: React.CSSProperties = {
    top: `${startPercent}%`,
    height: `${endPercent}%`,
  };

  return taskStyle;
}

export default setTaskVerticalSizeStyle;
