import React, { ComponentProps, useMemo } from 'react';
import { T_CountMethod, useGetCountedValue } from '../../../hooks/CountingHooks';
import ButtonAnimation from '../../base/ButtonAnimation';
import IconComponent from '../../base/IconComponent';

export interface I_CountedIcon_Type extends Omit<ComponentProps<typeof IconComponent>, 'icon' | 'onClick'> {
    allValues: any[];
    countMethod: T_CountMethod;
    type?: string;
    getIcon: (countedValue: any) => string;
    onClick?: (countedValue: any) => void;
}

const CountedIcon = (props: I_CountedIcon_Type): JSX.Element => {
    const { onClick, withAnimation, getIcon, allValues, countMethod, type, ...args } = { ...props };
    const value = useMemo(() => useGetCountedValue(allValues, countMethod, type), [allValues, countMethod, type]);
    const icon = useMemo(() => props.getIcon(value), [value]);
    const _withAnimation = useMemo(() => withAnimation !== false && onClick !== undefined, [withAnimation, onClick]);
    const withClickParam = useMemo(() => (onClick ? { onClick: () => onClick(value) } : {}), [onClick]);
    return (
        <div {...withClickParam}>
            <ButtonAnimation withAnimation={_withAnimation}>
                <IconComponent icon={icon} {...args} withAnimation={false} />
            </ButtonAnimation>
        </div>
    );
};

export default CountedIcon;
