import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import ValueUnitText from '.';

export default {
    title: 'TheHome/Atoms/base/ValueUnitText',
    component: ValueUnitText,
    argTypes: {
        onClick: { table: { disable: true } },
        onClicked: { table: { disable: true } },
        variant: { table: { disable: true } },
        ref: { table: { disable: true } },
        align: { table: { disable: true } },
        display: { table: { disable: true } },
        gutterBottom: { table: { disable: true } },
        noWrap: { table: { disable: true } },
        paragraph: { table: { disable: true } },
        variantMapping: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof ValueUnitText> {
    onClicked: (i: string) => void;
}

//👇 We create a “template” of how args map to rendering
const Template: Story<I_Props> = (props) => {
    const { onClicked, ...args } = { ...props };
    args.onClick = onClicked ? () => onClicked('Yes you clicked me') : undefined;
    return <ValueUnitText {...args} />;
};

export const TextWithUnit = Template.bind({});
TextWithUnit.args = {
    value: '10',
    unit: '°C',
    variant: 'subtitle1',
    onClicked: undefined,
};

export const TextWithUnitWithSpace = Template.bind({});
TextWithUnitWithSpace.args = {
    value: '10',
    unit: '°C',
    variant: 'subtitle1',
    spaceBeforeUnit: true,
    onClicked: undefined,
};

export const OnClickText = Template.bind({});
OnClickText.args = {
    value: 'click Me',
    variant: 'subtitle1',
};
OnClickText.argTypes = { onClicked: { action: 'Clicked Text' } };

export const OnClickButton = Template.bind({});
OnClickButton.args = {
    value: '10',
    unit: '°C',
    variant: 'subtitle1',
    spaceBeforeUnit: true,
};
OnClickButton.argTypes = { onClicked: { action: 'Clicked Button' } };
OnClickButton.decorators = [
    (Story) => (
        <div style={{ background: '#efefef', margin: '10px', width: '150px' }}>
            <Story />
        </div>
    ),
];
