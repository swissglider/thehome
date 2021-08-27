import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { I_ioBrokerState } from './interfaces';
import { selector_selectIOBrokerState, selector_selectIOBrokerStateIds } from './slice';

export const selector_getStateByID = (id: string) => (state: RootState): any => selector_selectIOBrokerState(state, id);

export const selector_getStateValueByID = (id: string) => (state: RootState): any => {
    return selector_selectIOBrokerState(state, id)?.val;
};

export const selector_getStateTimeStampByID = (id: string) => (state: RootState): any => {
    return selector_selectIOBrokerState(state, id)?.ts;
};

export const selector_getStateLastChangeByID = (id: string) => (state: RootState): any => {
    return selector_selectIOBrokerState(state, id)?.lc;
};

export const selector_getStatesStatus = () => (state: RootState): any => state.ioBrokerStates.status;

export const selector_getAvValueFromList = (idsForAV: string[], selector?: string) => (
    state: RootState,
): boolean | number => {
    const values = idsForAV
        .filter((key) => selector_selectIOBrokerState(state, key) !== undefined)
        .map((key) => (selector_selectIOBrokerState(state, key) as I_ioBrokerState).val);
    const _select = selector ?? typeof values[0];
    return _select === 'number'
        ? Math.round(((values as number[]).reduce((a, b) => a + b, 0) / values.length) * 10) / 10
        : _select === 'boolean'
        ? values.some((e) => e)
        : false;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const selectStatesByMemberList = () =>
    createSelector(
        [selector_selectIOBrokerStateIds, (state: any) => state, (state: any, ids: string[]) => ids],
        (all, state, ids) =>
            all
                .filter((stat) => ids.includes(stat.toString()))
                .map((stat) => selector_selectIOBrokerState(state, stat)?.val),
    );
