import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import TypographyComponent, { T_TypographyComponent_Variants } from '../../base/TypographyComponent';

const useStyles = makeStyles(() =>
    createStyles({
        noWrap: {
            display: 'flex',
            flexWrap: 'nowrap',
            flexFlow: 'space-between',
        },
    }),
);

export interface I_ValueUnitText_Props {
    value: string | JSX.Element;
    unit?: string;
    withUnit?: boolean;
    onClick?: () => void;
    variant?: T_TypographyComponent_Variants;
    noWrap?: boolean;
    spaceBeforeUnit?: boolean;
}

const ValueUnitText = (props: I_ValueUnitText_Props): JSX.Element => {
    const { value, unit, withUnit, noWrap, spaceBeforeUnit, ...args } = { ...props };
    const _withUnit = withUnit ?? true;
    const classes = useStyles();
    const classesParams = noWrap !== undefined && noWrap === true ? { className: classes.noWrap } : {};
    const spacer = spaceBeforeUnit ? <span>&nbsp;</span> : '';

    return (
        <TypographyComponent {...args}>
            <div {...classesParams}>
                {value}
                {spacer}
                {unit && _withUnit ? unit : ''}
            </div>
        </TypographyComponent>
    );
};

export default ValueUnitText;
