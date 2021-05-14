export function getDayOfWeekStartedFromMonday(day: number): number {
  if (--day === -1) {
    return 6;
  }
  return day;
}

export const DATE_STATES = {
  YEAR: 'YEAR',
  MONTH: 'MONTH',
  WEEK: 'WEEK'
};
