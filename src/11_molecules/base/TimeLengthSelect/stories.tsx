import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import TimeLengthSelect from '.';
import { C_DEFAULT_DURATION, T_DURATION } from '../../../21_utils/DurationHelper';

export default {
    title: 'TheHome/Molecules/base/TimeLengthSelect',
    component: TimeLengthSelect,
    argTypes: {
        duration: { name: 'Default Value' },
        handleChange: { table: { disable: true } },
        onClicked: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof TimeLengthSelect> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    console.log(props);
    const { onClicked, ...args } = { ...props };
    args.handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        if (onClicked) onClicked(event.target.value as T_DURATION);
        if (props.handleChange) props.handleChange(event);
    };
    return <TimeLengthSelect {...args} />;
};

export const SimpleI18 = Template.bind({});
SimpleI18.args = {
    duration: C_DEFAULT_DURATION,
    handleChange: (event: React.ChangeEvent<{ value: unknown }>) => {
        console.log(event.target.value);
    },
};
