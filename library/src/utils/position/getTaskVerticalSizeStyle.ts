import { BaseTask } from '../../types/baseTask';
import { calculateTargetPosition } from '../date/calculation';

export default function getTaskVerticalSizeStyle<T extends BaseTask>(
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
