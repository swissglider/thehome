import React, { ComponentProps, useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import { Variant } from '@material-ui/core/styles/createTypography';
import { i18n } from '@lingui/core';
import ButtonAnimation from '../ButtonAnimation';

export const TypographyComponent_Variants = [
    'header',
    'title',
    'subtitle',
    'body',
    'body_bold',
    'caption',
    'button',
] as const;
export type T_TypographyComponent_Variants = typeof TypographyComponent_Variants[number];

const getMappedVariant = (variant: string): Variant => {
    switch (variant) {
        case 'header':
            return 'h4';
        case 'title':
            return 'subtitle1';
        case 'body_bold':
            return 'subtitle2';
        case 'body':
            return 'body2';
        case 'body1':
            return 'body1';
        case 'caption':
            return 'caption';
        case 'button':
            return 'button';
        default:
            return 'body1';
    }
};

export interface I_TypographyComponent_Props {
    children: string | JSX.Element;
    variant?: T_TypographyComponent_Variants;
    onClick?: () => void;
    withAnimation?: boolean; // default with animation if onClick is available
}

const TypographyComponent = (props: I_TypographyComponent_Props): JSX.Element => {
    const params: ComponentProps<typeof Typography> = {};
    if (props.onClick) useMemo(() => (params.onClick = props.onClick), [props.onClick]);
    params.variant = useMemo(() => getMappedVariant(props.variant ?? 'body'), [props.variant]);

    const _withAnimation = useMemo(() => props.withAnimation !== false && props.onClick !== undefined, [
        props.withAnimation,
        props.onClick,
    ]);

    return (
        <ButtonAnimation withAnimation={_withAnimation}>
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
