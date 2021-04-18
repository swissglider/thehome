import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SensorTypeIconTextBoxHorizontalCarousel from '.';
import { I_HOME_CONTAINER } from '../../../30_redux/servConn/interfaces';
import { useSearchHCRecursiveByLocationID } from '../../../20_hooks/PlaceOverviewHooks';

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
    locationID: string;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { locationID } = { ...props };
    const homeContainer = useSearchHCRecursiveByLocationID(locationID) as I_HOME_CONTAINER;

    return <SensorTypeIconTextBoxHorizontalCarousel homeContainer={homeContainer} />;
};

export const Wollerau = Template.bind({});
Wollerau.args = {
    onClicked: undefined,
    locationID: 'enum.home.1_wollerau',
};

export const Zuhause = Template.bind({});
Zuhause.args = {
    onClicked: undefined,
    locationID: 'enum.area.inside_home',
};
