export const getDateNotAfterEndOfDay = (date: Date): Date => {
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));
  return endOfDay.getTime() < date.getTime() ? endOfDay : date;
};
