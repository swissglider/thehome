import { useSelector } from 'react-redux';
import { selector_getIOBObjectByID } from '../features/ioBrokerObjects/selectors';
import { T_HOME_CONTAINER_LIST } from '../features/servConn/interfaces';
import { selector_getHomeContainerList } from '../features/servConn/selectors';
import { I_FunctionTypes, I_Type_Params } from '../features/servConn/slice';

export const useFillCategorizedMap = (): I_FunctionTypes => {
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
                functionType.icon_cold = enumOb.common.icon_cold;
                functionType.icon_warm = enumOb.common.icon_warm;
                functionType.icon_hot = enumOb.common.icon_hot;
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
