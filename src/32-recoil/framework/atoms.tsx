import { atom } from 'recoil';

export const mainTitleState = atom({
    key: 'main_title', // unique ID (with respect to other atoms/selectors)
    default: 'MainTitle', // default value (aka initial value)
});

export interface I_HistoryStateProps {
    pathname?: string;
    displayName: string;
}

export const historyState = atom({
    key: 'history', // unique ID (with respect to other atoms/selectors)
    default: [] as I_HistoryStateProps[], // default value (aka initial value)
});

export const currentPathElementsState = atom({
    key: 'path_elemts', // unique ID (with respect to other atoms/selectors)
    default: [] as I_HistoryStateProps[], // default value (aka initial value)
});
