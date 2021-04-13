import React from 'react';
import { Story, Meta } from '@storybook/react';
import HorizontalCarousel from '.';
import { useSearchHCByPathArray } from '../../../hooks/HomeContainerHooks';
import { I_HOME_CONTAINER } from '../../../features/servConn/interfaces';
import SensorTypeIconTextBox from '../../redux/SensorTypeIconTextBox';
import { BALCK_LIST_SENSOREN } from '../../../configuration/Sensoren';

export default {
    title: 'TheHome/molecules/base/HorizontalCarousel',
    component: HorizontalCarousel,
    argTypes: {
        onClicked: { table: { disable: true } },
        title: { name: 'Title' },
        color: { control: { type: 'color' } },
        value: { table: { disable: true } },
    },
} as Meta;

interface I_Props {
    pathArray: string[];
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { pathArray } = { ...props };
    const homeContainer = useSearchHCByPathArray(pathArray) as I_HOME_CONTAINER;
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
    pathArray: ['enum.home.1_wollerau', 'enum.area.inside_home'],
    onClicked: undefined,
};
