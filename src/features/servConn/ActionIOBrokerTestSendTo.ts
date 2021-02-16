import { createAsyncThunk } from '@reduxjs/toolkit';
import { servConn } from './slice';

const _getGeneralFromLittleHelper = (): { [key: string]: any } => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        servConn.sendTo(
            'test-react.0',
            'send',
            {
                message: 'hallo',
            },
            (e: { [key: string]: any }) => resolve(e),
        );
    });
};

export const IOBROKER_GET_GENERAL_FROM_LITTLE_HELPER = createAsyncThunk<string, any>(
    'SENTO/LITTLEHELPER/GENERAL',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (text: string, { dispatch, extra, getState, rejectWithValue, requestId, signal }): Promise<any> => {
        return await _getGeneralFromLittleHelper();
    },
);

const _getHomeContainer = (): { [key: string]: any } => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        servConn.sendTo(
            'test-react.0',
            'home_container::getHomeContainer',
            {
                message: 'hallo',
            },
            (e: { [key: string]: any }) => resolve(e),
        );
    });
};

export const IOBROKER_GET_HOME_CONTAINER = createAsyncThunk<string, any>(
    'SENTO/TESTREACT/GETHOMECONTAINER',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (text: string, { dispatch, extra, getState, rejectWithValue, requestId, signal }): Promise<any> => {
        return await _getHomeContainer();
    },
);

const _getAllFunctionsStateList = (): { [key: string]: any } => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        servConn.sendTo(
            'test-react.0',
            'home_container::getAllFunctionsStateListe',
            {
                message: 'hallo',
            },
            (e: { [key: string]: any }) => resolve(e),
        );
    });
};

export const IOBROKER_GET_All_FUNCTIONS_STATE_LIST = createAsyncThunk<string, any>(
    'SENTO/TESTREACT/GETALLFUNCTIONSSTATELIST',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (text: string, { dispatch, extra, getState, rejectWithValue, requestId, signal }): Promise<any> => {
        return await _getAllFunctionsStateList();
    },
);
