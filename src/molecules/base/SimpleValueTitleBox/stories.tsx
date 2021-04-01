import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { rgba2HexConverter } from '../../../utils/Hex2rgbaConverter';
import SimpleValueTitleBox from '.';

export default {
    title: 'TheHome/Molecules/base/SimpleValueTitleBox',
    component: SimpleValueTitleBox,
    argTypes: {
        title: { name: 'Title' },
        color: { control: { type: 'color' } },
        value: { table: { disable: true } },
        onClick: { table: { disable: true } },
        onClicked: { table: { disable: true } },
        allValues: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof SimpleValueTitleBox> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { onClicked, ...args } = { ...props };
    // args.onClick = onClicked ? () => onClicked('Yes you clicked me') : undefined;
    args.onClick = onClicked
        ? () => {
              onClicked('Clicked');
              if (props.onClick) props.onClick();
          }
        : undefined;

    if (props.color && props.color.startsWith('rgba')) {
        args.color = '#' + rgba2HexConverter(props.color);
    }
    console.log(args);
    return <SimpleValueTitleBox {...args} />;
};

export const Simple = Template.bind({});
Simple.args = {
    title: 'Simple',
    value: '10',
    unit: '°C',
    color: '#084f2e',
    onClick: () => {
        console.log('clicked');
    },
};
