import * as moment from 'moment';

export function getDayOfWeekStartedFromMonday(day: number): number {
  if (--day === -1) {
    return 6;
  }
  return day;
}

export function getFilteredEventsFormDate(events, date, type) {
  return events.filter((event) => {
    return checkDateInCurrentRange(event, date, type);
  });
}

export function checkDateInCurrentRange(event, date, type) {
  let isDateStartInRange;
  let isDateEndInRange;
  if (type === 'month') {
    isDateStartInRange = moment(event.dateStart).isSame(date, 'month');
    isDateEndInRange = moment(event.dateEnd).isSame(date, 'month');
  } else if (type === 'week') {
    isDateStartInRange = moment(event.dateStart).isSame(date, 'week');
    isDateEndInRange = moment(event.dateEnd).isSame(date, 'week');
  } else if (type === 'day') {
    isDateStartInRange = new Date(event.dateStart).getDate() === date;
    isDateEndInRange = new Date(event.dateEnd).getDate() === date;
  }
  return isDateStartInRange || isDateEndInRange;
}

export const DATE_STATES = {
  YEAR: 'YEAR',
  MONTH: 'MONTH',
  WEEK: 'WEEK'
};
