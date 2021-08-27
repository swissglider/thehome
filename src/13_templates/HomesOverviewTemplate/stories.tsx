import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import HomesOverviewTemplate from '.';
import { useSelector } from 'react-redux';
import { selector_getHomeContainerList } from '../../30_redux/servConn/selectors';

export default {
    title: 'TheHome/Templates/HomesOverviewTemplate',
    component: HomesOverviewTemplate,
    argTypes: {
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof HomesOverviewTemplate> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const {} = { ...props };
    const homeContainerList = useSelector(selector_getHomeContainerList());

    if (homeContainerList === undefined) return <div>Error -- No homeContainerList</div>;
    return <HomesOverviewTemplate homeContainerList={homeContainerList} />;
};

export const Simple = Template.bind({});
Simple.args = {
    onClicked: undefined,
};
