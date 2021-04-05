import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SensorTypeListPage from '.';

export default {
    title: 'TheHome/Pages/SensorTypeListPage',
    component: SensorTypeListPage,
    argTypes: {
        title: { name: 'Title' },
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof SensorTypeListPage> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { onClicked, ...args } = { ...props };
    // args.onClick = () => {
    //    if (onClicked) onClicked();
    //    if (props.onClick) props.onClick();
    // };
    // args.onClick = (value: any) => {
    //    if (onClicked) onClicked(value);
    //    if (props.onClick) props.onClick(value);
    // };
    return <SensorTypeListPage {...args} />;
};

export const Licht_Wollerau = Template.bind({});
Licht_Wollerau.args = {
    onClicked: undefined,
    functionTypeID: 'enum.functions.light',
    folderID: 'enum.home.1_wollerau',
    pathArray: [],
};

export const Licht_Laax = Template.bind({});
Licht_Laax.args = {
    onClicked: undefined,
    functionTypeID: 'enum.functions.light',
    folderID: 'enum.home.2_laax',
    pathArray: [],
};

export const Licht_ImHaus = Template.bind({});
Licht_ImHaus.args = {
    onClicked: undefined,
    functionTypeID: 'enum.functions.light',
    folderID: 'enum.area.inside_home',
    pathArray: [],
};

export const Temp_Laax = Template.bind({});
Temp_Laax.args = {
    onClicked: undefined,
    functionTypeID: 'enum.functions.temp',
    folderID: 'enum.home.2_laax',
    pathArray: [],
};
