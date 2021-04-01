import React, { ComponentProps, useMemo } from 'react';
import { T_CountMethod, useGetCountedValue } from '../../../hooks/CountingHooks';
import ValueUnitText from '../ValueUnitText';

export interface I_AvarageText_Props extends Omit<ComponentProps<typeof ValueUnitText>, 'value' | 'onClick'> {
    allValues: any[];
    countMethod: T_CountMethod;
    type?: string;
    onClick?: (countedValue: any) => void;
}

const CountedValueText = (props: I_AvarageText_Props): JSX.Element => {
    const { onClick, allValues, countMethod, type, ...args } = { ...props };
    const value = useMemo(() => useGetCountedValue(allValues, countMethod, type), [allValues, countMethod, type]);
    const withClickParam = useMemo(() => (onClick ? { onClick: () => onClick(value) } : {}), [onClick]);

    return (
        <div {...withClickParam}>
            <ValueUnitText {...args} value={value.toString()} />
        </div>
    );
};

export default CountedValueText;
