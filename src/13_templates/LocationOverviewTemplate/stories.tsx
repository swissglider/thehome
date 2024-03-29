import React from 'react';
import { Story, Meta } from '@storybook/react';
import LocationOverviewTemplate from '.';
import { I_HOME_CONTAINER } from '../../30_redux/servConn/interfaces';
import SensorTypeIconTextBoxHorizontalCarousel from '../../12_organisms/redux/SensorTypeIconTextBoxHorizontalCarousel';
import LocationOverviewBoxHorizontalCarousel from '../../12_organisms/redux/LocationOverviewBoxHorizontalCarousel';
import LocationOverviewBox from '../../12_organisms/redux/LocationOverviewBox';
import { useSearchHCRecursiveByLocationID } from '../../20_hooks/PlaceOverviewHooks';

export default {
    title: 'TheHome/Templates/LocationOverviewTemplate',
    component: LocationOverviewTemplate,
    argTypes: {
        onClicked: { table: { disable: true } },
        locationID: { table: { disable: true } },
        locationComp: { table: { disable: true } },
        subLocationListComp: { table: { disable: true } },
        zoneListComp: { table: { disable: true } },
        sensorListComp: { table: { disable: true } },
    },
} as Meta;

interface I_Props {
    onClicked: (i: string) => void;
    locationID: string;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { locationID } = { ...props };
    const homeContainer = useSearchHCRecursiveByLocationID(locationID) as I_HOME_CONTAINER;
    const newProps = {
        onClicked: undefined,
        locationComp: <LocationOverviewBox homeContainer={homeContainer} presentationMode="fullBox" />,
        subLocationListComp: <LocationOverviewBoxHorizontalCarousel homeContainer={homeContainer} />,
        sensorListComp: <SensorTypeIconTextBoxHorizontalCarousel homeContainer={homeContainer} />,
    };
    return <LocationOverviewTemplate {...newProps} />;
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
