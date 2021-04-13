import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import TypographyComponent from '.';
import { Divider } from '@material-ui/core';

export default {
    title: 'TheHome/Atoms/Base/TypographyComponent',
    component: TypographyComponent,
    argTypes: {
        withAnimation: { table: { disable: true } },
        ref: { table: { disable: true } },
        color: { table: { disable: true } },
        align: { table: { disable: true } },
        display: { table: { disable: true } },
        gutterBottom: { table: { disable: true } },
        noWrap: { table: { disable: true } },
        paragraph: { table: { disable: true } },
        variantMapping: { table: { disable: true } },
        onClick: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof TypographyComponent> {
    onClicked: (i: string) => void;
}

//👇 We create a “template” of how args map to rendering
const TemplateVariants = () => {
    return (
        <>
            <TypographyComponent variant="h1">h1</TypographyComponent>
            <TypographyComponent variant="h2">h2</TypographyComponent>
            <TypographyComponent variant="h3">h3</TypographyComponent>
            <TypographyComponent variant="h4">h4</TypographyComponent>
            <TypographyComponent variant="h5">h5</TypographyComponent>
            <TypographyComponent variant="h6">h6</TypographyComponent>
            <TypographyComponent variant="subtitle1">subtitle1</TypographyComponent>
            <TypographyComponent variant="subtitle2">subtitle2</TypographyComponent>
            <TypographyComponent variant="body1">body1</TypographyComponent>
            <TypographyComponent variant="body2">body2</TypographyComponent>
            <TypographyComponent variant="caption">caption</TypographyComponent>
            <TypographyComponent variant="button">button</TypographyComponent>
            <TypographyComponent variant="overline">overline</TypographyComponent>
            <TypographyComponent variant="srOnly">srOnly</TypographyComponent>
            <TypographyComponent variant="inherit">inherit</TypographyComponent>
        </>
    );
};

export const Varianten = TemplateVariants.bind({});

const TemplateWithAnimation: Story<I_Props> = (props) => {
    const { children, onClicked, ...args } = { ...props };
    args.onClick = onClicked ? () => onClicked('Yes you clicked me') : undefined;
    // return <TypographyComponent {...args}>{children}</TypographyComponent>;
    return (
        <>
            <TypographyComponent variant="h5" withAnimation={true} onClick={args.onClick}>
                With Animation - Click me
            </TypographyComponent>
            <Divider />
            <TypographyComponent variant="h5" withAnimation={false} onClick={args.onClick}>
                WithOut Animation - Click me
            </TypographyComponent>
            <Divider />
            <TypographyComponent variant="h5" withAnimation={false}>
                WithOut Animation - Click me (should not work)
            </TypographyComponent>
            <Divider />
            <TypographyComponent variant="h5" withAnimation={true}>
                WithOut Animation - Click me (should not work)
            </TypographyComponent>
        </>
    );
};

export const WithAnimation = TemplateWithAnimation.bind({});

const TemplateAlign: Story<I_Props> = (props) => {
    const { children, onClicked, ...args } = { ...props };
    args.onClick = onClicked ? () => onClicked('Yes you clicked me') : undefined;
    // return <TypographyComponent {...args}>{children}</TypographyComponent>;
    return (
        <>
            <TypographyComponent style={{ width: '400px', minWidth: '400px' }} variant="h6">
                Align inherit - Yep tested
            </TypographyComponent>
            <Divider style={{ width: '400px', minWidth: '400px' }} />
            <TypographyComponent style={{ width: '400px', minWidth: '400px' }} variant="h6" align="inherit">
                Align inherit - Yep tested
            </TypographyComponent>
            <Divider style={{ width: '400px', minWidth: '400px' }} />
            <TypographyComponent style={{ width: '400px', minWidth: '400px' }} variant="h6" align="left">
                Align left - Yep tested
            </TypographyComponent>
            <Divider style={{ width: '400px', minWidth: '400px' }} />
            <TypographyComponent style={{ width: '400px', minWidth: '400px' }} variant="h6" align="center">
                Align center - Yep tested
            </TypographyComponent>
            <Divider style={{ width: '400px', minWidth: '400px' }} />
            <TypographyComponent style={{ width: '400px', minWidth: '400px' }} variant="h6" align="right">
                Align right - Yep tested
            </TypographyComponent>
            <Divider style={{ width: '400px', minWidth: '400px' }} />
            <TypographyComponent style={{ width: '400px', minWidth: '400px' }} variant="h6" align="justify">
                Align justify - Yep tested
            </TypographyComponent>
        </>
    );
};

export const WithAlign = TemplateAlign.bind({});

const TemplateWithColor: Story<I_Props> = (props) => {
    const { children, onClicked, ...args } = { ...props };
    args.onClick = onClicked ? () => onClicked('Yes you clicked me') : undefined;
    // return <TypographyComponent {...args}>{children}</TypographyComponent>;
    return (
        <>
            <TypographyComponent variant="h6">No Color</TypographyComponent>
            <Divider />
            <TypographyComponent variant="h6" color="initial">
                initial
            </TypographyComponent>
            <Divider />
            <TypographyComponent variant="h6" color="inherit">
                inherit
            </TypographyComponent>
            <Divider />
            <TypographyComponent variant="h6" color="primary">
                primary
            </TypographyComponent>
            <Divider />
            <TypographyComponent variant="h6" color="secondary">
                secondary
            </TypographyComponent>
            <Divider />
            <TypographyComponent variant="h6" color="textPrimary">
                textPrimary
            </TypographyComponent>
            <Divider />
            <TypographyComponent variant="h6" color="textSecondary">
                textSecondary
            </TypographyComponent>
            <Divider />
            <TypographyComponent variant="h6" color="error">
                error
            </TypographyComponent>
        </>
    );
};

export const WithColor = TemplateWithColor.bind({});

const TemplateWithParagraph: Story<I_Props> = (props) => {
    const { children, onClicked, ...args } = { ...props };
    args.onClick = onClicked ? () => onClicked('Yes you clicked me') : undefined;
    // return <TypographyComponent {...args}>{children}</TypographyComponent>;
    return (
        <>
            <TypographyComponent variant="h6" paragraph={true}>
                paragraph = true
            </TypographyComponent>
            <TypographyComponent>text after</TypographyComponent>
            <Divider />
            <TypographyComponent variant="h6" paragraph={false}>
                paragraph = false
            </TypographyComponent>
            <TypographyComponent>text after</TypographyComponent>
            <Divider />
            <TypographyComponent variant="h6" gutterBottom={true}>
                gutterBottom = true
            </TypographyComponent>
            <TypographyComponent>text after</TypographyComponent>
            <Divider />
            <TypographyComponent variant="h6" gutterBottom={false}>
                gutterBottom = false
            </TypographyComponent>
            <TypographyComponent>text after</TypographyComponent>
            <Divider />
            <TypographyComponent
                variant="h6"
                noWrap={true}
                align="center"
                display="block"
                style={{ width: '100px', maxWidth: '100px' }}
            >
                noWrap = true
            </TypographyComponent>
            <Divider />
            <TypographyComponent
                variant="h6"
                align="center"
                noWrap={false}
                display="block"
                style={{ width: '100px', maxWidth: '100px' }}
            >
                noWrap = false
            </TypographyComponent>
            <Divider />
        </>
    );
};

export const WithParagraph = TemplateWithParagraph.bind({});

const TemplateWithDisplay: Story<I_Props> = (props) => {
    const { children, onClicked, ...args } = { ...props };
    args.onClick = onClicked ? () => onClicked('Yes you clicked me') : undefined;
    // return <TypographyComponent {...args}>{children}</TypographyComponent>;
    return (
        <>
            <TypographyComponent variant="h6" display="initial">
                Display - initial
            </TypographyComponent>
            <Divider />
            <TypographyComponent variant="h6" display="block">
                Display - Block
            </TypographyComponent>
            <Divider />
            <TypographyComponent variant="h6" display="inline">
                Display - inline
            </TypographyComponent>
            <Divider />
        </>
    );
};

export const WithDisplay = TemplateWithDisplay.bind({});
