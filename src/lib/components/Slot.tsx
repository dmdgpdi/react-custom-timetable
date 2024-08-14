import { useContext } from 'react';
import { getClassNameByType } from '../utils';
import { BaseTask } from './Timetable.type';
import { TypeContext } from '../contexts';
import styles from './Timetable.module.scss';
import TaskSlot from './TaskSlot';
import TimeSlot from './TimeSlot';

interface SlotProps<T extends BaseTask> {
  slotStartTime: Date;
  slotSize: string;
  slotRange: number;
  taskItemList: T[];
  isFirstTaskUnitList: boolean[];
  timeSlotStyle: React.CSSProperties;
  taskSlotStyle: React.CSSProperties;
  slotStyle: React.CSSProperties;
}

function Slot<T extends BaseTask>({
  slotStartTime,
  slotRange, // slot의 범위 ex) 1:00 - 2:00 까지라면 60
  slotSize, // slot이 dom에 그려질 사이즈 ex) 300px
  slotStyle,
  taskItemList,
  isFirstTaskUnitList = [],
  timeSlotStyle,
  taskSlotStyle,
}: SlotProps<T>) {
  const type = useContext(TypeContext);
  const style = type === 'ROW' ? { width: slotSize } : { height: slotSize };

  return (
    <div className={getClassNameByType(styles, 'slot', type)} style={{ ...slotStyle, ...style }}>
      <TimeSlot slotStartTime={slotStartTime} timeSlotStyle={timeSlotStyle} />
      <TaskSlot
        slotStartTime={slotStartTime}
        slotRange={slotRange}
        taskItemList={taskItemList}
        isFirstTaskUnitList={isFirstTaskUnitList}
        taskSlotStyle={taskSlotStyle}
      />
    </div>
  );
}

export default Slot;
