import { IOBROKER_NAME, IOBROKER_URL_IOSOCKET, IOB_CONNECTION_TIMEOUT } from '../../2_configuration/Application';

// eslint-disable-next-line prefer-const
export let SERV_CONN_ADMIN: any | undefined = undefined;
export let SERV_CONN_ADMIN_CONNECTION_STATE: 'connecting' | 'connected' | 'closed' = 'closed';

/**
 * Callback that initialize the ServConnAdmin
 * should be set in the Admin Component MainPage in the useEffect as following:
 * useLoadSocket(servConnAdminCB)
 * @returns callback used after IOBroker script are loaded to init the servConnAdmin
 */
export const servConnAdminCB = (): void => {
    const servConn_ = (window as { [key: string]: any }).servConn;
    SERV_CONN_ADMIN = servConn_;
    SERV_CONN_ADMIN_CONNECTION_STATE: 'connecting';
    SERV_CONN_ADMIN.init(
        {
            // name: IOBROKER_NAME + '.' + IOBROKER_INSTANCE, // optional - default 'vis.0'
            name: IOBROKER_NAME, // optional - default 'vis.0'
            connLink: IOBROKER_URL_IOSOCKET, // optional URL of the socket.io adapter
            socketSession: '', // optional - used by authentication
        },
        {
            onConnChange: function (isConnected: any) {
                if (isConnected) {
                    SERV_CONN_ADMIN_CONNECTION_STATE = 'connected';
                } else {
                    // TODO ERRORHANDLING
                    console.error('IOB Connection could not be established');
                    SERV_CONN_ADMIN_CONNECTION_STATE = 'closed';
                }
            },
        },
        false, // autosubscribe all objects
        false, // autosubscribe all states
    );
};
/**
 * Connects to the IOBroker socket.io server
 * @returns Promise to the connection state while connected...
 */
export const waitToServConnAdminConnectionStates = (): Promise<void> => {
    const start = Date.now();

    const waitForServConnAdmin = (resolve: (value: void) => void, reject: (value: Error) => void) => {
        if (SERV_CONN_ADMIN_CONNECTION_STATE === 'connected') {
            console.log('connected');
            resolve();
        } else if (IOB_CONNECTION_TIMEOUT && Date.now() - start >= IOB_CONNECTION_TIMEOUT)
            reject(new Error('IOB Connection timeout'));
        else setTimeout(waitForServConnAdmin.bind(this, resolve, reject), 30);
    };

    return new Promise(waitForServConnAdmin);
};

/**
 *
 * @returns Promise that will be true if the Connection Socket to IOBroker is initialized
 */
export const waitToServConnAdminIsInitialized = (): Promise<void> => {
    const start = Date.now();

    const waitForServConnAdmin = (resolve: (value: void) => void, reject: (value: Error) => void) => {
        if (SERV_CONN_ADMIN !== undefined) {
            console.log('initialized');
            resolve();
        } else if (IOB_CONNECTION_TIMEOUT && Date.now() - start >= IOB_CONNECTION_TIMEOUT)
            reject(new Error('IOB Connection timeout'));
        else setTimeout(waitForServConnAdmin.bind(this, resolve, reject), 30);
    };

    return new Promise(waitForServConnAdmin);
};
