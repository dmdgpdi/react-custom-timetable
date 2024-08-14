import { ReactNode } from 'react';
import {
  PopoverType,
  TimetableDirectionType,
  TaskThemeType,
} from '../components/Timetable.type';
import { PopoverTypeContext } from './PopoverContext';
import { TaskSlotContext } from './TaskSlotContext';
import { TypeContext } from './TypeContext';
import { TaskThemeContext } from './TaskThemeContext';

interface ContextProviderProps {
  TimetableDirection: TimetableDirectionType;
  contextValue: {
    ellipsisText: string;
  };
  popoverType: PopoverType;
  taskTheme: TaskThemeType;
  children?: ReactNode;
}

function ContextProvider({
  TimetableDirection,
  contextValue,
  popoverType,
  taskTheme,
  children,
}: ContextProviderProps) {
  return (
    <TypeContext.Provider value={TimetableDirection}>
      <TaskSlotContext.Provider value={contextValue}>
        <PopoverTypeContext.Provider value={popoverType}>
          <TaskThemeContext.Provider value={taskTheme}>
            {children}
          </TaskThemeContext.Provider>
        </PopoverTypeContext.Provider>
      </TaskSlotContext.Provider>
    </TypeContext.Provider>
  );
}

export { ContextProvider };
