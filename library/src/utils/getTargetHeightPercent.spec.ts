import { describe, expect, it } from '@jest/globals';
import { getTargetHeightPercent } from './getTargetHeightPercent';

describe('getTargetHeightPercent', () => {
  it('calculates correct percentage for same day target', () => {
    const result = getTargetHeightPercent({
      startTime: new Date(2023, 0, 1, 0, 0), // 00:00
      endTime: new Date(2023, 0, 1, 24, 0), // 24:00
      targetStartTime: new Date(2023, 0, 1, 6, 0), // 06:00
      targetEndTime: new Date(2023, 0, 1, 12, 0), // 12:00
    });
    expect(result).toBeCloseTo(25, 2); // 6 hours out of 24 hours = 25%
  });

  it('calculates correct percentage for overnight target', () => {
    const result = getTargetHeightPercent({
      startTime: new Date(2023, 0, 1, 17, 0), // 17:00
      endTime: new Date(2023, 0, 2, 17, 0), // Next day 17:00
      targetStartTime: new Date(2023, 0, 1, 22, 0), // 22:00
      targetEndTime: new Date(2023, 0, 2, 4, 0), // Next day 04:00
    });
    expect(result).toBeCloseTo(25, 2); // 6 hours out of 24 hours = 25%
  });

  it('handles target spanning multiple days', () => {
    const result = getTargetHeightPercent({
      startTime: new Date(2023, 0, 1, 0, 0), // 00:00
      endTime: new Date(2023, 0, 3, 0, 0), // 2 days later 00:00
      targetStartTime: new Date(2023, 0, 1, 12, 0), // 12:00
      targetEndTime: new Date(2023, 0, 2, 12, 0), // Next day 12:00
    });
    expect(result).toBeCloseTo(50, 2); // 24 hours out of 48 hours = 50%
  });

  it('handles very short durations', () => {
    const result = getTargetHeightPercent({
      startTime: new Date(2023, 0, 1, 0, 0, 0), // 00:00:00
      endTime: new Date(2023, 0, 1, 0, 1, 0), // 00:01:00
      targetStartTime: new Date(2023, 0, 1, 0, 0, 30), // 00:00:30
      targetEndTime: new Date(2023, 0, 1, 0, 0, 45), // 00:00:45
    });
    expect(result).toBeCloseTo(25, 2); // 15 seconds out of 60 seconds = 25%
  });

  it('handles target exactly matching slot time', () => {
    const result = getTargetHeightPercent({
      startTime: new Date(2023, 0, 1, 0, 0),
      endTime: new Date(2023, 0, 2, 0, 0),
      targetStartTime: new Date(2023, 0, 1, 0, 0),
      targetEndTime: new Date(2023, 0, 2, 0, 0),
    });
    expect(result).toBeCloseTo(100, 2); // Full day = 100%
  });
});
