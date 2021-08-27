import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SensorTypeIconTextBox from '.';
import { I_HOME_CONTAINER } from '../../../30_redux/servConn/interfaces';
import { useSearchHCRecursiveByLocationID } from '../../../20_hooks/PlaceOverviewHooks';

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
    locationID: string;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { locationID, functionTypeID } = { ...props };
    const homeContainer = useSearchHCRecursiveByLocationID(locationID) as I_HOME_CONTAINER;
    // args.onClick = () => {
    //    if (onClicked) onClicked();
    //    if (props.onClick) props.onClick();
    // };
    // args.onClick = (value: any) => {
    //    if (onClicked) onClicked(value);
    //    if (props.onClick) props.onClick(value);
    // };
    return <SensorTypeIconTextBox homeContainer={homeContainer} functionTypeID={functionTypeID} />;
};

export const Wollerau_Light = Template.bind({});
Wollerau_Light.args = {
    onClicked: undefined,
    locationID: 'enum.area.inside_home',
    functionTypeID: 'enum.functions.light',
};

export const Wollerau_Temp = Template.bind({});
Wollerau_Temp.args = {
    onClicked: undefined,
    locationID: 'enum.area.inside_home',
    functionTypeID: 'enum.functions.temp',
};
