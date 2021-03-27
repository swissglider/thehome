import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const xAxisTickFormatter = (timestamp_measured: any) => {
    return moment(timestamp_measured).locale('de-ch').format('lll').slice(0, 6);
};
