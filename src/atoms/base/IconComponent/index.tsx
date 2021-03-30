import React, { ComponentProps } from 'react';
import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import ButtonAnimation from '../ButtonAnimation';

export const IconComponent_Size = ['root', 'small', 'large', 'open'] as const;
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

const GetButtonAnimation = ({ children }: { children: JSX.Element }): JSX.Element => (
    <ButtonAnimation withAnimation={true}>{children}</ButtonAnimation>
);

const GetWithoutButtonAnimation = ({ children }: { children: JSX.Element }): JSX.Element => <>{children}</>;

export interface I_IconComponent_Props
    extends Omit<ComponentProps<typeof ButtonAnimation>, 'children'>,
        Omit<ComponentProps<typeof Avatar>, 'children'> {
    icon: string;
    onClick?: () => void;
    variants?: T_IconComponent_Variant;
    size?: T_IconComponent_Size;
}

const IconComponent = (props: I_IconComponent_Props): JSX.Element => {
    const classes = useStyles();

    const { variants, withAnimation, ...avatarProps } = { ...props };
    avatarProps.variant = props.variants ?? 'square';
    avatarProps.className = classes[props.size ?? 'root'];
    avatarProps.src = props.icon;

    const _withAnimation = withAnimation !== false && props.onClick !== undefined;

    const ButtonAnimation_ = _withAnimation ? GetButtonAnimation : GetWithoutButtonAnimation;

    return (
        <ButtonAnimation_>
            <Avatar {...avatarProps} />
        </ButtonAnimation_>
    );
};

export default IconComponent;
