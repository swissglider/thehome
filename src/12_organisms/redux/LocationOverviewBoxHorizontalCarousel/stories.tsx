import React from 'react';
import { Story, Meta } from '@storybook/react';
import LocationOverviewBoxHorizontalCarousel from '.';
import { I_HOME_CONTAINER } from '../../../30_redux/servConn/interfaces';
import { useSearchHCRecursiveByLocationID } from '../../../20_hooks/PlaceOverviewHooks';

export default {
    title: 'TheHome/organisms/redux/LocationOverviewBoxHorizontalCarousel',
    component: LocationOverviewBoxHorizontalCarousel,
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

    return <LocationOverviewBoxHorizontalCarousel homeContainer={homeContainer} />;
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
