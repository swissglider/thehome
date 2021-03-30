/**
 * The CurrentValueChartBox is used to show a ValueTitleBox within the context that is set in the router state:
 *  - deviceID
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { selector_getStateByID } from '../../features/ioBrokerStates/selectors';
import { useHomeContainer } from '../../hooks/PlaceOverviewHooks';
import IOBContextValueTitleBox from '../IOBContextValueTitleBox';

export const CurrentValueChartBox = (): JSX.Element | null => {
    const hcPorps = useHomeContainer();
    if (hcPorps.deviceID === undefined || hcPorps.functionType === undefined) return null;

    const state = useSelector(selector_getStateByID(hcPorps.deviceID));
    return (
        <IOBContextValueTitleBox
            title="chartOvervewBoxes.lastval"
            allValues={[state.val.toString()]}
            countMethod="first"
            type="string"
        />
    );
};
