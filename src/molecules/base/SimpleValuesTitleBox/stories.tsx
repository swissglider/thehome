import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { rgba2HexConverter } from '../../../utils/Hex2rgbaConverter';
import SimpleValuesTitleBox from '.';
import { CountMethods } from '../../../hooks/CountingHooks';

export default {
    title: 'TheHome/Molecules/base/SimpleValuesTitleBox',
    component: SimpleValuesTitleBox,
    argTypes: {
        title: { name: 'Title' },
        countMethod: { control: { type: 'radio', options: CountMethods } },
        color: { control: { type: 'color' } },
        value: { table: { disable: true } },
        onClick: { table: { disable: true } },
        allValues: { table: { disable: true } },
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof SimpleValuesTitleBox> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { onClicked, ...args } = { ...props };
    // args.onClick = onClicked ? () => onClicked('Yes you clicked me') : undefined;
    args.onClick = onClicked
        ? (value: any) => {
              if (['boolean', 'number', 'string'].includes(typeof value)) {
                  onClicked('Value: ' + value);
                  if (props.onClick) props.onClick('Value: ' + value);
              } else {
                  onClicked('You clicked me');
                  if (props.onClick) props.onClick();
              }
          }
        : undefined;

    if (props.color && props.color.startsWith('rgba')) {
        args.color = '#' + rgba2HexConverter(props.color);
    }
    return <SimpleValuesTitleBox {...args} />;
};

export const Simple = Template.bind({});
Simple.args = {
    title: 'Simple',
    allValues: [0, 3, 5, 4],
    unit: '°C',
    color: '#084f2e',
    countMethod: 'av',
    onClick: (value: any) => {
        console.log(value);
    },
};

export const SimpleBoolean = Template.bind({});
SimpleBoolean.args = {
    title: 'Simple Boolean',
    allValues: [true, true, false],
    color: '#084f2e',
    countMethod: 'av',
    onClick: (value: any) => {
        console.log(value);
    },
};
