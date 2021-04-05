import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SensorDetailsPage from '.';

export default {
    title: 'TheHome/Pages/SensorDetailsPage',
    component: SensorDetailsPage,
    argTypes: {
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof SensorDetailsPage> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { onClicked, ...args } = { ...props };
    return <SensorDetailsPage {...args} />;
};

export const TempBad = Template.bind({});
TempBad.args = {
    functionTypeID: 'enum.functions.temp',
    deviceID: 'jeelink.0.LaCrosse_bad.temp',
    onClicked: undefined,
};

export const LichtStube = Template.bind({});
LichtStube.args = {
    functionTypeID: 'enum.functions.light',
    deviceID: 'hue.0.Lampe_Stube.on',
    onClicked: undefined,
};

export const StorenMacStatus = Template.bind({});
StorenMacStatus.args = {
    onClicked: undefined,
    deviceID: 'shelly.0.SHSW-25#B954EE#1.Shutter.state',
    functionTypeID: 'enum.functions.blinds',
};

export const StorenMacPos = Template.bind({});
StorenMacPos.args = {
    onClicked: undefined,
    deviceID: 'shelly.0.SHSW-25#B954EE#1.Shutter.Position',
    functionTypeID: 'enum.functions.blinds_position',
};
