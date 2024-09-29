import { createContext } from 'react';
import { TaskThemeType } from '../components/Timetable.type';

const TaskThemeContext = createContext<TaskThemeType>(undefined);

export { TaskThemeContext };
