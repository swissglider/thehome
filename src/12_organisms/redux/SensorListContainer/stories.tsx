import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SensorListContainer from '.';
import { I_HOME_CONTAINER } from '../../../30_redux/servConn/interfaces';
import { useSearchHCByPathArray } from '../../../20_hooks/HomeContainerHooks';

export default {
    title: 'TheHome/Organisms/Redux/SensorListContainer',
    component: SensorListContainer,
    argTypes: {
        onClicked: { table: { disable: true } },
        listItems: { table: { disable: true } },
        pathArray: { table: { disable: true } },
        functionTypeID: { table: { disable: true } },
        level: { table: { disable: true } },
        homeContainer: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof SensorListContainer> {
    onClicked: (i: string) => void;
    pathArray: string[];
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { pathArray, ...args } = { ...props };
    const homeContainer = useSearchHCByPathArray(pathArray) as I_HOME_CONTAINER;
    return <SensorListContainer {...args} homeContainer={homeContainer} />;
};

export const WollerauLight = Template.bind({});
WollerauLight.args = {
    pathArray: ['enum.home.1_wollerau'],
    functionTypeID: 'enum.functions.light',
    level: 0,
};

export const WollerauTemp = Template.bind({});
WollerauTemp.args = {
    pathArray: ['enum.home.1_wollerau'],
    functionTypeID: 'enum.functions.temp',
    level: 0,
};

export const WollerauDoor = Template.bind({});
WollerauDoor.args = {
    pathArray: ['enum.home.1_wollerau'],
    functionTypeID: 'enum.functions.doors',
    level: 0,
};

export const WollerauBlinds = Template.bind({});
WollerauBlinds.args = {
    pathArray: ['enum.home.1_wollerau'],
    functionTypeID: 'enum.functions.blinds',
    level: 0,
};

export const WollerauMittelgeschoss = Template.bind({});
WollerauMittelgeschoss.args = {
    pathArray: ['enum.home.1_wollerau', 'enum.area.inside_home', 'enum.floor.2-mittelgeschoss'],
    functionTypeID: 'enum.functions.light',
    level: 0,
};
