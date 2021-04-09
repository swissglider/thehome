import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SensorListElement from '.';

export default {
    title: 'TheHome/Organisms/Redux/SensorListElement',
    component: SensorListElement,
    argTypes: {
        onClicked: { table: { disable: true } },
        value: { table: { disable: true } },
        children: { table: { disable: true } },
        sensorValueType: { table: { disable: true } },
        pathArray: { table: { disable: true } },
        deviceID: { table: { disable: true } },
        functionTypeID: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof SensorListElement> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { onClicked, ...args } = { ...props };
    // args.onClick = () => {
    //    if (onClicked) onClicked();
    //    if (props.onClick) props.onClick();
    // };
    // args.onClick = (value: any) => {
    //     if (onClicked) onClicked(value);
    //     if (props.onClick) props.onClick(value);
    // };
    return <SensorListElement {...args} />;
};

export const TempArvian = Template.bind({});
TempArvian.args = {
    onClicked: undefined,
    presentationMode: 'sensor',
    deviceID: 'jeelink.0.LaCrosse_arvian.temp',
    pathArray: [],
    functionTypeID: 'enum.functions.temp',
    sensorValueType: {
        membersStateList: ['jeelink.0.LaCrosse_arvian.temp'],
        functionTypeID: 'enum.functions.temp',
    },
};

export const LampeStube = Template.bind({});
LampeStube.args = {
    onClicked: undefined,
    presentationMode: 'sensor',
    deviceID: 'hue.0.Lampe_Stube.on',
    pathArray: [],
    functionTypeID: 'enum.functions.light',
    sensorValueType: {
        membersStateList: ['hue.0.Lampe_Stube.on'],
        functionTypeID: 'enum.functions.light',
    },
};

export const StorenMacStatus = Template.bind({});
StorenMacStatus.args = {
    onClicked: undefined,
    presentationMode: 'sensor',
    deviceID: 'shelly.0.SHSW-25#B954EE#1.Shutter.state',
    pathArray: [],
    functionTypeID: 'enum.functions.blinds',
    sensorValueType: {
        membersStateList: ['shelly.0.SHSW-25#B954EE#1.Shutter.state'],
        functionTypeID: 'enum.functions.blinds',
    },
};
