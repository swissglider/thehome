import React from 'react';
import { Story, Meta } from '@storybook/react';
import SensorDetailsPage from '.';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'TheHome/Pages/SensorDetailsPage',
    component: SensorDetailsPage,
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
    return (
        <MemoryRouter initialEntries={[{ pathname: '/thehome/homes', state: { pathArray: pathArray } }]}>
            <SensorDetailsPage />
        </MemoryRouter>
    );
};

export const TempBad = Template.bind({});
TempBad.args = {
    pathArray: ['jeelink.0.LaCrosse_bad.temp', 'enum.functions.temp'],
    onClicked: undefined,
};

export const LichtStube = Template.bind({});
LichtStube.args = {
    pathArray: ['hue.0.Lampe_Stube.on', 'enum.functions.light'],
    onClicked: undefined,
};

export const StorenMacStatus = Template.bind({});
StorenMacStatus.args = {
    onClicked: undefined,
    pathArray: ['shelly.0.SHSW-25#B954EE#1.Shutter.state', 'enum.functions.blinds'],
};

export const StorenMacPos = Template.bind({});
StorenMacPos.args = {
    onClicked: undefined,
    pathArray: ['shelly.0.SHSW-25#B954EE#1.Shutter.Position', 'enum.functions.blinds_position'],
};
