import dayjs from 'dayjs';

declare type UnitType = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

export const formatTime = (dateNumber: number, unit: UnitType = 'minute') => {
  if (!dateNumber) {
    return '/';
  }

  const date = dayjs(dateNumber * 1000);

  if (unit === 'year') return date.format('YYYY');
  if (unit === 'month') return date.format('MM/YYYY');
  if (unit === 'day') return date.format('DD/MM/YYYY');
  if (unit === 'hour') return date.format('HH DD/MM/YYYY');
  if (unit === 'minute') return date.format('HH:mm DD/MM/YYYY');
  if (unit === 'second') return date.format('HH:mm:ss DD/MM/YYYY');

  return date.format(unit);
};

export const getDaysFromNow = (timeStamp: number) => {
  if (timeStamp) {
    const seconds = Math.abs(dayjs(timeStamp).diff(+new Date(), 'second'));
    const days = seconds / 86400;
    return days <= 1 ? 1 : Math.ceil(days);
  }
  return 0;
};
