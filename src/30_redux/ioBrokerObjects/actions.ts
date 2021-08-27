import { createAsyncThunk } from '@reduxjs/toolkit';
import { servConn } from '../servConn/slice';
import { RootState } from '../Store';

const _getSelectedObjects = (objects: string[]): Promise<any> => {
    const getObject = (id: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            servConn.getObject(id, false, function (err: any, _object: any) {
                if (_object !== undefined) {
                    resolve(_object);
                } else {
                    reject({ err, _object });
                    // TODO ERRORHANDLING
                }
            });
        });
    };
    const promises: Promise<any>[] = [];
    for (const id of objects) {
        promises.push(getObject(id));
    }
    return Promise.all(promises);
};

export const IOBROKER_GET_SELECTED_OBJECTS_FROM_IOBROKER = createAsyncThunk<{ [key: string]: any }, string[]>(
    'IOBROKER_OBJECTS/IOBROKER_GET_SELECTED_OBJECTS_FROM_IOBROKER',
    async (objects: string[]): Promise<any> => _getSelectedObjects(objects),
    {
        condition: (_nothing: any, { getState }: { getState: () => RootState; extra: any }) =>
            getState().ioBrokerServConn.status && servConn.getIsConnected(),
    },
);
