import React from 'react';
import { Story, Meta } from '@storybook/react';
import LocationOverviewBreadcrumbs from '.';
import { MemoryRouter } from 'react-router-dom';
import { useGetHomeContainerLocationTo } from '../../../20_hooks/PlaceOverviewHooks';

export default {
    title: 'TheHome/molecules/redux/LocationOverviewBreadcrumbs',
    component: LocationOverviewBreadcrumbs,
    argTypes: {
        onClicked: { table: { disable: true } },
        title: { name: 'Title' },
        color: { control: { type: 'color' } },
        value: { table: { disable: true } },
    },
} as Meta;

interface I_Props {
    onClicked: (i: string) => void;
    locationID?: string;
    functionTypeID?: string;
    deviceID?: string;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const location = useGetHomeContainerLocationTo({
        locationID: props.locationID,
        deviceID: props.deviceID,
        functionTypeID: props.functionTypeID,
    });
    return (
        <MemoryRouter initialEntries={[location.location]}>
            <LocationOverviewBreadcrumbs />
        </MemoryRouter>
    );
};

export const Licht_Wollerau = Template.bind({});
Licht_Wollerau.args = {
    onClicked: undefined,
    locationID: 'enum.home.1_wollerau',
    functionTypeID: 'enum.functions.light',
};

export const Licht_Laax = Template.bind({});
Licht_Laax.args = {
    onClicked: undefined,
    locationID: 'enum.home.2_laax',
    functionTypeID: 'enum.functions.light',
};
export const ImHaus = Template.bind({});
ImHaus.args = {
    onClicked: undefined,
    locationID: 'enum.area.inside_home',
};

export const Licht_ImHaus = Template.bind({});
Licht_ImHaus.args = {
    onClicked: undefined,
    locationID: 'enum.area.inside_home',
    functionTypeID: 'enum.functions.light',
};

export const Licht_Office = Template.bind({});
Licht_Office.args = {
    onClicked: undefined,
    functionTypeID: 'enum.functions.light',
    deviceID: 'deconz.0.lights.00158d00032daf87.on',
};

export const Licht2_Office = Template.bind({});
Licht2_Office.args = {
    onClicked: undefined,
    deviceID: 'deconz.0.lights.00158d00032daf87.on',
};

export const Lichter_Office = Template.bind({});
Lichter_Office.args = {
    onClicked: undefined,
    locationID: 'enum.rooms.buero',
    functionTypeID: 'enum.functions.light',
};

export const Temp_Laax = Template.bind({});
Temp_Laax.args = {
    onClicked: undefined,
    locationID: 'enum.home.2_laax',
    functionTypeID: 'enum.functions.temp',
};
