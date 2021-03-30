import React from 'react';
import { Story, Meta } from '@storybook/react';
import { CurrentValueChartBox } from '.';
import { MemoryRouter } from 'react-router-dom';
import { useGetIOBFunctionTypeByIOBDeviceID } from '../../hooks/PlaceOverviewHooks';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'TheHome/Molecules/CurrentValueChartBox',
    component: CurrentValueChartBox,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<any> = (args) => {
    const functionID = useGetIOBFunctionTypeByIOBDeviceID(args.deviceID) ?? '';
    return (
        <MemoryRouter
            initialEntries={[
                {
                    pathname: '/homes',
                    state: {
                        deviceID: args.deviceID,
                        functionType: functionID,
                        pathArray: [''],
                    },
                },
            ]}
        >
            <CurrentValueChartBox />
        </MemoryRouter>
    );
};

export const FirstStory = Template.bind({});
FirstStory.args = {
    /*👇 The args you need here will depend on your component */
    deviceID: 'deconz.0.sensors.00158d000321709f.humidity',
};
FirstStory.storyName = '1st Story';
