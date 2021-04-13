import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { rgba2HexConverter } from '../../../utils/Hex2rgbaConverter';
import NumberChart from '.';

export default {
    title: 'TheHome/Atoms/enhanced/NumberChart',
    component: NumberChart,
    argTypes: {
        color: { control: { type: 'color' } },
        data: { table: { disable: true } },
        height: { table: { disable: true } },
        width: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof NumberChart> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { onClicked, ...args } = { ...props };

    if (props.color && props.color.startsWith('rgba')) {
        args.color = '#' + rgba2HexConverter(props.color);
    }
    return <NumberChart {...args} />;
};

export const SimpleChart = Template.bind({});
SimpleChart.args = {
    data: [
        { val: 1, ts: 1617178411520 },
        { val: 4, ts: 1617278421620 },
        { val: 2, ts: 1617378431720 },
        { val: 7, ts: 1617478441820 },
        { val: 3, ts: 1617578451920 },
        { val: 7, ts: 1617678461520 },
    ],
    color: '#45F298',
    unit: '°C',
    functionName: 'Test-Device',
    deviceName: 'DeviceName',
};

export const SimpleWithHeight = Template.bind({});
SimpleWithHeight.args = {
    data: [
        { val: 1, ts: 1617178411520 },
        { val: 4, ts: 1617278421620 },
        { val: 2, ts: 1617378431720 },
        { val: 7, ts: 1617478441820 },
        { val: 3, ts: 1617578451920 },
        { val: 7, ts: 1617678461520 },
    ],
    color: '#45F298',
    unit: '°C',
    functionName: 'Test-Device',
    deviceName: 'DeviceName',
    height: '300px',
};
