import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import LocationOverviewPage from '.';

export default {
    title: 'TheHome/pages/LocationOverviewPage',
    component: LocationOverviewPage,
    argTypes: {
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof LocationOverviewPage> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { onClicked, ...args } = { ...props };
    // args.onClick = () => {
    //    if (onClicked) onClicked();
    //    if (props.onClick) props.onClick();
    // };
    // args.onClick = (value: any) => {
    //    if (onClicked) onClicked(value);
    //    if (props.onClick) props.onClick(value);
    // };

    return <LocationOverviewPage {...args} />;
};

export const Wollerau = Template.bind({});
Wollerau.args = {
    onClicked: undefined,
    pathArray: ['enum.home.1_wollerau'],
};

export const Laax = Template.bind({});
Laax.args = {
    onClicked: undefined,
    pathArray: ['enum.home.2_laax'],
};

export const ImHaus = Template.bind({});
ImHaus.args = {
    onClicked: undefined,
    pathArray: ['enum.home.1_wollerau', 'enum.area.inside_home'],
};
