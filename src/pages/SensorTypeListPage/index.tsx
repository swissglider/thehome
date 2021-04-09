import React from 'react';
import { useSelector } from 'react-redux';
import { selector_getFunctionTypeByID } from '../../features/servConn/selectors';
import { I_Type_Params } from '../../features/servConn/slice';
import { I_Container_Props, I_HOME_CONTAINER } from '../../features/servConn/interfaces';
import SensorListContainer, {
    I_SensorListContainerElement_Props,
    I_SensorListContainerElement_PropsArray,
} from '../../organisms/redux/SensorListContainer';
import { useSearchHCByPathArray } from '../../hooks/HomeContainerHooks';

const createSensorListElement_Props = (
    homeContainer: I_HOME_CONTAINER,
    functionTypeID: string,
    pathArray: string[],
    level: number,
): I_SensorListContainerElement_PropsArray => {
    const sensorValueType = {
        membersStateList: homeContainer.recursiveMemberStateIDs[functionTypeID],
        functionTypeID: functionTypeID,
        onClick: undefined,
    };
    const tempListProps: I_SensorListContainerElement_PropsArray = [
        {
            level: level,
            listElementProps: {
                presentationMode: 'folder' as 'folder' | 'sensor',
                folderID: homeContainer.id,
                pathArray: [...pathArray, functionTypeID],
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
                    pathArray: [...pathArray, deviceID, functionTypeID],
                    functionTypeID,
                    sensorValueType: {
                        membersStateList: [deviceID],
                        functionTypeID: functionTypeID,
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
        level,
    );
    for (const value of Object.values(homeContainer.childrenHomeContainers)) {
        const newSensorList = getSensorListElementRecursive(
            value,
            functionTypeID,
            [...pathArray, value.id],
            functionType,
            level + 1,
        );
        // sensorList = [...sensorList, ...newSensorList];
        sensorList.push(newSensorList);
    }
    return sensorList;
};

const SensorTypeListPage = ({ pathArray }: I_Container_Props): JSX.Element | null => {
    console.log('SensorTypeListPage:render');
    if (pathArray === undefined) return null;

    const functionTypeID = pathArray[pathArray.length - 1];
    if (functionTypeID === undefined || !functionTypeID.startsWith('enum.functions.')) return null;
    const functionType: I_Type_Params = useSelector(selector_getFunctionTypeByID(functionTypeID ?? ''));

    const homeContainer = useSearchHCByPathArray(pathArray);
    if (homeContainer === undefined) return null;

    const plainPathArray = [...pathArray];
    plainPathArray.pop();
    const sensorList = getSensorListElementRecursive(homeContainer, functionTypeID, plainPathArray, functionType, 0);

    return <SensorListContainer listItems={sensorList} />;
};

export default SensorTypeListPage;
