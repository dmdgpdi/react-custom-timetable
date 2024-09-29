import { describe, expect, test } from '@jest/globals';
import { parseSizeFormat, parseSizeValue } from '..';
import { FORMAT_LIST } from '../../constants';

describe('Timetable의 size 값 나누기', () => {
  describe('size 값에서 format 가져오기', () => {
    const size = 1000;

    FORMAT_LIST.forEach((format) => {
      test(`size으로 ${size}${format} 이 주어졌을 때 ${format}을 분리할 수 있다.`, () => {
        // given
        const sizeString = `${size}${format}`;

        // when
        const result = parseSizeFormat(sizeString);

        // then
        expect(result).toEqual(format);
      });
    });
  });

  describe('size 값에서 value 가져오기', () => {
    const sizeValueList = [100, 95, 0.5, 48.33333, 3];

    sizeValueList.forEach((sizeValue) => {
      FORMAT_LIST.forEach((format) => {
        const size = `${sizeValue}${format}`;
        test(`size으로 ${size}이 주어졌을 때 값 ${sizeValue}을 분리할 수 있다.`, () => {
          // when
          const result = parseSizeValue(size);
          // then
          expect(result).toEqual(sizeValue);
        });
      });
    });
  });
});
