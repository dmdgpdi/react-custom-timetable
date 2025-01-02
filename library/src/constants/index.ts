const FORMAT_LIST = [
  'px',
  '%',
  'em',
  'rem',
  'vw',
  'vh',
  'cm',
  'mm',
  'in',
  'pt',
  'pc',
  'ex',
  'ch',
  'lh',
  'rlh',
  'vmin',
  'vmax',
  'vi',
  'vb',
  'q',
] as const;
type FormatType = (typeof FORMAT_LIST)[number];

const COLOR_LIST = [
  '#FF5151',
  '#88E0EF',
  '#FCE38A',
  '#161E54',
  '#FF9B6A',
  '#00D1CD',
  '#FFE98A',
  '#F30067',
  '#EAEAEA',
  '#280B45',
  '#95E1D3',
  '#61105E',
  '#C84771',
] as const;
const COLOR_LIST_LENGTH = COLOR_LIST.length;

export { FORMAT_LIST, COLOR_LIST, COLOR_LIST_LENGTH };
export type { FormatType };

/**
 * @description 24 * 60 * 60 * 1000
 */
export const MILLISECONDS_IN_DAY = 86400000;
