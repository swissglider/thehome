import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../Store';

//IoB Object / State / Enum etc
export interface I_ioBrokerObject {
    [key: string]: any;
}

export interface I_ioBrokerState {
    [key: string]: any;
}

export type T_ioBrokerObjects = { [key: string]: I_ioBrokerObject };
export type T_ioBrokerStates = { [key: string]: I_ioBrokerState };

export interface I_ioBrokerConnection {
    ioBrokerStates: T_ioBrokerStates;
    ioBrokerObjects: T_ioBrokerObjects;
    servConn: any | undefined;
    error: string | null;
}

const initialState: I_ioBrokerConnection = {
    ioBrokerStates: {},
    ioBrokerObjects: {},
    servConn: undefined,
    error: null,
};

const ioBrokerSlice = createSlice({
    name: 'ioBroker',
    initialState,
    reducers: {
        ioBrokerSetServConnFromMiddleware(state, action) {
            state.servConn = action.payload;
        },
        ioBrokerSetStatesFromMiddleware(state, action) {
            state.ioBrokerStates = action.payload;
        },
        ioBrokerUpdateStateFromMiddleware(state, action) {
            state.ioBrokerStates[action.payload.id] = action.payload.state;
        },
        ioBrokerSetObjectsFromMiddleware(state, action) {
            state.ioBrokerObjects = action.payload;
        },
        ioBrokerUpdateObjectFromMiddleware(state, action) {
            state.ioBrokerObjects[action.payload.id] = action.payload.state;
        },
        ioBrokerUpdateState(state, action) {
            if (state.servConn.getIsConnected()) {
                state.servConn.setState(action.payload.id, action.payload.value);
            }
        },
        ioBrokerAddObject: {
            reducer(state, action) {
                const { ioBrokerID, iobObject } = action.payload;
                state.ioBrokerStates[ioBrokerID] = iobObject;
            },
            prepare(ioBrokerID: string, iobObject: I_ioBrokerObject) {
                return {
                    payload: {
                        ioBrokerID,
                        iobObject,
                    },
                    meta: {},
                    error: {},
                };
            },
        },
    },
});

export const {
    ioBrokerAddObject,
    ioBrokerUpdateStateFromMiddleware,
    ioBrokerSetStatesFromMiddleware,
    ioBrokerSetObjectsFromMiddleware,
    ioBrokerUpdateObjectFromMiddleware,
    ioBrokerSetServConnFromMiddleware,
    ioBrokerUpdateState,
} = ioBrokerSlice.actions;

export const selectIOBrokerStates = (state: RootState): T_ioBrokerStates => state.ioBroker.ioBrokerStates;
export const selectIOBrokerState = (state: RootState, ioBrokerID: string | undefined): I_ioBrokerState | undefined => {
    return ioBrokerID !== undefined && ioBrokerID in state.ioBroker.ioBrokerStates
        ? state.ioBroker.ioBrokerStates[ioBrokerID]
        : undefined;
};
export const selectIOBrokerObjects = (state: RootState): T_ioBrokerObjects => state.ioBroker.ioBrokerObjects;
export const selectIOBrokerObject = (
    state: RootState,
    ioBrokerID: string | undefined,
): I_ioBrokerObject | undefined => {
    return ioBrokerID !== undefined && ioBrokerID in state.ioBroker.ioBrokerObjects
        ? state.ioBroker.ioBrokerObjects[ioBrokerID]
        : undefined;
};

export default ioBrokerSlice.reducer;
