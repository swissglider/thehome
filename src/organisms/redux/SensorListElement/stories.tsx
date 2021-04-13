import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SensorListElement from '.';
import { useSearchHCByPathArray } from '../../../hooks/HomeContainerHooks';
import { I_HOME_CONTAINER } from '../../../features/servConn/interfaces';

export default {
    title: 'TheHome/Organisms/Redux/SensorListElement',
    component: SensorListElement,
    argTypes: {
        onClicked: { table: { disable: true } },
        homeContainer: { table: { disable: true } },
        onCollapsClick: { table: { disable: true } },
        pathArray: { table: { disable: true } },
        deviceID: { table: { disable: true } },
        functionTypeID: { table: { disable: true } },
        isSensor: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof SensorListElement> {
    onClicked: (i: string) => void;
    pathArray: string[];
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { pathArray, ...args } = { ...props };
    const homeContainer = useSearchHCByPathArray(pathArray) as I_HOME_CONTAINER;
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
    pathArray: ['enum.home.1_wollerau'],
    functionTypeID: 'enum.functions.light',
    isSensor: false,
};

export const WollerauTemp = Template.bind({});
WollerauTemp.args = {
    pathArray: ['enum.home.1_wollerau'],
    functionTypeID: 'enum.functions.temp',
    isSensor: false,
};

export const WollerauDoor = Template.bind({});
WollerauDoor.args = {
    pathArray: ['enum.home.1_wollerau'],
    functionTypeID: 'enum.functions.doors',
    isSensor: false,
};

export const WollerauBlinds = Template.bind({});
WollerauBlinds.args = {
    pathArray: ['enum.home.1_wollerau'],
    functionTypeID: 'enum.functions.blinds',
    isSensor: false,
};

export const WollerauLichtOffice = Template.bind({});
WollerauLichtOffice.args = {
    pathArray: ['enum.home.1_wollerau', 'enum.area.inside_home', 'enum.floor.2-mittelgeschoss', 'enum.rooms.buero'],
    functionTypeID: 'enum.functions.light',
    deviceID: 'deconz.0.lights.00158d00032daf87.on',
    isSensor: true,
};
