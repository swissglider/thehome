import { createAsyncThunk } from '@reduxjs/toolkit';
import { T_HOME_CONTAINER_LIST } from './interfaces';
import { servConn } from './slice';

const _getHomeContainer = (): Promise<T_HOME_CONTAINER_LIST> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        servConn.sendTo(
            'test-react.0',
            'home_container::getHomeContainer',
            {
                message: 'hallo',
            },
            (e: T_HOME_CONTAINER_LIST) => resolve(e),
        );
    });
};

// type < Return type of the payload creator, First argument to the payload creator , ThunkAPI >
export const IOBROKER_GET_HOME_CONTAINER = createAsyncThunk<T_HOME_CONTAINER_LIST, any, any>(
    'SENTO/TESTREACT/GETHOMECONTAINER',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (forNothing: any, { dispatch, extra, getState, rejectWithValue, requestId, signal }): Promise<any> => {
        return (await _getHomeContainer()) as T_HOME_CONTAINER_LIST;
    },
);

const _getAllImpactingStates = (): Promise<string[]> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        servConn.sendTo(
            'test-react.0',
            'home_container::getAllImpactingStates',
            {
                message: 'hallo',
            },
            (e: string[]) => resolve(e),
        );
    });
};

export const IOBROKER_GET_All_IMPACTING_STATES = createAsyncThunk<string[], any, any>(
    'SENTO/TESTREACT/IOBROKERGETAllIMPACTINGSTATES',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (forNothing: any, { dispatch, extra, getState, rejectWithValue, requestId, signal }): Promise<any> => {
        return (await _getAllImpactingStates()) as string[];
    },
);

const _getAllImpactingObjects = (): Promise<string[]> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        servConn.sendTo(
            'test-react.0',
            'home_container::getAllImpactingObjects',
            {
                message: 'hallo',
            },
            (e: string[]) => resolve(e),
        );
    });
};

export const IOBROKER_GET_All_IMPACTING_OBJECTS = createAsyncThunk<string[], any, any>(
    'SENTO/TESTREACT/IOBROKERGETAllIMPACTING_OBJECTS',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (forNothing: any, { dispatch, extra, getState, rejectWithValue, requestId, signal }): Promise<any> => {
        return (await _getAllImpactingObjects()) as string[];
    },
);
