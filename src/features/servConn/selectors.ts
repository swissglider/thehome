import { RootState } from '../../redux/Store';

export const selector_getConnectionStatus = () => ({ ioBrokerServConn: { status } }: RootState): string => status;
