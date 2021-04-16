import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SimpleButton from '.';
import TypographyComponent from '../TypographyComponent';

export default {
    title: 'TheHome/atoms/base/SimpleButton',
    component: SimpleButton,
    argTypes: {
        onClick: { table: { disable: true } },
        onClicked: { table: { disable: true } },
        text: { table: { disable: true } },
        children: { table: { disable: true } },
        color: { table: { disable: true } },
        endIcon: { table: { disable: true } },
        href: { table: { disable: true } },
        startIcon: { table: { disable: true } },
        action: { table: { disable: true } },
        focusVisibleClassName: { table: { disable: true } },
        onFocusVisible: { table: { disable: true } },
        tabIndex: { table: { disable: true } },
        TouchRippleProps: { table: { disable: true } },
        ref: { table: { disable: true } },
        variant: { table: { disable: true } },
        size: { table: { disable: true } },
        fullWidth: { table: { disable: true } },
    },
} as Meta;

const icon =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAo0lEQVQ4jWNkgILUWRd82FmZQhjIAD9//1szO81gC4pgzvxLC/6TCXLmX1oAM4cF3bZzDz4xnLz3EUXMXImfgYGBAau4kQIfihiGgSfvfWRg4pdGE3vKwMDAgFUc3UAmdAMpBaMGUg4wYtlciR8eq8hiDAwMOMWRAe1dOJoOh6GBVE+HGAYaKfBhJAVkOaJd+PP3vzW5Cy4T1IAN/Pz9bw2MDQB25HWiRhvKowAAAABJRU5ErkJggg==';

interface I_Props extends ComponentProps<typeof SimpleButton> {
    onClicked: (i: string) => void;
}

const TemplateColor: Story<I_Props> = (props: I_Props) => {
    const { onClicked, ...args } = { ...props };
    args.onClick = () => {
        if (onClicked) onClicked('Clicked');
        if (props.onClick) props.onClick();
    };
    return (
        <>
            <TypographyComponent variant="h4">Colors</TypographyComponent>
            <SimpleButton {...args} text="default" />
            <SimpleButton {...args} color="inherit" text="inherit" />
            <SimpleButton {...args} color="primary" text="primary" />
            <SimpleButton {...args} color="secondary" text="secondary" />
            <p />
            <TypographyComponent variant="h4">Variants</TypographyComponent>
            <SimpleButton {...args} text="default" />
            <SimpleButton {...args} color="inherit" variant="text" text="text" />
            <SimpleButton {...args} color="primary" variant="contained" text="contained" />
            <SimpleButton {...args} color="secondary" variant="outlined" text="outlined" />
            <p />
            <TypographyComponent variant="h4">Size</TypographyComponent>
            <SimpleButton {...args} variant="outlined" text="default" />
            <SimpleButton {...args} variant="outlined" size="small" text="small" />
            <SimpleButton {...args} variant="outlined" size="medium" text="medium" />
            <SimpleButton {...args} variant="outlined" size="large" text="large" />
            <p />
            <TypographyComponent variant="h4">Start Icons Small</TypographyComponent>
            <SimpleButton {...args} variant="outlined" size="small" text="Start Icon Outlined" startIcon={icon} />
            <SimpleButton {...args} variant="text" size="small" text="Start Icon text" startIcon={icon} />
            <SimpleButton {...args} variant="contained" size="small" text="Start Icon contained" startIcon={icon} />
            <p />
            <TypographyComponent variant="h4">End Icons Medium</TypographyComponent>
            <SimpleButton {...args} variant="outlined" size="medium" text="End Icon Outlined" endIcon={icon} />
            <SimpleButton {...args} variant="text" size="medium" text="End Icon text" endIcon={icon} />
            <SimpleButton {...args} variant="contained" size="medium" text="End Icon contained" endIcon={icon} />
            <p />
            <TypographyComponent variant="h4">Icons Medium</TypographyComponent>
            <SimpleButton
                {...args}
                variant="outlined"
                size="large"
                text="Icons Outlined"
                endIcon={icon}
                startIcon={icon}
            />
            <SimpleButton {...args} variant="text" size="large" text="Icons text" endIcon={icon} startIcon={icon} />
            <SimpleButton
                {...args}
                variant="contained"
                size="large"
                text="Icons contained"
                endIcon={icon}
                startIcon={icon}
            />
            <p />
            <TypographyComponent variant="h4">Full With</TypographyComponent>
            <SimpleButton {...args} variant="outlined" size="medium" text="Full With" fullWidth={true} />
        </>
    );
};

export const ColorVariants = TemplateColor.bind({});
ColorVariants.args = {
    onClick: () => {
        console.log('Clicked');
    },
};
