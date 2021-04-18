import { useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { I_HOME_CONTAINER, T_HOME_CONTAINER_LIST } from '../30_redux/servConn/interfaces';
import { selector_getHomeContainerList } from '../30_redux/servConn/selectors';

export interface I_PathProps {
    page?: string;
    locationID?: string;
    functionTypeID?: string;
    deviceID?: string;
}

export interface I_Location {
    pathname: string;
}

const getPathProps = (): I_PathProps => {
    const pathname = useLocation().pathname;
    const routeMatch = useRouteMatch().path;
    return pathname
        .split('/')
        .filter((e) => e !== '')
        .filter((e) => `/${e}` != routeMatch)
        .filter((e) => e.split(':').length === 2)
        .reduce((accumulator, currentValue) => {
            const pair = currentValue.split(':');
            accumulator[pair[0]] = pair[1];
            return accumulator;
        }, {} as { [key: string]: string });
};

const searchHCRecursiveByLocationID = (locationID: string): I_HOME_CONTAINER | undefined => {
    const homeContainerList = useSelector(selector_getHomeContainerList());
    if (homeContainerList === undefined) return undefined;
    const searchHCRecursive = (
        homeContainerList: T_HOME_CONTAINER_LIST,
        locationID: string,
    ): I_HOME_CONTAINER | undefined => {
        if (locationID in homeContainerList) return homeContainerList[locationID];
        for (const value of Object.values(homeContainerList ?? {})) {
            const result = searchHCRecursive(value.childrenHomeContainers, locationID);
            if (result !== undefined) return result;
        }
        return undefined;
    };
    return searchHCRecursive(homeContainerList, locationID);
};

/**
 * generate the new Path and returns the location object and the goToLocation function
 * @param props to generate the path
 * @returns the location object and the goToLocation function
 */
export const useGetHomeContainerLocationTo = (
    props: I_PathProps,
): { location: I_Location; goToLocation: () => void } => {
    let pathName = '/homes';
    if (props.page) pathName = `${pathName}/page:${props.page}`;
    if (props.locationID) pathName = `${pathName}/locationID:${props.locationID}`;
    if (props.functionTypeID) pathName = `${pathName}/functionTypeID:${props.functionTypeID}`;
    if (props.deviceID) pathName = `${pathName}/deviceID:${props.deviceID}`;
    const location = {
        pathname: pathName,
    };
    const history = useHistory();
    const goTo = () => {
        history.push(location);
    };
    return { location: location, goToLocation: goTo };
};

/**
 * get HomeContainer from location
 * It search recursive the homeContainerList and returns the first founded one
 * @returns HomeContainer from location
 */

export const useSearchHCRecursiveFromLocation = (): I_HOME_CONTAINER | undefined => {
    const locationID = getPathProps().locationID;
    if (locationID === undefined) return undefined;
    return searchHCRecursiveByLocationID(locationID);
};

/**
 * Get the HomeContainer with only the locationID (can be a home,area,floor,room or zone)
 * It search recursive the homeContainerList and returns the first founded one
 * @param locationID locationID (can be a home,area,floor,room or zone)
 * @returns homeContainer related to the locationID
 */
export const useSearchHCRecursiveByLocationID = (locationID: string): I_HOME_CONTAINER | undefined => {
    return searchHCRecursiveByLocationID(locationID);
};

/**
 * gets the functionTypeID from the Location (url / pathname) or undefined if not set
 */
export const useGetFunctionTypeIDFromLocation = (): string | undefined => {
    return getPathProps().functionTypeID;
};

/**
 * gets the locationID from the Location (url / pathname) or undefined if not set
 */
export const useGetLocationFromLocation = (): string | undefined => {
    return getPathProps().locationID;
};

/**
 * gets the deviceID from the Location (url / pathname) or undefined if not set
 */
export const useGetDeviceIDFromLocation = (): string | undefined => {
    return getPathProps().deviceID;
};

/**
 * gets the page from the Location (url / pathname) or undefined if not set
 */
export const useGetPageFromLocation = (): string | undefined => {
    return getPathProps().page;
};
