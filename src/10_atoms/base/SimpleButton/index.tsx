import React, { ComponentProps } from 'react';
import { Button } from '@material-ui/core';
import IconComponent, { T_IconComponent_Size } from '../IconComponent';

const getMappedIconSize = (buttonSize: string): T_IconComponent_Size => {
    switch (buttonSize) {
        case 'large':
            return 'small';
        case 'medium':
            return 'bold_xsmall';
        case 'small':
            return 'xsmall';
    }
    return 'bold_xsmall';
};

export interface I_SimpleButton_Props
    extends Omit<ComponentProps<typeof Button>, 'children' | 'startIcon' | 'endIcon'> {
    text: string;
    onClick: () => void;
    startIcon?: string;
    endIcon?: string;
    // color?: 'default' | 'inherit' | 'primary' | 'secondary';
    // disabled?: boolean;
    // disableElevation?: boolean;
    // disableFocusRipple?: boolean;
    // disableRipple?: boolean;
    // endIcon?: JSX.Element;
    // fullWidth?: boolean;
    // size?: 'large' | 'medium' | 'small';
    // startIcon?: JSX.Element;
    // variant?: 'contained' | 'outlined' | 'text';
    // centerRipple?: boolean;
    // focusRipple?: boolean;
    // onFocusVisible?: () => void;
}

const SimpleButton = (props: I_SimpleButton_Props): JSX.Element => {
    const { variant, startIcon, endIcon, ...args } = { ...props };
    const _variant = variant ?? 'outlined';

    const startIconProps = startIcon
        ? { startIcon: <IconComponent icon={startIcon} size={getMappedIconSize(props.size ?? 'medium')} /> }
        : {};
    const endIconProps = endIcon
        ? { endIcon: <IconComponent icon={endIcon} size={getMappedIconSize(props.size ?? 'medium')} /> }
        : {};
    return (
        <>
            <Button {...args} {...startIconProps} {...endIconProps} variant={_variant}>
                {props.text}
            </Button>
        </>
    );
};

export default SimpleButton;
