import { atom, selector, selectorFamily } from 'recoil';
import { IOBROKER_INSTANCE, IOBROKER_NAME } from '../../2_configuration/Application';
import { SERV_CONN_ADMIN } from './IOBConnectionServies';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const syncStorageEffect = (atomName: any) => (props: any) => {
    if (props.trigger === 'get') {
        // Avoid expensive initialization
        props.setSelf({}); // Call synchronously to initialize
    }
    // get the AdminParams Object
    SERV_CONN_ADMIN._socket.emit(
        'getObject',
        `system.adapter.${IOBROKER_NAME}.${IOBROKER_INSTANCE}`,
        (error: any, obj: any) => {
            props.setSelf(obj);
        },
    );
    // update the AdminParams Object if changes on the iob server
    SERV_CONN_ADMIN._socket.on('objectChange', (id: string, ob: any) => {
        if (id === `system.adapter.${IOBROKER_NAME}.${IOBROKER_INSTANCE}`) {
            props.setSelf(ob);
        }
    });
    // subscribe to changes for the AdminParams Object on the server
    SERV_CONN_ADMIN._socket.emit('subscribeObjects', `system.adapter.${IOBROKER_NAME}.${IOBROKER_INSTANCE}`);

    // change the AdminParams on the server
    props.onSet((newValue: any) => {
        SERV_CONN_ADMIN._socket.emit('setObject', `system.adapter.${IOBROKER_NAME}.${IOBROKER_INSTANCE}`, newValue);
    });
};

/**
 * Private adminParamsState Atom only be used over Selectors
 */
const adminParamsState = atom({
    key: 'iob_adminParamsState',
    default: {},
    effects_UNSTABLE: [syncStorageEffect('iob_adminParamsState')],
});

/**
 * Selector for the adminParamsState ==> the whole adminParams native object
 */
export const adminParamsSelector = selector({
    key: 'iob_adminParamsSelector',
    get: async ({ get }) => {
        const params: any = get(adminParamsState);
        if (params === undefined || !('native' in params)) return {};
        return params.native;
    },
    set: (props, newValue) => {
        const oldParams: any = props.get(adminParamsState);
        if ('native' in oldParams) {
            const newParams: any = { ...oldParams };
            const native = newValue;
            newParams.native = native;
            console.log(newParams);
            props.set(adminParamsState, newParams);
        }
    },
});

/**
 * Selecotr for the adminParamsState ==> single params from the native object
 */
export const adminParamSelector = selectorFamily({
    key: 'iob_adminParamSelector',
    get: (param: string) => async ({ get }) => {
        const params: any = get(adminParamsState);
        if (params === undefined || !('native' in params) || !(param in params.native)) return undefined;
        const adminParam: any = params?.native[param];
        return adminParam;
    },
    set: (param) => (props, value) => {
        const oldParams: any = props.get(adminParamsState);
        if ('native' in oldParams) {
            const newParams: any = { ...oldParams };
            const native = { ...newParams.native };
            native[param] = value;
            newParams.native = native;
            props.set(adminParamsState, newParams);
        }
    },
});
