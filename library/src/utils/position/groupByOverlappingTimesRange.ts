import { BaseTask } from '../../types/baseTask';

function groupByOverlappingTimesRange<T extends BaseTask>(
  test: (T & {
    ref: (node: HTMLElement | null) => void;
    style: React.CSSProperties;
  })[],
) {
  const sortedTasks = [...test].sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime(),
  );

  // 2. 겹치는 요소들을 그룹화
  const groupedTasks: (T & {
    ref: (node: HTMLElement | null) => void;
    style: React.CSSProperties;
  })[][] = [];

  let currentGroup: typeof test = [];

  sortedTasks.forEach((task) => {
    if (currentGroup.length === 0) {
      currentGroup.push(task);
      return;
    }

    const lastTaskInGroup = currentGroup[currentGroup.length - 1];
    //[TODO]
    // 그룹핑 요소에서 Start, End를 확장시키는 로직이 필요함.
    // const startTaskInGroup = currentGroup[currentGroup.length - 1];
    // const lastTaskInGroup = currentGroup[currentGroup.length - 1];

    // 현재 요소가 그룹의 마지막 요소와 겹치는지 확인
    if (task.startTime < lastTaskInGroup.endTime) {
      currentGroup.push(task);
    } else {
      // 겹치지 않으면 현재 그룹을 추가하고 새로운 그룹을 시작
      groupedTasks.push(currentGroup);
      currentGroup = [task];
    }
  });

  if (currentGroup.length > 0) {
    groupedTasks.push(currentGroup);
  }

  return groupedTasks;
}

export default groupByOverlappingTimesRange;
