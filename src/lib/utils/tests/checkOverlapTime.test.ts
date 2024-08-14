import { describe, expect, test } from '@jest/globals';
import { getDateFromTime, checkTimeOverlap } from '..';

describe('taskList를 받았을 떄, 겹치는 시간이 있는지 확인하기', () => {
  describe('시간이 겹치는 taskList를 받을 떄', () => {
    test('task1 안에 task2가 있을 떄', () => {
      const task1 = {
        id: 1,
        title: 'title1',
        content: 'subTitle1',
        taskColor: 'red',
        startTime: getDateFromTime(12, 0, 0),
        endTime: getDateFromTime(13, 0, 0),
      };
      const task2 = {
        id: 2,
        title: 'title2',
        content: 'subTitle2',
        taskColor: 'blue',
        startTime: getDateFromTime(12, 10, 0),
        endTime: getDateFromTime(12, 30, 0),
      };

      // when
      const result = checkTimeOverlap(
        task1.startTime,
        task1.endTime,
        task2.startTime,
        task2.endTime,
      );

      expect(result).toEqual(true);
    });

    test('task1가 끝나기 전에 task2가 시작할 때', () => {
      const task1 = {
        id: 1,
        title: 'title1',
        content: 'subTitle1',
        taskColor: 'red',
        startTime: getDateFromTime(12, 0, 0),
        endTime: getDateFromTime(13, 0, 0),
      };
      const task2 = {
        id: 2,
        title: 'title2',
        content: 'subTitle2',
        taskColor: 'blue',
        startTime: getDateFromTime(12, 30, 0),
        endTime: getDateFromTime(14, 30, 0),
      };

      // when
      const result = checkTimeOverlap(
        task1.startTime,
        task1.endTime,
        task2.startTime,
        task2.endTime,
      );

      expect(result).toEqual(true);
    });

    test('task2가 끝나기 전에 task1이 시작할 때', () => {
      const task1 = {
        id: 1,
        title: 'title1',
        content: 'subTitle1',
        taskColor: 'red',
        startTime: getDateFromTime(12, 0, 0),
        endTime: getDateFromTime(13, 0, 0),
      };
      const task2 = {
        id: 2,
        title: 'title2',
        content: 'subTitle2',
        taskColor: 'blue',
        startTime: getDateFromTime(11, 30, 0),
        endTime: getDateFromTime(13, 30, 0),
      };

      // when
      const result = checkTimeOverlap(
        task1.startTime,
        task1.endTime,
        task2.startTime,
        task2.endTime,
      );

      expect(result).toEqual(true);
    });
  });

  describe('겹치지 않는 taskList를 받을 떄', () => {
    test('task1와 task2가 떨어져있을때', () => {
      const task1 = {
        id: 1,
        title: 'title1',
        content: 'subTitle1',
        taskColor: 'red',
        startTime: getDateFromTime(12, 0, 0),
        endTime: getDateFromTime(13, 0, 0),
      };
      const task2 = {
        id: 2,
        title: 'title2',
        content: 'subTitle2',
        taskColor: 'blue',
        startTime: getDateFromTime(13, 10, 0),
        endTime: getDateFromTime(13, 50, 0),
      };

      const result = checkTimeOverlap(
        task1.startTime,
        task1.endTime,
        task2.startTime,
        task2.endTime,
      );

      expect(result).toBeFalsy();
    });

    test('task1가 끝나고 바로 task2가 시작할 때', () => {
      const task1 = {
        id: 1,
        title: 'title1',
        content: 'subTitle1',
        taskColor: 'red',
        startTime: getDateFromTime(12, 0, 0),
        endTime: getDateFromTime(13, 0, 0),
      };
      const task2 = {
        id: 2,
        title: 'title2',
        content: 'subTitle2',
        taskColor: 'blue',
        startTime: getDateFromTime(13, 0, 0),
        endTime: getDateFromTime(13, 50, 0),
      };

      const result = checkTimeOverlap(
        task1.startTime,
        task1.endTime,
        task2.startTime,
        task2.endTime,
      );

      expect(result).toBeFalsy();
    });
  });
});
