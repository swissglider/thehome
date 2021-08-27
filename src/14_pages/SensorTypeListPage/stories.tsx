import React from 'react';
import { Story, Meta } from '@storybook/react';
import SensorTypeListPage from '.';
import { MemoryRouter } from 'react-router-dom';
import { useGetHomeContainerLocationTo } from '../../20_hooks/PlaceOverviewHooks';

export default {
    title: 'TheHome/Pages/SensorTypeListPage',
    component: SensorTypeListPage,
    argTypes: {
        title: { name: 'Title' },
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props {
    onClicked: (i: string) => void;
    locationID: string;
    functionTypeID: string;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const location = useGetHomeContainerLocationTo({
        locationID: props.locationID,
        functionTypeID: props.functionTypeID,
    });
    return (
        <MemoryRouter initialEntries={[location.location]}>
            <SensorTypeListPage />
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

export const Licht_ImHaus = Template.bind({});
Licht_ImHaus.args = {
    onClicked: undefined,
    locationID: 'enum.area.inside_home',
    functionTypeID: 'enum.functions.light',
};

export const Licht_Office = Template.bind({});
Licht_Office.args = {
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
