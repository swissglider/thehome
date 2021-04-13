import React, { ComponentProps, useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import { Variant } from '@material-ui/core/styles/createTypography';
import { i18n } from '@lingui/core';
import BaseDecoration from '../BaseDecoration';

export type T_TypographyComponent_Variant = 'inherit' | 'srOnly' | Variant | undefined;

export interface I_TypographyComponent_Props extends Omit<ComponentProps<typeof Typography>, 'children'> {
    // children: string | JSX.Element;
    children: string;
    onClick?: () => void;
    withAnimation?: boolean; // default with animation if onClick is available
}

const TypographyComponent = (props: I_TypographyComponent_Props): JSX.Element => {
    const { children, withAnimation, ...params } = { ...props };

    const _withAnimation = useMemo(() => withAnimation !== false && props.onClick !== undefined, [
        withAnimation,
        props.onClick,
    ]);

    return (
        <BaseDecoration withAnimation={_withAnimation}>
            <Typography component={'span'} {...params}>
                {typeof props.children === 'string'
                    ? props.children
                        ? i18n._({ id: props.children })
                        : undefined
                    : props.children}
            </Typography>
        </BaseDecoration>
    );
};

export default TypographyComponent;
