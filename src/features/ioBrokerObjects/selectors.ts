import IOBrokerNameTools from '../../components/PlaceOverview/services/IOBrokerNameTools';
import { RootState } from '../../redux/Store';
import { selector_selectIOBrokerObject } from './slice';

export const selector_getIOBObjectByID = (id: string) => (state: RootState): any =>
    selector_selectIOBrokerObject(state, id);

export const selector_getDisplayName = (id: string) => (state: RootState): string | undefined => {
    const entity = selector_selectIOBrokerObject(state, id);
    if (entity === undefined) return undefined;
    const displayName = entity.native?.swissglider?.general?.displayName;
    return displayName !== undefined
        ? IOBrokerNameTools.getValueByLanguageFromObject(displayName)
        : IOBrokerNameTools.getValueByLanguageFromObject(entity.common.name);
};
export const selector_getObjectsStatus = () => (state: RootState): any => state.ioBrokerObjects.status;
