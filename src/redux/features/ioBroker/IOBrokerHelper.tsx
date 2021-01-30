import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IOBROKER_INSTANCE, IOBROKER_URL_IOSOCKET } from '../../../configuration/Application';
import {
    ioBrokerSetStatesFromMiddleware,
    ioBrokerSetServConnFromMiddleware,
    ioBrokerUpdateStateFromMiddleware,
    ioBrokerSetObjectsFromMiddleware,
    ioBrokerUpdateObjectFromMiddleware,
} from './ioBrokerSlice';

const IOBrokerHelper = (props: { updateStatus: any }): null => {
    const dispatch = useDispatch();
    const loadIoBroker = () => {
        const servConn = (window as { [key: string]: any }).servConn;
        servConn.namespace = IOBROKER_INSTANCE;
        servConn._useStorage = false;
        servConn.init(
            {
                name: IOBROKER_INSTANCE, // optional - default 'vis.0'
                connLink: IOBROKER_URL_IOSOCKET, // optional URL of the socket.io adapter
                socketSession: '', // optional - used by authentication
            },
            {
                onConnChange: function (isConnected: any) {
                    if (isConnected) {
                        console.log('connected');
                        props.updateStatus('connected');
                        servConn.getStates(function (err: any, _states: any) {
                            dispatch(ioBrokerSetServConnFromMiddleware(servConn));
                            if (_states !== undefined) {
                                dispatch(ioBrokerSetStatesFromMiddleware(Object.assign({}, _states)));
                                props.updateStatus('states loaded');
                            }
                        });
                        servConn.getObjects(function (err: any, _objects: any) {
                            if (_objects !== undefined) {
                                dispatch(ioBrokerSetObjectsFromMiddleware(Object.assign({}, _objects)));
                                props.updateStatus('object loaded');
                            }
                        });
                    } else {
                        console.log('disconnected');
                        props.updateStatus('connected');
                    }
                },
                onRefresh: function () {
                    window.location.reload();
                },
                onUpdate: function (id: any, state: any) {
                    setTimeout(function () {
                        // console.log('NEW VALUE of ' + id + ': ' + JSON.stringify(state));
                        if (state !== undefined && id !== undefined) {
                            dispatch(ioBrokerUpdateStateFromMiddleware({ id, state }));
                        }
                    }, 0);
                },
                onObjectChange: (id: any, object: any) => {
                    setTimeout(function () {
                        // console.log(object);
                        if (object !== undefined && id !== undefined) {
                            dispatch(ioBrokerUpdateObjectFromMiddleware({ id, object }));
                        }
                    }, 0);
                },
                onCommand: (instance: any, command: any, data: any) => {
                    console.log('onCommand start');
                    console.log(instance);
                    console.log(command);
                    console.log(data);
                    console.log('onCommand start');
                },
                onAuth: (objectsRequired: any, isSecure: any, e: any) => {
                    console.log('onAuth start');
                    console.log(objectsRequired);
                    console.log(isSecure);
                    console.log(e);
                    console.log('onAuth start');
                },
                onError: function (err: any) {
                    console.log(err.command, err.arg);
                },
            },
            true,
        );
    };

    const loadSocket = () => {
        const script = document.createElement('script');
        script.src = '/js/services/conn.js';
        script.async = true;
        script.onload = () => loadIoBroker();
        document.body.appendChild(script);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `/js/services/socket.io.js`;
        script.async = true;
        script.onload = () => loadSocket();
        document.body.appendChild(script);
    }, []);

    return null;
};

export default IOBrokerHelper;
