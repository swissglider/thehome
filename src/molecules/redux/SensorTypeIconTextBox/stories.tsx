import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SensorTypeIconTextBox from '.';
import { useSearchHCByPathArray } from '../../../hooks/HomeContainerHooks';
import { I_HOME_CONTAINER } from '../../../features/servConn/interfaces';

export default {
    title: 'TheHome/molecules/redux/SensorTypeIconTextBox',
    component: SensorTypeIconTextBox,
    argTypes: {
        onClicked: { table: { disable: true } },
        homeContainer: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof SensorTypeIconTextBox> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { onClicked, pathArray, functionTypeID } = { ...props };
    const homeContainer = useSearchHCByPathArray(pathArray) as I_HOME_CONTAINER;
    // args.onClick = () => {
    //    if (onClicked) onClicked();
    //    if (props.onClick) props.onClick();
    // };
    // args.onClick = (value: any) => {
    //    if (onClicked) onClicked(value);
    //    if (props.onClick) props.onClick(value);
    // };
    return (
        <SensorTypeIconTextBox homeContainer={homeContainer} pathArray={pathArray} functionTypeID={functionTypeID} />
    );
};

export const Wollerau_Light = Template.bind({});
Wollerau_Light.args = {
    onClicked: undefined,
    pathArray: ['enum.home.1_wollerau', 'enum.area.inside_home'],
    functionTypeID: 'enum.functions.light',
};

export const Wollerau_Temp = Template.bind({});
Wollerau_Temp.args = {
    onClicked: undefined,
    pathArray: ['enum.home.1_wollerau', 'enum.area.inside_home'],
    functionTypeID: 'enum.functions.temp',
};
