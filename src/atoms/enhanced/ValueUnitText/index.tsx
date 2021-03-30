import React, { ComponentProps } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import TypographyComponent from '../../base/TypographyComponent';

const useStyles = makeStyles(() =>
    createStyles({
        noWrap: {
            display: 'flex',
            flexWrap: 'nowrap',
            flexFlow: 'space-between',
        },
    }),
);

export interface I_ValueUnitText_Props extends Omit<ComponentProps<typeof TypographyComponent>, 'children'> {
    value: string;
    unit?: string;
    withUnit?: boolean;
    noWrap?: boolean;
    spaceBeforeUnit?: boolean;
}

const ValueUnitText = (props: I_ValueUnitText_Props): JSX.Element => {
    const { value, unit, withUnit, noWrap, spaceBeforeUnit, ...args } = { ...props };
    const classesParams = noWrap !== undefined && noWrap === true ? { className: useStyles().noWrap } : {};

    return (
        <TypographyComponent {...args}>
            <div {...classesParams}>
                {value}
                {spaceBeforeUnit ? <span>&nbsp;</span> : ''}
                {unit && (withUnit ?? true) ? unit : ''}
            </div>
        </TypographyComponent>
    );
};

export default ValueUnitText;
