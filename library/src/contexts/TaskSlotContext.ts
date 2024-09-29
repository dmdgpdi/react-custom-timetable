import { createContext } from 'react';
import { TaskSlotContextProps } from '../components/Timetable.type';

const defaultContext: TaskSlotContextProps = {
  ellipsisText: '',
};
const TaskSlotContext = createContext<TaskSlotContextProps>(defaultContext);

export { TaskSlotContext };
