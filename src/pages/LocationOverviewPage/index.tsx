import React from 'react';
import { I_HOME_CONTAINER } from '../../features/servConn/interfaces';
import { useGetHomeContainterFromLocation } from '../../hooks/HomeContainerHooks';
import LocationOverviewBox from '../../organisms/redux/LocationOverviewBox';
import LocationOverviewBoxHorizontalCarousel from '../../organisms/redux/LocationOverviewBoxHorizontalCarousel';
import SensorTypeIconTextBoxHorizontalCarousel from '../../organisms/redux/SensorTypeIconTextBoxHorizontalCarousel';
import LocationOverviewTemplate from '../../templates/LocationOverviewTemplate';

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
