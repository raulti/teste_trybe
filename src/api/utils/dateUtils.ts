import moment from 'moment';
import momentTimezone from 'moment-timezone';

function getDateTodayWithTimeZoneGMT() {
  return momentTimezone().tz('GMT');
}

function getDateToday() {
  return convertDateToPtBr(getDateTodayWithTimeZoneGMT().toString());
}

function convertDateToPtBr(date: string): string {
  return date ? convertDateByPattern(date, 'DD/MM/YYYY') : '';
}

function convertDateByPattern(date: string | Date, pattern: string) {
  const newDate = moment(date, 'YYYY-MM-DD');
  return newDate.format(pattern);
}

export default {
  getDateToday,
  convertDateToPtBr,
  convertDateByPattern,
  getDateTodayWithTimeZoneGMT,
};
