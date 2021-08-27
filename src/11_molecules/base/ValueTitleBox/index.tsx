import React, { PropsWithChildren } from 'react';
import { createStyles, Divider, makeStyles, Theme } from '@material-ui/core';
import Hex2rgbaConverter from '../../../21_utils/Hex2rgbaConverter';
import TypographyComponent from '../../../10_atoms/base/TypographyComponent';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(0.5),
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            boxShadow: 'rgba(50,50,93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
            background: ({ color }: { color?: string }) => {
                const _color = color ?? theme.palette.primary.main;
                const color1 = Hex2rgbaConverter(_color, 1);
                const color2 = Hex2rgbaConverter(_color, 20);
                const color3 = Hex2rgbaConverter(_color, 40);
                return `linear-gradient(0deg, ${color1} 0%, ${color2} 35%, ${color3} 100%)`;
            },
            borderRadius: theme.spacing(0.8),
        },
        devider: {
            height: theme.spacing(0.2),
            marginTop: -4,
        },
    }),
);

export interface I_ValueTitleBox_Props {
    title: string;
    color?: string;
}

const ValueTitleBox = (props: PropsWithChildren<I_ValueTitleBox_Props>): JSX.Element | null => {
    const classes = useStyles({ color: props.color });

    return (
        <div className={classes.root}>
            <TypographyComponent variant="subtitle1">{props.title}</TypographyComponent>
            <Divider className={classes.devider} flexItem light={true} />
            {props.children}
        </div>
    );
};

export default ValueTitleBox;
