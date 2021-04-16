import React, { ComponentProps } from 'react';
import TypographyComponent from '../TypographyComponent';

export interface I_ValueUnitText_Props extends Omit<ComponentProps<typeof TypographyComponent>, 'children'> {
    value: string;
    unit?: string;
    withUnit?: boolean;
    spaceBeforeUnit?: boolean;
}

const ValueUnitText = (props: I_ValueUnitText_Props): JSX.Element => {
    const { value, unit, withUnit, noWrap, spaceBeforeUnit, ...args } = { ...props };
    const children = `${value}${spaceBeforeUnit ? ' ' : ''}${unit && (withUnit ?? true) ? unit : ''}`;

    return <TypographyComponent {...args}>{children}</TypographyComponent>;
};

export default ValueUnitText;
