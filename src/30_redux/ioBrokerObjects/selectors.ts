import { createSelector } from '@reduxjs/toolkit';
import memoize from 'lodash.memoize';
import IOBrokerNameTools from '../../21_utils/IOBrokerNameTools';
import { RootState } from '../Store';
import { selector_selectIOBrokerObject, selector_selectIOBrokerObjectEtities } from './slice';

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

export const selector_getDisplayNamesAsPathElementPairs = memoize((ids: string[]) =>
    createSelector([selector_selectIOBrokerObjectEtities], (all) =>
        ids.reduce((accumulator, id: string) => {
            const entity = all[id];
            if (entity !== undefined) {
                const displayName = entity.native?.swissglider?.general?.displayName;
                accumulator[id] =
                    displayName !== undefined
                        ? IOBrokerNameTools.getValueByLanguageFromObject(displayName)
                        : IOBrokerNameTools.getValueByLanguageFromObject(entity.common.name);
            }
            return accumulator;
        }, {} as { [ids: string]: string }),
    ),
);

export const selector_getObjectsStatus = () => (state: RootState): any => state.ioBrokerObjects.status;

export const selector_getIOBObjectCommonByID = (id: string) => (state: RootState): any =>
    selector_selectIOBrokerObject(state, id)?.common;

export const selector_getIOBObjectMembersByID = (id: string) => (state: RootState): any =>
    selector_selectIOBrokerObject(state, id)?.common?.members;

export const selector_getIOBObjectFirstMembersCommonByID = (id: string) => (state: RootState): any => {
    const fMember = selector_selectIOBrokerObject(state, id)?.common?.members[0];
    return selector_selectIOBrokerObject(state, fMember)?.common;
};
