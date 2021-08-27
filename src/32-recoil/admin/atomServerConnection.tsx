import { selector } from 'recoil';
import {
    SERV_CONN_ADMIN,
    waitToServConnAdminConnectionStates,
    waitToServConnAdminIsInitialized,
} from './IOBConnectionServies';

export const servConnConnectedSelector = selector({
    key: 'iob_servConnConnection1',
    get: async () => {
        await waitToServConnAdminIsInitialized();
        await waitToServConnAdminConnectionStates();

        return true;
    },
});

export const servConnLogedInUserSelector = selector({
    key: 'iob_servConnLogedInUser',
    get: async () => {
        const userName = await ((): Promise<string> => {
            return new Promise((resolve) => {
                SERV_CONN_ADMIN.getLoggedUser((a: any, v: any) => {
                    console.log('getLoggedUser: ', a, v);
                    resolve(v);
                });
            });
        })();
        return userName;
    },
});
