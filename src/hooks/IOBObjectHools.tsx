import { useSelector } from 'react-redux';
import {
    selector_getIOBObjectCommonByID,
    selector_getIOBObjectFirstMembersCommonByID,
} from '../features/ioBrokerObjects/selectors';

export interface I_Type_Params {
    [key: string]: any;
}

export const useFunctionFullType = (functionTypeID: string): I_Type_Params => {
    const enumOb = useSelector(selector_getIOBObjectCommonByID(functionTypeID));
    const firstElOb = useSelector(selector_getIOBObjectFirstMembersCommonByID(functionTypeID));
    const functionType: I_Type_Params = { ...enumOb, ...firstElOb };
    return functionType;
};
