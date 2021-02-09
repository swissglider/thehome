import { Switch } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FrameworkContext } from '../../utils/FrameworkContext';
import { I_ioBrokerObject } from '../PlaceOverview/features/ioBrokerObjects/interfaces';
import {
    selector_getIOBObjectByID,
    selector_getDisplayName,
} from '../PlaceOverview/features/ioBrokerObjects/selectors';
import { ACTION_IOBROKER_UPDATE_STATE } from '../PlaceOverview/features/ioBrokerStates/actions';
import { I_ioBrokerState } from '../PlaceOverview/features/ioBrokerStates/interfaces';
import { selector_getStateByID } from '../PlaceOverview/features/ioBrokerStates/selectors';

const testID = 'deconz.0.lights.00158d00032daf87.on';

const RightComponent = (): JSX.Element => {
    const dispatch = useDispatch();
    const state: I_ioBrokerState | undefined = useSelector(selector_getStateByID(testID));
    const handleChange = () => {
        if (state !== undefined) dispatch(ACTION_IOBROKER_UPDATE_STATE(testID, !state.val));
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
    const state: I_ioBrokerState | undefined = useSelector(selector_getStateByID(testID));
    const object: I_ioBrokerObject | undefined = useSelector(selector_getIOBObjectByID(testID));

    const handleChange = () => {
        if (state !== undefined) dispatch(ACTION_IOBROKER_UPDATE_STATE(testID, !state.val));
    };

    useEffect(() => {
        const context_ = { ...context };
        context_.title = 'Test IOBroker Status';
        context_.subNavButtons = [];
        context_.rightComponent = <RightComponent />;
        setContext(context_);
    }, []);

    const displayName = useSelector(selector_getDisplayName('deconz.0.lights.00158d00032daf87.on'));

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
