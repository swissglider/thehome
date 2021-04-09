import { useSelector } from 'react-redux';
import { I_HOME_CONTAINER, T_HOME_CONTAINER_LIST } from '../features/servConn/interfaces';
import { selector_getHomeContainerList } from '../features/servConn/selectors';

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
 * get HomeContainer from pathArra
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
