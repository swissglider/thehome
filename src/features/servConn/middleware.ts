import { IOBROKER_GET_ALL_OBJECTS_FROM_IOBROKER } from '../ioBrokerObjects/actions';
import { IOBROKER_GET_ALL_STATES_FROM_IOBROKER } from '../ioBrokerStates/actions';
import { IOBROKER_SERV_CONN_SET_STATUS } from './slice';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const IOBrokerMiddleware = (storeAPI: any) => (next: any) => (action: any): any => {
    // if (action.type !== undefined && action.type.startsWith('SENTO/LITTLEHELPER/GENERAL')) {
    //     console.log('middleware: ', action);
    // }
    if (action.type === 'IOBROKER_SERV_CONN/ACTION_IOBROKER_SERV_CONN_INIT/fulfilled') {
        next(action);
        action.payload === 'connected' &&
            Promise.allSettled([
                storeAPI.dispatch(IOBROKER_GET_ALL_STATES_FROM_IOBROKER()),
                storeAPI.dispatch(IOBROKER_GET_ALL_OBJECTS_FROM_IOBROKER()),
            ]).then((arr) => {
                if (arr.map((r) => r.status).every((s) => s === 'fulfilled')) {
                    storeAPI.dispatch(IOBROKER_SERV_CONN_SET_STATUS('loaded'));
                } else {
                    // TODO ERRORHANDLING
                    console.log('not fulfilled');
                }
            });
        action.payload === 'disconnected' && ''; // TODO ERRORHANDLING

        return;
    }
    return next(action);
};
