import React, { useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { useSetRecoilState } from 'recoil';
import BackComponent from '.';
import { historyState, I_HistoryStateProps } from '../../../32-recoil/framework/atoms';

export default {
    title: 'TheHome/11_molecules/recoil/BackComponent',
    component: BackComponent,
    argTypes: {
        onClicked: { table: { disable: true } },
        history: { table: { disable: true } },
    },
} as Meta;

interface I_Props {
    onClicked: (i: string) => void;
    history: I_HistoryStateProps[];
}

const Template: Story<I_Props> = (props: I_Props) => {
    const setHistoryArray = useSetRecoilState<I_HistoryStateProps[]>(historyState);
    useEffect(() => {
        setHistoryArray(props.history);
    }, []);
    return <BackComponent />;
};

export const Simple = Template.bind({});
Simple.args = {
    onClicked: undefined,
    history: [
        { pathname: '/homes/page:LocationOverviewPage/locationID:enum.home.1_wollerau', displayName: 'Heim Wollerau' },
        { pathname: '/homes/page:LocationOverviewPage/locationID:enum.home.1_wollerau', displayName: 'Heim Wollerau' },
    ],
};
