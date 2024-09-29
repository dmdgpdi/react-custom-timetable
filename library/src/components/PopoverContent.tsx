import {
  UseFloatingReturn,
  ReferenceType,
  UseInteractionsReturn,
} from '@floating-ui/react';
import { format } from 'date-fns';
import styles from './Timetable.module.scss';
import closeImage from '../assets/close.png';
import scheduleImage from '../assets/schedule.png';
import { BaseTask } from './Timetable.type';

interface PopoverContentProps<T extends BaseTask> {
  getFloatingProps: UseInteractionsReturn['getFloatingProps'];
  refs: UseFloatingReturn<ReferenceType>['refs'];
  floatingStyles: UseFloatingReturn<ReferenceType>['floatingStyles'];
  hidePopover: VoidFunction;
  taskItem: T;
}

function PopoverContent<T extends BaseTask>({
  getFloatingProps,
  refs,
  floatingStyles,
  hidePopover,
  taskItem,
}: PopoverContentProps<T>) {
  const { startTime, endTime, title, content } = taskItem;

  if (!startTime || !endTime) {
    return null;
  }

  return (
    <div
      {...getFloatingProps()}
      ref={refs.setFloating}
      style={{
        ...floatingStyles,
      }}
      className={styles.popoverLayout}
    >
      <div className={styles.buttonLayout}>
        <button
          type="button"
          onClick={hidePopover}
          className={styles.closeButton}
        >
          <img
            src={closeImage}
            alt="close button"
            className={styles.closeButtonIconImage}
          />
        </button>
      </div>
      <div className={styles.popoverTitle}>{title}</div>
      <div className={styles.scheduleLayout}>
        <img
          src={scheduleImage}
          alt="close button"
          className={styles.scheduleIcon}
        />
        <p className={styles.scheduleContent}>
          {format(startTime, "hh':'mm")} - {format(endTime, "hh':'mm")}
        </p>
      </div>
      {content && (
        <div className={styles.popoverDescription}>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}

export default PopoverContent;
