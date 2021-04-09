import React from 'react';
import { Story, Meta } from '@storybook/react';
import LocationOverviewBox from '.';
import { useSearchHCByPathArray } from '../../../hooks/HomeContainerHooks';
import { I_HOME_CONTAINER } from '../../../features/servConn/interfaces';

export default {
    title: 'TheHome/organisms/redux/LocationOverviewBox',
    component: LocationOverviewBox,
    argTypes: {
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props {
    onClicked: (i: string) => void;
    pathArray: string[];
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { pathArray } = { ...props };
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
        <>
            <div style={{ marginBottom: '30px' }}>
                <LocationOverviewBox homeContainer={homeContainer} pathArray={pathArray} presentationMode="fullBox" />
            </div>
            <div style={{ marginBottom: '30px' }}>
                <LocationOverviewBox
                    homeContainer={homeContainer}
                    pathArray={pathArray}
                    presentationMode="verticalList"
                />
            </div>
            <div style={{ marginBottom: '30px' }}>
                <LocationOverviewBox
                    homeContainer={homeContainer}
                    pathArray={pathArray}
                    presentationMode="horizontalList"
                />
            </div>
        </>
    );
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
