import { Dictionary } from '@reduxjs/toolkit';
import { RootState } from '../../../../redux/Store';
import { I_ioBrokerObject } from '../../interfaces/IoBrokerInterfaces';
import IOBrokerNameTools from '../../services/IOBrokerNameTools';
import { ioBrokerObjectsAdapter } from '../reducers/ioBrokerSlice';

export const selector_selectIOBrokerObjects = (state: RootState): Dictionary<I_ioBrokerObject> =>
    state.ioBroker.ioBrokerObjects.entities;
// export const SELECT_IOBROKER_OBJEC = (state: RootState, ioBrokerID: string | undefined): I_ioBrokerObject | undefined =>
//     ioBrokerID !== undefined && ioBrokerID in state.ioBrokerObject.ioBrokerObjects
//         ? state.ioBrokerObject.ioBrokerObjects[ioBrokerID]
//         : undefined;

export const selector_getIOBObjectByID = (id: string) => ({
    ioBroker: { ioBrokerObjects },
}: RootState): I_ioBrokerObject | undefined => ioBrokerObjects.entities[id];

export const selector_getEnumImage = (enumID: string) => ({
    ioBroker: { ioBrokerObjects },
}: RootState): string | undefined =>
    ioBrokerObjectsAdapter.getSelectors().selectById(ioBrokerObjects, enumID)?.common.icon;

export const selector_getDisplayName = (id: string) => ({
    ioBroker: { ioBrokerObjects },
}: RootState): string | undefined => {
    const entity = ioBrokerObjects.entities[id];
    if (entity === undefined) return undefined;
    const displayName = entity.native?.swissglider?.general?.displayName;
    return displayName !== undefined
        ? IOBrokerNameTools.getValueByLanguageFromObject(displayName)
        : IOBrokerNameTools.getValueByLanguageFromObject(entity.common.name);
};
