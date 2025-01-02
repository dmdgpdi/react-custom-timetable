import { BaseTask } from '../../types/baseTask';
import { getTargetHeightPercent } from '../getTargetHeightPercent';
import { getTargetStartPosition } from '../getTargetStartPosition';

export default function getTaskVerticalSizeStyle<T extends BaseTask>(
  task: T,
  startTime: Date,
  endTime: Date,
) {
  const startPosition = getTargetStartPosition({
    startTime,
    endTime,
    targetStartTime: task.startTime,
  });
  const taskHeightPercent = getTargetHeightPercent({
    startTime,
    endTime,
    targetStartTime: task.startTime,
    targetEndTime: task.endTime,
  });

  const taskStyle: React.CSSProperties = {
    top: `${startPosition}%`,
    height: `${taskHeightPercent}%`,
  };

  return taskStyle;
}
