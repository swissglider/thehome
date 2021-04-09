import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SensorTypeIconTextBoxHorizontalCarousel from '.';
import { useSearchHCByPathArray } from '../../../hooks/HomeContainerHooks';
import { I_HOME_CONTAINER } from '../../../features/servConn/interfaces';

export default {
    title: 'TheHome/organisms/redux/SensorTypeIconTextBoxHorizontalCarousel',
    component: SensorTypeIconTextBoxHorizontalCarousel,
    argTypes: {
        onClicked: { table: { disable: true } },
        childLists: { table: { disable: true } },
        homeContainer: { table: { disable: true } },
        layout: { table: { disable: true } },
        functionTypeID: { table: { disable: true } },
        deviceID: { table: { disable: true } },
        folderID: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof SensorTypeIconTextBoxHorizontalCarousel> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { pathArray } = { ...props };
    const homeContainer = useSearchHCByPathArray(pathArray) as I_HOME_CONTAINER;

    return <SensorTypeIconTextBoxHorizontalCarousel homeContainer={homeContainer} pathArray={pathArray} />;
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
