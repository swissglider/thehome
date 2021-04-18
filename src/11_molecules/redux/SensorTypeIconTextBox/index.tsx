import React from 'react';
import { useGetHomeContainerLocationTo } from '../../../20_hooks/PlaceOverviewHooks';
import SensorTypesAvarageContainer from '../SensorTypesAvarageContainer';

export interface SensorTypeIconTextBox {
    homeContainer: any;
    functionTypeID: string;
}

const SensorTypeIconTextBox = (props: SensorTypeIconTextBox): JSX.Element | null => {
    if (props.homeContainer === undefined) return null;

    const { goToLocation } = useGetHomeContainerLocationTo({
        locationID: props.homeContainer.id,
        functionTypeID: props.functionTypeID,
        page: 'SensorTypeListPage',
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
