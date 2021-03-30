import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import ValueUnitText from '.';
import { TypographyComponent_Variants } from '../../base/TypographyComponent';

export default {
    title: 'TheHome/Atoms/enhanced/ValueUnitText',
    component: ValueUnitText,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: TypographyComponent_Variants,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
        value: {
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

interface I_Props extends ComponentProps<typeof ValueUnitText> {
    onClicked: (i: string) => void;
}

//👇 We create a “template” of how args map to rendering
const Template: Story<I_Props> = (props) => {
    const { onClicked, ...args } = { ...props };
    args.onClick = onClicked ? () => onClicked('Yes you clicked me') : undefined;
    return <ValueUnitText {...args} />;
};

export const TextWithUnit = Template.bind({});
TextWithUnit.args = {
    value: '10',
    unit: '°C',
    variant: 'body',
    onClicked: undefined,
};

export const TextWithUnitWithSpace = Template.bind({});
TextWithUnitWithSpace.args = {
    value: '10',
    unit: '°C',
    variant: 'body',
    spaceBeforeUnit: true,
    onClicked: undefined,
};

export const HeaderWithUnit = Template.bind({});
HeaderWithUnit.args = {
    value: '10',
    unit: '°C',
    variant: 'header',
    onClicked: undefined,
};

export const HeaderWithoutUnit = Template.bind({});
HeaderWithoutUnit.args = {
    value: '10',
    unit: '°C',
    variant: 'header',
    withUnit: false,
    onClicked: undefined,
};

export const HeaderWithoutUnit2 = Template.bind({});
HeaderWithoutUnit2.args = {
    value: '10',
    variant: 'header',
    withUnit: true,
    onClicked: undefined,
};

export const HeaderDivWithUnit = Template.bind({});
HeaderDivWithUnit.args = {
    value: <div>10</div>,
    unit: '°C',
    variant: 'header',
    onClicked: undefined,
};

export const HeaderDivWithUnitNoWrap = Template.bind({});
HeaderDivWithUnitNoWrap.args = {
    value: <div>10</div>,
    unit: '°C',
    variant: 'header',
    noWrap: true,
    onClicked: undefined,
};

export const HeaderDivWithUnitNoWrapWithSpace = Template.bind({});
HeaderDivWithUnitNoWrapWithSpace.args = {
    value: <div>10</div>,
    unit: '°C',
    variant: 'header',
    noWrap: true,
    spaceBeforeUnit: true,
    onClicked: undefined,
};

export const OnClickText = Template.bind({});
OnClickText.args = {
    value: 'click Me',
    variant: 'title',
};
OnClickText.argTypes = { onClicked: { action: 'Clicked Text' } };

export const OnClickButton = Template.bind({});
OnClickButton.args = {
    value: '10',
    unit: '°C',
    variant: 'title',
    spaceBeforeUnit: true,
};
OnClickButton.argTypes = { onClicked: { action: 'Clicked Button' } };
OnClickButton.decorators = [
    (Story) => (
        <div style={{ background: '#efefef', margin: '10px', width: '150px' }}>
            <Story />
        </div>
    ),
];
