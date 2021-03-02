import { RootState } from '../../redux/Store';
import { I_HOME_CONTAINER } from './interfaces';

export const selector_getConnectionStatus = () => ({ ioBrokerServConn: { status } }: RootState): string => status;

export const selector_getHomeContainersLoaded = () => ({
    ioBrokerServConn: { homeContainersLoaded },
}: RootState): boolean => homeContainersLoaded;

export const selector_getHomeContainers = () => ({
    ioBrokerServConn: { homeContainers },
}: RootState): I_HOME_CONTAINER[] | undefined => homeContainers;
