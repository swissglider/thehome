import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOBROKER_GET_GENERAL_FROM_LITTLE_HELPER } from '../servConn/ActionIOBrokerTestSendTo';
import {
    IOBROKER_SET_SERVER_CONNECTION_FROM_MIDDLEWARE,
    IOBROKER_SET_SERVER_CONNECTION_STATE_LOADED,
} from '../servConn/slice';

const _getAllStates = (servConn: any, dispatch: any): { [key: string]: any } => {
    return new Promise((resolve, reject) => {
        servConn.getObjects(function (err: any, _objects: any) {
            dispatch(IOBROKER_SET_SERVER_CONNECTION_FROM_MIDDLEWARE(servConn));
            if (_objects !== undefined) {
                dispatch(IOBROKER_SET_SERVER_CONNECTION_STATE_LOADED('object_loaded'));
                dispatch(IOBROKER_GET_GENERAL_FROM_LITTLE_HELPER('test'));
                resolve(_objects);
            } else {
                reject({ err, _objects });
            }
        });
    });
};

export const IOBROKER_GET_ALL_OBJECTS_FROM_IOBROKER = createAsyncThunk<any, any>(
    'IOBROKER_OBJECTS/IOBROKER_GET_ALL_OBJECTS_FROM_IOBROKER',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (servConn: any, { dispatch, extra, getState, rejectWithValue, requestId, signal }): Promise<any> => {
        return _getAllStates(servConn, dispatch);
    },
);
