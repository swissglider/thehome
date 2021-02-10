import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../redux/Store';
import { IOBROKER_GET_ALL_STATES_FROM_IOBROKER } from './actions';
import { I_ioBrokerState } from './interfaces';

export const ioBrokerStatesAdapter = createEntityAdapter<I_ioBrokerState>({
    selectId: (obj: I_ioBrokerState) => obj._id,
});

const initialState = ioBrokerStatesAdapter.getInitialState({
    status: 'idle',
});

const ioBrokerStatesSlice = createSlice({
    name: 'IOBROKER_STATES', // action-name
    initialState,
    reducers: {
        IOBROKER_SET_STATES_FROM_MIDDLEWARE(state, action) {
            const states = { ...action.payload };
            for (const [key, value] of Object.entries(states)) {
                if (value) (value as I_ioBrokerState)['_id'] = key;
                else delete states[key];
            }
            ioBrokerStatesAdapter.setAll(state, states);
        },
        IOBROKE_UPDATE_STATE_FROM_MIDDLEWARE: {
            reducer(state, action) {
                if (action.payload.state) ioBrokerStatesAdapter.upsertOne(state, action.payload.state);
                else ioBrokerStatesAdapter.removeOne(state, action.payload.id);
            },
            prepare(id: string, state: I_ioBrokerState) {
                if (state) state['_id'] = id;
                return { payload: { id, state }, meta: {}, error: {} };
            },
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(IOBROKER_GET_ALL_STATES_FROM_IOBROKER.pending, (state, action) => {
                console.log('pending', action);
                state.status = 'loading';
            })
            .addCase(IOBROKER_GET_ALL_STATES_FROM_IOBROKER.fulfilled, (state, action) => {
                console.log('fulfilled', action);
                const states = { ...action.payload };
                for (const [key, value] of Object.entries(states)) {
                    if (value) (value as I_ioBrokerState)['_id'] = key;
                    else delete states[key];
                }
                ioBrokerStatesAdapter.setAll(state, states);
                state.status = 'loaded';
            })
            .addCase(IOBROKER_GET_ALL_STATES_FROM_IOBROKER.rejected, (state, action) => {
                console.log('rejected', action);
                // TODO ERRORHANDLING
            });
    },
});

export const {
    IOBROKE_UPDATE_STATE_FROM_MIDDLEWARE,
    IOBROKER_SET_STATES_FROM_MIDDLEWARE,
} = ioBrokerStatesSlice.actions;

export const {
    selectAll: selector_selectIOBrokerStates,
    selectById: selector_selectIOBrokerState,
    selectIds: selector_selectIOBrokerStateIds,
} = ioBrokerStatesAdapter.getSelectors((state: RootState) => state.ioBrokerStates);

export default ioBrokerStatesSlice.reducer;
