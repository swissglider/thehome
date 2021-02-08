import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import {
    I_ioBrokerObject,
    I_ioBrokerState,
    T_ioBrokerServerConnectionState,
} from '../../interfaces/IoBrokerInterfaces';
import { IOBROKER_GET_GENERAL_FROM_LITTLE_HELPER } from '../actions/ActionIOBrokerTestSendTo';
export * from '../actions/ActionIOBrokerInit';
export * from '../actions/ActionIoBrokerUpdateState';
export * from '../selectors/IoBrokerObjectSelectors';
export * from '../selectors/ioBrokerServerConnSelectors';
export * from '../selectors/IoBrokerStateSelectors';
export * from './IOBrokerMiddleware';

interface I_ioBrokerServerConnectionStates {
    [key: string]: boolean;
}

interface I_ioBrokerReducerState {
    ioBrokerObjects: EntityState<I_ioBrokerObject>;
    ioBrokerStates: EntityState<I_ioBrokerState>;
    servConn: any | undefined;
    serverConnectionStates: I_ioBrokerServerConnectionStates;
    serverConnectionState: T_ioBrokerServerConnectionState;
    error: string | null;
}

export const ioBrokerObjectsAdapter = createEntityAdapter<I_ioBrokerObject>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (obj: I_ioBrokerObject) => obj._id,
    // Keep the "all IDs" array sorted based on book titles
    // sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const ioBrokerStatesAdapter = createEntityAdapter<I_ioBrokerState>({
    selectId: (obj: I_ioBrokerState) => obj._id,
});

const initialState: I_ioBrokerReducerState = {
    ioBrokerStates: ioBrokerStatesAdapter.getInitialState(),
    ioBrokerObjects: ioBrokerObjectsAdapter.getInitialState(),
    servConn: undefined,
    serverConnectionStates: { states_loaded: false, object_loaded: false },
    serverConnectionState: 'none',
    error: null,
};

const ioBrokerSlice = createSlice({
    name: 'IOBROKER', // action-name
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
        IOBROKER_SET_OBJECTS_FROM_MIDDLEWARE(state, action) {
            // state.ioBrokerObjects = action.payload;
            ioBrokerObjectsAdapter.setAll(state.ioBrokerObjects, action.payload);
        },
        IOBROKER_UPDATE_OBJECT_FROM_MIDDLEWARE: {
            reducer(state, action) {
                // state.ioBrokerObjects[action.payload.id] = action.payload.object;
                if (action.payload.state) ioBrokerObjectsAdapter.upsertOne(state.ioBrokerObjects, action.payload.state);
                else ioBrokerObjectsAdapter.removeOne(state.ioBrokerObjects, action.payload.id);
            },
            prepare(id: string, object: I_ioBrokerObject) {
                return { payload: { id, object }, meta: {}, error: {} };
            },
        },
        IOBROKER_SET_STATES_FROM_MIDDLEWARE(state, action) {
            // state.ioBrokerStates = action.payload;
            const states = { ...action.payload };
            for (const [key, value] of Object.entries(states)) {
                if (value) (value as I_ioBrokerState)['_id'] = key;
                else delete states[key];
            }
            ioBrokerStatesAdapter.setAll(state.ioBrokerStates, states);
        },
        IOBROKE_UPDATE_STATE_FROM_MIDDLEWARE: {
            reducer(state, action) {
                // state.ioBrokerStates[action.payload.id] = action.payload.state;
                if (action.payload.state) ioBrokerStatesAdapter.upsertOne(state.ioBrokerStates, action.payload.state);
                else ioBrokerStatesAdapter.removeOne(state.ioBrokerStates, action.payload.id);
            },
            prepare(id: string, state: I_ioBrokerState) {
                if (id === undefined) {
                    console.log(state);
                }
                if (state) state['_id'] = id;
                return { payload: { id, state }, meta: {}, error: {} };
            },
        },
        IOBROKE_UPDATE_STATE: {
            reducer(state, action) {
                // state.ioBrokerStates[action.payload.id] = action.payload.state;
                if (action.payload.state) ioBrokerStatesAdapter.upsertOne(state.ioBrokerStates, action.payload.state);
                else ioBrokerStatesAdapter.removeOne(state.ioBrokerStates, action.payload.id);
            },
            prepare(id: string, state: I_ioBrokerState) {
                if (id === undefined) {
                    console.log(state);
                }
                if (state) state['_id'] = id;
                return { payload: { id, state }, meta: {}, error: {} };
            },
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
    IOBROKER_SET_OBJECTS_FROM_MIDDLEWARE,
    IOBROKER_UPDATE_OBJECT_FROM_MIDDLEWARE,
    IOBROKE_UPDATE_STATE_FROM_MIDDLEWARE,
    IOBROKER_SET_STATES_FROM_MIDDLEWARE,
    IOBROKE_UPDATE_STATE,
} = ioBrokerSlice.actions;

export default ioBrokerSlice.reducer;
