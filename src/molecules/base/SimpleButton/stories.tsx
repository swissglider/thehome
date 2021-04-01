import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SimpleButton from '.';

export default {
    title: 'TheHome/molecules/base/SimpleButton',
    component: SimpleButton,
    argTypes: {
        onClick: { table: { disable: true } },
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof SimpleButton> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { onClicked, ...args } = { ...props };
    args.onClick = () => {
        if (onClicked) onClicked('Clicked');
        if (props.onClick) props.onClick();
    };
    return <SimpleButton {...args} />;
};

export const SimpleButtpn = Template.bind({});
SimpleButtpn.args = {
    text: 'Test Button',
    onClick: () => {
        console.log('Clicked');
    },
};
