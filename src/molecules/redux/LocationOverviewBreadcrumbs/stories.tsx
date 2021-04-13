import React from 'react';
import { Story, Meta } from '@storybook/react';
import LocationOverviewBreadcrumbs from '.';
import { MemoryRouter } from 'react-router-dom';

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
    pathArray: string[];
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { pathArray } = { ...props };
    return (
        <MemoryRouter initialEntries={[{ pathname: '/thehome/homes', state: { pathArray: pathArray } }]}>
            <LocationOverviewBreadcrumbs />
        </MemoryRouter>
    );
};

export const Licht_Wollerau = Template.bind({});
Licht_Wollerau.args = {
    onClicked: undefined,
    pathArray: ['enum.home.1_wollerau', 'enum.functions.light'],
};

export const Licht_Laax = Template.bind({});
Licht_Laax.args = {
    onClicked: undefined,
    pathArray: ['enum.home.2_laax', 'enum.functions.light'],
};
export const ImHaus = Template.bind({});
ImHaus.args = {
    onClicked: undefined,
    pathArray: ['enum.home.1_wollerau', 'enum.area.inside_home'],
};

export const Licht_ImHaus = Template.bind({});
Licht_ImHaus.args = {
    onClicked: undefined,
    pathArray: ['enum.home.1_wollerau', 'enum.area.inside_home', 'enum.functions.light'],
};

export const Licht_Office = Template.bind({});
Licht_Office.args = {
    onClicked: undefined,
    pathArray: [
        'enum.home.1_wollerau',
        'enum.area.inside_home',
        'enum.floor.2-mittelgeschoss',
        'enum.rooms.buero',
        'deconz.0.lights.00158d00032daf87.on',
        'enum.functions.light',
    ],
};

export const Licht2_Office = Template.bind({});
Licht2_Office.args = {
    onClicked: undefined,
    pathArray: [
        'enum.home.1_wollerau',
        'enum.area.inside_home',
        'enum.floor.2-mittelgeschoss',
        'enum.rooms.buero',
        'deconz.0.lights.00158d00032daf87.on',
    ],
};

export const Lichter_Office = Template.bind({});
Lichter_Office.args = {
    onClicked: undefined,
    pathArray: [
        'enum.home.1_wollerau',
        'enum.area.inside_home',
        'enum.floor.2-mittelgeschoss',
        'enum.rooms.buero',
        'enum.functions.light',
    ],
};

export const Temp_Laax = Template.bind({});
Temp_Laax.args = {
    onClicked: undefined,
    pathArray: ['enum.home.2_laax', 'enum.functions.temp'],
};
