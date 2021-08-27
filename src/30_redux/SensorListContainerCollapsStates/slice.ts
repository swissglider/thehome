import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../Store';

export interface I_SensorListContainerCollapseStates {
    id: string;
    open: boolean;
}

export const sensorListContainerCollapseStatesAdapter = createEntityAdapter<I_SensorListContainerCollapseStates>({});

const initialState = sensorListContainerCollapseStatesAdapter.getInitialState({
    status: 'loaded',
});

const sensorListContainerCollapseStatesSlice = createSlice({
    name: 'SENSORLISTCONTAINER_STATES', // action-name
    initialState,
    reducers: {
        SENSORLISTCONTAINER_STATES_UPDATE: sensorListContainerCollapseStatesAdapter.upsertOne,
        SENSORLISTCONTAINER_STATES_CREATE: sensorListContainerCollapseStatesAdapter.addOne,
        SENSORLISTCONTAINER_STATES_UPDATE_MANY: sensorListContainerCollapseStatesAdapter.upsertMany,
        SENSORLISTCONTAINER_STATES_REMOVE_ALL: sensorListContainerCollapseStatesAdapter.removeAll,
    },
});

export const {
    SENSORLISTCONTAINER_STATES_UPDATE,
    SENSORLISTCONTAINER_STATES_CREATE,
    SENSORLISTCONTAINER_STATES_UPDATE_MANY,
    SENSORLISTCONTAINER_STATES_REMOVE_ALL,
} = sensorListContainerCollapseStatesSlice.actions;

export const {
    selectAll: selector_selectSensorListContainerStates,
    selectById: selector_selectSensorListContainerStateByID,
    selectEntities: selector_selectSensorListContainerStateEntities,
    selectIds: selector_selectSensorListContainerStateIds,
} = sensorListContainerCollapseStatesAdapter.getSelectors((state: RootState) => state.sensorsListContainerCollapsState);

export default sensorListContainerCollapseStatesSlice.reducer;

export const selector_getSensorListContainerOpenByID = (id: string) => (state: RootState): any => {
    return selector_selectSensorListContainerStateByID(state, id)?.open;
};
export const selector_getSensorListContainerAll = () => (state: RootState): any => {
    return selector_selectSensorListContainerStateIds(state);
};
