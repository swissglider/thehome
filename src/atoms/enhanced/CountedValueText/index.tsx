import React, { ComponentProps } from 'react';
import { T_CountMethod, useGetCountedValue } from '../../../hooks/CountingHooks';
import ValueUnitText from '../ValueUnitText';

export interface I_AvarageText_Props extends Omit<ComponentProps<typeof ValueUnitText>, 'value'> {
    allValues: any[];
    countMethod: T_CountMethod;
    type?: string;
}

const CountedValueText = (props: I_AvarageText_Props): JSX.Element => {
    const { allValues, countMethod, type, ...args } = { ...props };
    const value = useGetCountedValue(allValues, countMethod, type);

    return <ValueUnitText {...args} value={value.toString()} />;
};

export default CountedValueText;
