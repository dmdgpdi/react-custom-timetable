'use client';

import randomColors from 'randomcolor';
import { BaseTask, TaskThemeType } from '../components/Timetable.type';

const getRandomColor = (task: BaseTask, theme?: TaskThemeType) => {
  const { id, seed: taskSeed } = task;
  const seed = taskSeed ?? id;

  return randomColors({ seed, hue: theme });
};

const getTaskColor = (task: BaseTask) => {
  const { taskColor } = task;

  if (!taskColor || taskColor === '') {
    return null;
  }

  return taskColor;
};

export { getRandomColor, getTaskColor };
