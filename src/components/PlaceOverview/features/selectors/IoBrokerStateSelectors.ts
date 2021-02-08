import { Dictionary } from '@reduxjs/toolkit';
import { RootState } from '../../../../redux/Store';
import { I_ioBrokerState } from '../../interfaces/IoBrokerInterfaces';
import IOBrokerNameTools from '../../services/IOBrokerNameTools';
import { ioBrokerStatesAdapter } from '../reducers/ioBrokerSlice';

export const selector_selectIOBrokerStates = (state: RootState): Dictionary<I_ioBrokerState> =>
    state.ioBroker.ioBrokerStates.entities;
export const selector_selectIOBrokerState = (
    state: RootState,
    ioBrokerID: string | undefined,
): I_ioBrokerState | undefined => {
    return ioBrokerID !== undefined ? state.ioBroker.ioBrokerStates.entities[ioBrokerID] : undefined;
};

export const selector_getHomeSelection = () => ({
    ioBroker: { ioBrokerStates },
}: RootState): I_ioBrokerState | undefined => ioBrokerStates.entities['thehome.0.states.home.list'];

export const selector_getAllSensorAvaragesIDByTheHomeFolder1 = (theHomeFolder: string) => ({
    ioBroker: { ioBrokerStates },
}: RootState): string[] => {
    return Object.keys(ioBrokerStates.entities).filter((key) => key.startsWith(theHomeFolder) && key.endsWith('av'));
};

export const selector_getAllSensorAvaragesIDByTheHomeFolder = (theHomeFolder: string) => ({
    ioBroker: { ioBrokerStates },
}: RootState): string[] => {
    return ioBrokerStatesAdapter
        .getSelectors()
        .selectIds(ioBrokerStates)
        .filter((key) => key.toString().startsWith(theHomeFolder) && key.toString().endsWith('av')) as string[];
};

export const selector_getStateValueByID = (id: string) => ({ ioBroker: { ioBrokerStates } }: RootState): any => {
    const ent = ioBrokerStates.entities[id];
    return ent !== undefined ? ent.val : undefined;
};

export const selector_getUnitBySummarizedID = (summarizedID: string) => ({
    ioBroker: { ioBrokerStates },
}: RootState): {
    name: string | undefined;
    unit: string | undefined;
    type: string | undefined;
    icon: string | undefined;
} => {
    const m = summarizedID.split('.');
    if (m === undefined || m === null || m.length < 2)
        return { name: undefined, unit: undefined, type: undefined, icon: undefined };
    const tempID = m[m.length - 2];
    const nameO = ioBrokerStates.entities[`thehome.0.states.unit.${tempID}.name`];
    const unitO = ioBrokerStates.entities[`thehome.0.states.unit.${tempID}.unit`];
    const typeO = ioBrokerStates.entities[`thehome.0.states.unit.${tempID}.type`];
    const iconO = ioBrokerStates.entities[`thehome.0.states.unit.${tempID}.icon`];
    return {
        name: nameO !== undefined ? IOBrokerNameTools.getValueByLanguageFromObject(nameO.val as string) : undefined,
        unit: unitO !== undefined ? (unitO.val as string) : undefined,
        type: typeO !== undefined ? (typeO.val as string) : undefined,
        icon: iconO !== undefined ? (iconO.val as string) : undefined,
    };
};
