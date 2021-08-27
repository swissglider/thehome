import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, Grid, makeStyles } from '@material-ui/core';

import { T_IconComponent_Size } from '../../../10_atoms/base/IconComponent';
import { T_TypographyComponent_Variant } from '../../../10_atoms/base/TypographyComponent';
import CountedIcon from '../../../10_atoms/redux/CountedIcon';
import CountedValueText from '../../../10_atoms/enhanced/CountedValueText';

import { T_CountMethod } from '../../../20_hooks/CountingHooks';

// use redux
import { ACTION_IOBROKER_UPDATE_STATE } from '../../../30_redux/ioBrokerStates/actions';
import { selectStatesByMemberList } from '../../../30_redux/ioBrokerStates/selectors';
import IOBBlindControl from '../IOBBlindControl';
import { I_Type_Params, useFunctionFullType } from '../../../20_hooks/IOBObjectHooks';
import { selector_getBLACK_LIST_SENSOR_TYPES } from '../../../30_redux/ioBrokerObjects/selectors';

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
    variant?: T_TypographyComponent_Variant; // size for all controlls with text/numbers
    withPosition?: boolean; // only for blinds to show the position on the blind control
    presentationMode?: 'standard' | 'locationOverview';
}

export interface I_SimpleDevicesAvarageContainer_Props_E {
    membersStateList: string[];
    functionTypeID: string;
    onClick?: () => void;
    size?: T_IconComponent_Size; // size for all controlls with icons
    variant?: T_TypographyComponent_Variant; // size for all controlls with text/numbers
    withPosition?: boolean; // only for blinds to show the position on the blind control
    presentationMode: 'standard' | 'locationOverview';
    countMethod: T_CountMethod;
    iobObjectCommon: I_Type_Params;
}

const SensorTypesAvarageContainer_ = (props: I_SimpleDevicesAvarageContainer_Props): JSX.Element | null => {
    // const { presentationMode, countMethod, iobObjectCommon, ...props } = { ...props1 };

    const iobObjectCommon: I_Type_Params = useFunctionFullType(props.functionTypeID ?? '');
    const countMethod = ['boolean', 'switch'].includes(iobObjectCommon?.type ?? '') ? 'max' : 'av';
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectNumOfTodosWithIsDone = useMemo(selectStatesByMemberList, []);
    const allValues = useSelector((state: any) => selectNumOfTodosWithIsDone(state, props.membersStateList ?? []));
    const BLACK_LIST_SENSOR_TYPES = useSelector(selector_getBLACK_LIST_SENSOR_TYPES);

    const val = useMemo(() => {
        if (BLACK_LIST_SENSOR_TYPES.includes(props.functionTypeID)) return null;
        const presentationMode = props.presentationMode ?? 'standard';
        if (presentationMode === 'locationOverview') {
            const args_ = {
                allValues: allValues,
                countMethod: countMethod as T_CountMethod,
                size: props.size,
                withAnimation: false,
                functionTypeID: props.functionTypeID,
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
                                    countMethod={countMethod}
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
            if (props.functionTypeID === 'enum.functions.blinds') {
                return (
                    <IOBBlindControl
                        membersStateList={props.membersStateList}
                        size={props.size ?? 'xsmall'}
                        withPosition={props.withPosition ?? true}
                    />
                );
            } else if (iobObjectCommon?.type === 'number') {
                // numbers
                const unit = iobObjectCommon?.unit ?? '';
                return (
                    <CountedValueText
                        onClick={props.onClick}
                        allValues={allValues}
                        type={iobObjectCommon?.type}
                        unit={unit}
                        countMethod={countMethod}
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
                    countMethod: countMethod as T_CountMethod,
                    size: props.size,
                    withAnimation: false,
                    functionTypeID: props.functionTypeID,
                    onClick: iobObjectCommon?.write === true ? changeState : props.onClick,
                };
                return <CountedIcon {...args_} />;
            }
        }
        // others
        console.log(iobObjectCommon?.type, allValues, presentationMode);
        return <div>??</div>;
    }, [JSON.stringify(allValues), JSON.stringify(BLACK_LIST_SENSOR_TYPES)]);
    return val;
};

const SensorTypesAvarageContainer = React.memo(SensorTypesAvarageContainer_);

export default SensorTypesAvarageContainer;
