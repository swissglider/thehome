import React from 'react';
import { Story, Meta } from '@storybook/react';
import LocationOverviewPage from '.';
import { MemoryRouter } from 'react-router';

export default {
    title: 'TheHome/pages/LocationOverviewPage',
    component: LocationOverviewPage,
    argTypes: {
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props {
    onClicked: (i: string) => void;
    pathArray: string[];
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { pathArray } = { ...props };
    // args.onClick = () => {
    //    if (onClicked) onClicked();
    //    if (props.onClick) props.onClick();
    // };
    // args.onClick = (value: any) => {
    //    if (onClicked) onClicked(value);
    //    if (props.onClick) props.onClick(value);
    // };

    return (
        <MemoryRouter initialEntries={[{ pathname: '/thehome/homes', state: { pathArray: pathArray } }]}>
            <LocationOverviewPage />
        </MemoryRouter>
    );
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
