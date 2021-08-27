import { RootState } from '../Store';
import { T_HOME_CONTAINER_LIST } from './interfaces';

export const selector_getConnectionStatus = () => ({ ioBrokerServConn: { status } }: RootState): string => status;

export const selector_getHomeContainersLoaded = () => ({
    ioBrokerServConn: { homeContainersLoaded },
}: RootState): boolean => homeContainersLoaded;

export const selector_getHomeContainerList = () => ({
    ioBrokerServConn: { homeContainers },
}: RootState): T_HOME_CONTAINER_LIST | undefined => homeContainers;
