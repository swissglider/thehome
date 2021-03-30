/**
 * The I_IOBContextValueTitleBox_Props is used to show a ValueTitleBox within the context that is set in the router state:
 *  - functionType (this gives us the unit and the color)
 */
import React from 'react';
import ValueTitleBox from '../../../atoms/enhanced/ValueTitleBox';
import ValueUnitText from '../../../atoms/enhanced/ValueUnitText';
import { useGetCurrentIOBFunctionType } from '../../../hooks/PlaceOverviewHooks';

export interface I_IOBContextValueTitleBox_Props {
    title?: string;
    value: string;
    withUnit?: boolean;
    onClick?: () => void;
    withColor?: boolean;
    withoutDecoration?: boolean;
}

const IOBContextCountedValueTitleBox = ({
    title,
    value,
    withUnit,
    onClick,
    withColor,
    withoutDecoration,
}: I_IOBContextValueTitleBox_Props): JSX.Element | null => {
    const functionType = useGetCurrentIOBFunctionType();
    if (functionType === undefined) return null;
    const generalValueParams = { unit: functionType.unit ?? undefined, withUnit: withUnit };
    if (withoutDecoration)
        return (
            <ValueTitleBox
                value={<ValueUnitText value={value ?? ''} {...generalValueParams} />}
                title={title}
                color={functionType.color}
                onClick={onClick}
                withColor={withColor}
            />
        );
    return (
        <ValueTitleBox
            value={<ValueUnitText value={value ?? ''} {...generalValueParams} />}
            title={title}
            color={functionType.color}
            onClick={onClick}
            withColor={withColor}
        />
    );
};

export default IOBContextCountedValueTitleBox;
