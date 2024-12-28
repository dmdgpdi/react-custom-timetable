import { BaseTask } from '../../types/baseTask';
import { calculateTargetHeightPercent } from '../calculateTargetHeightPercent';
import { calculateTargetPosition } from '../calculateTargetPosition';

export default function getTaskVerticalSizeStyle<T extends BaseTask>(
  task: T,
  startTime: Date,
  endTime: Date,
) {
  const { startPercent, endPercent } = calculateTargetPosition(
    startTime,
    endTime,
    task.startTime,
    task.endTime,
  );

  const taskHeightPercent = calculateTargetHeightPercent({
    startTime,
    endTime,
    targetStartTime: task.startTime,
    targetEndTime: task.endTime,
  });

  const taskStyle: React.CSSProperties = {
    top: `${startPercent}%`,
    height: `${taskHeightPercent}%`,
  };

  return taskStyle;
}
