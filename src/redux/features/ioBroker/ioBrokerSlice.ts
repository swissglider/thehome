import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../Store';

//IoB Object / State / Enum etc
export interface I_ioBrokerObject {
    [key: string]: any;
}

export type T_ioBrokerObjects = { [key: string]: I_ioBrokerObject };

export interface I_ioBrokerConnection {
    ioBrokerObjects: T_ioBrokerObjects;
    servConn: any | undefined;
    error: string | null;
}

const initialState: I_ioBrokerConnection = {
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
                state.ioBrokerObjects[ioBrokerID] = iobObject;
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
    ioBrokerUpdateObjectFromMiddleware,
    ioBrokerSetObjectsFromMiddleware,
    ioBrokerSetServConnFromMiddleware,
    ioBrokerUpdateState,
} = ioBrokerSlice.actions;

export const selectIOBrokerStates = (state: RootState): T_ioBrokerObjects => state.ioBroker.ioBrokerObjects;
export const selectIOBrokerState = (state: RootState, ioBrokerID: string | undefined): any | undefined => {
    return ioBrokerID !== undefined && ioBrokerID in state.ioBroker.ioBrokerObjects
        ? state.ioBroker.ioBrokerObjects[ioBrokerID].val
        : undefined;
};

export default ioBrokerSlice.reducer;
