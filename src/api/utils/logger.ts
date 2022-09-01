/* eslint-disable no-console */
import config from '../config';
import DateUtils from './dateUtils';

const color = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

class Logger {
  info(text) {
    console.log(color.yellow, this.getText(text));
  }

  error(text) {
    console.log(color.red, this.getText(text));
  }

  debug(text) {
    if (config.logs.level == 'debug') {
      console.log(color.green, this.getText(text));
    }
  }

  getText(text: string): string {
    return `${DateUtils.convertDateToPtBr(DateUtils.getDateTodayWithTimeZoneGMT().toString())} : ${text}`;
  }
}

export default new Logger();
