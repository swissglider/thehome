import React from 'react';
import { Story, Meta } from '@storybook/react';
import LocationOverviewBox from '.';
import { I_HOME_CONTAINER } from '../../../30_redux/servConn/interfaces';
import { useSearchHCRecursiveByLocationID } from '../../../20_hooks/PlaceOverviewHooks';

export default {
    title: 'TheHome/organisms/redux/LocationOverviewBox',
    component: LocationOverviewBox,
    argTypes: {
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props {
    onClicked: (i: string) => void;
    locationID: string;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { locationID } = { ...props };
    const homeContainer = useSearchHCRecursiveByLocationID(locationID) as I_HOME_CONTAINER;
    // args.onClick = () => {
    //    if (onClicked) onClicked();
    //    if (props.onClick) props.onClick();
    // };
    // args.onClick = (value: any) => {
    //    if (onClicked) onClicked(value);
    //    if (props.onClick) props.onClick(value);
    // };
    return (
        <>
            <div style={{ marginBottom: '30px' }}>
                <LocationOverviewBox homeContainer={homeContainer} presentationMode="fullBox" />
            </div>
            <div style={{ marginBottom: '30px' }}>
                <LocationOverviewBox homeContainer={homeContainer} presentationMode="verticalList" />
            </div>
            <div style={{ marginBottom: '30px' }}>
                <LocationOverviewBox homeContainer={homeContainer} presentationMode="horizontalList" />
            </div>
        </>
    );
};

export const Wollerau = Template.bind({});
Wollerau.args = {
    onClicked: undefined,
    locationID: 'enum.home.1_wollerau',
};

export const Zuhause = Template.bind({});
Zuhause.args = {
    onClicked: undefined,
    locationID: 'enum.area.inside_home',
};
