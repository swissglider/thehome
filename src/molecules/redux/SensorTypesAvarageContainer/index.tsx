import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, Grid, makeStyles } from '@material-ui/core';

import { T_IconComponent_Size } from '../../../atoms/base/IconComponent';
import { T_TypographyComponent_Variant } from '../../../atoms/base/TypographyComponent';
import CountedIcon from '../../../atoms/redux/CountedIcon';
import CountedValueText from '../../../atoms/enhanced/CountedValueText';

import { T_CountMethod } from '../../../hooks/CountingHooks';

// use redux
import { ACTION_IOBROKER_UPDATE_STATE } from '../../../features/ioBrokerStates/actions';
import { selectStatesByMemberList } from '../../../features/ioBrokerStates/selectors';
import { BALCK_LIST_SENSOREN } from '../../../configuration/Sensoren';
import IOBBlindControl from '../IOBBlindControl';
import { I_Type_Params, useFunctionFullType } from '../../../hooks/IOBObjectHools';

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

const SensorTypesAvarageContainer_ = (props: I_SimpleDevicesAvarageContainer_Props): JSX.Element | null => {
    const classes = useStyles();
    const selectNumOfTodosWithIsDone = useMemo(selectStatesByMemberList, []);
    const allValues = useSelector((state: any) => selectNumOfTodosWithIsDone(state, props.membersStateList ?? []));
    const dispatch = useDispatch();
    const presentationMode = props.presentationMode ?? 'standard';
    const iobObjectCommon: I_Type_Params = useFunctionFullType(props.functionTypeID ?? '');

    // TODO:
    // - onClick for blind control
    // - setNewPosition for blind control
    // - stories for more than one sensor

    if (BALCK_LIST_SENSOREN.includes(props.functionTypeID)) return null;

    const countMethod = ['boolean', 'switch'].includes(iobObjectCommon?.type ?? '') ? 'max' : 'av';

    const val = useMemo(() => {
        if (presentationMode === 'locationOverview') {
            // const changeState = (value: any) => {
            //     for (const id of props.membersStateList) {
            //         dispatch(ACTION_IOBROKER_UPDATE_STATE(id, !value));
            //     }
            // };

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
            if (iobObjectCommon?.type === 'number') {
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
            } else if (props.functionTypeID === 'enum.functions.blinds') {
                return (
                    <IOBBlindControl
                        membersStateList={props.membersStateList}
                        size={props.size ?? 'xsmall'}
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
