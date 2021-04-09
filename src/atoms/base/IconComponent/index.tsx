import React, { ComponentProps, useMemo } from 'react';
import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import ButtonAnimation from '../ButtonAnimation';

export const IconComponent_Size = [
    'root',
    'xsmall',
    'small',
    'large',
    'open',
    'bold_xsmall',
    'xlarge',
    'medium',
] as const;
export type T_IconComponent_Size = typeof IconComponent_Size[number];

export const IconComponent_Variant = ['square', 'circular', 'rounded'] as const;
export type T_IconComponent_Variant = typeof IconComponent_Variant[number];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        open: {
            width: '100%',
            height: '100%',
            textAlign: 'center',
        },
        root1: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
            textAlign: 'center',
        },
        root: {
            width: theme.spacing(4),
            height: theme.spacing(4),
            textAlign: 'center',
        },
        xsmall: {
            width: theme.spacing(2),
            height: theme.spacing(2),
            textAlign: 'center',
        },
        bold_xsmall: {
            width: theme.spacing(2.5),
            height: theme.spacing(2.5),
            textAlign: 'center',
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            textAlign: 'center',
        },
        medium: {
            width: theme.spacing(5),
            height: theme.spacing(5),
            textAlign: 'center',
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
            minHeight: theme.spacing(7),
            minWidth: theme.spacing(7),
            maxHeight: theme.spacing(7),
            maxWidth: theme.spacing(7),
            textAlign: 'center',
        },
        xlarge: {
            width: theme.spacing(10),
            height: theme.spacing(10),
            minHeight: theme.spacing(10),
            minWidth: theme.spacing(10),
            maxHeight: theme.spacing(10),
            maxWidth: theme.spacing(10),
            textAlign: 'center',
        },
        image: {
            // height: '100%',
            // width: '100%',
            // minHeight: '100%',
            // minWidth: '100%',
            // maxHeight: '100%',
            // maxWidth: '100%',
            // margin: 'auto',
            // display: 'block',
            // objectFit: 'contain',
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
            <>
                <Avatar {...avatarProps} />
                {/* <div className={avatarProps.className} onClick={avatarProps.onClick}>
                    <CardMedia className={classes.image} component="img" src={avatarProps.src} />{' '}
                </div> */}
            </>
        </ButtonAnimation>
    );
};

export default IconComponent;
