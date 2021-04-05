import React, { ComponentProps, useMemo } from 'react';
import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import ButtonAnimation from '../ButtonAnimation';

export const IconComponent_Size = ['root', 'xsmall', 'small', 'large', 'open', 'bold_xsmall'] as const;
export type T_IconComponent_Size = typeof IconComponent_Size[number];

export const IconComponent_Variant = ['square', 'circular', 'rounded'] as const;
export type T_IconComponent_Variant = typeof IconComponent_Variant[number];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        open: {
            width: '100%',
            height: '100%',
        },
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        xsmall: {
            width: theme.spacing(2),
            height: theme.spacing(2),
        },
        bold_xsmall: {
            width: theme.spacing(2.5),
            height: theme.spacing(2.5),
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    }),
);

export interface I_IconComponent_Props
    extends Omit<ComponentProps<typeof ButtonAnimation>, 'children'>,
        Omit<ComponentProps<typeof Avatar>, 'children' | 'variant'> {
    icon: string;
    onClick?: () => void;
    variants?: T_IconComponent_Variant;
    size?: T_IconComponent_Size;
}

const IconComponent = (props: I_IconComponent_Props): JSX.Element => {
    const classes = useStyles();

    const variant = useMemo(() => props.variants ?? 'square', [props.variants]) as T_IconComponent_Variant;
    const { variants, withAnimation, ...avatarProps } = { variant, ...props };
    avatarProps.className = useMemo(() => classes[props.size ?? 'root'], [props.size]);
    avatarProps.src = props.icon;

    const _withAnimation = useMemo(() => withAnimation !== false && props.onClick !== undefined, [
        withAnimation,
        props.onClick,
    ]);

    return (
        <ButtonAnimation withAnimation={_withAnimation}>
            <Avatar {...avatarProps} />
        </ButtonAnimation>
    );
};

export default IconComponent;
