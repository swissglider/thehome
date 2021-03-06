import { RootState } from '../../redux/Store';
import { T_HOME_CONTAINER_LIST } from './interfaces';
import { I_FunctionTypes } from './slice';

export const selector_getConnectionStatus = () => ({ ioBrokerServConn: { status } }: RootState): string => status;

export const selector_getHomeContainersLoaded = () => ({
    ioBrokerServConn: { homeContainersLoaded },
}: RootState): boolean => homeContainersLoaded;

export const selector_getHomeContainerList = () => ({
    ioBrokerServConn: { homeContainers },
}: RootState): T_HOME_CONTAINER_LIST | undefined => homeContainers;

export const selector_getFunctionTypes = () => ({ ioBrokerServConn: { functionTypes } }: RootState): I_FunctionTypes =>
    functionTypes;
