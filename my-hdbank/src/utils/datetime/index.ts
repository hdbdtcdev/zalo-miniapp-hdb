import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  DATE_FORMAT_DASH,
  DATE_FORMAT_SLASH,
  DATETIME_FORMAT_ISO_8601,
  REVERSE_DATE_FORMAT_DASH,
} from '../../constants';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export const DATETIME_DISPLAY_FORMAT = 'HH:mm DD/MM/YYYY';
export const DATETIME_FORMAT_COMMA_TIME = 'HH:mm, DD/MM/YYYY';
export const DATETIME_FORMAT_MONTH_YEAR = 'MM/YYYY';

export function formatDisplayDateTime(
  datetime: dayjs.ConfigType,
  format = DATETIME_DISPLAY_FORMAT
) {
  return dayjs(datetime).format(format);
}

export const formatDate = (date: string) => {
  return dayjs(date).format('DD/MM/YYYY');
};

export const formatDateFSlash2Dash = (date: string) => {
  return dayjs(date, DATE_FORMAT_SLASH).format(DATE_FORMAT_DASH);
};

export const formatDateFDash2Splash = (date: string) => {
  return dayjs(date, DATE_FORMAT_DASH).format(DATE_FORMAT_SLASH);
};

export const extractDate = (date: string) => {
  const regex = /(\d{2})?-?(\d{2})?-?(\d{4})/;

  const matches = regex.exec(date)?.filter((x) => !!x);

  let day, month, year;
  if (matches) {
    switch (matches.length) {
      case 4: {
        year = matches[3];
        month = matches[2];
        day = matches[1];
        break;
      }
      case 3: {
        year = matches[2];
        month = matches[1];
        day = '01';
        break;
      }
      case 2:
      default:
        year = matches[1];
        month = '01';
        day = '01';
        break;
    }

    return `${day}/${month}/${year}`;
  }
  return '';
};

export const isLessThan18YearsOld = (date: string) => {
  return dayjs().diff(dayjs(date, DATE_FORMAT_SLASH), 'years') < 18;
};

export const isValidIdExpiryDate = (expiryDate: string) => {
  return dayjs(expiryDate, DATE_FORMAT_SLASH).diff(new Date(), 'days') >= 0;
};

export const isValidIdIssueDate = (dateIssue: string, DOB: string) => {
  return (
    dayjs(dateIssue, DATE_FORMAT_SLASH).diff(
      dayjs(DOB, DATE_FORMAT_SLASH),
      'days'
    ) >= 0
  );
};

export const isValidPassportInfo = (
  dob: string,
  dateIssue: string,
  expriyDate: string
) => {
  return (
    !isLessThan18YearsOld(dob) &&
    isValidIdIssueDate(dateIssue, dob) &&
    isValidIdExpiryDate(expriyDate)
  );
};

export const isValidDate = (
  date: string,
  formats: string[] = [REVERSE_DATE_FORMAT_DASH]
) => {
  return dayjs(date, formats).isValid();
};

export const formatTimeClock = (second: number) => {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  //
  const formattedMin = min < 10 ? `0${min}` : min;
  const formattedSec = sec < 10 ? `0${sec}` : sec;

  return `${formattedMin}:${formattedSec}`;
};

export const formatCountdown = (time: number, type: string = 'second') => {
  return `${type === 'minutes' ? formatTimeClock(time) : time.toString()}`;
};

export const getRemainingTime = (total: number, startTime: number) => {
  if (total <= 0) {
    return 0;
  }
  return total - Math.max(dayjs().diff(dayjs(startTime), 'seconds'), 1);
};

export const convertSecondToMinutes = (seconds = 0) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`;
};

export const checkPinIncludeBirthday = (pin: string, birthday: string) => {
  const [y1, y2, y3, y4, m1, m2, d1, d2] = birthday.split('');
  const exceptRule = [
    `${y1}${y2}${y3}${y4}`,
    `${m1}${m2}${d1}${d2}`,
    `${y3}${y4}${m2}${d2}`,
    `${y3}${y4}${m1}${m2}`,
  ];
  return exceptRule.includes(pin);
};

export const getLocalTimeZone = () => {
  return dayjs().format('Z');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const delay = <T = any>(ms: number, response?: T): Promise<T> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(response as T);
    }, ms)
  );
};

export const isBefore = (date: string): boolean => {
  const expiration = dayjs(date, DATETIME_FORMAT_ISO_8601);
  return dayjs().isBefore(expiration);
};

export enum RequestTimeDateFormat {
  Default = 'YYYY-MM-DD HH:mm:ss',
  Short = 'HH:mm:ss DD/MM/YYYY',
  Long = 'YYYY-MM-DD HH:mm:ss.SSS',
  ISO8601 = 'YYYY-MM-DDTHH:mm:ss',
}

export function createRequestTime(): string {
  return dayjs().format(RequestTimeDateFormat.Default);
}

export function getRequestTimeWithTimeZone(): string {
  return dayjs().toISOString();
}

export const convertToDate = (value: string, format: string): Date => {
  return dayjs.utc(value, format).toDate();
};

export const isLessByDay = (
  expriyDate: string,
  endDate: number | undefined = 30
): boolean => {
  return (
    dayjs(expriyDate, DATE_FORMAT_SLASH).diff(new Date(), 'days') <= endDate
  );
};
