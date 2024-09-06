// import { describe, expect, it } from "@jest/globals";
import { calculateCurrentTimePosition, calculateTargetPosition, checkDateInRange, checkTaskListOverlap, checkTimeOverlap, getTodayFromTime } from "../lib/utils/date/calculation";


describe('calculateTargetPosition', () => {
  it('should calculate the correct start and end percentages when the target time is fully within the slot', () => {
    const startTime = new Date('2024-09-06T00:00:00');
    const endTime = new Date('2024-09-06T10:00:00');
    const targetStartTime = new Date('2024-09-06T02:00:00');
    const targetEndTime = new Date('2024-09-06T06:00:00');

    const result = calculateTargetPosition(
      startTime,
      endTime,
      targetStartTime,
      targetEndTime,
    );
    expect(result.startPercent).toBeCloseTo(20);
    expect(result.endPercent).toBeCloseTo(40);
  });

  it('should handle case where the target time starts before the slot starts', () => {
    const startTime = new Date('2024-09-06T08:00:00');
    const endTime = new Date('2024-09-06T18:00:00');
    const targetStartTime = new Date('2024-09-06T05:00:00');
    const targetEndTime = new Date('2024-09-06T06:00:00');

    const result = calculateTargetPosition(
      startTime,
      endTime,
      targetStartTime,
      targetEndTime,
    );
    expect(result.startPercent).toBe(0); // Starts before the slot, so 0%
    expect(result.endPercent).toBeCloseTo(0);
  });

  it('should handle case where the target time ends after the slot ends', () => {
    const startTime = new Date('2024-09-06T00:00:00');
    const endTime = new Date('2024-09-06T10:00:00');
    const targetStartTime = new Date('2024-09-06T08:00:00');
    const targetEndTime = new Date('2024-09-06T12:00:00');

    const result = calculateTargetPosition(
      startTime,
      endTime,
      targetStartTime,
      targetEndTime,
    );
    expect(result.startPercent).toBeCloseTo(80);
    expect(result.endPercent).toBeCloseTo(20); // Ends after the slot, so clipped to 100%
  });
});

describe('checkTimeOverlap', () => {
  it('should return true when time periods overlap', () => {
    const startTime1 = new Date('2024-09-06T02:00:00');
    const endTime1 = new Date('2024-09-06T04:00:00');
    const startTime2 = new Date('2024-09-06T03:00:00');
    const endTime2 = new Date('2024-09-06T05:00:00');

    expect(checkTimeOverlap(startTime1, endTime1, startTime2, endTime2)).toBe(
      true,
    );
  });

  it('should return false when time periods do not overlap', () => {
    const startTime1 = new Date('2024-09-06T02:00:00');
    const endTime1 = new Date('2024-09-06T04:00:00');
    const startTime2 = new Date('2024-09-06T05:00:00');
    const endTime2 = new Date('2024-09-06T06:00:00');

    expect(checkTimeOverlap(startTime1, endTime1, startTime2, endTime2)).toBe(
      false,
    );
  });
});

describe('getTodayFromTime', () => {
  it('should return a Date object with today’s date and specified time', () => {
    const result = getTodayFromTime(12, 30, 15);
    const now = new Date();

    expect(result.getFullYear()).toBe(now.getFullYear());
    expect(result.getMonth()).toBe(now.getMonth());
    expect(result.getDate()).toBe(now.getDate());
    expect(result.getHours()).toBe(12);
    expect(result.getMinutes()).toBe(30);
    expect(result.getSeconds()).toBe(15);
  });
});

describe('checkTaskListOverlap', () => {
  it('should return true if tasks overlap', () => {
    const taskList = [
      {
        id: 1,
        title: 'title1',
        content: 'subTitle1',
        startTime: new Date('2024-09-06T02:00:00'),
        endTime: new Date('2024-09-06T04:00:00'),
      },
      {
        id: 1,
        title: 'title1',
        content: 'subTitle1',
        startTime: new Date('2024-09-06T03:00:00'),
        endTime: new Date('2024-09-06T05:00:00'),
      },
    ];

    expect(checkTaskListOverlap(taskList)).toBe(true);
  });

  it('should return false if tasks do not overlap', () => {
    const taskList = [
      {
        id: 1,
        title: 'title1',
        content: 'subTitle1',
        startTime: new Date('2024-09-06T02:00:00'),
        endTime: new Date('2024-09-06T04:00:00'),
      },
      {
        id: 1,
        title: 'title1',
        content: 'subTitle1',
        startTime: new Date('2024-09-06T05:00:00'),
        endTime: new Date('2024-09-06T06:00:00'),
      },
    ];

    expect(checkTaskListOverlap(taskList)).toBe(false);
  });
});

describe('calculateCurrentTimePosition', () => {
  it('should return the correct percentage based on current time within slot', () => {
    const currentTime = new Date('2024-09-06T03:00:00');
    const startTime = new Date('2024-09-06T00:00:00');
    const endTime = new Date('2024-09-06T06:00:00');

    const result = calculateCurrentTimePosition(
      currentTime,
      startTime,
      endTime,
    );
    expect(result.currentTimePosition).toBeCloseTo(50);
  });

  it('should return 0 if currentTime is null', () => {
    const currentTime = null;
    const startTime = new Date('2024-09-06T00:00:00');
    const endTime = new Date('2024-09-06T06:00:00');

    const result = calculateCurrentTimePosition(
      currentTime,
      startTime,
      endTime,
    );
    expect(result.currentTimePosition).toBe(0);
  });
});

describe('checkDateInRange', () => {
  it('should return true if date is within range', () => {
    const startDate = new Date('2024-09-06T00:00:00');
    const endDate = new Date('2024-09-06T10:00:00');
    const date = new Date('2024-09-06T05:00:00');

    expect(checkDateInRange(startDate, date, endDate)).toBe(true);
  });

  it('should return false if date is not within range', () => {
    const startDate = new Date('2024-09-06T00:00:00');
    const endDate = new Date('2024-09-06T10:00:00');
    const date = new Date('2024-09-06T11:00:00');

    expect(checkDateInRange(startDate, date, endDate)).toBe(false);
  });
});
