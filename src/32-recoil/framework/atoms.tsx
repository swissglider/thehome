import { atom } from 'recoil';
import { I_LinksConfiguration } from '../../2_configuration/MainComponents';
export type T_TitleBarSubElements = 'empty' | 'breadcrumbs' | 'menubuttons';

export const mainTitleState = atom({
    key: 'fw_main_title', // unique ID (with respect to other atoms/selectors)
    default: 'MainTitle', // default value (aka initial value)
});

export interface I_HistoryStateProps {
    pathname?: string;
    displayName: string;
}

export const historyState = atom({
    key: 'fw_history', // unique ID (with respect to other atoms/selectors)
    default: [] as I_HistoryStateProps[], // default value (aka initial value)
});

export const currentPathElementsState = atom({
    key: 'fw_path_elemts', // unique ID (with respect to other atoms/selectors)
    default: [] as I_HistoryStateProps[], // default value (aka initial value)
});

export const titleBarSubElementState = atom({
    key: 'fw_titleBarSubElementState',
    default: 'empty' as T_TitleBarSubElements,
});

export const titleBarMenuButtonsState = atom({
    key: 'fw_titleBarMenuButtonsState',
    default: [] as I_LinksConfiguration[],
});
