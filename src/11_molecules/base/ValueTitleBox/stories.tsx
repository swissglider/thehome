import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import ValueTitleBox from '.';
import { rgba2HexConverter } from '../../../21_utils/Hex2rgbaConverter';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'TheHome/Molecules/base/ValueTitleBox',
    component: ValueTitleBox,
    argTypes: {
        title: { name: 'Title' },
        color: { control: { type: 'color' } },
        children: { table: { disable: true } },
    },
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof ValueTitleBox>> = (props: ComponentProps<typeof ValueTitleBox>) => {
    const { children, ...args } = { ...props };

    if (props.color && props.color.startsWith('rgba')) {
        args.color = '#' + rgba2HexConverter(props.color);
    }
    return <ValueTitleBox {...args}>{children}</ValueTitleBox>;
};

export const Simple = Template.bind({});
Simple.args = {
    title: 'Simple',
    children: <div>Hallo</div>,
};

export const SimpleWeiss = Template.bind({});
SimpleWeiss.args = {
    title: 'Simple Weiss',
    children: <div>Im a child and you can use as child what you want &#128540;</div>,
    color: '#FFFFFF',
};
