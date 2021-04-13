import React from 'react';
import { I_HOME_CONTAINER } from '../../../features/servConn/interfaces';
import HorizontalCarousel from '../../../molecules/base/HorizontalCarousel';
import LocationOverviewBox from '../LocationOverviewBox';

export interface I_LocationOverviewBoxHorizontalCarouselCreator_Props {
    childList: I_HOME_CONTAINER[];
}

const LocationOverviewBoxHorizontalCarouselCreator = ({
    childList,
}: I_LocationOverviewBoxHorizontalCarouselCreator_Props) => {
    const childrenSlides = childList.map((e) => (
        // eslint-disable-next-line react/jsx-key
        <LocationOverviewBox homeContainer={e} presentationMode="horizontalList" />
    ));
    const getSlideSteps = (width: string): { visibleSlides: number; dragStep: number; step: number } => {
        switch (width) {
            case 'xs':
                return { visibleSlides: 2, dragStep: 1, step: 1 };
            case 'sm':
                return { visibleSlides: 4, dragStep: 1, step: 1 };
            case 'md':
                return { visibleSlides: 6, dragStep: 1, step: 1 };
            case 'lg':
                return { visibleSlides: 9, dragStep: 1, step: 1 };
            case 'xl':
                return { visibleSlides: 9, dragStep: 1, step: 1 };
        }
        return { visibleSlides: 1, dragStep: 1, step: 1 };
    };
    return <HorizontalCarousel childrenSlides={childrenSlides} getSlideSteps={getSlideSteps} />;
};

const LocationOverviewBoxHorizontalCarousel = ({
    homeContainer,
}: {
    homeContainer: I_HOME_CONTAINER;
}): JSX.Element | null => {
    if (homeContainer === undefined) return null;
    const childLists = homeContainer.childrenHomeContainers;

    return (
        <>
            {childLists !== undefined &&
                ['enum.area.', 'enum.zone.', 'enum.floor.', 'enum.rooms.'].map((enumS: string, index: number) => (
                    <LocationOverviewBoxHorizontalCarouselCreator
                        key={`LocationOverviewBoxHorizontalCarousel_${index}`}
                        childList={Object.entries(childLists)
                            .sort()
                            .filter(([key]) => key.startsWith(enumS))
                            .map(([, value]) => value)}
                    />
                ))}
        </>
    );
};

export default LocationOverviewBoxHorizontalCarousel;
