import React from 'react';
import ValueTitleBox, { I_ValueTitleBox_Props } from '../ValueTitleBox';

export interface I_SimpleValueTitleBox_Props {
    title: string;
    value: string;
    unit?: string;
    color?: string;
    onClick?: () => void;
}

const SimpleValueTitleBox = (props: I_SimpleValueTitleBox_Props): JSX.Element => {
    const valueTitleBox_Props: I_ValueTitleBox_Props = {
        title: props.title,
        valueWithUnit: {
            value: props.value,
            unit: props.unit,
            withUnit: true,
            spaceBeforeUnit: true,
        },
        color: props.color,
        onClick: props.onClick,
        withColor: true,
        withoutDecoration: false,
        variant: 'body2',
    };

    return <ValueTitleBox {...valueTitleBox_Props} />;
};

export default SimpleValueTitleBox;
