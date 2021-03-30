import React, { ComponentProps } from 'react';
import Typography from '@material-ui/core/Typography';
import { Variant } from '@material-ui/core/styles/createTypography';
import { i18n } from '@lingui/core';
import ButtonAnimation from '../ButtonAnimation';

export const TypographyComponent_Variants = ['header', 'title', 'subtitle', 'body'] as const;
export type T_TypographyComponent_Variants = typeof TypographyComponent_Variants[number];

const getMappedVariant = (variant: string): Variant => {
    switch (variant) {
        case 'header':
            return 'h4';
        case 'title':
            return 'subtitle1';
        case 'subtitle':
            return 'subtitle2';
        case 'body':
            return 'body2';
        default:
            return 'body1';
    }
};

export interface I_TypographyComponent_Props {
    children: string | JSX.Element;
    variant?: T_TypographyComponent_Variants;
    onClick?: () => void;
}

const TypographyComponent = (props: I_TypographyComponent_Props): JSX.Element => {
    const params: ComponentProps<typeof Typography> = {};
    if (props.onClick) params.onClick = props.onClick;
    if (props.variant) params.variant = getMappedVariant(props.variant);

    return (
        <ButtonAnimation withAnimation={params.onClick !== undefined}>
            <Typography component={'span'} {...params}>
                {typeof props.children === 'string'
                    ? props.children
                        ? i18n._({ id: props.children })
                        : undefined
                    : props.children}
            </Typography>
        </ButtonAnimation>
    );
};

export default TypographyComponent;
