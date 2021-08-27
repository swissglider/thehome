import { DateTime, Settings } from 'luxon';

const longFrom = 'HH:mm - dd.MMM.yyyy';
const middlelongFrom = 'HH:mm - dd.M.yy';
const weekDayTimeForm = 'EEE HH:mm';
const shortDate = 'dd.MMM';

const TimeHelper = {
    getLongTimeFromMillisec: (milliseconds: any | number): string => {
        const time = typeof milliseconds !== 'number' ? parseInt(milliseconds, 10) : milliseconds;
        return DateTime.fromMillis(time).toFormat(longFrom);
    },
    getMiddleLongTimeFromMillisec: (milliseconds: any | number): string => {
        const time = typeof milliseconds !== 'number' ? parseInt(milliseconds, 10) : milliseconds;
        return DateTime.fromMillis(time).toFormat(middlelongFrom);
    },
    getLongTimeFromValue: (
        year: number,
        month: number,
        day: number,
        hour: number,
        minute: number,
        second: number,
    ): string => {
        return DateTime.local(year, month, day, hour, minute, second).toFormat(longFrom);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getWeekDayTime: (milliseconds: any): string => {
        const time = typeof milliseconds === 'number' ? milliseconds : parseInt(milliseconds, 10);
        return DateTime.fromMillis(time).toFormat(weekDayTimeForm);
    },

    getShortDateFromMillisec: (milliseconds: any | number): string => {
        const time = typeof milliseconds !== 'number' ? parseInt(milliseconds, 10) : milliseconds;
        return DateTime.fromMillis(time).toFormat(shortDate);
    },

    setGlobalLocale(): void {
        Settings.defaultLocale = 'en-nz';
    },
};

export default TimeHelper;
