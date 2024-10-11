import { createContext } from 'react';
import { PopoverType } from '../components/Timetable.type';

const PopoverTypeContext = createContext<PopoverType>('CLICK');

export { PopoverTypeContext };
