import { Switch } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ioBrokerUpdateState, selectIOBrokerState } from '../../redux/features/ioBroker/ioBrokerSlice';
import { RootState } from '../../redux/Store';

const TestIOBroker = (): JSX.Element => {
    const dispatch = useDispatch();
    const object: boolean | undefined = useSelector((state: RootState) =>
        selectIOBrokerState(state, 'deconz.0.lights.00158d00032daf87.on'),
    );

    const handleChange = () => {
        if (object !== undefined)
            dispatch(ioBrokerUpdateState({ id: 'deconz.0.lights.00158d00032daf87.on', value: !object }));
    };

    return (
        <>
            <div>
                Status Licht Büro: {object !== undefined ? object.toString() : 'not yet set'}
                {object !== undefined && (
                    <Switch checked={object} onChange={handleChange} name="checkedB" color="primary" />
                )}
            </div>
        </>
    );
};

export default TestIOBroker;
