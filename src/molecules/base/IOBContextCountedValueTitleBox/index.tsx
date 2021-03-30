/**
 * The I_IOBContextValueTitleBox_Props is used to show a ValueTitleBox within the context that is set in the router state:
 *  - functionType (this gives us the unit and the color)
 */

import React from 'react';
import CountedValueText from '../../../atoms/enhanced/CountedValueText';
import ValueTitleBox from '../../../atoms/enhanced/ValueTitleBox';
import ValueUnitText from '../../../atoms/enhanced/ValueUnitText';
import { T_CountMethod } from '../../../hooks/CountingHooks';
import { useGetCurrentIOBFunctionType } from '../../../hooks/PlaceOverviewHooks';

export interface I_IOBContextValueTitleBox_Props {
    title?: string;
    allValues?: any[];
    value?: string;
    icon?: string;
    countMethod?: T_CountMethod;
    withUnit?: boolean;
    onClick?: () => void;
    withColor?: boolean;
}

const IOBContextCountedValueTitleBox = ({
    title,
    allValues,
    value,
    icon,
    countMethod,
    withUnit,
    onClick,
    withColor,
}: I_IOBContextValueTitleBox_Props): JSX.Element | null => {
    const functionType = useGetCurrentIOBFunctionType();
    if (functionType === undefined) return null;
    const generalValueParams = { unit: functionType.unit ?? undefined, withUnit: withUnit };
    const valueParams = {
        value:
            allValues !== undefined ? (
                <CountedValueText
                    allValues={allValues ?? []}
                    {...generalValueParams}
                    type={functionType.type ?? undefined}
                    countMethod={countMethod ?? 'av'}
                />
            ) : value !== undefined ? (
                <ValueUnitText value={value ?? ''} {...generalValueParams} />
            ) : undefined,
    };
    const iconParams = { icon: icon !== undefined ? icon : undefined };
    return (
        <ValueTitleBox
            {...valueParams}
            {...iconParams}
            title={title}
            color={functionType.color}
            onClick={onClick}
            withColor={withColor}
        />
    );
};

export default IOBContextCountedValueTitleBox;
