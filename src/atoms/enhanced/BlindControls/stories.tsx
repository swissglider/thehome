import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import BlindControl from '.';
import { Divider } from '@material-ui/core';
import TypographyComponent from '../../base/TypographyComponent';

export default {
    title: 'TheHome/Atoms/enhanced/BlindControl',
    component: BlindControl,
    argTypes: {
        setNewPosition: { table: { disable: true } },
        onClick: { table: { disable: true } },
        onClicked: { table: { disable: true } },
        size: { table: { disable: true } },
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
    return (
        <>
            <TypographyComponent variant="subtitle1">xsmall</TypographyComponent>
            <BlindControl {...args} size="xsmall" />
            <BlindControl {...args} size="xsmall" withPosition={true} />
            <Divider />
            <TypographyComponent variant="subtitle1">bold_xsmall</TypographyComponent>
            <BlindControl {...args} size="bold_xsmall" />
            <BlindControl {...args} size="bold_xsmall" withPosition={true} />
            <Divider />
            <TypographyComponent variant="subtitle1">small</TypographyComponent>
            <BlindControl {...args} size="small" />
            <BlindControl {...args} size="small" withPosition={true} />
            <Divider />
            <TypographyComponent variant="subtitle1">root</TypographyComponent>
            <BlindControl {...args} size="root" />
            <BlindControl {...args} size="root" withPosition={true} />
            <Divider />
            <TypographyComponent variant="subtitle1">large</TypographyComponent>
            <BlindControl {...args} size="large" />
            <BlindControl {...args} size="large" withPosition={true} />
            <Divider />
            <TypographyComponent variant="subtitle1">open</TypographyComponent>
            <BlindControl {...args} size="open" />
            <BlindControl {...args} size="open" withPosition={true} />
        </>
    );
};

export const AllSizes = Template.bind({});
