import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/Store';
import { IOBROKER_GET_ALL_OBJECTS_FROM_IOBROKER } from './actions';
import { I_ioBrokerObject } from './interfaces';

export const ioBrokerObjectsAdapter = createEntityAdapter<I_ioBrokerObject>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (obj: I_ioBrokerObject) => obj._id,
    // Keep the "all IDs" array sorted based on book titles
    // sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = ioBrokerObjectsAdapter.getInitialState({
    status: 'idle',
});

const ioBrokerObjectsSlice = createSlice({
    name: 'IOBROKER_OBJECTS', // action-name
    initialState,
    reducers: {
        IOBROKER_SET_OBJECTS_FROM_MIDDLEWARE(state, action) {
            ioBrokerObjectsAdapter.setAll(state, action.payload);
        },
        IOBROKER_UPDATE_OBJECT_FROM_MIDDLEWARE: {
            reducer(state, action) {
                if (action.payload.state) ioBrokerObjectsAdapter.upsertOne(state, action.payload.state);
                else ioBrokerObjectsAdapter.removeOne(state, action.payload.id);
            },
            prepare(id: string, object: I_ioBrokerObject) {
                return { payload: { id, object }, meta: {}, error: {} };
            },
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(IOBROKER_GET_ALL_OBJECTS_FROM_IOBROKER.pending, (state, action) => {
                console.log('pending', action);
                state.status = 'loading';
            })
            .addCase(IOBROKER_GET_ALL_OBJECTS_FROM_IOBROKER.fulfilled, (state, action) => {
                console.log('fulfilled', action);
                ioBrokerObjectsAdapter.setAll(state, action);
                state.status = 'loaded';
            })
            .addCase(IOBROKER_GET_ALL_OBJECTS_FROM_IOBROKER.rejected, (state, action) => {
                console.log('rejected', action);
                // TODO ERRORHANDLING
            });
    },
});

export const {
    IOBROKER_SET_OBJECTS_FROM_MIDDLEWARE,
    IOBROKER_UPDATE_OBJECT_FROM_MIDDLEWARE,
} = ioBrokerObjectsSlice.actions;

export const {
    selectAll: selector_selectIOBrokerObjects,
    selectById: selector_selectIOBrokerObject,
    selectIds: selector_selectIOBrokerObjectIds,
} = ioBrokerObjectsAdapter.getSelectors((state: RootState) => state.ioBrokerObjects);

export default ioBrokerObjectsSlice.reducer;
