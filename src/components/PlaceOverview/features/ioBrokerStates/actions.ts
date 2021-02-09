import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { DEVELOPMENT_MODE_USE_DUMMY_DATA } from '../../../../configuration/Application';
import { DummyStateDatas } from '../../services/DummyDatas';
import { IOBROKER_SET_SERVER_CONNECTION_STATE_LOADED } from '../servConn/slice';
import { I_ioBrokerState, T_ioBroker_Value } from './interfaces';
import { IOBROKE_UPDATE_STATE_FROM_MIDDLEWARE } from './slice';

export const ACTION_IOBROKER_UPDATE_STATE = (id: string, value: T_ioBroker_Value) => (
    dispatch: Dispatch<any>,
    getState: () => I_ioBrokerState,
): any => {
    const state = getState();
    if (state.ioBrokerServConn.servConn.getIsConnected()) {
        state.ioBrokerServConn.servConn.setState(id, value);

        const tState = { ...state.ioBrokerStates[id] };
        tState.val = value;
        dispatch(IOBROKE_UPDATE_STATE_FROM_MIDDLEWARE(id, tState));
    }
};

const _getAllStates = (servConn: any, dispatch: any): { [key: string]: any } => {
    return new Promise((resolve, reject) => {
        servConn.getStates(function (err: any, _states: any) {
            if (_states !== undefined) {
                dispatch(IOBROKER_SET_SERVER_CONNECTION_STATE_LOADED('states_loaded'));
                if (DEVELOPMENT_MODE_USE_DUMMY_DATA) {
                    resolve({ ...DummyStateDatas, ..._states });
                } else {
                    resolve(_states);
                }
            } else {
                reject({ err, _states });
            }
        });
    });
};

export const IOBROKER_GET_ALL_STATES_FROM_IOBROKER = createAsyncThunk<any, any>(
    'IOBROKER_STATES/IOBROKER_GET_ALL_STATES_FROM_IOBROKER',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (servConn: any, { dispatch, extra, getState, rejectWithValue, requestId, signal }): Promise<any> => {
        return _getAllStates(servConn, dispatch);
    },
);
