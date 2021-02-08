import { Dispatch } from 'react';
import { IOBROKER_NAME, IOBROKER_INSTANCE, IOBROKER_URL_IOSOCKET } from '../../../../configuration/Application';
import { DummyStateDatas } from '../../services/DummyDatas';
import {
    IOBROKER_SET_SERVER_CONNECTION_FROM_MIDDLEWARE,
    IOBROKER_SET_OBJECTS_FROM_MIDDLEWARE,
    IOBROKER_UPDATE_OBJECT_FROM_MIDDLEWARE,
    IOBROKER_SET_STATES_FROM_MIDDLEWARE,
    IOBROKE_UPDATE_STATE_FROM_MIDDLEWARE,
    IOBROKER_SET_SERVER_CONNECTION_STATE,
    IOBROKER_SET_SERVER_CONNECTION_STATE_LOADED,
} from '../reducers/ioBrokerSlice';
import { IOBROKER_GET_GENERAL_FROM_LITTLE_HELPER } from './ActionIOBrokerTestSendTo';

export const ACTION_IOBROKER_INIT = (dispatch: Dispatch<any>): void => {
    const servConn = (window as { [key: string]: any }).servConn;
    servConn.namespace = IOBROKER_NAME + '.' + IOBROKER_INSTANCE;
    servConn._useStorage = false;
    dispatch(IOBROKER_SET_SERVER_CONNECTION_STATE('connecting'));
    servConn.init(
        {
            name: IOBROKER_NAME + '.' + IOBROKER_INSTANCE, // optional - default 'vis.0'
            connLink: IOBROKER_URL_IOSOCKET, // optional URL of the socket.io adapter
            socketSession: '', // optional - used by authentication
        },
        {
            onConnChange: function (isConnected: any) {
                if (isConnected) {
                    dispatch(IOBROKER_SET_SERVER_CONNECTION_STATE('connected'));
                    dispatch(IOBROKER_SET_SERVER_CONNECTION_STATE('loading'));
                    servConn.getStates(function (err: any, _states: any) {
                        dispatch(IOBROKER_SET_SERVER_CONNECTION_FROM_MIDDLEWARE(servConn));
                        if (_states !== undefined) {
                            dispatch(IOBROKER_SET_STATES_FROM_MIDDLEWARE({ ...DummyStateDatas, ..._states }));
                            dispatch(IOBROKER_SET_SERVER_CONNECTION_STATE_LOADED('states_loaded'));
                        }
                    });
                    servConn.getObjects(function (err: any, _objects: any) {
                        if (_objects !== undefined) {
                            dispatch(IOBROKER_SET_OBJECTS_FROM_MIDDLEWARE(Object.assign({}, _objects)));
                            dispatch(IOBROKER_SET_SERVER_CONNECTION_STATE_LOADED('object_loaded'));
                            dispatch(IOBROKER_GET_GENERAL_FROM_LITTLE_HELPER('test'));
                        }
                    });
                } else {
                    dispatch(IOBROKER_SET_SERVER_CONNECTION_STATE('disconnected'));
                }
            },
            onRefresh: function () {
                window.location.reload();
            },
            onUpdate: function (id: any, state: any) {
                if (state !== undefined && id !== undefined) {
                    dispatch(IOBROKE_UPDATE_STATE_FROM_MIDDLEWARE(id, state));
                }
            },
            onObjectChange: (id: any, object: any) => {
                if (object !== undefined && id !== undefined) {
                    dispatch(IOBROKER_UPDATE_OBJECT_FROM_MIDDLEWARE(id, object));
                }
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
            onAuthError: function (err: any) {
                console.log(err.command, err.arg);
            },
        },
        true,
    );
};
