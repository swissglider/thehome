import React from 'react';
import { I_GET_HISTORY_PROPS_OPTIONS } from '../../features/servConn/ActionIOBrokerTestSendTo';
import { Trans } from '@lingui/macro';

// type T_DATAT_TYPE = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

export const C_DURATION = ['hour', 'day', 'week', 'month', 'year'] as const;
export type T_DURATION = typeof C_DURATION[number];

export const C_TIMES = ['sec', 'min', ...C_DURATION] as const;
export type T_TIMES = typeof C_TIMES[number];
type I_TIMES = { [day in T_TIMES]: number };

// export type T_DURATION = 'hour' | 'day' | 'week' | 'month' | 'year';
export type T_DURATION_NAME_STRUCT = {
    [day in T_DURATION]: { name: JSX.Element; durationInMilliSec: number; stepsInMilliSec: number };
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
        name: <Trans id="duration.hour">hour</Trans>,
        durationInMilliSec: C_IN_MILLISEC.hour,
        stepsInMilliSec: C_IN_MILLISEC.min,
    },
    day: {
        name: <Trans id="duration.day">day</Trans>,
        durationInMilliSec: C_IN_MILLISEC.day,
        stepsInMilliSec: C_IN_MILLISEC.min,
    },
    week: {
        name: <Trans id="duration.week">week</Trans>,
        durationInMilliSec: C_IN_MILLISEC.week,
        stepsInMilliSec: C_IN_MILLISEC.hour,
    },
    month: {
        name: <Trans id="duration.month">month</Trans>,
        durationInMilliSec: C_IN_MILLISEC.month,
        stepsInMilliSec: C_IN_MILLISEC.hour,
    },
    year: {
        name: <Trans id="duration.year">year</Trans>,
        durationInMilliSec: C_IN_MILLISEC.year,
        stepsInMilliSec: C_IN_MILLISEC.day,
    },
};

export const getDurationByLocal = (duration: T_DURATION): JSX.Element => {
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
