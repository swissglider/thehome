import { createAsyncThunk } from '@reduxjs/toolkit';
import { servConn } from './slice';

const _getGeneralFromLittleHelper = (): { [key: string]: any } => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        servConn.sendTo(
            'swissgliders-little-helpers.0',
            'general',
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
