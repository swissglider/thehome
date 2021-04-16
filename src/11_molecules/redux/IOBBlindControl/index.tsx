import React from 'react';
import BlindControl, { T_BLIND_COMMANDS } from '../../../10_atoms/enhanced/BlindControls';
import { ACTION_IOBROKER_UPDATE_STATE } from '../../../30_redux/ioBrokerStates/actions';
import { useDispatch } from 'react-redux';
import { T_IconComponent_Size } from '../../../10_atoms/base/IconComponent';
import { I_Type_Params, useFunctionFullType } from '../../../20_hooks/IOBObjectHools';

export interface I_IOBBlindControl_Props {
    membersStateList: string[];
    size?: T_IconComponent_Size;
    withPosition?: boolean;
}

const IOBBlindControl = (props: I_IOBBlindControl_Props): JSX.Element => {
    const dispatch = useDispatch();
    let withPosition = props.withPosition;
    const blindsPosition_iobObjectCommon: I_Type_Params = useFunctionFullType('enum.functions.blinds_position');
    for (const blindCommandID of props.membersStateList) {
        const blindID = blindCommandID.substring(0, blindCommandID.lastIndexOf('.'));
        const blindPositionID = `${blindID}.Position`;
        if (
            blindsPosition_iobObjectCommon.members === undefined ||
            !blindsPosition_iobObjectCommon.members.includes(blindPositionID)
        ) {
            withPosition = false;
        }
    }
    const onClick = (command: T_BLIND_COMMANDS) => {
        for (const id of props.membersStateList) {
            dispatch(ACTION_IOBROKER_UPDATE_STATE(id, command));
        }
    };
    const setNewPosition = (position: number) => {
        if (withPosition === false) return;
        for (const blindCommandID of props.membersStateList) {
            const blindID = blindCommandID.substring(0, blindCommandID.lastIndexOf('.'));
            const blindPositionID = `${blindID}.Position`;
            if (
                blindsPosition_iobObjectCommon.members === undefined ||
                blindsPosition_iobObjectCommon.members.includes(blindPositionID)
            ) {
                dispatch(ACTION_IOBROKER_UPDATE_STATE(blindPositionID, position));
            }
        }
    };
    return (
        <BlindControl
            onClick={onClick}
            size={props.size ?? 'xsmall'}
            setNewPosition={setNewPosition}
            withPosition={withPosition ?? true}
        />
    );
};

export default IOBBlindControl;
