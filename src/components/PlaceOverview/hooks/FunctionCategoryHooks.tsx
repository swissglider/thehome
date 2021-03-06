import { useDispatch, useSelector } from 'react-redux';
import { selector_getIOBObjectByID } from '../../../features/ioBrokerObjects/selectors';
import { I_HOME_CONTAINER, T_HOME_CONTAINER_LIST } from '../../../features/servConn/interfaces';
import { selector_getFunctionTypes, selector_getHomeContainerList } from '../../../features/servConn/selectors';
import {
    IOBROKER_SERV_CONN_SET_FUNCTION_TYPES,
    I_FunctionTypes,
    I_Type_Params,
} from '../../../features/servConn/slice';
import { AppDispatch } from '../../../redux/Store';

export interface I_Extended_Type_Params extends I_Type_Params {
    membersStateList: string[];
}

export interface I_BooleanSwitchNumberCategories {
    switchList: I_Extended_Type_Params[];
    booleanList: I_Extended_Type_Params[];
    numberList: I_Extended_Type_Params[];
    others: I_Extended_Type_Params[];
}

export const useGenerateBooleanSwitchNumberCategories = (
    homeContainer: I_HOME_CONTAINER,
    blacklist?: string[],
): I_BooleanSwitchNumberCategories => {
    const functionTypes: I_FunctionTypes = useSelector(selector_getFunctionTypes());
    const returnType: I_BooleanSwitchNumberCategories = {
        switchList: [],
        booleanList: [],
        numberList: [],
        others: [],
    };
    for (const [ftID, functionT] of Object.entries(functionTypes)) {
        if (ftID in homeContainer.recursiveMemberStateIDs) {
            const extFunctionT: I_Extended_Type_Params = {
                ...functionT,
                membersStateList: homeContainer.recursiveMemberStateIDs[ftID],
            };
            if (!(blacklist !== undefined && blacklist.includes(ftID))) {
                if (extFunctionT.type === 'number') {
                    returnType.numberList.push(extFunctionT);
                } else if (extFunctionT.type === 'boolean' && extFunctionT.write === false) {
                    returnType.booleanList.push(extFunctionT);
                } else if (extFunctionT.type === 'boolean' && extFunctionT.write === true) {
                    returnType.switchList.push(extFunctionT);
                } else {
                    returnType.others.push(extFunctionT);
                }
            } else {
                returnType.others.push(extFunctionT);
            }
        }
    }
    return returnType;
};

export const useGenerateCategoryFunctionsMap = (): void => {
    const dispatch: AppDispatch = useDispatch();

    const fillCategorizedMap = (): I_FunctionTypes => {
        const allHCs: T_HOME_CONTAINER_LIST | undefined = useSelector(selector_getHomeContainerList());
        const categoryFunctionsMap: I_FunctionTypes = {};
        if (allHCs !== undefined) {
            for (const hc of Object.values(allHCs)) {
                for (const fID of Object.keys(hc.recursiveMemberStateIDs)) {
                    const enumOb = useSelector(selector_getIOBObjectByID(fID));
                    const functionType: I_Type_Params = {};
                    // const functionType: { [key: string]: any } = {};
                    functionType.functionID = fID;
                    functionType.icon = enumOb.common.icon;
                    functionType.icon_false = enumOb.common.icon_false_20;
                    functionType.icon_true = enumOb.common.icon_true_20;
                    functionType.name = enumOb.common.name;
                    functionType.color = enumOb.common.color;

                    const members: string[] = enumOb.common.members;
                    if (members && members.length > 0) {
                        const firstElOb = useSelector(selector_getIOBObjectByID(members[0]));
                        functionType.unit = firstElOb.common.unit;
                        functionType.read = firstElOb.common.read;
                        functionType.write = firstElOb.common.write;
                        functionType.type = firstElOb.common.type;
                    }

                    categoryFunctionsMap[fID] = functionType;
                }
            }
        }
        return categoryFunctionsMap;
    };
    dispatch(IOBROKER_SERV_CONN_SET_FUNCTION_TYPES(fillCategorizedMap()));
};
