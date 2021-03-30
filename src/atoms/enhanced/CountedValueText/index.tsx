import React from 'react';
import { T_CountMethod, useGetCountedValue } from '../../../hooks/CountingHooks';
import { T_TypographyComponent_Variants } from '../../base/TypographyComponent';
import ValueUnitText from '../ValueUnitText';

export interface I_AvarageText_Props {
    allValues: any[];
    countMethod: T_CountMethod;
    type?: string;
    unit?: string;
    withUnit?: boolean;
    onClick?: () => void;
    variant?: T_TypographyComponent_Variants;
    noWrap?: boolean;
    spaceBeforeUnit?: boolean;
}

const CountedValueText = (props: I_AvarageText_Props): JSX.Element => {
    const { allValues, countMethod, type, ...args } = { ...props };
    const value = useGetCountedValue(allValues, countMethod, type);

    return <ValueUnitText {...args} value={value.toString()} />;
};

export default CountedValueText;
