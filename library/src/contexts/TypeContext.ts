import { createContext } from 'react';
import { TimetableDirectionType } from '../components/Timetable.type';

const TypeContext = createContext<TimetableDirectionType>('COLUMN');

export { TypeContext };
