import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import TypographyComponent, { TypographyComponent_Variants } from '.';

export default {
    title: 'TheHome/Atoms/Base/TypographyComponent',
    component: TypographyComponent,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: TypographyComponent_Variants,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
        children: {
            table: {
                disable: true,
            },
        },
        onClicked: {
            table: {
                disable: true,
            },
        },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof TypographyComponent> {
    onClicked: (i: string) => void;
}

//👇 We create a “template” of how args map to rendering
const Template: Story<I_Props> = (props) => {
    const { children, onClicked, ...args } = { ...props };
    args.onClick = onClicked ? () => onClicked('Yes you clicked me') : undefined;
    return <TypographyComponent {...args}>{children}</TypographyComponent>;
};

export const Header = Template.bind({});
Header.args = {
    children: 'Header',
    variant: 'header',
    onClicked: undefined,
};

export const Title = Template.bind({});
Title.args = {
    children: 'Title',
    variant: 'title',
    onClicked: undefined,
};

export const Subtitle = Template.bind({});
Subtitle.args = {
    children: 'Subtitle',
    variant: 'subtitle',
    onClicked: undefined,
};

export const Body = Template.bind({});
Body.args = {
    children:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    variant: 'body',
    onClicked: undefined,
};

export const Div = Template.bind({});
Div.args = {
    children: (
        <div>
            <b>I am a bold div</b>
        </div>
    ),
    variant: 'body',
    onClicked: undefined,
};

export const OnClickText = Template.bind({});
OnClickText.args = {
    children: 'Click me',
    variant: 'body',
};
OnClickText.argTypes = { onClicked: { action: 'Clicked Text' } };

export const OnClickButton = Template.bind({});
OnClickButton.args = {
    children: <div style={{ background: '#efefef', padding: '10px', width: '100px' }}>Click me</div>,
    variant: 'body',
};
OnClickButton.argTypes = { onClicked: { action: 'Clicked Button' } };
OnClickButton.decorators = [
    (Story) => (
        <div style={{ width: '100px' }}>
            <Story />
        </div>
    ),
];

export const OnClickButtoni18n = Template.bind({});
OnClickButtoni18n.args = {
    children: 'Click me Test',
    variant: 'title',
};
OnClickButtoni18n.argTypes = { onClicked: { action: 'Clicked Button' } };
OnClickButtoni18n.decorators = [
    (Story) => (
        <div style={{ background: '#efefef', margin: '10px', width: '150px' }}>
            <Story />
        </div>
    ),
];
