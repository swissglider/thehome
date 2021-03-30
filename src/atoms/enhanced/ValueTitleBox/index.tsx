import React, { ComponentProps } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Hex2rgbaConverter from '../../../utils/Hex2rgbaConverter';
import TypographyComponent from '../../base/TypographyComponent';
import ButtonAnimation from '../../base/ButtonAnimation';
import IconComponent, { T_IconComponent_Size, T_IconComponent_Variant } from '../../base/IconComponent';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        withDecoration: {
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
        withOutDecoration: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
        },
    }),
);

export interface I_ValueTitleBox_Props extends Omit<ComponentProps<typeof ButtonAnimation>, 'children'> {
    title?: string;
    value?: string | JSX.Element;
    icon?: string;
    size?: T_IconComponent_Size; // for icon only
    variants?: T_IconComponent_Variant; // for icon only
    color?: string;
    onClick?: () => void;
    withColor?: boolean;
    withoutDecoration?: boolean;
    valueBold?: boolean;
}

const ValueTitleBox = ({
    title,
    icon,
    size,
    variants,
    value,
    color,
    onClick,
    withColor,
    withoutDecoration,
    withAnimation,
    valueBold,
}: I_ValueTitleBox_Props): JSX.Element | null => {
    const classes = useStyles({ color: withColor === undefined || withColor ? color : '#FFFFFF' });
    const withClickParam = onClick ? { onClick: onClick } : {};
    const decorationParams =
        withoutDecoration === true ? { className: classes.withOutDecoration } : { className: classes.withDecoration };

    const _withAnimation = withAnimation !== false && onClick !== undefined;

    return (
        <ButtonAnimation withAnimation={_withAnimation}>
            <div {...decorationParams} {...withClickParam}>
                {title && (
                    <TypographyComponent variant="title" withAnimation={false}>
                        {title}
                    </TypographyComponent>
                )}
                {value &&
                    (typeof value === 'string' ? (
                        <TypographyComponent variant={valueBold ? 'body_bold' : 'body'} withAnimation={false}>
                            {value}
                        </TypographyComponent>
                    ) : (
                        React.cloneElement(value, { withAnimation: false, variant: valueBold ? 'body_bold' : 'body' })
                    ))}
                {icon && <IconComponent icon={icon} withAnimation={false} size={size} variants={variants} />}
            </div>
        </ButtonAnimation>
    );
};

export default ValueTitleBox;
