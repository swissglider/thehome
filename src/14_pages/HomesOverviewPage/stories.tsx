import React from 'react';
import { Story, Meta } from '@storybook/react';
import HomesOverviewPage from '.';

export default {
    title: 'TheHome/pages/HomesOverviewPage',
    component: HomesOverviewPage,
    argTypes: {},
} as Meta;

const Template: Story = () => {
    return <HomesOverviewPage />;
};

export const Simple = Template.bind({});
Simple.args = {};
