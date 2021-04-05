import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { I_HOME_CONTAINER, T_HOME_CONTAINER_LIST } from '../features/servConn/interfaces';
import { selector_getHomeContainerList } from '../features/servConn/selectors';

export interface I_UseHomeContainer_Result {
    pathArray: string[];
    homeContainer?: I_HOME_CONTAINER | undefined; // undefined if highest level
    childLists?: T_HOME_CONTAINER_LIST | undefined; // if homeContainer is set it is not used
    layout?: string;
    functionTypeID?: string;
    deviceID?: string;
}

interface I_State {
    pathArray: string[];
    layout?: string;
    functionTypeID?: string;
    deviceID?: string;
}

interface I_Location {
    pathname: string;
    state: I_State;
}

const getIOBFunctionTypeIDByIOBDeviceID = (deviceID: string, allHCs: T_HOME_CONTAINER_LIST): string | undefined => {
    for (const value of Object.values(allHCs)) {
        for (const [functionID, deviceIDList] of Object.entries(value.recursiveMemberStateIDs)) {
            if (deviceIDList.includes(deviceID)) return functionID;
        }
    }
    return undefined;
};

export const useGetIOBFunctionTypeIDByIOBDeviceID = (deviceID: string): string | undefined => {
    const allHCs: T_HOME_CONTAINER_LIST = useSelector(selector_getHomeContainerList()) ?? {};
    return getIOBFunctionTypeIDByIOBDeviceID(deviceID, allHCs);
};

export const useGetHomeContainerLocationTo = (
    stateProps: I_State,
): { location: I_Location; goToLocation: () => void } => {
    const location = {
        pathname: '/homes',
        state: { ...stateProps },
    };
    const history = useHistory();
    const goTo = () => {
        history.push(location);
    };
    return { location: location, goToLocation: goTo };
};

export const useHomeContainer = (): I_UseHomeContainer_Result => {
    const allHCs: T_HOME_CONTAINER_LIST | undefined = useSelector(selector_getHomeContainerList());
    const location = useLocation<I_State>();
    const pathArray =
        location.state?.pathArray && Array.isArray(location.state?.pathArray) ? location.state.pathArray : [];
    const layout = location.state?.layout;
    const deviceID = location.state?.deviceID;
    const functionTypeID =
        location.state?.functionTypeID ?? getIOBFunctionTypeIDByIOBDeviceID(deviceID ?? '', allHCs ?? {});
    if (pathArray.length === 0) return { pathArray: pathArray, childLists: { ...allHCs } };
    let tempHClist = allHCs ?? {};
    let tempHC: I_HOME_CONTAINER | undefined = undefined;
    for (const id of pathArray) {
        if (id in tempHClist) {
            tempHC = tempHClist[id];
            tempHClist = tempHClist[id].childrenHomeContainers;
        } else {
            break;
        }
    }
    return {
        pathArray: pathArray,
        homeContainer: tempHC,
        layout: layout,
        functionTypeID: functionTypeID,
        deviceID: deviceID,
    };
};
