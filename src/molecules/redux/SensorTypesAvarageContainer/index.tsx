import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, Grid, makeStyles } from '@material-ui/core';

import { T_IconComponent_Size } from '../../../atoms/base/IconComponent';
import { T_TypographyComponent_Variants } from '../../../atoms/base/TypographyComponent';
import CountedIcon from '../../../atoms/enhanced/CountedIcon';
import CountedValueText from '../../../atoms/enhanced/CountedValueText';
import BlindControl from '../../../atoms/enhanced/BlindControls';

import { T_CountMethod } from '../../../hooks/CountingHooks';

// use redux
import { ACTION_IOBROKER_UPDATE_STATE } from '../../../features/ioBrokerStates/actions';
import { selectStatesByMemberList } from '../../../features/ioBrokerStates/selectors';
import { I_Type_Params } from '../../../features/servConn/slice';
import { BALCK_LIST_SENSOREN } from '../../../configuration/Sensoren';
import { selector_getFunctionTypeByID } from '../../../features/servConn/selectors';

const useStyles = makeStyles(() =>
    createStyles({
        iconBackground: {
            opacity: 0.7,
        },
    }),
);

export interface I_SimpleDevicesAvarageContainer_Props {
    membersStateList: string[];
    functionTypeID: string;
    onClick?: () => void;
    size?: T_IconComponent_Size; // size for all controlls with icons
    variant?: T_TypographyComponent_Variants; // size for all controlls with text/numbers
    withPosition?: boolean; // only for blinds to show the position on the blind control
    presentationMode?: 'standard' | 'locationOverview';
}

const SensorTypesAvarageContainer_ = (props: I_SimpleDevicesAvarageContainer_Props): JSX.Element | null => {
    const classes = useStyles();
    const selectNumOfTodosWithIsDone = useMemo(selectStatesByMemberList, []);
    const allValues = useSelector((state: any) => selectNumOfTodosWithIsDone(state, props.membersStateList ?? []));
    const dispatch = useDispatch();
    const presentationMode = props.presentationMode ?? 'standard';
    const iobObjectCommon: I_Type_Params = useSelector(selector_getFunctionTypeByID(props.functionTypeID ?? ''));

    // TODO:
    // - onClick for blind control
    // - setNewPosition for blind control
    // - stories for more than one sensor

    if (BALCK_LIST_SENSOREN.includes(props.functionTypeID)) return null;

    const val = useMemo(() => {
        if (presentationMode === 'locationOverview') {
            // const changeState = (value: any) => {
            //     for (const id of props.membersStateList) {
            //         dispatch(ACTION_IOBROKER_UPDATE_STATE(id, !value));
            //     }
            // };

            const args_ = {
                allValues: allValues,
                countMethod: 'av' as T_CountMethod,
                size: props.size,
                withAnimation: false,
                getIcon: (value: any): string => {
                    if (props.functionTypeID === 'enum.functions.temp') {
                        return value <= 10
                            ? iobObjectCommon?.icon_cold
                            : value > 10 && value < 25
                            ? iobObjectCommon?.icon_warm
                            : iobObjectCommon?.icon_hot;
                    } else {
                        if (typeof value !== 'number') return iobObjectCommon?.icon ?? '';
                        return value === 0
                            ? iobObjectCommon?.icon_false ?? iobObjectCommon?.icon ?? ''
                            : iobObjectCommon?.icon_true ?? iobObjectCommon?.icon ?? '';
                    }
                },
                onClick: props.onClick,
            };
            const unit = iobObjectCommon?.unit ?? '';
            return (
                <>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item className={classes.iconBackground}>
                            <CountedIcon {...args_} />
                        </Grid>
                        {iobObjectCommon?.type === 'number' && (
                            <Grid item>
                                <CountedValueText
                                    onClick={props.onClick}
                                    allValues={allValues}
                                    type={iobObjectCommon?.type}
                                    unit={unit}
                                    countMethod="av"
                                    variant="caption"
                                    withAnimation={false}
                                />
                            </Grid>
                        )}
                    </Grid>
                </>
            );
        }
        if (presentationMode === 'standard') {
            if (iobObjectCommon?.type === 'number') {
                // numbers
                const unit = iobObjectCommon?.unit ?? '';
                return (
                    <CountedValueText
                        onClick={props.onClick}
                        allValues={allValues}
                        type={iobObjectCommon?.type}
                        unit={unit}
                        countMethod="av"
                        variant={props.variant}
                        withAnimation={false}
                    />
                );
            } else if (iobObjectCommon?.type === 'boolean') {
                // switch && boolean

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
                        if (typeof value !== 'number') return iobObjectCommon?.icon ?? '';
                        return value === 0
                            ? iobObjectCommon?.icon_false ?? iobObjectCommon?.icon ?? ''
                            : iobObjectCommon?.icon_true ?? iobObjectCommon?.icon ?? '';
                    },
                    onClick: iobObjectCommon?.write === true ? changeState : props.onClick,
                };
                return <CountedIcon {...args_} />;
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
                        withPosition={props.withPosition ?? true}
                    />
                );
            }
        }
        // others
        console.log(iobObjectCommon?.type, allValues, presentationMode);
        return <div>??</div>;
    }, [JSON.stringify(allValues)]);

    return val;
};

const SensorTypesAvarageContainer = React.memo(SensorTypesAvarageContainer_);

export default SensorTypesAvarageContainer;
