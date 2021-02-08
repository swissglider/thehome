import { Dispatch } from 'react';
import { I_ioBrokerState, T_ioBroker_Value } from '../../interfaces/IoBrokerInterfaces';

export const ACTION_IOBROKER_UPDATE_STATE = (id: string, value: T_ioBroker_Value) => (
    dispatch: Dispatch<any>,
    getState: () => I_ioBrokerState,
): any => {
    const state = getState();
    if (state.ioBroker.servConn.getIsConnected()) {
        state.ioBroker.servConn.setState(id, value);

        const tState = { ...state.ioBroker.ioBrokerStates[id] };
        tState.val = value;
        dispatch({ type: 'IOBROKER/IOBROKE_UPDATE_STATE', payload: { id: id, state: tState } });
    }
};
