import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    ioBrokerSetObjectsFromMiddleware,
    ioBrokerSetServConnFromMiddleware,
    ioBrokerUpdateObjectFromMiddleware,
} from '../../../redux/features/ioBroker/ioBrokerSlice';

const IOBrokerHelper = (): null => {
    const dispatch = useDispatch();
    const scriptLoaded = () => {
        const servConn = (window as { [key: string]: any }).servConn;
        servConn.namespace = 'velo.0';
        servConn._useStorage = false;
        let states = [];
        servConn.init(
            {
                name: 'velo.0', // optional - default 'vis.0'
                connLink: 'http://192.168.90.1:8082', // optional URL of the socket.io adapter
                socketSession: '', // optional - used by authentication
            },
            {
                onConnChange: function (isConnected: any) {
                    if (isConnected) {
                        console.log('connected');
                        servConn.getStates(function (err: any, _states: any) {
                            let count = 0;
                            for (const id in _states) {
                                id;
                                count++;
                            }
                            console.log('Received ' + count + ' states.');
                            states = _states;
                            if (_states !== undefined) {
                                dispatch(ioBrokerSetServConnFromMiddleware(servConn));
                                dispatch(ioBrokerSetObjectsFromMiddleware(Object.assign({}, _states)));
                            }
                        });
                    } else {
                        console.log('disconnected');
                    }
                },
                onRefresh: function () {
                    window.location.reload();
                },
                onUpdate: function (id: any, state: any) {
                    setTimeout(function () {
                        // console.log('NEW VALUE of ' + id + ': ' + JSON.stringify(state));
                        if (state !== undefined && id !== undefined) {
                            dispatch(ioBrokerUpdateObjectFromMiddleware({ id, state }));
                            states[id] = state;
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
        );
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/js/services/conn.js';
        script.async = true;
        script.onload = () => scriptLoaded();
        document.body.appendChild(script);
    }, []);

    return null;
};

export default IOBrokerHelper;
