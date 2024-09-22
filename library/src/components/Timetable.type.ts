interface BaseTask {
  id: number;
  title: string;
  content: string | null;
  startTime: Date | null;
  endTime: Date | null;
  taskColor?: string | null;
  seed?: Seed;
}

type TaskThemeType =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'random'
  | `#${string}`
  | undefined;
type Seed = string | number;

interface TaskSlotContextProps {
  ellipsisText: string;
}
type TimetableDirectionType = 'ROW' | 'COLUMN';
type PopoverType = 'CLICK' | 'HOVER';

export type {
  BaseTask,
  TimetableDirectionType,
  PopoverType,
  TaskSlotContextProps,
  TaskThemeType,
};
