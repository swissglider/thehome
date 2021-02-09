import { Dispatch } from 'react';
import { I_ioBrokerState, T_ioBroker_Value } from '.';
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
