import React from 'react';
import { Story, Meta } from '@storybook/react';
import HorizontalCarousel from '.';
import { I_HOME_CONTAINER } from '../../../30_redux/servConn/interfaces';
import SensorTypeIconTextBox from '../../redux/SensorTypeIconTextBox';
import { BALCK_LIST_SENSOREN } from '../../../2_configuration/Sensoren';
import { useSearchHCRecursiveByLocationID } from '../../../20_hooks/PlaceOverviewHooks';

export default {
    title: 'TheHome/molecules/base/HorizontalCarousel',
    component: HorizontalCarousel,
    argTypes: {
        onClicked: { table: { disable: true } },
        pathArray: { table: { disable: true } },
    },
} as Meta;

interface I_Props {
    locationID: string;
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { locationID } = { ...props };
    const homeContainer = useSearchHCRecursiveByLocationID(locationID) as I_HOME_CONTAINER;
    const childrenSlides = Object.keys(homeContainer?.recursiveMemberStateIDs ?? {})
        .sort()
        .filter((e) => !BALCK_LIST_SENSOREN.includes(e))
        .map((sensorTypeID: string) => (
            // eslint-disable-next-line react/jsx-key
            <SensorTypeIconTextBox homeContainer={homeContainer} functionTypeID={sensorTypeID} />
        ));
    const getSlideSteps = (width: string): { visibleSlides: number; dragStep: number; step: number } => {
        switch (width) {
            case 'xs':
                return { visibleSlides: 4, dragStep: 1, step: 3 };
            case 'sm':
                return { visibleSlides: 6, dragStep: 1, step: 4 };
            case 'md':
                return { visibleSlides: 8, dragStep: 1, step: 6 };
            case 'lg':
                return { visibleSlides: 8, dragStep: 1, step: 6 };
            case 'xl':
                return { visibleSlides: 8, dragStep: 1, step: 6 };
        }
        return { visibleSlides: 4, dragStep: 3, step: 3 };
    };
    return <HorizontalCarousel childrenSlides={childrenSlides} getSlideSteps={getSlideSteps} />;
};

export const Zuhause = Template.bind({});
Zuhause.args = {
    locationID: 'enum.area.inside_home',
    onClicked: undefined,
};
