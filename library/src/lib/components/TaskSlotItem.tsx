import { useContext, useRef, useEffect, useState } from 'react';
import {
  calculateTargetPosition,
  getClassNameByType,
  getRandomColor,
  getTaskColor,
} from '../utils';
import { BaseTask } from './Timetable.type';
import {
  TypeContext,
  PopoverTypeContext,
  TaskSlotContext,
  TaskThemeContext,
} from '../contexts';
import styles from './Timetable.module.scss';
import usePopoverFloating from '../hooks/usePopoverFloating';
import PopoverContent from './PopoverContent';

interface TaskSlotItemProps<T extends BaseTask> {
  taskItem: T;
  isFirstTaskUnit: boolean;
  slotStartTime: Date;
  slotEndTime: Date;
}

function TaskSlotItem<T extends BaseTask>({
  taskItem,
  isFirstTaskUnit,
  slotStartTime,
  slotEndTime,
}: TaskSlotItemProps<T>) {
  const { startTime, endTime, title } = taskItem;
  const taskSlotRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const type = useContext(TypeContext);
  const taskOption = useContext(TaskSlotContext);
  const popoverType = useContext(PopoverTypeContext);
  const taskColorTheme = useContext(TaskThemeContext);

  const {
    refs,
    fixFloatingTargetPosition,
    floatingStyles,
    getFloatingProps,
    getReferenceProps,
    isFloatingTargetVisible,
    hidePopover,
  } = usePopoverFloating(popoverType);

  if (!startTime || !endTime) {
    return null;
  }

  const { startPercent, endPercent } = calculateTargetPosition(
    slotStartTime,
    slotEndTime,
    startTime,
    endTime,
  );
  const taskSlotColor =
    getTaskColor(taskItem) ?? getRandomColor(taskItem, taskColorTheme);
  const positionStyles =
    type === 'ROW'
      ? { top: '0', left: `${startPercent}%`, width: `${endPercent}%` }
      : { top: `${startPercent}%`, left: '0', height: `${endPercent}%` };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (type === 'ROW') {
      if (taskSlotRef.current) {
        const width = taskSlotRef.current.offsetWidth;
        setIsContentVisible(width > 40);
      }
    }
    if (type === 'COLUMN') {
      if (taskSlotRef.current) {
        const height = taskSlotRef.current.offsetHeight;
        setIsContentVisible(height > 40);
      }
    }
  }, [taskSlotRef.current, type]);

  return (
    <div>
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps}
        className={getClassNameByType(styles, 'buttonInherit', type)}
        style={{
          ...positionStyles,
          backgroundColor: `${taskSlotColor}`,
        }}
        onClick={fixFloatingTargetPosition}
      >
        <div
          ref={taskSlotRef}
          className={getClassNameByType(styles, 'taskSlotBackground', type)}
        >
          {isFirstTaskUnit && (
            <div
              className={getClassNameByType(styles, 'taskSlotContent', type)}
            >
              <p className={getClassNameByType(styles, 'title', type)}>
                {isContentVisible ? title : taskOption.ellipsisText}
              </p>
            </div>
          )}
        </div>
      </button>
      {isFloatingTargetVisible && (
        <PopoverContent
          taskItem={taskItem}
          hidePopover={hidePopover}
          floatingStyles={floatingStyles}
          getFloatingProps={getFloatingProps}
          refs={refs}
        />
      )}
    </div>
  );
}

export default TaskSlotItem;
