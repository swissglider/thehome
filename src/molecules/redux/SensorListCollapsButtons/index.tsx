import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
    selector_getSensorListContainerAll,
    SENSORLISTCONTAINER_STATES_REMOVE_ALL,
    SENSORLISTCONTAINER_STATES_UPDATE_MANY,
} from '../../../features/SensorListContainerCollapsStates/slice';
import { AppDispatch } from '../../../redux/Store';
import SimpleButton from '../../../atoms/base/SimpleButton';

const SensorListCollapsButtons = (): JSX.Element => {
    const allStates = useSelector(selector_getSensorListContainerAll());
    const dispatch: AppDispatch = useDispatch();
    const updateAll = (newVal: boolean): void => {
        const newState = allStates.map((e: string) => ({ id: e, open: newVal }));
        dispatch(SENSORLISTCONTAINER_STATES_UPDATE_MANY(newState));
    };

    const collapseAll = (): void => {
        updateAll(false);
    };
    const expandAll = (): void => {
        updateAll(true);
    };
    useEffect(() => {
        dispatch(SENSORLISTCONTAINER_STATES_REMOVE_ALL());
        return () => {
            return;
        };
    }, []);
    return (
        <Grid container spacing={4}>
            <Grid item xs sm={3} md={2} xl={1}>
                <SimpleButton text={'collapseAll'} onClick={() => collapseAll()} />
            </Grid>
            <Grid item xs sm={3} md={2} xl={1}>
                <SimpleButton text={'expandAll'} onClick={() => expandAll()} />
            </Grid>
        </Grid>
    );
};

export default SensorListCollapsButtons;
