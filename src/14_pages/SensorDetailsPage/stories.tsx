import React from 'react';
import { Story, Meta } from '@storybook/react';
import SensorDetailsPage from '.';
import { MemoryRouter } from 'react-router-dom';
import { useGetHomeContainerLocationTo } from '../../20_hooks/PlaceOverviewHooks';

export default {
    title: 'TheHome/Pages/SensorDetailsPage',
    component: SensorDetailsPage,
    argTypes: {
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props {
    onClicked: (i: string) => void;
    deviceID: string;
    functionTypeID: string;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const location = useGetHomeContainerLocationTo({ deviceID: props.deviceID, functionTypeID: props.functionTypeID });
    return (
        <MemoryRouter initialEntries={[location.location]}>
            <SensorDetailsPage />
        </MemoryRouter>
    );
};

export const TempBad = Template.bind({});
TempBad.args = {
    functionTypeID: 'enum.functions.temp',
    deviceID: 'jeelink.0.LaCrosse_bad.temp',
    onClicked: undefined,
};

export const LichtStube = Template.bind({});
LichtStube.args = {
    functionTypeID: 'enum.functions.light',
    deviceID: 'hue.0.Lampe_Stube.on',
    onClicked: undefined,
};

export const LichtOffice = Template.bind({});
LichtOffice.args = {
    functionTypeID: 'enum.functions.light',
    deviceID: 'deconz.0.lights.00158d00032daf87.on',
    onClicked: undefined,
};

export const StorenMacStatus = Template.bind({});
StorenMacStatus.args = {
    onClicked: undefined,
    functionTypeID: 'enum.functions.blinds',
    deviceID: 'shelly.0.SHSW-25#B954EE#1.Shutter.state',
};

export const StorenMacPos = Template.bind({});
StorenMacPos.args = {
    onClicked: undefined,
    functionTypeID: 'enum.functions.blinds_position',
    deviceID: 'shelly.0.SHSW-25#B954EE#1.Shutter.Position',
};
