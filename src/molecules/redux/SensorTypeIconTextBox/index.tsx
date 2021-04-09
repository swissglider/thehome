import React from 'react';
import { useGetHomeContainerLocationTo } from '../../../hooks/PlaceOverviewHooks';
import SensorTypesAvarageContainer from '../SensorTypesAvarageContainer';

export interface SensorTypeIconTextBox {
    homeContainer: any;
    functionTypeID: string;
    pathArray: string[];
}

const SensorTypeIconTextBox = (props: SensorTypeIconTextBox): JSX.Element | null => {
    const pathArray = [...props.pathArray, props.functionTypeID];
    const { goToLocation } = useGetHomeContainerLocationTo({
        pathArray: pathArray,
        layout: 'standard_function_type_overview',
    });

    const sensorTypesAvarageContainer = (
        <SensorTypesAvarageContainer
            membersStateList={props.homeContainer.recursiveMemberStateIDs[props.functionTypeID]}
            functionTypeID={props.functionTypeID}
            size="root"
            presentationMode="locationOverview"
        />
    );

    if (sensorTypesAvarageContainer === null) return null;

    return <div onClick={goToLocation}>{sensorTypesAvarageContainer}</div>;
};

export default SensorTypeIconTextBox;
