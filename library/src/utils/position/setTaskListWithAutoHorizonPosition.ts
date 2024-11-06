import { BaseTask } from '../../types/baseTask';

function setTaskListWithAutoHorizonPosition<T extends BaseTask>(
  test: (T & {
    ref: (node: HTMLElement | null) => void;
    style: React.CSSProperties;
  })[][],
) {
  const finalTemp: (T & {
    ref: (node: HTMLElement | null) => void;
    style: React.CSSProperties;
  })[] = [];

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
