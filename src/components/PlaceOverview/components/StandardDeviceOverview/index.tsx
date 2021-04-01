import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useGetCurrentIOBFunctionType } from '../../../../hooks/PlaceOverviewHooks';
import { selector_getDisplayName } from '../../../../features/ioBrokerObjects/selectors';
import { useSingleChartDataCalculator } from '../../../Charts/hooks/SingleChartDataCalculator';
import { useDispatch, useSelector } from 'react-redux';
import NumberChart from '../../../../atoms/enhanced/NumberChart';
import { I_Container_Props } from '../PlaceOverviewContainer';
import { selector_getStateByID } from '../../../../features/ioBrokerStates/selectors';
import moment from 'moment';
import SimpleValuesTitleBox from '../../../../molecules/base/SimpleValuesTitleBox';
import SimpleValueTitleBox from '../../../../molecules/base/SimpleValueTitleBox';
import { ACTION_IOBROKER_UPDATE_STATE } from '../../../../features/ioBrokerStates/actions';
import ValueTitleBox from '../../../../molecules/base/ValueTitleBox';
import { C_DEFAULT_DURATION, T_DURATION } from '../../../../utils/TimeHelper';
import TimeLengthSelect from '../../../../molecules/base/TimeLengthSelect';
import SimpleButton from '../../../../molecules/base/SimpleButton';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        node: {
            margin: theme.spacing(0.5),
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        },
        buttonRoot: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-evenly',
            margin: theme.spacing(0.5),
        },
        deviceID: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-around',
        },
    }),
);

const StandardDeviceOverview = ({ deviceID }: I_Container_Props): JSX.Element | null => {
    if (deviceID === undefined) return null;
    const [duration, setDuration] = React.useState<T_DURATION>(C_DEFAULT_DURATION);
    const functionType = useGetCurrentIOBFunctionType();
    if (functionType === undefined || functionType.functionID === undefined) return null;
    const color = functionType?.color && typeof functionType?.color === 'string' ? functionType?.color : undefined;
    const unit = functionType?.unit ?? '';
    const valueType = functionType?.type ?? 'number';
    const classes = useStyles({ color: color });
    const functionName = useSelector(selector_getDisplayName(functionType.functionID)) ?? '';
    const deviceName = useSelector(selector_getDisplayName(deviceID));
    const currentState = useSelector(selector_getStateByID(deviceID));
    const timeStamp = moment(currentState.ts).locale('de-ch').format('lll');
    const lastChange = moment(currentState.lc).locale('de-ch').format('lll');

    const icon =
        currentState.val !== undefined && typeof currentState.val === 'boolean'
            ? currentState.val === true
                ? functionType.icon_true
                : functionType.icon_false
            : functionType.icon;

    const dispatch = useDispatch();
    const changeState =
        currentState.val !== undefined && typeof currentState.val === 'boolean' && functionType.write === true
            ? (value: boolean) => {
                  dispatch(ACTION_IOBROKER_UPDATE_STATE(deviceID as string, !value));
              }
            : () => {
                  return;
              };

    const { data, allValues, calcHistory } = useSingleChartDataCalculator(deviceID, valueType);

    const handleTimeSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDuration(event.target.value as T_DURATION);
        calcHistory(event.target.value as T_DURATION);
    };

    const onRefresh = () => {
        calcHistory(duration);
    };

    useEffect(() => {
        calcHistory(C_DEFAULT_DURATION);
    }, []);

    return (
        <div>
            <div className={classes.buttonRoot}>
                <TimeLengthSelect duration={duration} handleChange={handleTimeSelectChange} />
                <SimpleButton text={'refresh'} onClick={() => onRefresh()} />
                <ValueTitleBox
                    valueWithIcon={{ icon: icon ?? '' }}
                    onClick={() => {
                        changeState(currentState.val);
                    }}
                    withoutDecoration={true}
                    withAnimation={false}
                />
            </div>
            <div className={classes.buttonRoot}>
                <SimpleValueTitleBox
                    title="chartOvervewBoxes.lastval"
                    value={currentState.val.toString()}
                    unit={unit}
                    color={color}
                />
                {valueType === 'number' && (
                    <>
                        <SimpleValuesTitleBox
                            title="chartOvervewBoxes.avval"
                            allValues={allValues}
                            unit={unit}
                            color={color}
                            countMethod="av"
                        />
                        <SimpleValuesTitleBox
                            title="chartOvervewBoxes.maxval"
                            allValues={allValues}
                            unit={unit}
                            color={color}
                            countMethod="max"
                        />
                        <SimpleValuesTitleBox
                            title="chartOvervewBoxes.minval"
                            allValues={allValues}
                            unit={unit}
                            color={color}
                            countMethod="min"
                        />
                    </>
                )}
            </div>
            <div className={classes.node}>
                <NumberChart
                    data={data}
                    color={color ?? ''}
                    unit={unit}
                    functionName={functionName}
                    deviceName={deviceName ?? ''}
                />
            </div>
            <div className={classes.buttonRoot}>
                <SimpleValueTitleBox title="chartOvervewBoxes.timestamp" value={timeStamp.toString()} color={color} />
                <SimpleValueTitleBox title="chartOvervewBoxes.lastupdate" value={lastChange.toString()} color={color} />
            </div>
            <div className={classes.deviceID}>
                <ValueTitleBox value={deviceID} withoutDecoration={true} variant="caption" />
            </div>
        </div>
    );
};

export default StandardDeviceOverview;
