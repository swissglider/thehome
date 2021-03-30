import React from 'react';
import { Meta, Story } from '@storybook/react';
import ButtonAnimation, { I_ButtonAnimation_Props } from '.';
import TypographyComponent from '../TypographyComponent';

export default {
    title: 'TheHome/Atoms/Base/ButtonAnimation',
    component: ButtonAnimation,
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
    },
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<I_ButtonAnimation_Props> = (props: I_ButtonAnimation_Props) => (
    <ButtonAnimation withAnimation={props.withAnimation}>{props.children}</ButtonAnimation>
);

export const WithAnimation = Template.bind({});
WithAnimation.args = {
    withAnimation: true,
    children: <TypographyComponent>With Animation</TypographyComponent>,
};

export const WithoutAnimation = Template.bind({});
WithoutAnimation.args = {
    withAnimation: false,
    children: <TypographyComponent>Without Animation</TypographyComponent>,
};

export const WithoutAnimation1 = Template.bind({});
WithoutAnimation1.args = {
    children: <TypographyComponent>Without Animation 1</TypographyComponent>,
};
