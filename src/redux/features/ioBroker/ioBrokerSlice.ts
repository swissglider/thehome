import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../Store';

//IoB Object / State / Enum etc
export interface I_ioBrokerObject {
    [key: string]: any;
}

export type T_ioBrokerObjects = { [key: string]: I_ioBrokerObject };

export interface I_ioBrokerConnection {
    ioBrokerObjects: T_ioBrokerObjects;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: I_ioBrokerConnection = {
    ioBrokerObjects: {},
    status: 'idle',
    error: null,
};

// export const fetchIOBroker = createAsyncThunk('posts/fetchPosts', async () => {
//     const response = await client.get('/fakeApi/posts');
//     return response.posts;
// });

const ioBrokerSlice = createSlice({
    name: 'ioBroker',
    initialState,
    reducers: {
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
        ioBrokerUpdateObject(state, action) {
            const { ioBrokerID, iobObject } = action.payload;
            if (ioBrokerID in state.ioBrokerObjects) state.ioBrokerObjects[ioBrokerID] = iobObject;
        },
    },
});

export const { ioBrokerAddObject, ioBrokerUpdateObject } = ioBrokerSlice.actions;

export const selectIOBrokerStates = (state: RootState): T_ioBrokerObjects => state.ioBroker.ioBrokerObjects;
export const selectIOBrokerState = (state: RootState, ioBrokerID: string | undefined): any | undefined =>
    ioBrokerID !== undefined && ioBrokerID in state.ioBroker.ioBrokerObjects
        ? state.ioBroker.ioBrokerObjects[ioBrokerID]
        : undefined;

export default ioBrokerSlice.reducer;
