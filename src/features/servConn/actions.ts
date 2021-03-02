import { Dispatch } from 'react';
import { IOBROKER_NAME, IOBROKER_URL_IOSOCKET } from '../../configuration/Application';
import { IOBROKER_UPDATE_OBJECT_FROM_MIDDLEWARE } from '../ioBrokerObjects/slice';
import { IOBROKE_UPDATE_STATE_FROM_MIDDLEWARE } from '../ioBrokerStates/slice';
import { ACTION_IOBROKER_SERV_CONN_INIT, IOBROKER_SERV_CONN_INIT, servConn } from './slice';

export const ACTION_IOBROKER_INIT = (dispatch: Dispatch<any>): void => {
    dispatch(IOBROKER_SERV_CONN_INIT());
    dispatch(ACTION_IOBROKER_SERV_CONN_INIT());
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const _initServCon = (dispatch: any): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        if (servConn !== undefined) {
            servConn.init(
                {
                    // name: IOBROKER_NAME + '.' + IOBROKER_INSTANCE, // optional - default 'vis.0'
                    name: IOBROKER_NAME, // optional - default 'vis.0'
                    connLink: IOBROKER_URL_IOSOCKET, // optional URL of the socket.io adapter
                    socketSession: '', // optional - used by authentication
                },
                {
                    onConnChange: function (isConnected: any) {
                        if (isConnected) {
                            resolve('connected');
                        } else {
                            // TODO ERRORHANDLING
                            resolve('disconnected');
                        }
                    },
                    onUpdate: function (id: any, state: any) {
                        if (state !== undefined && id !== undefined) {
                            // console.log(state);
                            dispatch(IOBROKE_UPDATE_STATE_FROM_MIDDLEWARE(id, state));
                        }
                        // TODO ERRORHANDLING
                    },
                    onObjectChange: (id: any, object: any) => {
                        if (object !== undefined && id !== undefined) {
                            console.log(object);
                            dispatch(IOBROKER_UPDATE_OBJECT_FROM_MIDDLEWARE(id, object));
                        }
                        // TODO ERRORHANDLING
                    },
                    onRefresh: function () {
                        // TODO ERRORHANDLING
                        window.location.reload();
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
                        // TODO ERRORHANDLING
                        console.log(err.command, err.arg);
                    },
                    onAuthError: function (err: any) {
                        // TODO ERRORHANDLING
                        console.log(err.command, err.arg);
                    },
                },
                false, // autosubscribe all objects
                false, // autosubscribe all states
            );
        }
    });
};
