import React from 'react';
import { T_CountMethod } from '../../../hooks/CountingHooks';
import ValueTitleBox, { I_ValueTitleBox_Props } from '../ValueTitleBox';

export interface I_SimpleValuesTitleBox_Props {
    title: string;
    allValues: any[];
    unit?: string;
    color?: string;
    countMethod: T_CountMethod;
    onClick?: (countedValue?: string) => void;
}

const SimpleValuesTitleBox = (props: I_SimpleValuesTitleBox_Props): JSX.Element => {
    const valueTitleBox_Props: I_ValueTitleBox_Props = {
        title: props.title,
        valueWithCountedValueText: {
            allValues: props.allValues,
            countMethod: props.countMethod,
            unit: props.unit,
            withUnit: true,
            spaceBeforeUnit: true,
        },
        color: props.color,
        onClick: props.onClick,
        withColor: true,
        withoutDecoration: false,
        variant: 'body',
    };

    return <ValueTitleBox {...valueTitleBox_Props} />;
};

export default SimpleValuesTitleBox;
