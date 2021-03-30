import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../redux/Store';
import { I_ioBrokerState } from './interfaces';
import { selector_selectIOBrokerState, selector_selectIOBrokerStateIds } from './slice';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export const selector_getAllSensorAvaragesIDByTheHomeFolder = (theHomeFolder: string) =>
    createSelector(
        selector_selectIOBrokerStateIds,
        (ids) =>
            ids.filter((key) => key.toString().startsWith(theHomeFolder) && key.toString().endsWith('av')) as string[],
    );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export const selector_getAllSensorBooleansIDByTheHomeFolder = (theHomeFolder: string) =>
    createSelector(
        selector_selectIOBrokerStateIds,
        (ids) =>
            ids.filter((key) => key.toString().startsWith(theHomeFolder) && key.toString().endsWith('on')) as string[],
    );

export const selector_getStateByID = (id: string) => (state: RootState): any => selector_selectIOBrokerState(state, id);

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

export const selector_getAllValueFromIDList = (idsForAV: string[]) => (state: RootState): any[] =>
    idsForAV
        .filter((key) => selector_selectIOBrokerState(state, key) !== undefined)
        .map((key) => (selector_selectIOBrokerState(state, key) as I_ioBrokerState).val);
