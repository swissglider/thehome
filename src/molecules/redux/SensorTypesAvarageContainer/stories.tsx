import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SensorTypesAvarageContainer from '.';

export default {
    title: 'TheHome/Molecules/Redux/SensorTypesAvarageContainer',
    component: SensorTypesAvarageContainer,
    argTypes: {
        membersStateList: { table: { disable: true } },
        type: { table: { disable: true }, type: 'radio', options: ['number', 'boolean', 'string', undefined] },
        pathArray: { table: { disable: true } },
        functionTypeID: { table: { disable: true } },
        icon: { table: { disable: true } },
        icon_true: { table: { disable: true } },
        icon_false: { table: { disable: true } },
        unit: { table: { disable: true } },
        write: { table: { disable: true } },
        value: { table: { disable: true } },
        states: { table: { disable: true } },
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof SensorTypesAvarageContainer> {
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

    // if (props.color && props.color.startsWith('rgba')) {
    //     args.color = '#' + rgba2HexConverter(props.color);
    // }
    return <SensorTypesAvarageContainer {...args} />;
};

export const LampeStube = Template.bind({});
LampeStube.args = {
    onClicked: undefined,
    membersStateList: ['hue.0.Lampe_Stube.on'],
    functionTypeID: 'enum.functions.light',
    size: 'small',
};

export const TuereArvian = Template.bind({});
TuereArvian.args = {
    onClicked: undefined,
    membersStateList: ['deconz.0.sensors.00158d000346aa52.open'],
    functionTypeID: 'enum.functions.doors',
    size: 'small',
};

export const TuereArvianXSmall = Template.bind({});
TuereArvianXSmall.args = {
    onClicked: undefined,
    membersStateList: ['deconz.0.sensors.00158d000346aa52.open'],
    functionTypeID: 'enum.functions.doors',
    size: 'xsmall',
};

export const TempArvian = Template.bind({});
TempArvian.args = {
    onClicked: undefined,
    membersStateList: ['jeelink.0.LaCrosse_arvian.temp'],
    functionTypeID: 'enum.functions.temp',
};

export const TempArvianCaption = Template.bind({});
TempArvianCaption.args = {
    onClicked: undefined,
    membersStateList: ['jeelink.0.LaCrosse_arvian.temp'],
    functionTypeID: 'enum.functions.temp',
    variant: 'caption',
};

export const TempArvianHeader = Template.bind({});
TempArvianHeader.args = {
    onClicked: undefined,
    membersStateList: ['jeelink.0.LaCrosse_arvian.temp'],
    functionTypeID: 'enum.functions.temp',
    variant: 'header',
};

export const StorenMacStatus = Template.bind({});
StorenMacStatus.args = {
    onClicked: undefined,
    membersStateList: ['shelly.0.SHSW-25#B954EE#1.Shutter.state'],
    functionTypeID: 'enum.functions.blinds',
    size: 'xsmall',
};

export const StorenMacPos = Template.bind({});
StorenMacPos.args = {
    onClicked: undefined,
    membersStateList: ['shelly.0.SHSW-25#B954EE#1.Shutter.Position'],
    functionTypeID: 'enum.functions.blinds_position',
    size: 'small',
};
