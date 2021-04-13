import React from 'react';
import { Story, Meta } from '@storybook/react';
import LocationOverviewTemplate from '.';
import { useSearchHCByPathArray } from '../../hooks/HomeContainerHooks';
import { I_HOME_CONTAINER } from '../../features/servConn/interfaces';
import SensorTypeIconTextBoxHorizontalCarousel from '../../organisms/redux/SensorTypeIconTextBoxHorizontalCarousel';
import LocationOverviewBoxHorizontalCarousel from '../../organisms/redux/LocationOverviewBoxHorizontalCarousel';
import LocationOverviewBox from '../../organisms/redux/LocationOverviewBox';

export default {
    title: 'TheHome/Templates/LocationOverviewTemplate',
    component: LocationOverviewTemplate,
    argTypes: {
        onClicked: { table: { disable: true } },
        pathArray: { table: { disable: true } },
        locationComp: { table: { disable: true } },
        subLocationListComp: { table: { disable: true } },
        zoneListComp: { table: { disable: true } },
        sensorListComp: { table: { disable: true } },
    },
} as Meta;

interface I_Props {
    onClicked: (i: string) => void;
    pathArray: string[];
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { pathArray } = { ...props };
    const homeContainer = useSearchHCByPathArray(pathArray) as I_HOME_CONTAINER;
    const newProps = {
        onClicked: undefined,
        locationComp: <LocationOverviewBox homeContainer={homeContainer} presentationMode="fullBox" />,
        subLocationListComp: <LocationOverviewBoxHorizontalCarousel homeContainer={homeContainer} />,
        sensorListComp: <SensorTypeIconTextBoxHorizontalCarousel homeContainer={homeContainer} />,
        // subLocationListComp: (
        //     <PlaceOverviewItem homeContainer={homeContainer} pathArray={pathArray} withoutLink={true} />
        // ),
    };
    return <LocationOverviewTemplate {...newProps} />;
};

export const Wollerau = Template.bind({});
Wollerau.args = {
    onClicked: undefined,
    pathArray: ['enum.home.1_wollerau'],
};

export const Zuhause = Template.bind({});
Zuhause.args = {
    onClicked: undefined,
    pathArray: ['enum.home.1_wollerau', 'enum.area.inside_home'],
};
