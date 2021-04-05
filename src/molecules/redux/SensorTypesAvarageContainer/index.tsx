import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconComponent, { T_IconComponent_Size } from '../../../atoms/base/IconComponent';
import { T_TypographyComponent_Variants } from '../../../atoms/base/TypographyComponent';
import CountedIcon from '../../../atoms/enhanced/CountedIcon';
import CountedValueText from '../../../atoms/enhanced/CountedValueText';
import BlindControl from '../../../atoms/enhanced/BlindControls';

import { T_CountMethod } from '../../../hooks/CountingHooks';

// use redux
import { ACTION_IOBROKER_UPDATE_STATE } from '../../../features/ioBrokerStates/actions';
import { selectStatesByMemberList } from '../../../features/ioBrokerStates/selectors';
import { I_Type_Params } from '../../../features/servConn/slice';

export interface I_SimpleDevicesAvarageContainer_Props {
    membersStateList: string[];
    functionTypeID: string;
    onClick?: () => void;
    iobObjectCommon: I_Type_Params;
    size?: T_IconComponent_Size; // size for all controlls with icons
    variant?: T_TypographyComponent_Variants; // size for all controlls with text/numbers
    withPosition?: boolean; // only for blinds to show the position on the blind control
}

const SensorTypesAvarageContainer_ = (props: I_SimpleDevicesAvarageContainer_Props): JSX.Element => {
    const selectNumOfTodosWithIsDone = useMemo(selectStatesByMemberList, []);
    const allValues = useSelector((state: any) => selectNumOfTodosWithIsDone(state, props.membersStateList ?? []));
    const dispatch = useDispatch();

    // TODO:
    // - onClick for blind control
    // - setNewPosition for blind control
    // - stories for more than one sensor

    const val = useMemo(() => {
        if (props.iobObjectCommon.type === 'number') {
            // numbers
            const unit = props.iobObjectCommon.unit ?? '';
            return (
                <CountedValueText
                    onClick={props.onClick}
                    allValues={allValues}
                    type={props.iobObjectCommon.type}
                    unit={unit}
                    countMethod="av"
                    variant={props.variant}
                    withAnimation={false}
                />
            );
        } else if (props.iobObjectCommon.type === 'boolean' && props.iobObjectCommon.write === true) {
            // switch

            const changeState = (value: any) => {
                for (const id of props.membersStateList) {
                    dispatch(ACTION_IOBROKER_UPDATE_STATE(id, !value));
                }
            };

            const args_ = {
                allValues: allValues,
                countMethod: 'av' as T_CountMethod,
                size: props.size,
                withAnimation: false,
                getIcon: (value: any): string => {
                    if (typeof value !== 'number') return props.iobObjectCommon.icon ?? '';
                    return value === 0
                        ? props.iobObjectCommon.icon_false ?? props.iobObjectCommon.icon ?? ''
                        : props.iobObjectCommon.icon_true ?? props.iobObjectCommon.icon ?? '';
                },
                onClick: changeState,
            };
            return <CountedIcon {...args_} />;
        } else if (props.iobObjectCommon.type === 'boolean') {
            // boolean
            const icon = props.iobObjectCommon.icon ?? '';
            return <IconComponent onClick={props.onClick} icon={icon} size={props.size} withAnimation={false} />;
        } else if (props.functionTypeID === 'enum.functions.blinds') {
            // blind
            // console.log(props.states, JSON.parse(props.states));
            const onClick = (command: 'up' | 'stop' | 'down') => console.log(`pressed: ${command}`);
            const setNewPosition = (position: number) => {
                console.log(`new position: ${position}`);
            };
            return (
                <BlindControl
                    onClick={onClick}
                    size={props.size ?? 'xsmall'}
                    setNewPosition={setNewPosition}
                    withPosition={true}
                />
            );
        }
        // others
        console.log(props.iobObjectCommon.type, allValues);
        return <div>??</div>;
    }, [JSON.stringify(allValues)]);

    return val;
};

const SensorTypesAvarageContainer = React.memo(SensorTypesAvarageContainer_);

export default SensorTypesAvarageContainer;
