import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { DEVELOPMENT_MODE_USE_DUMMY_DATA } from '../../../../configuration/Application';
import { RootState } from '../../../../redux/Store';
import { DummyStateDatas } from '../../services/DummyDatas';
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _getAllStates = (dispatch: any): { [key: string]: any } => {
    return new Promise((resolve, reject) => {
        servConn.getStates(function (err: any, _states: any) {
            if (_states !== undefined) {
                if (DEVELOPMENT_MODE_USE_DUMMY_DATA) {
                    resolve({ ...DummyStateDatas, ..._states });
                } else {
                    resolve(_states);
                }
            } else {
                reject({ err, _states });
                // TODO ERRORHANDLING
            }
        });
    });
};

export const IOBROKER_GET_ALL_STATES_FROM_IOBROKER = createAsyncThunk<any>(
    'IOBROKER_STATES/IOBROKER_GET_ALL_STATES_FROM_IOBROKER',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_nothing: any, { dispatch, extra, getState, rejectWithValue, requestId, signal }): Promise<any> =>
        _getAllStates(dispatch),
    {
        condition: (_nothing: any, { getState }: { getState: () => RootState; extra: any }) =>
            getState().ioBrokerServConn.status && servConn.getIsConnected(),
    },
);
