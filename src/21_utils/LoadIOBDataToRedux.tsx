import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from '../14_pages/FW_SplashScreen';
import { ACTION_IOBROKER_INIT } from '../30_redux/servConn/actions';
import { selector_getConnectionStatus, selector_getHomeContainersLoaded } from '../30_redux/servConn/selectors';
import { AppDispatch, store } from '../30_redux/Store';

// REDUX
import { Provider } from 'react-redux';

const LoadIOBDataToRedux_ = ({ children }: PropsWithChildren<{ id?: string }>): JSX.Element => {
    const [statesLoaded, setStatesLoaded] = useState<boolean>(false);
    const [containerLoaded, setContainerLoaded] = useState<boolean>(false);

    const dispatch: AppDispatch = useDispatch();

    const ioBrokerServConnStatus = useSelector(selector_getConnectionStatus());
    const ioBrokerServConnHomeContainerStatus: boolean = useSelector(selector_getHomeContainersLoaded());

    const loadSocket = () => {
        const script = document.createElement('script');

        script.src = process.env.NODE_ENV === 'production' ? '/thehome/js/services/conn.js' : '/js/services/conn.js';
        script.async = true;
        script.onload = () => dispatch<any>(ACTION_IOBROKER_INIT);
        document.body.appendChild(script);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src =
            process.env.NODE_ENV === 'production' ? `/thehome/js/services/socket.io.js` : `/js/services/socket.io.js`;
        script.async = true;
        script.onload = () => loadSocket();
        document.body.appendChild(script);
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
