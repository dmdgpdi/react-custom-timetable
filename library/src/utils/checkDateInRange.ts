export const checkDateInRange = (startDate: Date, date: Date, endDate: Date) =>
  startDate <= date && date <= endDate;
