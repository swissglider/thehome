import { atom } from 'recoil';
import { I_PathProps } from '../../20_hooks/PlaceOverviewHooks';

export type T_Home_History = I_PathProps[];
export const homesHistoryState = atom({
    key: 'homes_history', // unique ID (with respect to other atoms/selectors)
    default: [] as T_Home_History, // default value (aka initial value)
});
