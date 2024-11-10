import type { BaseTask } from '../../types/baseTask';
import type { ReturnTaskType } from '../../types/taskReturnType';

function setTaskListWithAutoHorizonPosition<T extends BaseTask>(
  test: ReturnTaskType<T>[][],
) {
  const finalTemp: ReturnTaskType<T>[] = [];

  test.forEach((group) => {
    const autoPositionedGroup = group.map((task, index) => {
      const taskStyle = {
        ...task.style,
        left: `${(100 / group.length) * index}%`,
        width: `${100 / group.length}%`,
      };

      return {
        ...task,
        style: taskStyle,
      };
    });

    finalTemp.push(...autoPositionedGroup); // 1차원 배열로 펼쳐 넣기
  });

  return finalTemp;
}

export default setTaskListWithAutoHorizonPosition;
