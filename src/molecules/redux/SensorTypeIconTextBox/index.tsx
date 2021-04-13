import React from 'react';
import { useGetPathArrayFromHomeContainer } from '../../../hooks/HomeContainerHooks';
import { useGetHomeContainerLocationTo } from '../../../hooks/PlaceOverviewHooks';
import SensorTypesAvarageContainer from '../SensorTypesAvarageContainer';

export interface SensorTypeIconTextBox {
    homeContainer: any;
    functionTypeID: string;
}

const SensorTypeIconTextBox = (props: SensorTypeIconTextBox): JSX.Element | null => {
    if (props.homeContainer === undefined) return null;

    const newPathArray = useGetPathArrayFromHomeContainer(props.homeContainer);
    if (newPathArray === undefined) return null;

    const pathArray = [...newPathArray, props.functionTypeID];
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
