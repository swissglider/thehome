import React from 'react';
import { I_Container_Props, I_HOME_CONTAINER } from '../../features/servConn/interfaces';
import { useSearchHCByPathArray } from '../../hooks/HomeContainerHooks';
import LocationOverviewBox from '../../organisms/redux/LocationOverviewBox';
import LocationOverviewBoxHorizontalCarousel from '../../organisms/redux/LocationOverviewBoxHorizontalCarousel';
import SensorTypeIconTextBoxHorizontalCarousel from '../../organisms/redux/SensorTypeIconTextBoxHorizontalCarousel';
import LocationOverviewTemplate from '../../templates/LocationOverviewTemplate';

const LocationOverviewPage = (props: I_Container_Props): JSX.Element => {
    const { pathArray } = { ...props };
    const homeContainer = useSearchHCByPathArray(pathArray) as I_HOME_CONTAINER;
    const newProps = {
        onClicked: undefined,
        locationComp: (
            <LocationOverviewBox homeContainer={homeContainer} pathArray={pathArray} presentationMode="fullBox" />
        ),
        subLocationListComp: (
            <LocationOverviewBoxHorizontalCarousel homeContainer={homeContainer} pathArray={pathArray} />
        ),
        sensorListComp: <SensorTypeIconTextBoxHorizontalCarousel homeContainer={homeContainer} pathArray={pathArray} />,
    };
    return <LocationOverviewTemplate {...newProps} />;
};

export default LocationOverviewPage;
