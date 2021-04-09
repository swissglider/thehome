import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import HomesOverviewTemplate from '.';
import { useSelector } from 'react-redux';
import { selector_getHomeContainerList } from '../../features/servConn/selectors';

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
    const { onClicked } = { ...props };
    const homeContainerList = useSelector(selector_getHomeContainerList());
    // args.onClick = () => {
    //    if (onClicked) onClicked();
    //    if (props.onClick) props.onClick();
    // };
    // args.onClick = (value: any) => {
    //    if (onClicked) onClicked(value);
    //    if (props.onClick) props.onClick(value);
    // };
    return <HomesOverviewTemplate homeContainerList={homeContainerList} />;
};

export const Simple = Template.bind({});
Simple.args = {
    onClicked: undefined,
};
