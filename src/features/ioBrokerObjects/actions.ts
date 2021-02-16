import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../redux/Store';
import {
    IOBROKER_GET_All_FUNCTIONS_STATE_LIST,
    IOBROKER_GET_GENERAL_FROM_LITTLE_HELPER,
    IOBROKER_GET_HOME_CONTAINER,
} from '../servConn/ActionIOBrokerTestSendTo';
import { servConn } from '../servConn/slice';

const _getAllStates = (dispatch: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        servConn.getObjects(function (err: any, _objects: any) {
            if (_objects !== undefined) {
                dispatch(IOBROKER_GET_GENERAL_FROM_LITTLE_HELPER('test'));
                dispatch(IOBROKER_GET_HOME_CONTAINER('test'));
                dispatch(IOBROKER_GET_All_FUNCTIONS_STATE_LIST('test'));
                resolve(_objects);
            } else {
                reject({ err, _objects });
                // TODO ERRORHANDLING
            }
            // const test = { ..._objects['system.adapter.device-availability.0'] };
            // test['native']['excludeCollection'].push('hallo Guido');
            // servConn._socket.emit('setObject', 'system.adapter.device-availability.0', test, (e: any, a: any) =>
            //     console.log(e, a),
            // );
        });
    });
};

export const IOBROKER_GET_ALL_OBJECTS_FROM_IOBROKER = createAsyncThunk<any>(
    'IOBROKER_OBJECTS/IOBROKER_GET_ALL_OBJECTS_FROM_IOBROKER',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_nothing: any, { dispatch, extra, getState, rejectWithValue, requestId, signal }): Promise<any> =>
        _getAllStates(dispatch),
    {
        condition: (_nothing: any, { getState }: { getState: () => RootState; extra: any }) =>
            getState().ioBrokerServConn.status && servConn.getIsConnected(),
    },
);
