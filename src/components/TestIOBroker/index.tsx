import { Switch } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    ioBrokerUpdateState,
    I_ioBrokerObject,
    I_ioBrokerState,
    selectIOBrokerObject,
    selectIOBrokerState,
} from '../../redux/features/ioBroker/ioBrokerSlice';
import { RootState } from '../../redux/Store';
import { FrameworkContext } from '../../utils/FrameworkContext';
import SplashScreen from '../MainLayout/components/SplashScreen';

const RightComponent = (): JSX.Element => {
    const dispatch = useDispatch();
    const state: I_ioBrokerState | undefined = useSelector((state: RootState) =>
        selectIOBrokerState(state, 'deconz.0.lights.00158d00032daf87.on'),
    );
    const handleChange = () => {
        if (state !== undefined)
            dispatch(ioBrokerUpdateState({ id: 'deconz.0.lights.00158d00032daf87.on', value: !state.val }));
    };
    return (
        <>
            {state !== undefined ? (
                <Switch checked={state.val} onChange={handleChange} name="checkedB" color="primary" />
            ) : (
                <div />
            )}
        </>
    );
};

const TestIOBroker = (): JSX.Element => {
    const dispatch = useDispatch();
    const [context, setContext] = useContext(FrameworkContext);
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

    useEffect(() => {
        const context_ = { ...context };
        context_.title = 'Test IOBroker Status';
        context_.subNavButtons = [];
        context_.rightComponent = <RightComponent />;
        setContext(context_);
    }, []);

    return (
        <>
            {state !== undefined && object !== undefined && (
                <>
                    {object.native.swissglider.general.displayName}: {state.val.toString()}
                    <Switch checked={state.val} onChange={handleChange} name="checkedB" color="primary" />
                </>
            )}
        </>
    );
};

export default TestIOBroker;
