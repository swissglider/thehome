import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selector_getStateByID } from '../../../features/ioBrokerStates/selectors';
import { I_Type_Params } from '../../../features/servConn/slice';
import { selector_getFunctionTypeByID } from '../../../features/servConn/selectors';
import { useHomeContainer } from '../../../hooks/PlaceOverviewHooks';
import { ACTION_IOBROKER_UPDATE_STATE } from '../../../features/ioBrokerStates/actions';
import ValueTitleBox from '../../../atoms/enhanced/ValueTitleBox';
import IconComponent from '../../../atoms/base/IconComponent';

export const CurrentValueImage = (): JSX.Element | null => {
    const hcPorps = useHomeContainer();
    if (hcPorps.deviceID === undefined || hcPorps.functionType === undefined) return null;

    const state = useSelector(selector_getStateByID(hcPorps.deviceID));
    const functionType: I_Type_Params = useSelector(selector_getFunctionTypeByID(hcPorps.functionType));
    const icon =
        state.val !== undefined && typeof state.val === 'boolean'
            ? state.val === true
                ? functionType.icon_true
                : functionType.icon_false
            : functionType.icon;
    const dispatch = useDispatch();
    const changeState =
        state.val !== undefined && typeof state.val === 'boolean' && functionType.write === true
            ? (value: boolean) => {
                  dispatch(ACTION_IOBROKER_UPDATE_STATE(hcPorps.deviceID as string, !value));
              }
            : () => {
                  return;
              };
    return (
        <ValueTitleBox
            value={
                <IconComponent
                    icon={icon ?? ''}
                    onClick={() => {
                        changeState(state.val);
                    }}
                />
            }
        />
    );
};
