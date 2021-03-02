import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IOBROKER_NAME } from '../../configuration/Application';
import { IOBROKER_GET_HOME_CONTAINER } from './ActionIOBrokerTestSendTo';
import { _initServCon } from './actions';
import { I_HOME_CONTAINER, T_ioBrokerServerConnectionState } from './interfaces';

export let servConn: any | undefined = undefined;

interface I_ioBrokerReducerState {
    status: T_ioBrokerServerConnectionState;
    homeContainers: I_HOME_CONTAINER[] | undefined;
    homeContainersLoaded: boolean;
    error: string | null;
}

const initialState: I_ioBrokerReducerState = {
    status: 'none',
    homeContainers: undefined,
    homeContainersLoaded: false,
    error: null,
};

export const ACTION_IOBROKER_SERV_CONN_INIT = createAsyncThunk<any>(
    'IOBROKER_SERV_CONN/ACTION_IOBROKER_SERV_CONN_INIT',
    async (_nothing: any, { dispatch }): Promise<any> => _initServCon(dispatch),
    { condition: () => servConn !== undefined },
);

const ioBrokerSlice = createSlice({
    name: 'IOBROKER_SERVCONN', // action-name
    initialState,
    reducers: {
        IOBROKER_SERV_CONN_INIT() {
            servConn = (window as { [key: string]: any }).servConn;
            if (servConn !== undefined) {
                // servConn.namespace = IOBROKER_NAME + '.' + IOBROKER_INSTANCE;
                servConn.namespace = IOBROKER_NAME;
                servConn._useStorage = false;
            }
        },
        IOBROKER_SERV_CONN_SET_STATUS(state, action) {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(IOBROKER_GET_HOME_CONTAINER.pending, (_state, _action) => {
                _state.homeContainersLoaded = false;
            })
            .addCase(IOBROKER_GET_HOME_CONTAINER.fulfilled, (_state, _action) => {
                _state.homeContainers = _action.payload;
                _state.homeContainersLoaded = true;
            })
            .addCase(IOBROKER_GET_HOME_CONTAINER.rejected, (_state, _action) => {
                // TODO ERRORHANDLING
                console.log('rejected', _action);
                _state.error = 'Somethind went wrong while loading the home containers';
                _state.homeContainersLoaded = false;
            })
            .addCase(ACTION_IOBROKER_SERV_CONN_INIT.pending, (_state, _action) => {
                _state.status = 'connecting';
            })
            .addCase(ACTION_IOBROKER_SERV_CONN_INIT.fulfilled, (_state, _action) => {
                _state.status = _action.payload;
            })
            .addCase(ACTION_IOBROKER_SERV_CONN_INIT.rejected, (_state, _action) => {
                console.log('rejected', _action);
                // TODO ERRORHANDLING
                _state.error = 'Somethind went wrong while init the connection to ioBroker';
            });
    },
});

export const { IOBROKER_SERV_CONN_INIT, IOBROKER_SERV_CONN_SET_STATUS } = ioBrokerSlice.actions;

export default ioBrokerSlice.reducer;
