import { RootState } from '../../../../redux/Store';

export const selector_getConnectionStatus = () => ({
    ioBrokerServConn: { serverConnectionState },
}: RootState): string => serverConnectionState;
