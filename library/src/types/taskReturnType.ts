import type { BaseTask } from './baseTask';

export type ReturnTaskType<T extends BaseTask> = T & {
  style: React.CSSProperties;
};
