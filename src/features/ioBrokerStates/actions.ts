import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { RootState } from '../../redux/Store';
import { servConn } from '../servConn/slice';
import { I_ioBrokerState, T_ioBroker_Value } from './interfaces';
import { IOBROKE_UPDATE_STATE_FROM_MIDDLEWARE } from './slice';

export const ACTION_IOBROKER_UPDATE_STATE = (id: string, value: T_ioBroker_Value) => (
    dispatch: Dispatch<any>,
    getState: () => I_ioBrokerState,
): any => {
    const state = getState();
    if (servConn.getIsConnected()) {
        servConn.setState(id, value);

        const tState = { ...state.ioBrokerStates[id] };
        tState.val = value;
        dispatch(IOBROKE_UPDATE_STATE_FROM_MIDDLEWARE(id, tState));
    }
};

const _getSelectedStates = (states: string[]): Promise<{ [key: string]: any }> => {
    return new Promise((resolve, reject) => {
        servConn.getStates(states, function (err: any, _states: any) {
            if (_states !== undefined) {
                resolve(_states);
            } else {
                reject({ err, _states });
                // TODO ERRORHANDLING
            }
        });
    });
};

export const IOBROKER_GET_SELECTED_STATES_FROM_IOBROKER = createAsyncThunk<{ [key: string]: any }, string[]>(
    'IOBROKER_STATES/IOBROKER_GET_SELECTED_STATES_FROM_IOBROKER',
    async (states: string[]): Promise<any> => _getSelectedStates(states),
    {
        condition: (_nothing: any, { getState }: { getState: () => RootState; extra: any }) =>
            getState().ioBrokerServConn.status && servConn.getIsConnected(),
    },
);
