import React, { ComponentProps, useMemo } from 'react';
import { T_CountMethod, useGetCountedValue } from '../../../20_hooks/CountingHooks';
import { I_Type_Params, useFunctionFullType } from '../../../20_hooks/IOBObjectHooks';
import IconComponent from '../../base/IconComponent';

const standardGetIcon = (value: any, iobObjectCommon: I_Type_Params): string => {
    if (typeof value === 'boolean') {
        return value === false
            ? iobObjectCommon?.icon_false ?? iobObjectCommon?.icon ?? ''
            : iobObjectCommon?.icon_true ?? iobObjectCommon?.icon ?? '';
    }
    if (typeof value === 'number') {
        return value === 0
            ? iobObjectCommon?.icon_false ?? iobObjectCommon?.icon ?? ''
            : iobObjectCommon?.icon_true ?? iobObjectCommon?.icon ?? '';
    }
    return iobObjectCommon?.icon ?? '';
};

const generateGetIcon = (value: any, iobObjectCommon: I_Type_Params): string => {
    for (const comparizon of iobObjectCommon.getIcon as { value: any; icon: string; operator: string }[]) {
        switch (comparizon.operator) {
            case '=':
                if (value === comparizon.value) return iobObjectCommon[comparizon.icon];
                break;
            case '!=':
                if (value !== comparizon.value) return iobObjectCommon[comparizon.icon];
                break;
            case '<':
                if (value < comparizon.value) return iobObjectCommon[comparizon.icon];
                break;
            case '>':
                if (value > comparizon.value) return iobObjectCommon[comparizon.icon];
                break;
        }
    }

    return '';
};

export interface I_CountedIcon_Type extends Omit<ComponentProps<typeof IconComponent>, 'icon' | 'onClick'> {
    allValues?: any[];
    value?: any;
    countMethod?: T_CountMethod;
    type?: string;
    getIcon?: (countedValue: any) => string;
    onClick?: (countedValue: any) => void;
    functionTypeID: string;
}

const CountedIcon = (props: I_CountedIcon_Type): JSX.Element => {
    const {
        onClick,
        functionTypeID,
        getIcon: getIcon_,
        value: value_,
        allValues,
        countMethod,
        type: type_,
        ...args
    } = {
        ...props,
    };
    const iobObjectCommon: I_Type_Params = useFunctionFullType(functionTypeID);

    const type = type_ ?? (allValues && allValues.length > 0 ? typeof allValues[0] : undefined);

    const value =
        value_ ??
        useMemo(
            () =>
                useGetCountedValue(
                    allValues ?? [],
                    countMethod ?? (type === 'number' ? 'av' : type === 'boolean' ? 'max' : 'first'),
                    type,
                ),
            [allValues, countMethod, type],
        );
    const getIcon = getIcon_ ?? (iobObjectCommon.getIcon ? generateGetIcon : standardGetIcon);

    const icon = useMemo(() => getIcon(value, iobObjectCommon), [value]);
    const withClickParam = useMemo(() => (onClick ? { onClick: () => onClick(value) } : {}), [onClick]);
    return (
        <div {...withClickParam}>
            <IconComponent icon={icon} {...args} />
        </div>
    );
};

export default CountedIcon;
