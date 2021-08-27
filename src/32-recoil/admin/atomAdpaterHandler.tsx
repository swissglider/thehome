import { atom, selectorFamily } from 'recoil';
import { SERV_CONN_ADMIN } from './IOBConnectionServies';

const foreignAdapterEffect = (bla: string) => (props: any) => {
    console.log(props, bla);
};

/**
 * Private foreignAdapterState Atom only be used over Selectors
 */
const foreignAdapterState = atom({
    key: 'iob_foreignAdapterState',
    default: {},
    effects_UNSTABLE: [foreignAdapterEffect('iob_adminParamsState')],
});

const getIOBObject = (objectPath: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        SERV_CONN_ADMIN._socket.emit('getObject', objectPath, (error: any, obj: any) => {
            if (obj !== undefined) {
                resolve(obj);
            } else {
                reject({ error, obj });
                // TODO ERRORHANDLING
            }
        });
    });
};

/**
 * Selector for get/Set foreign Adapter Operations
 */
export const foreignAdapterSelector = selectorFamily({
    key: 'iob_foreignAdapterSelector',
    get: (adapterPath: string) => async ({ get }) => {
        console.log(adapterPath);
        const obj = await getIOBObject(adapterPath);
        return obj;
    },
    set: (adapterPath: string) => (props, value) => {
        console.log(adapterPath, props, value);
        SERV_CONN_ADMIN._socket.emit('setObject', adapterPath, value);
    },
});
