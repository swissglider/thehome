import React, { ComponentProps, useMemo } from 'react';
import { createStyles, Divider, makeStyles, Theme } from '@material-ui/core';
import Hex2rgbaConverter from '../../../utils/Hex2rgbaConverter';
import ButtonAnimation from '../../../atoms/base/ButtonAnimation';
import ValueUnitText from '../../../atoms/enhanced/ValueUnitText';
import IconComponent from '../../../atoms/base/IconComponent';
import CountedValueText from '../../../atoms/enhanced/CountedValueText';
import CountedIcon from '../../../atoms/enhanced/CountedIcon';
import TypographyComponent, { T_TypographyComponent_Variants } from '../../../atoms/base/TypographyComponent';

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
            borderRadius: theme.spacing(0.8),
        },
        withOutDecoration: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
        },
        devider: {
            height: theme.spacing(0.2),
            marginTop: -4,
        },
    }),
);

export interface I_ValueTitleBox_Props extends Omit<ComponentProps<typeof ButtonAnimation>, 'children'> {
    title?: string;
    value?: string;
    valueWithUnit?: Omit<ComponentProps<typeof ValueUnitText>, 'onClick' | 'withAnimation' | 'variant' | 'noWrap'>;
    valueWithIcon?: Omit<ComponentProps<typeof IconComponent>, 'onClick' | 'withAnimation'>;
    valueWithCountedValueText?: Omit<
        ComponentProps<typeof CountedValueText>,
        'onClick' | 'withAnimation' | 'variant' | 'noWrap'
    >;
    valueWithCountedIcon?: Omit<ComponentProps<typeof CountedIcon>, 'onClick' | 'withAnimation'>;
    color?: string;
    onClick?: (value?: string) => void;
    withColor?: boolean;
    withoutDecoration?: boolean;
    variant?: T_TypographyComponent_Variants;
}

const ValueTitleBox = ({
    title,
    value,
    valueWithUnit,
    valueWithIcon,
    valueWithCountedValueText,
    valueWithCountedIcon,
    color,
    onClick,
    withColor,
    withoutDecoration,
    withAnimation,
    variant,
}: I_ValueTitleBox_Props): JSX.Element | null => {
    const _color = useMemo(() => {
        return {
            color: withColor === undefined || withColor ? color : '#FFFFFF',
        };
    }, [withColor, color]);
    const classes = useStyles(_color);
    const withClickParam = useMemo(() => (onClick ? { onClick: onClick } : {}), [onClick]);
    const decorationParams = useMemo(
        () =>
            withoutDecoration === true
                ? { className: classes.withOutDecoration }
                : { className: classes.withDecoration },
        [withoutDecoration],
    );

    const _withAnimation = useMemo(() => withAnimation !== false && onClick !== undefined, [withAnimation, onClick]);

    const animationSubProps = useMemo(() => {
        return { withAnimation: _withAnimation };
    }, [_withAnimation]);
    const variantValueProps = useMemo(() => {
        return { variant: variant ?? ('body' as T_TypographyComponent_Variants) };
    }, [variant]);

    return (
        <ButtonAnimation withAnimation={false}>
            <div {...decorationParams}>
                {title && (
                    <>
                        <TypographyComponent variant="title" {...animationSubProps}>
                            {title}
                        </TypographyComponent>
                        <Divider className={classes.devider} flexItem light={true} />
                    </>
                )}
                {value && (
                    <TypographyComponent {...withClickParam} {...variantValueProps} {...animationSubProps}>
                        {value}
                    </TypographyComponent>
                )}
                {valueWithIcon && <IconComponent {...withClickParam} {...valueWithIcon} {...animationSubProps} />}
                {valueWithUnit && (
                    <ValueUnitText
                        {...withClickParam}
                        {...variantValueProps}
                        {...valueWithUnit}
                        {...animationSubProps}
                    />
                )}
                {valueWithCountedValueText && (
                    <CountedValueText
                        {...withClickParam}
                        {...valueWithCountedValueText}
                        {...variantValueProps}
                        {...animationSubProps}
                    />
                )}
                {valueWithCountedIcon && (
                    <CountedIcon {...valueWithCountedIcon} {...withClickParam} {...animationSubProps} />
                )}
            </div>
        </ButtonAnimation>
    );
};

export default ValueTitleBox;