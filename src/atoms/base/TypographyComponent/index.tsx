import React, { ComponentProps } from 'react';
import Typography from '@material-ui/core/Typography';
import { Variant } from '@material-ui/core/styles/createTypography';
import { i18n } from '@lingui/core';
import ButtonAnimation from '../ButtonAnimation';

export const TypographyComponent_Variants = ['header', 'title', 'subtitle', 'body', 'body_bold'] as const;
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
        case 'body_bold':
            return 'body1';
        default:
            return 'body1';
    }
};

const GetButtonAnimation = ({ children }: { children: JSX.Element }): JSX.Element => (
    <ButtonAnimation withAnimation={true}>{children}</ButtonAnimation>
);

const GetWithoutButtonAnimation = ({ children }: { children: JSX.Element }): JSX.Element => <>{children}</>;

export interface I_TypographyComponent_Props {
    children: string | JSX.Element;
    variant?: T_TypographyComponent_Variants;
    onClick?: () => void;
    withAnimation?: boolean; // default with animation if onClick is available
}

const TypographyComponent = (props: I_TypographyComponent_Props): JSX.Element => {
    const params: ComponentProps<typeof Typography> = {};
    if (props.onClick) params.onClick = props.onClick;
    params.variant = getMappedVariant(props.variant ?? 'body');

    // default with animation if onClick is available
    const _withAnimation = props.withAnimation !== false && props.onClick !== undefined;

    const ButtonAnimation_ = _withAnimation ? GetButtonAnimation : GetWithoutButtonAnimation;

    return (
        <ButtonAnimation_>
            <Typography component={'span'} {...params}>
                {typeof props.children === 'string'
                    ? props.children
                        ? i18n._({ id: props.children })
                        : undefined
                    : props.children}
            </Typography>
        </ButtonAnimation_>
    );
};

export default TypographyComponent;
