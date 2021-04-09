import React from 'react';
import { Story, Meta } from '@storybook/react';
import LocationOverviewBoxHorizontalCarousel from '.';
import { useSearchHCByPathArray } from '../../../hooks/HomeContainerHooks';
import { I_HOME_CONTAINER } from '../../../features/servConn/interfaces';

export default {
    title: 'TheHome/organisms/redux/LocationOverviewBoxHorizontalCarousel',
    component: LocationOverviewBoxHorizontalCarousel,
    argTypes: {
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props {
    onClicked: (i: string) => void;
    pathArray: string[];
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { pathArray } = { ...props };
    const homeContainer = useSearchHCByPathArray(pathArray) as I_HOME_CONTAINER;

    return <LocationOverviewBoxHorizontalCarousel homeContainer={homeContainer} pathArray={pathArray} />;
};

export const Wollerau = Template.bind({});
Wollerau.args = {
    onClicked: undefined,
    pathArray: ['enum.home.1_wollerau'],
};

export const Zuhause = Template.bind({});
Zuhause.args = {
    onClicked: undefined,
    pathArray: ['enum.home.1_wollerau', 'enum.area.inside_home'],
};
