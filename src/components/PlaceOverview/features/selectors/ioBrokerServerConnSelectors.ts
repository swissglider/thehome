import { RootState } from '../../../../redux/Store';

export const selector_getConnectionStatus = () => ({ ioBroker: { serverConnectionState } }: RootState): string =>
    serverConnectionState;
