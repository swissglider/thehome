import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../redux/Store';
import { selector_selectIOBrokerState, selector_selectIOBrokerStateIds } from './slice';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export const selector_getAllSensorAvaragesIDByTheHomeFolder = (theHomeFolder: string) =>
    createSelector(
        selector_selectIOBrokerStateIds,
        (ids) =>
            ids.filter((key) => key.toString().startsWith(theHomeFolder) && key.toString().endsWith('av')) as string[],
    );

export const selector_getStateByID = (id: string) => (state: RootState): any => selector_selectIOBrokerState(state, id);

export const selector_getStatesStatus = () => (state: RootState): any => state.ioBrokerStates.status;
