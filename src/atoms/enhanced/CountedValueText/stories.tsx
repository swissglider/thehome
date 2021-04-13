import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import CountedValueText from '.';
import { CountMethods } from '../../../hooks/CountingHooks';

export default {
    title: 'TheHome/Atoms/enhanced/CountedValueText',
    component: CountedValueText,
    argTypes: {
        countMethod: {
            control: {
                type: 'select',
                options: CountMethods,
            },
        },
        type: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
        onClicked: {
            table: {
                disable: true,
            },
        },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof CountedValueText> {
    onClicked: (i: string) => void;
}

//👇 We create a “template” of how args map to rendering
const Template: Story<I_Props> = (props) => {
    const { onClicked, ...args } = { ...props };
    args.onClick = onClicked ? () => onClicked('Yes you clicked me') : undefined;
    return <CountedValueText {...args} />;
};

export const AV = Template.bind({});
AV.args = {
    allValues: [3, 1, 8],
    unit: '°C',
    variant: 'body2',
    countMethod: 'av',
    spaceBeforeUnit: true,
    withUnit: true,
    noWrap: true,
    onClicked: undefined,
};

export const Min = Template.bind({});
Min.args = {
    allValues: [3, 1, 8],
    unit: '°C',
    variant: 'body2',
    countMethod: 'min',
    spaceBeforeUnit: true,
    withUnit: true,
    noWrap: true,
    onClicked: undefined,
};

export const Max = Template.bind({});
Max.args = {
    allValues: [3, 1, 8],
    unit: '°C',
    variant: 'body2',
    countMethod: 'max',
    spaceBeforeUnit: true,
    withUnit: true,
    noWrap: true,
    onClicked: undefined,
};

export const First = Template.bind({});
First.args = {
    allValues: [3, 1, 8],
    unit: '°C',
    variant: 'body2',
    countMethod: 'first',
    spaceBeforeUnit: true,
    withUnit: true,
    noWrap: true,
    onClicked: undefined,
};

export const String = Template.bind({});
String.args = {
    allValues: ['2', '1', '8'],
    variant: 'body2',
    countMethod: 'first',
    spaceBeforeUnit: true,
    withUnit: false,
    noWrap: true,
    onClicked: undefined,
};

export const BoolOnlyTrue = Template.bind({});
BoolOnlyTrue.args = {
    allValues: [true, true, true],
    variant: 'body2',
    countMethod: 'av',
    spaceBeforeUnit: true,
    withUnit: false,
    noWrap: true,
    onClicked: undefined,
};

export const BoolOnlyFalse = Template.bind({});
BoolOnlyFalse.args = {
    allValues: [false, false, false],
    variant: 'body2',
    countMethod: 'av',
    spaceBeforeUnit: true,
    withUnit: false,
    noWrap: true,
    onClicked: undefined,
};

export const BoolMixed = Template.bind({});
BoolMixed.args = {
    allValues: [false, true, false],
    variant: 'body2',
    countMethod: 'av',
    spaceBeforeUnit: true,
    withUnit: false,
    noWrap: true,
    onClicked: undefined,
};
