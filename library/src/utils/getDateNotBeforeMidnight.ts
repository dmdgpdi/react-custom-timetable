export const getDateNotBeforeMidnight = (date: Date) => {
  const midnight = new Date(new Date().setHours(0, 0, 0, 0));
  return date.getTime() < midnight.getTime() ? midnight : date;
};
