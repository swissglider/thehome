// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const IOBrokerMiddleware = (storeAPI: any) => (next: any) => (action: any): any => {
    // if (action.type !== undefined && action.type.startsWith('SENTO/LITTLEHELPER/GENERAL')) {
    //     console.log('middleware: ', action);
    // }
    if (action.type !== undefined && action.type === 'IOBROKER/IOBROKER_SET_SERVER_CONNECTION_STATE') {
        next(action);
        const t_state = storeAPI.getState().ioBroker.serverConnectionState;
        console.log('IoBroker connection state : ', t_state);
        if (['none', 'connecting', 'disconnected'].includes(t_state)) {
            storeAPI.dispatch({ type: 'IOBROKER/IOBROKER_SET_SERVER_CONNECTION_STATE_RESET_LOADING' });
        }
    }

    if (action.type !== undefined && action.type.startsWith('IOBROKER/IOBROKER_SET_SERVER_CONNECTION_STATE_')) {
        console.log(action);
        next(action);
        const t_state = storeAPI.getState().ioBroker.serverConnectionStates;
        if (Object.values(t_state).every((e) => e)) {
            storeAPI.dispatch({ type: 'IOBROKER/IOBROKER_SET_SERVER_CONNECTION_STATE', payload: 'loaded' });
        }
        return;
    }
    // if (action.type === 'IOBROKER/IOBROKE_UPDATE_STATE_FROM_MIDDLEWARE') {
    //     if (!action.payload.id.startsWith('thehome.0.')) {
    //         return;
    //     }
    // }
    return next(action);
};
