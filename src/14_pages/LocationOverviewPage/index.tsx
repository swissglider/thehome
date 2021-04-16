import React from 'react';
import { I_HOME_CONTAINER } from '../../30_redux/servConn/interfaces';
import { useGetHomeContainterFromLocation } from '../../20_hooks/HomeContainerHooks';
import LocationOverviewBox from '../../12_organisms/redux/LocationOverviewBox';
import LocationOverviewBoxHorizontalCarousel from '../../12_organisms/redux/LocationOverviewBoxHorizontalCarousel';
import SensorTypeIconTextBoxHorizontalCarousel from '../../12_organisms/redux/SensorTypeIconTextBoxHorizontalCarousel';
import LocationOverviewTemplate from '../../13_templates/LocationOverviewTemplate';

const LocationOverviewPage = (): JSX.Element | null => {
    // const homeContainer = useSearchHCByPathArray(pathArray) as I_HOME_CONTAINER;
    const homeContainer = useGetHomeContainterFromLocation() as I_HOME_CONTAINER;
    if (homeContainer === undefined) return null;
    const newProps = {
        onClicked: undefined,
        locationComp: <LocationOverviewBox homeContainer={homeContainer} presentationMode="fullBox" />,
        subLocationListComp: <LocationOverviewBoxHorizontalCarousel homeContainer={homeContainer} />,
        sensorListComp: <SensorTypeIconTextBoxHorizontalCarousel homeContainer={homeContainer} />,
    };
    return <LocationOverviewTemplate {...newProps} />;
};

export default LocationOverviewPage;
