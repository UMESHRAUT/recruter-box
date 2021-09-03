import moment from 'moment';

/* eslint-disable consistent-return */
/* eslint-disable operator-assignment */
/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

export function timeAgo(previous: number) {
  const current = new Date().getTime();

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;
  if (Number.isNaN(elapsed)) {
    return '  Not Yet';
  }
  if (elapsed < msPerMinute) {
    return `${Math.round(elapsed / 1000)} seconds ago`;
  }
  if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} minutes ago`;
  }
  if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} hours ago`;
  }
  if (elapsed < msPerMonth) {
    return `${Math.round(elapsed / msPerDay)} days ago`;
  }
  if (elapsed < msPerYear) {
    return `${Math.round(elapsed / msPerMonth)} months ago`;
  }
  return `${Math.round(elapsed / msPerYear)} years ago`;
}

export function getDateDiff(fromDate: string, toDate: string) {
  const date1 = new Date(fromDate).getTime();
  const date2 = new Date(toDate).getTime();
  const diffTime = Math.abs(date2 - date1);

  return Math.ceil(diffTime / MILLISECONDS_IN_DAY);
}

export function getDaysRemain(fromDate: string, toDate: string) {
  const date1 = new Date(fromDate).getTime();
  const date2 = new Date(toDate).getTime();

  if (date1 > date2) return 0;

  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / MILLISECONDS_IN_DAY);
}

export function calendarFormat(date: number | Date) {
  return moment(date).calendar({
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: 'Do MMM, YYYY [at] LT',
    nextWeek: 'Do MMM, YYYY [at] LT',
    sameElse: 'Do MMM, YYYY [at] LT',
  });
}

export function dateTimeFormat(date: number | Date) {
  return moment(date).format('DD/MM/YYYY [at] LT [(IST)]');
}

export function dateFormat(date: number | Date) {
  return moment(date).format('Do MMM, YYYY');
}

export function isTimestamp(number:number){
  return number > 10000000;
}

const TIME_UNITS = [
  {
    denominator: 1,
    range: 1000,
    precision: 3,
    format: {
      singular: 'milli second',
      plural: 'milli seconds',
      abbr: 'ms',
    },
  },
  {
    denominator: 1000,
    range: 60,
    precision: 3,
    format: {
      singular: 'second',
      plural: 'seconds',
      abbr: 'sec',
    },
  },
  {
    denominator: 60,
    range: 60,
    precision: 2,
    format: {
      singular: 'minute',
      plural: 'minutes',
      abbr: 'min',
    },
  },
  {
    denominator: 60,
    range: 24,
    precision: 2,
    format: {
      singular: 'hour',
      plural: 'hours',
      abbr: 'hr',
    },
  },
  {
    denominator: 24,
    range: 365,
    precision: 0,
    format: {
      singular: 'day',
      plural: 'days',
      abbr: 'd',
    },
  },
];

export function getDurationString(
  duration: number,
  useAbbr: boolean = false,
  separateUnits: boolean = false,
  precision?: number
) {
  let i = 0;
  let unitValue = duration;

  while (i < TIME_UNITS.length) {
    unitValue = unitValue / TIME_UNITS[i].denominator;

    if (unitValue < TIME_UNITS[i].range || i === TIME_UNITS.length - 1) {
      const decimalFixedVal = parseInt(
        ((unitValue % 1) * TIME_UNITS[i].denominator).toFixed(0),
        10
      );

      if (separateUnits) {
        const integerPart = Math.floor(unitValue);

        let formattedString =
          integerPart +
          ' ' +
          getTimeUnitString(integerPart, TIME_UNITS[i].format, useAbbr);

        if (decimalFixedVal > 0 && i > 0) {
          formattedString +=
            ' ' +
            decimalFixedVal +
            ' ' +
            getTimeUnitString(
              decimalFixedVal,
              TIME_UNITS[i - 1].format,
              useAbbr
            );
        }

        return formattedString;
      }

      if (precision == null) {
        precision = TIME_UNITS[i].precision;
      }
      return (
        unitValue.toFixed(precision) +
        ' ' +
        getTimeUnitString(unitValue, TIME_UNITS[i].format, useAbbr)
      );
    }

    i = +1;
  }
}

function getTimeUnitString(
  value: number,
  format: any,
  useAbbr: boolean = false
) {
  if (useAbbr) {
    return format.abbr;
  }
  return value <= 1 ? format.singular : format.plural;
}
