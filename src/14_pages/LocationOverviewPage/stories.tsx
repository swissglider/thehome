import React from 'react';
import { Story, Meta } from '@storybook/react';
import LocationOverviewPage from '.';
import { MemoryRouter } from 'react-router';
import { useGetHomeContainerLocationTo } from '../../20_hooks/PlaceOverviewHooks';

export default {
    title: 'TheHome/pages/LocationOverviewPage',
    component: LocationOverviewPage,
    argTypes: {
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props {
    onClicked: (i: string) => void;
    locationID: string;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const location = useGetHomeContainerLocationTo({ locationID: props.locationID });

    return (
        <MemoryRouter initialEntries={[location.location]}>
            <LocationOverviewPage />
        </MemoryRouter>
    );
};

export const Wollerau = Template.bind({});
Wollerau.args = {
    onClicked: undefined,
    locationID: 'enum.home.1_wollerau',
};

export const Laax = Template.bind({});
Laax.args = {
    onClicked: undefined,
    locationID: 'enum.home.2_laax',
};

export const ImHaus = Template.bind({});
ImHaus.args = {
    onClicked: undefined,
    locationID: 'enum.area.inside_home',
};
