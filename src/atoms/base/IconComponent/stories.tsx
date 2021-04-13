import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import IconComponent from '.';

export default {
    title: 'TheHome/Atoms/Base/IconComponent',
    component: IconComponent,
    argTypes: {
        icon_false: { table: { disable: true } },
        icon_true: { table: { disable: true } },
        icon: { table: { disable: true } },
        onClick: { table: { disable: true } },
        onClicked: { table: { disable: true } },
        sizes: { table: { disable: true } },
        srcSet: { table: { disable: true } },
        src: { table: { disable: true } },
        imgProps: { table: { disable: true } },
        alt: { table: { disable: true } },
        ref: { table: { disable: true } },
    },
} as Meta;

const icon =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAo0lEQVQ4jWNkgILUWRd82FmZQhjIAD9//1szO81gC4pgzvxLC/6TCXLmX1oAM4cF3bZzDz4xnLz3EUXMXImfgYGBAau4kQIfihiGgSfvfWRg4pdGE3vKwMDAgFUc3UAmdAMpBaMGUg4wYtlciR8eq8hiDAwMOMWRAe1dOJoOh6GBVE+HGAYaKfBhJAVkOaJd+PP3vzW5Cy4T1IAN/Pz9bw2MDQB25HWiRhvKowAAAABJRU5ErkJggg==';

interface I_Props extends ComponentProps<typeof IconComponent> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (args) => {
    const { onClick, ...props } = { ...args };
    const onClick_ = () => {
        args.onClicked('clicked');
    };
    // const iconTrue
    return <IconComponent {...props} onClick={onClick_} icon={icon} />;
};

export const Standard = Template.bind({});
Standard.args = {};
Standard.argTypes = { onClicked: { action: 'Standard Clicked' } };

export const Open = Template.bind({});
Open.args = {
    size: 'open',
};
Open.argTypes = { onClicked: { action: 'Open Clicked' } };

export const Root = Template.bind({});
Root.args = {
    size: 'root',
};
Root.argTypes = { onClicked: { action: 'Root Clicked' } };

export const XSmall = Template.bind({});
XSmall.args = {
    size: 'xsmall',
};
XSmall.argTypes = { onClicked: { action: 'XSmall Clicked' } };

export const bold_xsmall = Template.bind({});
bold_xsmall.args = {
    size: 'bold_xsmall',
};
bold_xsmall.argTypes = { onClicked: { action: 'bold_xsmall Clicked' } };

export const small = Template.bind({});
small.args = {
    size: 'small',
};
small.argTypes = { onClicked: { action: 'small Clicked' } };

export const medium = Template.bind({});
medium.args = {
    size: 'medium',
};
medium.argTypes = { onClicked: { action: 'medium Clicked' } };

export const large = Template.bind({});
large.args = {
    size: 'large',
};
large.argTypes = { onClicked: { action: 'large Clicked' } };

export const xlarge = Template.bind({});
xlarge.args = {
    size: 'xlarge',
};
xlarge.argTypes = { onClicked: { action: 'xlarge Clicked' } };

export const circular = Template.bind({});
circular.args = {
    variants: 'circular',
};
circular.argTypes = { onClicked: { action: 'circular Clicked' } };

export const rounded = Template.bind({});
rounded.args = {
    variants: 'rounded',
};
rounded.argTypes = { onClicked: { action: 'rounded Clicked' } };

export const square = Template.bind({});
square.args = {
    variants: 'square',
};
square.argTypes = { onClicked: { action: 'square Clicked' } };

export const withoutAnimation = Template.bind({});
withoutAnimation.args = {
    withAnimation: false,
};
withoutAnimation.argTypes = { onClicked: { action: 'withoutAnimation Clicked' } };

export const withAnimation = Template.bind({});
withAnimation.args = {
    withAnimation: true,
};
withAnimation.argTypes = { onClicked: { action: 'withAnimation Clicked' } };
