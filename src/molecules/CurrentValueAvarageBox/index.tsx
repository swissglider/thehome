/**
 * The CurrentValueChartBox is used to show a ValueTitleBox within the context that is set in the router state:
 *  - deviceID
 */

import React from 'react';
import IOBContextValueTitleBox from '../IOBContextValueTitleBox';

export interface I_CurrentValueAvarageBox_Props {
    allValues: number[];
    type: string;
    onClick?: () => void;
    withTitle?: boolean;
    withDecoration?: boolean;
}

export const CurrentValueAvarageBox = (props: I_CurrentValueAvarageBox_Props): JSX.Element => {
    const _withTitle = props.withTitle ?? true;
    return (
        <IOBContextValueTitleBox
            title={_withTitle ? 'chartOvervewBoxes.avval' : undefined}
            countMethod="av"
            {...props}
        />
    );
};
