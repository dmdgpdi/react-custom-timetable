import { FORMAT_LIST, FormatType } from '../constants';

const isFormatString = (formatType: string): formatType is FormatType =>
  FORMAT_LIST.includes(formatType as FormatType);

const parseSizeFormat = (sizeWithFormat: string) => {
  const formatList = sizeWithFormat.match(/[a-z%]+/);

  if (!formatList || formatList.length >= 2) {
    throw new Error('Unsupported format');
  }

  const format = formatList[0];

  if (!isFormatString(format)) {
    throw new Error('Unsupported format');
  }

  return format;
};

const parseSizeValue = (sizeWithFormat: string) => {
  const value = parseFloat(sizeWithFormat);

  if (Number.isNaN(value)) {
    throw new Error('No numeric value found in input');
  }

  return value;
};

const parseSize = (sizeWithFormat: string) => {
  const format = parseSizeFormat(sizeWithFormat);
  const value = parseSizeValue(sizeWithFormat);

  return { value, format };
};

const distributeSize = (
  totalSize: number,
  length: number,
  format: string = 'px',
) => {
  if (!isFormatString(format)) {
    throw new Error('wrong format');
  }

  if (length === 0 || totalSize <= 0) {
    throw new Error('wrong number');
  }

  const size = totalSize / length;
  return `${size}${format}`;
};

export {
  distributeSize,
  isFormatString,
  parseSize,
  parseSizeFormat,
  parseSizeValue,
};
