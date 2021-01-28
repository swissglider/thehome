import { Switch } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    ioBrokerUpdateState,
    I_ioBrokerObject,
    I_ioBrokerState,
    selectIOBrokerObject,
    selectIOBrokerState,
} from '../../redux/features/ioBroker/ioBrokerSlice';
import { RootState } from '../../redux/Store';

const TestIOBroker = (): JSX.Element => {
    const dispatch = useDispatch();
    const state: I_ioBrokerState | undefined = useSelector((state: RootState) =>
        selectIOBrokerState(state, 'deconz.0.lights.00158d00032daf87.on'),
    );
    const object: I_ioBrokerObject | undefined = useSelector((state: RootState) =>
        selectIOBrokerObject(state, 'deconz.0.lights.00158d00032daf87.on'),
    );

    const handleChange = () => {
        if (state !== undefined)
            dispatch(ioBrokerUpdateState({ id: 'deconz.0.lights.00158d00032daf87.on', value: !state.val }));
    };

    return (
        <>
            <div>
                {state !== undefined && object !== undefined && (
                    <>
                        {object.native.swissglider.general.displayName}: {state.val.toString()}
                        <Switch checked={state.val} onChange={handleChange} name="checkedB" color="primary" />
                    </>
                )}
            </div>
        </>
    );
};

export default TestIOBroker;
