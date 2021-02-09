import { Dispatch } from 'react';
import { IOBROKER_INSTANCE, IOBROKER_NAME, IOBROKER_URL_IOSOCKET } from '../../../../configuration/Application';
import { IOBROKER_GET_ALL_OBJECTS_FROM_IOBROKER } from '../ioBrokerObjects/actions';
import { IOBROKER_UPDATE_OBJECT_FROM_MIDDLEWARE } from '../ioBrokerObjects/slice';
import { IOBROKER_GET_ALL_STATES_FROM_IOBROKER } from '../ioBrokerStates/actions';
import { IOBROKE_UPDATE_STATE_FROM_MIDDLEWARE } from '../ioBrokerStates/slice';
import { IOBROKER_SET_SERVER_CONNECTION_STATE } from './slice';

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

                    dispatch(IOBROKER_GET_ALL_STATES_FROM_IOBROKER(servConn));

                    dispatch(IOBROKER_GET_ALL_OBJECTS_FROM_IOBROKER(servConn));
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
