import { atom } from 'recoil';
import { SERV_CONN_ADMIN } from './IOBConnectionServies';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const syncStorageEffect = (atomName: any) => (props: any) => {
    if (props.trigger === 'get') {
        // Avoid expensive initialization
        props.setSelf([]); // Call synchronously to initialize
    }
    // get the enum Objects
    SERV_CONN_ADMIN._socket.emit(
        'getObjectView',
        'system',
        'enum',
        { startkey: 'enum.', endkey: 'enum.\u9999' },
        (error: any, obj: any) => {
            props.setSelf(obj.rows.filter(({ id }: { id: string }) => id.startsWith('enum.functions.')));
        },
    );
};

/**
 * enumFunctionListState Atom
 * This represent all the enum functions that are available on the server
 */
export const enumFunctionListState = atom({
    key: 'iob_enumFunctionListState',
    default: [],
    effects_UNSTABLE: [syncStorageEffect('iob_enumFunctionListState')],
});
