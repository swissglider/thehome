import { I_GET_HISTORY_PROPS_OPTIONS } from '../30_redux/servConn/ActionIOBrokerTestSendTo';

// type T_DATAT_TYPE = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

export const C_DURATION = ['hour', 'day', 'week', 'month', 'year'] as const;
export type T_DURATION = typeof C_DURATION[number];

export const C_TIMES = ['sec', 'min', ...C_DURATION] as const;
export type T_TIMES = typeof C_TIMES[number];
type I_TIMES = { [day in T_TIMES]: number };

// export type T_DURATION = 'hour' | 'day' | 'week' | 'month' | 'year';
export type T_DURATION_NAME_STRUCT = {
    [day in T_DURATION]: { name: string; durationInMilliSec: number; stepsInMilliSec: number };
};
export type T_DURATION_HISTORY_OPTIONS_STRUCT = { [day in T_DURATION]: I_GET_HISTORY_PROPS_OPTIONS };

const C_IN_MILLISEC: I_TIMES = {
    sec: 1000,
    min: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    week: 1000 * 60 * 60 * 24 * 7,
    month: 1000 * 60 * 60 * 24 * 30,
    year: 1000 * 60 * 60 * 24 * 365,
};

export const C_DEFAULT_DURATION: T_DURATION = 'week';

const durationNameStruct: T_DURATION_NAME_STRUCT = {
    hour: {
        name: 'duration.hour',
        durationInMilliSec: C_IN_MILLISEC.hour,
        stepsInMilliSec: C_IN_MILLISEC.min,
    },
    day: {
        name: 'duration.day',
        durationInMilliSec: C_IN_MILLISEC.day,
        stepsInMilliSec: C_IN_MILLISEC.min,
    },
    week: {
        name: 'duration.week',
        durationInMilliSec: C_IN_MILLISEC.week,
        stepsInMilliSec: C_IN_MILLISEC.hour,
    },
    month: {
        name: 'duration.month',
        durationInMilliSec: C_IN_MILLISEC.month,
        stepsInMilliSec: C_IN_MILLISEC.hour,
    },
    year: {
        name: 'duration.year',
        durationInMilliSec: C_IN_MILLISEC.year,
        stepsInMilliSec: C_IN_MILLISEC.day,
    },
};

export const getDurationByLocal = (duration: T_DURATION): string => {
    return durationNameStruct[duration]['name'];
};

export const getDurationInMilliSec = (duration: T_DURATION): number => {
    return durationNameStruct[duration]['durationInMilliSec'];
};

export const getStepsInMilliSec = (duration: T_DURATION): number => {
    return durationNameStruct[duration]['stepsInMilliSec'];
};

export const getDurationTypeStructByDurationAndDataType = (
    duration: T_DURATION,
    datatType: string,
): I_GET_HISTORY_PROPS_OPTIONS => {
    const return_struc: I_GET_HISTORY_PROPS_OPTIONS = {
        start: new Date().getTime() - getDurationInMilliSec(duration),
        end: new Date().getTime(),
        step: getStepsInMilliSec(duration),
        limit: false,
        aggregate: datatType === 'number' ? 'average' : datatType === 'boolean' ? 'max' : 'max',
    };
    return return_struc;
};
