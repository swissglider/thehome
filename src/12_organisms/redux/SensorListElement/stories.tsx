import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SensorListElement from '.';
import { I_HOME_CONTAINER } from '../../../30_redux/servConn/interfaces';
import { useSearchHCRecursiveByLocationID } from '../../../20_hooks/PlaceOverviewHooks';

export default {
    title: 'TheHome/Organisms/Redux/SensorListElement',
    component: SensorListElement,
    argTypes: {
        onClicked: { table: { disable: true } },
        homeContainer: { table: { disable: true } },
        onCollapsClick: { table: { disable: true } },
        locationID: { table: { disable: true } },
        deviceID: { table: { disable: true } },
        functionTypeID: { table: { disable: true } },
        isSensor: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof SensorListElement> {
    onClicked: (i: string) => void;
    locationID: string;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { locationID, ...args } = { ...props };
    const homeContainer = useSearchHCRecursiveByLocationID(locationID) as I_HOME_CONTAINER;
    // args.onClick = () => {
    //    if (onClicked) onClicked();
    //    if (props.onClick) props.onClick();
    // };
    // args.onClick = (value: any) => {
    //     if (onClicked) onClicked(value);
    //     if (props.onClick) props.onClick(value);
    // };
    args.onCollapsClick = () => {
        console.log('onCollapsClick clicked');
    };
    args.homeContainer = homeContainer;
    return <SensorListElement {...args} />;
};

export const WollerauLight = Template.bind({});
WollerauLight.args = {
    locationID: 'enum.home.1_wollerau',
    functionTypeID: 'enum.functions.light',
    isSensor: false,
};

export const WollerauTemp = Template.bind({});
WollerauTemp.args = {
    locationID: 'enum.home.1_wollerau',
    functionTypeID: 'enum.functions.temp',
    isSensor: false,
};

export const WollerauDoor = Template.bind({});
WollerauDoor.args = {
    locationID: 'enum.home.1_wollerau',
    functionTypeID: 'enum.functions.doors',
    isSensor: false,
};

export const WollerauBlinds = Template.bind({});
WollerauBlinds.args = {
    locationID: 'enum.home.1_wollerau',
    functionTypeID: 'enum.functions.blinds',
    isSensor: false,
};

export const WollerauLichtOffice = Template.bind({});
WollerauLichtOffice.args = {
    locationID: 'enum.rooms.buero',
    functionTypeID: 'enum.functions.light',
    deviceID: 'deconz.0.lights.00158d00032daf87.on',
    isSensor: true,
};
