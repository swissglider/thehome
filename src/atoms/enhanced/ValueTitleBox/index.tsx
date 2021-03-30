import React from 'react';
import { ButtonBase, createStyles, makeStyles, Theme } from '@material-ui/core';
import Hex2rgbaConverter from '../../../utils/Hex2rgbaConverter';
import { i18n } from '@lingui/core';
import TypographyComponent from '../../base/TypographyComponent';
import ButtonAnimation from '../../base/ButtonAnimation';

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
        },
    }),
);

export interface I_ValueTitleBox_Props {
    title?: string;
    value: JSX.Element;
    color?: string;
    onClick?: () => void;
    withColor?: boolean;
}

const ValueTitleBox = ({ title, value, color, onClick, withColor }: I_ValueTitleBox_Props): JSX.Element | null => {
    const classes = useStyles({ color: withColor === undefined || withColor ? color : '#FFFFFF' });
    const withClickParam = onClick ? { onClick: onClick } : {};
    return (
        <ButtonAnimation withAnimation={onClick !== undefined}>
            <div className={classes.root} {...withClickParam}>
                {title && <TypographyComponent variant="title">{title}</TypographyComponent>}
                {value}
            </div>
        </ButtonAnimation>
    );
};

export default ValueTitleBox;
