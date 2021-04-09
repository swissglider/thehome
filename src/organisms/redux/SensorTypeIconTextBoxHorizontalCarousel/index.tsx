import React from 'react';
import { BALCK_LIST_SENSOREN } from '../../../configuration/Sensoren';
import { I_Container_Props } from '../../../features/servConn/interfaces';
import HorizontalCarousel from '../../../molecules/base/HorizontalCarousel';
import SensorTypeIconTextBox from '../../../molecules/redux/SensorTypeIconTextBox';

const SensorTypeIconTextBoxHorizontalCarousel = ({ pathArray, homeContainer }: I_Container_Props): JSX.Element => {
    const childrenSlides = Object.keys(homeContainer?.recursiveMemberStateIDs ?? {})
        .sort()
        .filter((e) => !BALCK_LIST_SENSOREN.includes(e))
        .map((sensorTypeID: string, index: number) => (
            <SensorTypeIconTextBox
                key={`SensorTypesHorizontal${index}`}
                pathArray={pathArray}
                homeContainer={homeContainer}
                functionTypeID={sensorTypeID}
            />
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
