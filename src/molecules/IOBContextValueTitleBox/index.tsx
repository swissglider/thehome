/**
 * The I_IOBContextValueTitleBox_Props is used to show a ValueTitleBox within the context that is set in the router state:
 *  - functionType (this gives us the unit and the color)
 */

import React, { useMemo } from 'react';
import CountedValueText from '../../atoms/enhanced/CountedValueText';
import ValueTitleBox from '../../atoms/enhanced/ValueTitleBox';
import { T_CountMethod } from '../../hooks/CountingHooks';
import { useGetCurrentIOBFunctionType } from '../../hooks/PlaceOverviewHooks';

export interface I_IOBContextValueTitleBox_Props {
    title?: string;
    allValues: any[];
    type: string;
    countMethod: T_CountMethod;
    withUnit?: boolean;
    onClick?: () => void;
    withColor?: boolean;
}

const IOBContextValueTitleBox = ({
    title,
    allValues,
    type,
    countMethod,
    withUnit,
    onClick,
    withColor,
}: I_IOBContextValueTitleBox_Props): JSX.Element | null => {
    const _withUnit = withUnit ?? true;
    const functionType = useGetCurrentIOBFunctionType();
    if (functionType === undefined) return null;
    const color = useMemo(
        () =>
            functionType.color !== undefined && typeof functionType.color === 'string' ? functionType.color : '#8884d8',
        [functionType],
    );
    return (
        <ValueTitleBox
            value={
                <CountedValueText
                    onClick={onClick}
                    allValues={allValues}
                    unit={functionType.unit ?? ''}
                    withUnit={_withUnit}
                    type={type}
                    countMethod={countMethod}
                />
            }
            title={title}
            color={color}
            onClick={onClick}
            withColor={withColor}
        />
    );
};

export default IOBContextValueTitleBox;
