import { Switch } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../redux/Store';
import { FrameworkContext } from '../../utils/FrameworkContext';
import { I_ioBrokerObject } from '../PlaceOverview/interfaces/IoBrokerInterfaces';
import { I_ioBrokerState } from '../PlaceOverview/interfaces/IoBrokerInterfaces';
import {
    ACTION_IOBROKER_UPDATE_STATE,
    selector_getDisplayName,
    selector_getIOBObjectByID,
    selector_selectIOBrokerState,
} from '../PlaceOverview/features/reducers/ioBrokerSlice';

const RightComponent = (): JSX.Element => {
    const dispatch = useDispatch();
    const state: I_ioBrokerState | undefined = useSelector(
        (state: RootState) => selector_selectIOBrokerState(state, 'deconz.0.lights.00158d00032daf87.on'),
        shallowEqual,
    );
    const handleChange = () => {
        if (state !== undefined)
            dispatch(ACTION_IOBROKER_UPDATE_STATE('deconz.0.lights.00158d00032daf87.on', !state.val));
    };
    return (
        <>
            {state !== undefined ? (
                <Switch checked={state.val as boolean} onChange={handleChange} name="checkedB" color="primary" />
            ) : (
                <div />
            )}
        </>
    );
};

const TestIOBroker = (): JSX.Element => {
    const dispatch = useDispatch();
    const [context, setContext] = useContext(FrameworkContext);
    const state: I_ioBrokerState | undefined = useSelector(
        (state: RootState) => selector_selectIOBrokerState(state, 'deconz.0.lights.00158d00032daf87.on'),
        shallowEqual,
    );
    const object: I_ioBrokerObject | undefined = useSelector(
        selector_getIOBObjectByID('deconz.0.lights.00158d00032daf87.on'),
        shallowEqual,
    );

    const handleChange = () => {
        if (state !== undefined)
            dispatch(ACTION_IOBROKER_UPDATE_STATE('deconz.0.lights.00158d00032daf87.on', !state.val));
    };

    useEffect(() => {
        const context_ = { ...context };
        context_.title = 'Test IOBroker Status';
        context_.subNavButtons = [];
        context_.rightComponent = <RightComponent />;
        setContext(context_);
    }, []);

    const displayName = useSelector(selector_getDisplayName('deconz.0.lights.00158d00032daf87.on'), shallowEqual);

    return (
        <>
            {state !== undefined && object !== undefined && (
                <>
                    {displayName}: {state.val.toString()}
                    <Switch checked={state.val as boolean} onChange={handleChange} name="checkedB" color="primary" />
                </>
            )}
        </>
    );
};

export default TestIOBroker;
