import React from 'react';
import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selector_getDisplayName } from '../../../../features/ioBrokerObjects/selectors';
import { selector_getStateByID } from '../../../../features/ioBrokerStates/selectors';
import { selector_getFunctionTypes } from '../../../../features/servConn/selectors';
import { I_FunctionTypes, I_Type_Params } from '../../../../features/servConn/slice';
import { I_Container_Props } from '../PlaceOverviewContainer';
import { ACTION_IOBROKER_UPDATE_STATE } from '../../../../features/ioBrokerStates/actions';
import ChartTest from './components/ChartTest';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const StandardDeviceOverview = (props: I_Container_Props): JSX.Element | null => {
    const classes = useStyles();
    if (props.functionType !== undefined && props.deviceID !== undefined) {
        const dispatch = useDispatch();
        const functionTypes: I_FunctionTypes = useSelector(selector_getFunctionTypes());
        const functionType: I_Type_Params = functionTypes[props.functionType];
        const state = useSelector(selector_getStateByID(props.deviceID));
        // const obj = useSelector(selector_getIOBObjectByID(props.deviceID));
        const stateName = useSelector(selector_getDisplayName(props.deviceID));
        const functionName = useSelector(selector_getDisplayName(props.functionType));
        const icon =
            state.val !== undefined && typeof state.val === 'boolean'
                ? state.val === true
                    ? functionType.icon_true
                    : functionType.icon_false
                : functionType.icon;
        const changeState =
            state.val !== undefined && typeof state.val === 'boolean' && functionType.write === true
                ? (value: boolean) => {
                      dispatch(ACTION_IOBROKER_UPDATE_STATE(props.deviceID as string, !value));
                  }
                : () => {
                      return;
                  };
        // console.log(props, functionType, state, obj);

        return (
            <div>
                <ChartTest
                    deviceID={props.deviceID}
                    valueType={functionType.type ?? 'number'}
                    functionName={functionName ?? ''}
                    deviceName={stateName ?? ''}
                    unit={functionType.unit ?? ''}
                    lastValue={state.val}
                    functionColor={
                        functionType.color === undefined || functionType.color === false
                            ? undefined
                            : (functionType.color as string)
                    }
                    lastUpdate={state.lc}
                    addComponent={
                        <Avatar
                            src={icon}
                            onClick={() => {
                                changeState(state.val);
                            }}
                        />
                    }
                />
            </div>
        );
    } else {
        return null;
    }
};

export default StandardDeviceOverview;
