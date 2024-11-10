import type { BaseTask } from './baseTask';

export type ReturnTaskType<T extends BaseTask> = T & {
  ref: (node: HTMLElement | null) => void;
  style: React.CSSProperties;
};
