import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from '../14_pages/FW_SplashScreen';
import { ACTION_IOBROKER_INIT } from '../30_redux/servConn/actions';
import { selector_getConnectionStatus, selector_getHomeContainersLoaded } from '../30_redux/servConn/selectors';
import { AppDispatch, store } from '../30_redux/Store';

// REDUX
import { Provider } from 'react-redux';
import { useLoadSocket } from '../20_hooks/IOBrokerScriptLoager';

const LoadIOBDataToRedux_ = ({ children }: PropsWithChildren<{ id?: string }>): JSX.Element => {
    const [statesLoaded, setStatesLoaded] = useState<boolean>(false);
    const [containerLoaded, setContainerLoaded] = useState<boolean>(false);

    const dispatch: AppDispatch = useDispatch();

    const ioBrokerServConnStatus = useSelector(selector_getConnectionStatus());
    const ioBrokerServConnHomeContainerStatus: boolean = useSelector(selector_getHomeContainersLoaded());

    useEffect(() => {
        const callback = () => dispatch<any>(ACTION_IOBROKER_INIT);
        useLoadSocket(callback);
    }, []);

    useEffect(() => {
        console.log('ioBroker Connection Status: ' + ioBrokerServConnStatus);
        if (ioBrokerServConnStatus === 'connected') {
            setStatesLoaded(false);
        }
        if (ioBrokerServConnStatus === 'loaded') {
            setStatesLoaded(true);
        }
        if (ioBrokerServConnStatus === 'none') {
            setStatesLoaded(false);
        }
        if (ioBrokerServConnStatus === 'loading') {
            setStatesLoaded(false);
        }
    }, [ioBrokerServConnStatus]);

    useEffect(() => {
        setContainerLoaded(ioBrokerServConnHomeContainerStatus);
    }, [ioBrokerServConnHomeContainerStatus]);
    // return <>{statesLoaded && containerLoaded && children}</>;
    return <>{statesLoaded && containerLoaded ? children : <SplashScreen />}</>;
};

const LoadIOBDataToRedux = ({ children }: PropsWithChildren<{ id?: string }>): JSX.Element => {
    return (
        <Provider store={store}>
            <LoadIOBDataToRedux_>{children}</LoadIOBDataToRedux_>
        </Provider>
    );
};

export default LoadIOBDataToRedux;
