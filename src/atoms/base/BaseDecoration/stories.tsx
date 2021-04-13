import React from 'react';
import { Meta, Story } from '@storybook/react';
import BaseDecoration, { I_BaseDecoration_Props } from '.';
import TypographyComponent from '../TypographyComponent';

export default {
    title: 'TheHome/Atoms/Base/ButtonAnimation',
    component: BaseDecoration,
    argTypes: {
        children: {
            table: {
                disable: true,
            },
        },
    },
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<I_BaseDecoration_Props> = (props: I_BaseDecoration_Props) => (
    <BaseDecoration withAnimation={props.withAnimation}>{props.children}</BaseDecoration>
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

export const StandardIsWithoutAnimation = Template.bind({});
StandardIsWithoutAnimation.args = {
    children: <TypographyComponent>Without Animation 1</TypographyComponent>,
};
