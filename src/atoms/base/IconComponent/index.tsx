import React, { ComponentProps } from 'react';
import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import ButtonAnimation from '../ButtonAnimation';

export const IconComponent_Size = ['root', 'small', 'large', 'open'] as const;
type T_IconComponent_Size = typeof IconComponent_Size[number];

export const IconComponent_Variant = ['square', 'circle', 'circular', 'rounded'] as const;
type T_IconComponent_Variant = typeof IconComponent_Variant[number];

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

export interface I_IconComponent_Props {
    icon: string;
    onClick?: () => void;
    variants?: T_IconComponent_Variant;
    sizes?: string;
    srcSet?: string;
    size?: T_IconComponent_Size;
}

const IconComponent = (props: I_IconComponent_Props): JSX.Element => {
    const classes = useStyles();
    const params: ComponentProps<typeof Avatar> = {};
    params.src = props.icon;
    if (props.onClick) params.onClick = props.onClick;
    params.variant = props.variants ?? 'square';
    if (props.sizes) params.sizes = props.sizes;
    if (props.srcSet) params.srcSet = props.srcSet;
    params.className = classes[props.size ?? 'root'];

    return (
        <ButtonAnimation withAnimation={params.onClick !== undefined}>
            <Avatar {...params} />
        </ButtonAnimation>
    );
};

export default IconComponent;
