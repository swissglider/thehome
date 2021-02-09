import { createSlice } from '@reduxjs/toolkit';
import { IOBROKER_GET_GENERAL_FROM_LITTLE_HELPER } from './ActionIOBrokerTestSendTo';
import { T_ioBrokerServerConnectionState } from './interfaces';

interface I_ioBrokerServerConnectionStates {
    [key: string]: boolean;
}

interface I_ioBrokerReducerState {
    servConn: any | undefined;
    serverConnectionStates: I_ioBrokerServerConnectionStates;
    serverConnectionState: T_ioBrokerServerConnectionState;
    error: string | null;
}

const initialState: I_ioBrokerReducerState = {
    servConn: undefined,
    serverConnectionStates: { states_loaded: false, object_loaded: false },
    serverConnectionState: 'none',
    error: null,
};

const ioBrokerSlice = createSlice({
    name: 'IOBROKER_SERVCONN', // action-name
    initialState,
    reducers: {
        IOBROKER_SET_SERVER_CONNECTION_FROM_MIDDLEWARE(state, { payload }) {
            state.servConn = payload;
        },
        IOBROKER_SET_SERVER_CONNECTION_STATE(state, action) {
            state.serverConnectionState = action.payload;
        },
        IOBROKER_SET_SERVER_CONNECTION_STATE_RESET_LOADING(state) {
            const t_state: I_ioBrokerServerConnectionStates = state.serverConnectionStates;
            for (const key of Object.keys(t_state)) {
                t_state[key] = false;
            }
            state.serverConnectionStates = { states_loaded: false, object_loaded: false };
        },
        IOBROKER_SET_SERVER_CONNECTION_STATE_LOADED(state, action) {
            state.serverConnectionStates[action.payload] = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(IOBROKER_GET_GENERAL_FROM_LITTLE_HELPER.pending, (state, action) => {
                console.log('pending', action);
            })
            .addCase(IOBROKER_GET_GENERAL_FROM_LITTLE_HELPER.fulfilled, (state, action) => {
                console.log('fulfilled', action);
            })
            .addCase(IOBROKER_GET_GENERAL_FROM_LITTLE_HELPER.rejected, (state, action) => {
                console.log('rejected', action);
            });
    },
});

export const {
    IOBROKER_SET_SERVER_CONNECTION_FROM_MIDDLEWARE,
    IOBROKER_SET_SERVER_CONNECTION_STATE,
    IOBROKER_SET_SERVER_CONNECTION_STATE_RESET_LOADING,
    IOBROKER_SET_SERVER_CONNECTION_STATE_LOADED,
} = ioBrokerSlice.actions;

export default ioBrokerSlice.reducer;
