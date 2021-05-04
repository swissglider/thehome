import React from 'react';
import { I_HOME_CONTAINER } from '../../../30_redux/servConn/interfaces';
import HorizontalCarousel from '../../../11_molecules/base/HorizontalCarousel';
import SensorTypeIconTextBox from '../../../11_molecules/redux/SensorTypeIconTextBox';
import { useSelector } from 'react-redux';
import { selector_getBLACK_LIST_SENSOR_TYPES } from '../../../30_redux/ioBrokerObjects/selectors';

const SensorTypeIconTextBoxHorizontalCarousel = ({
    homeContainer,
}: {
    homeContainer: I_HOME_CONTAINER;
}): JSX.Element => {
    const BLACK_LIST_SENSOR_TYPES = useSelector(selector_getBLACK_LIST_SENSOR_TYPES);
    const childrenSlides = Object.keys(homeContainer?.recursiveMemberStateIDs ?? {})
        .sort()
        .filter((e) => !BLACK_LIST_SENSOR_TYPES.includes(e))
        .map((sensorTypeID: string) => (
            // eslint-disable-next-line react/jsx-key
            <SensorTypeIconTextBox homeContainer={homeContainer} functionTypeID={sensorTypeID} />
        ));
    const getSlideSteps = (width: string): { visibleSlides: number; dragStep: number; step: number } => {
        switch (width) {
            case 'xs':
                return { visibleSlides: 4, dragStep: 3, step: 3 };
            case 'sm':
                return { visibleSlides: 6, dragStep: 4, step: 4 };
            case 'md':
                return { visibleSlides: 8, dragStep: 6, step: 6 };
            case 'lg':
                return { visibleSlides: 8, dragStep: 6, step: 6 };
            case 'xl':
                return { visibleSlides: 8, dragStep: 6, step: 6 };
        }
        return { visibleSlides: 4, dragStep: 3, step: 3 };
    };

    return <HorizontalCarousel childrenSlides={childrenSlides} getSlideSteps={getSlideSteps} />;
};

export default SensorTypeIconTextBoxHorizontalCarousel;
