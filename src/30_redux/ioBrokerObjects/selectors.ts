import { createSelector } from '@reduxjs/toolkit';
import memoize from 'lodash.memoize';
import { getValueByLanguageFromObject } from '../../21_utils/DisplayNameHelper';
import { IOBROKER_INSTANCE, IOBROKER_NAME } from '../../2_configuration/Application';
import { RootState } from '../Store';
import { I_ioBrokerObject } from './interfaces';
import { selector_selectIOBrokerObject, selector_selectIOBrokerObjectEtities } from './slice';

const getDisplayNameByObject = (ioBObject: I_ioBrokerObject): string => {
    const displayName = ioBObject.native?.swissglider?.general?.displayName;
    return displayName !== undefined
        ? getValueByLanguageFromObject(displayName)
        : getValueByLanguageFromObject(ioBObject.common.name);
};

export const selector_getIOBObjectByID = (id: string) => (state: RootState): any =>
    selector_selectIOBrokerObject(state, id);

export const selector_getDisplayName = (id: string) => (state: RootState): string | undefined => {
    const entity = selector_selectIOBrokerObject(state, id);
    if (entity === undefined) return undefined;
    return getDisplayNameByObject(entity);
};

export const selector_getDisplayNamesAsPathElementPairs = memoize((ids: string[]) =>
    createSelector([selector_selectIOBrokerObjectEtities], (all) =>
        ids.reduce((accumulator, id: string) => {
            const entity = all[id];
            if (entity !== undefined) {
                const displayName = getDisplayNameByObject(entity);
                accumulator[id] = displayName;
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

export const selector_getBLACK_LIST_SENSOR_TYPES = (state: RootState): any =>
    (selector_selectIOBrokerObject(state, `system.adapter.${IOBROKER_NAME}.${IOBROKER_INSTANCE}`) as any)?.native
        ?.BLACK_LIST_SENSOR_TYPES;

export const selector_getLOCATION_OVERVOEW_BOX_SENSORS = (state: RootState): any =>
    (selector_selectIOBrokerObject(state, `system.adapter.${IOBROKER_NAME}.${IOBROKER_INSTANCE}`) as any)?.native
        ?.LOCATION_OVERVIEW_BOW_SENSOR_TYPES;
