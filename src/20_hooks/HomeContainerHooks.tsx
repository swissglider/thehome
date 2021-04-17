import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { I_HOME_CONTAINER, T_HOME_CONTAINER_LIST } from '../30_redux/servConn/interfaces';
import { selector_getHomeContainerList } from '../30_redux/servConn/selectors';

/**
 * Get the HomeContainer with only the folderID (can be a home,area,floor,room or zone)
 * It search recursive the homeContainerList and returns the first founded one
 * @param folderID folderID (can be a home,area,floor,room or zone)
 * @returns homeContainer related to the folderID
 */
export const useSearchHCRecursiveByFolderID = (folderID: string): I_HOME_CONTAINER | undefined => {
    const homeContainerList = useSelector(selector_getHomeContainerList());
    if (homeContainerList === undefined) return undefined;
    const searchHCRecursive = (
        homeContainerList: T_HOME_CONTAINER_LIST,
        folderID: string,
    ): I_HOME_CONTAINER | undefined => {
        if (folderID in homeContainerList) return homeContainerList[folderID];
        for (const value of Object.values(homeContainerList ?? {})) {
            const result = searchHCRecursive(value.childrenHomeContainers, folderID);
            if (result !== undefined) return result;
        }
        return undefined;
    };
    return searchHCRecursive(homeContainerList, folderID);
};

/**
 * get HomeContainer from pathArray
 * @param pathArray must include the path and the folderID
 * @returns HomeContainer relative to the pathArray
 */
export const useSearchHCByPathArray = (pathArray: string[]): I_HOME_CONTAINER | undefined => {
    if (pathArray === undefined) return undefined;
    const tpa = [...pathArray];
    if (tpa[tpa.length - 1].startsWith('enum.functions.')) tpa.pop();
    const homeContainerList = useSelector(selector_getHomeContainerList());
    if (homeContainerList === undefined) return undefined;
    const tempHomeContainer = homeContainerList[tpa.shift() as string];
    return tpa.reduce((a, b) => a && a.childrenHomeContainers[b], tempHomeContainer);
};

/**
 * get HomeContainer from location
 * @returns HomeContainer from location
 */

export const useGetHomeContainterFromLocation = (): I_HOME_CONTAINER | undefined => {
    const allHCs: T_HOME_CONTAINER_LIST | undefined = useSelector(selector_getHomeContainerList());
    const location = useLocation<{ pathArray: string[] }>();
    const pathArray =
        location.state?.pathArray && Array.isArray(location.state?.pathArray) ? location.state.pathArray : [];
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
    return tempHC;
};

/**
 * get PathArray from location
 * @returns string[] - PathArray related to the homeConainter
 */
export const useGetHomeArrayFromLocation = (): string[] | undefined => {
    const location = useLocation<{ pathArray: string[] }>();
    return location.state?.pathArray && Array.isArray(location.state?.pathArray) ? location.state.pathArray : undefined;
};

/**
 * Get the PathArray from HomeContainer
 * It search recursive the homeContainerList and returns the first founded one
 * @param homeContainer home container
 * @returns string[] - PathArray related to the homeConainter
 */
export const useGetPathArrayFromHomeContainer = (homeContainer: I_HOME_CONTAINER): string[] | undefined => {
    if (homeContainer === undefined) return undefined;

    const homeContainerList = useSelector(selector_getHomeContainerList());
    if (homeContainerList === undefined) return undefined;

    const generatePatchArrayRecursive = (
        homeContainerList: T_HOME_CONTAINER_LIST,
        homeContainerID: string,
    ): string[] | undefined => {
        if (homeContainerList === undefined) return undefined;
        if (homeContainerID in homeContainerList) return [homeContainerID];
        for (const value of Object.values(homeContainerList)) {
            const result = generatePatchArrayRecursive(value.childrenHomeContainers, homeContainerID);
            if (result !== undefined) {
                result.unshift(value.id);
                return result;
            }
        }
        return undefined;
    };

    return generatePatchArrayRecursive(homeContainerList, homeContainer.id);
};

export const useGetPageFromLocation = (): string | undefined => {
    const location = useLocation<{ page: string }>();
    return location.state?.page;
};
