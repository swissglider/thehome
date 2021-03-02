import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../redux/Store';
import { servConn } from '../servConn/slice';

const _getSelectedObjects = (objects: string[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        servConn.getObjects(objects, function (err: any, _objects: any) {
            if (_objects !== undefined) {
                resolve(_objects);
            } else {
                reject({ err, _objects });
                // TODO ERRORHANDLING
            }
        });
    });
};

export const IOBROKER_GET_SELECTED_OBJECTS_FROM_IOBROKER = createAsyncThunk<{ [key: string]: any }, string[]>(
    'IOBROKER_OBJECTS/IOBROKER_GET_SELECTED_OBJECTS_FROM_IOBROKER',
    async (objects: string[]): Promise<any> => _getSelectedObjects(objects),
    {
        condition: (_nothing: any, { getState }: { getState: () => RootState; extra: any }) =>
            getState().ioBrokerServConn.status && servConn.getIsConnected(),
    },
);
