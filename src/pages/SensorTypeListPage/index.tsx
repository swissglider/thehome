import React, { ComponentProps, useMemo } from 'react';
import { I_Container_Props } from '../../components/PlaceOverview/components/PlaceOverviewContainer';
import { useSelector } from 'react-redux';
import { selector_getFunctionTypeByID, selector_getHomeContainerList } from '../../features/servConn/selectors';
import { I_Type_Params } from '../../features/servConn/slice';
import { I_HOME_CONTAINER, T_HOME_CONTAINER_LIST } from '../../features/servConn/interfaces';
import SensorListContainer, {
    I_SensorListContainerElement_Props,
    I_SensorListContainerElement_PropsArray,
} from '../../organisms/redux/SensorListContainer';

const createSensorListElement_Props = (
    homeContainer: I_HOME_CONTAINER,
    functionTypeID: string,
    pathArray: string[],
    functionType: I_Type_Params,
    level: number,
): I_SensorListContainerElement_PropsArray => {
    const sensorValueType = {
        membersStateList: homeContainer.recursiveMemberStateIDs[functionTypeID],
        functionTypeID: functionTypeID,
        iobObjectCommon: functionType,
        onClick: undefined,
    };
    const tempListProps: I_SensorListContainerElement_PropsArray = [
        {
            level: level,
            listElementProps: {
                presentationMode: 'folder' as 'folder' | 'sensor',
                folderID: homeContainer.id,
                pathArray,
                functionTypeID,
                sensorValueType,
            },
        },
    ];
    if (
        Object.keys(homeContainer.localMemberStateIDs).length !== 0 &&
        functionTypeID in homeContainer.localMemberStateIDs
    ) {
        const temptempListProps: I_SensorListContainerElement_PropsArray = [];
        for (const deviceID of homeContainer.localMemberStateIDs[functionTypeID]) {
            const tempItem: I_SensorListContainerElement_Props = {
                level: level + 1,
                listElementProps: {
                    presentationMode: 'sensor' as 'folder' | 'sensor',
                    deviceID: deviceID,
                    pathArray,
                    functionTypeID,
                    sensorValueType: {
                        membersStateList: [deviceID],
                        functionTypeID: functionTypeID,
                        iobObjectCommon: functionType,
                        onClick: undefined,
                    },
                },
            };
            temptempListProps.push(tempItem);
        }
        tempListProps.push(temptempListProps);
    }
    return tempListProps;
};

const getSensorListElementRecursive = (
    homeContainer: I_HOME_CONTAINER,
    functionTypeID: string,
    pathArray: string[],
    functionType: I_Type_Params,
    level: number,
): I_SensorListContainerElement_PropsArray => {
    if (
        !(functionTypeID in homeContainer.recursiveMemberStateIDs) ||
        homeContainer.recursiveMemberStateIDs[functionTypeID].length === 0
    ) {
        return [];
    }
    const sensorList: I_SensorListContainerElement_PropsArray = createSensorListElement_Props(
        homeContainer,
        functionTypeID,
        pathArray,
        functionType,
        level,
    );
    for (const value of Object.values(homeContainer.childrenHomeContainers)) {
        const newSensorList = getSensorListElementRecursive(value, functionTypeID, pathArray, functionType, level + 1);
        // sensorList = [...sensorList, ...newSensorList];
        sensorList.push(newSensorList);
    }
    return sensorList;
};

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

const SensorTypeListPage = ({ functionTypeID, folderID, pathArray }: I_Container_Props): JSX.Element | null => {
    if (functionTypeID === undefined) return null;
    const functionType: I_Type_Params = useSelector(selector_getFunctionTypeByID(functionTypeID ?? ''));
    const homeContainerList = useSelector(selector_getHomeContainerList());
    if (homeContainerList === undefined) return null;
    const homeContainer = searchHCRecursive(homeContainerList ?? {}, folderID ?? '');
    if (homeContainer === undefined) return null;
    const sensorList = getSensorListElementRecursive(homeContainer, functionTypeID, pathArray, functionType, 0);

    return <SensorListContainer listItems={sensorList} />;
};

export default SensorTypeListPage;
