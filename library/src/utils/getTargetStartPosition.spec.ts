import { describe, expect, it } from '@jest/globals';
import { getTargetStartPosition } from './getTargetStartPosition';

describe('getTargetStartPosition', () => {
  it('calculates correct start position for same day target', () => {
    const result = getTargetStartPosition({
      startTime: new Date(2023, 0, 1, 9, 0), // 09:00
      endTime: new Date(2023, 0, 1, 17, 0), // 17:00
      targetStartTime: new Date(2023, 0, 1, 13, 0), // 13:00
    });
    expect(result).toBeCloseTo(50, 2); // (13:00 - 09:00) / (17:00 - 09:00) * 100 = 50%
  });

  it('calculates correct start position for overnight target', () => {
    const result = getTargetStartPosition({
      startTime: new Date(2023, 0, 1, 20, 0), // 20:00
      endTime: new Date(2023, 0, 2, 8, 0), // Next day 08:00
      targetStartTime: new Date(2023, 0, 2, 2, 0), // Next day 02:00
    });
    expect(result).toBeCloseTo(50, 2); // (02:00 - 20:00) / (08:00 - 20:00) * 100 = 50%
  });

  it('handles target starting at slot start time', () => {
    const result = getTargetStartPosition({
      startTime: new Date(2023, 0, 1, 9, 0), // 09:00
      endTime: new Date(2023, 0, 1, 17, 0), // 17:00
      targetStartTime: new Date(2023, 0, 1, 9, 0), // 09:00
    });
    expect(result).toBe(0); // Target starts at the beginning of the slot
  });

  it('handles target starting at slot end time', () => {
    const result = getTargetStartPosition({
      startTime: new Date(2023, 0, 1, 9, 0), // 09:00
      endTime: new Date(2023, 0, 1, 17, 0), // 17:00
      targetStartTime: new Date(2023, 0, 1, 17, 0), // 17:00
    });
    expect(result).toBe(100); // Target starts at the end of the slot
  });

  it('calculates correct start position for target crossing midnight', () => {
    const result = getTargetStartPosition({
      startTime: new Date(2023, 0, 1, 22, 0), // 22:00
      endTime: new Date(2023, 0, 2, 6, 0), // Next day 06:00
      targetStartTime: new Date(2023, 0, 2, 1, 0), // Next day 01:00
    });
    expect(result).toBeCloseTo(37.5, 2); // (01:00 - 22:00) / (06:00 - 22:00) * 100 ≈ 37.5%
  });

  it('calculates correct start position when end time is earlier than start time (next day)', () => {
    const result = getTargetStartPosition({
      startTime: new Date(2023, 0, 1, 9, 0), // 09:00
      endTime: new Date(2023, 0, 1, 8, 0), // 08:00 (assumed to be next day)
      targetStartTime: new Date(2023, 0, 1, 20, 0), // 20:00
    });
    expect(result).toBeCloseTo(47.83, 2); // (20:00 - 09:00) / (24 hours) * 100 ≈ 47.83%
  });
});
