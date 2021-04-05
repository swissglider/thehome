import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import BlindControl from '.';

export default {
    title: 'TheHome/Atoms/enhanced/BlindControl',
    component: BlindControl,
    argTypes: {
        setNewPosition: { table: { disable: true } },
        onClick: { table: { disable: true } },
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof BlindControl> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { onClicked, ...args } = { ...props };
    args.onClick = (value: any) => {
        if (onClicked) onClicked(value);
    };
    args.setNewPosition = (pos: number) => {
        if (onClicked) onClicked(pos.toString());
    };
    return <BlindControl {...args} />;
};

export const Simple = Template.bind({});
Simple.args = {
    size: 'xsmall',
    // onClicked: undefined,
};

export const SimpleWithPos = Template.bind({});
SimpleWithPos.args = {
    withPosition: true,
    size: 'xsmall',
    // onClicked: undefined,
};
