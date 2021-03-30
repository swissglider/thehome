import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import ValueTitleBox from '.';
import { T_TypographyComponent_Variants } from '../../base/TypographyComponent';
import ValueUnitText from '../ValueUnitText';
import { rgba2HexConverter } from '../../../utils/Hex2rgbaConverter';

const icon =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABdklEQVQ4jWMMnXLO8su3f6+2l5ncZaAAeHadUebhYhJjEedmSY8yF/W1WHfz1vP33zf++sOQa6LE/5sYQ87c+8jKyPi/X0qQw8dQXkBz39XX21kYGBgYAkwkhFz0JCw+fv1hvufCnf8/v99hitc5g9ewhVdMGOxUJf65GKh08XNzMPKwMTDsu/qagQWm4PDj/wz87OyMPhY6jFuPfWL4+bgDr4Ec7NsYvC10mG6+/c/w8d1/Bk9lRgYGBgYGJmRFH38yMLz7/p8Y3zIwMEDUfvyJKsaEXSn5YPAbCI8UWKAyMDAwHCdSs6oQI4OqEA4Dt9+FRIaKIPGuuf3uP8Od96gOGvxhOGoglQ3kZ2dgEOJkxKUWAwhxMjLws6OKwdOhrSwjw8evP/5vOXHn/8+f35jYVSvwGvbjyjeGLSeu/HMxUGHkF+OAu4KFgYGBYcOZF+8uPf6EVMCq/J53SwW/89gYGA7d/sh6+M4NeAHLwMDAwEjtKgAA2tSGeh5PDr4AAAAASUVORK5CYII=';

const valueUnitArgs = {
    value: '10',
    unit: '°C',
    variant: 'body' as T_TypographyComponent_Variants,
    noWrap: true,
    spaceBeforeUnit: true,
};

//👇 This default export determines where your story goes in the story list
export default {
    title: 'TheHome/Atoms/enhanced/ValueTitleBox',
    component: ValueTitleBox,
    argTypes: {
        title: { name: 'Title' },
        valueBold: { name: 'Value Bold' },
        withColor: { name: 'With Color' },
        color: {
            control: {
                type: 'color',
            },
        },
        withoutDecoration: { name: 'Without Decoration' },
        withAnimation: { name: 'With Animation (only if onClick is set)' },
        variants: { name: 'Variants (Icon only)' },
        size: { name: 'Variants (Icon only)' },
        value: {
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
        icon: {
            table: {
                disable: true,
            },
        },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof ValueTitleBox> {
    onClicked: (i: string) => void;
}

//👇 We create a “template” of how args map to rendering
const Template: Story<I_Props> = (props: I_Props) => {
    const { onClicked, ...args } = { ...props };
    args.onClick = onClicked ? () => onClicked('Yes you clicked me') : undefined;

    if (props.color && props.color.startsWith('rgba')) {
        args.color = '#' + rgba2HexConverter(props.color);
    }
    return <ValueTitleBox {...args} />;
};

export const SimpleI18 = Template.bind({});
SimpleI18.args = {
    value: 'Test Text',
    title: 'Simple I18',
    onClicked: undefined,
};

export const SimpleColor = Template.bind({});
SimpleColor.args = {
    value: 'Test Text',
    title: 'With Color',
    color: '#aa2a2a',
    onClicked: undefined,
};

export const SimpleWithoutTitle = Template.bind({});
SimpleWithoutTitle.args = {
    value: 'Without Title',
    onClicked: undefined,
};

export const SimpleBold = Template.bind({});
SimpleBold.args = {
    value: 'Test Text',
    title: 'Bold',
    valueBold: true,
    onClicked: undefined,
};

export const SimpleWithoutDecoration = Template.bind({});
SimpleWithoutDecoration.args = {
    value: 'Without decoration and Bold but without title',
    valueBold: true,
    withoutDecoration: true,
    onClicked: undefined,
};

export const SimpleWithClickWithAnimation = Template.bind({});
SimpleWithClickWithAnimation.args = {
    value: 'Click me',
    title: 'Simple with Click and with Animation',
    valueBold: true,
    onClick: () => {
        return;
    },
};

export const SimpleWithClickWithoutAnimation = Template.bind({});
SimpleWithClickWithoutAnimation.args = {
    value: 'Click me',
    title: 'Simple with Click and with Animation',
    valueBold: true,
    withAnimation: false,
    onClick: () => {
        return;
    },
};

export const WithColorElement = Template.bind({});
WithColorElement.args = {
    value: <ValueUnitText {...valueUnitArgs} />,
    title: 'With Color',
    color: '#aa2a2a',
    onClicked: undefined,
};

export const Icon_Simple = Template.bind({});
Icon_Simple.args = {
    icon: icon,
    title: 'Simple Icon',
    color: '#aa2a2a',
    onClicked: undefined,
};

export const Icon_ClickWithAnimation = Template.bind({});
Icon_ClickWithAnimation.args = {
    icon: icon,
    title: 'Icon With Click Animation',
    color: '#aa2a2a',
    onClick: () => {
        return;
    },
};

export const Icon_ClickWithoutAnimation = Template.bind({});
Icon_ClickWithoutAnimation.args = {
    icon: icon,
    title: 'Icon Without Click Animation',
    color: '#aa2a2a',
    onClick: () => {
        return;
    },
    withAnimation: false,
};
