import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { T_DURATION, C_DEFAULT_DURATION } from '../../../Charts';
import { TimeLengthSelector } from '../../../Charts/components/TimeLengthSelection';
import { CurrentValueImage } from '../../../Charts/components/ChartOverviewBoxes';
import { useGetCurrentIOBFunctionType } from '../../../../hooks/PlaceOverviewHooks';
import { selector_getDisplayName } from '../../../../features/ioBrokerObjects/selectors';
import { useSingleChartDataCalculator } from '../../../Charts/hooks/SingleChartDataCalculator';
import { useSelector } from 'react-redux';
import NumberChart from './components/NumberChart';
import { I_Container_Props } from '../PlaceOverviewContainer';
import IOBContextCountedValueTitleBox from '../../../../molecules/base/IOBContextCountedValueTitleBox';
import { selector_getStateByID } from '../../../../features/ioBrokerStates/selectors';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        node: {
            margin: theme.spacing(0.5),
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            height: '200px',
            width: '100hv',
        },
        buttonRoot: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-evenly',
        },
    }),
);

const StandardDeviceOverview = ({ deviceID }: I_Container_Props): JSX.Element | null => {
    if (deviceID === undefined) return null;
    const [duration, setDuration] = React.useState<T_DURATION>(C_DEFAULT_DURATION);
    const functionType = useGetCurrentIOBFunctionType();
    if (functionType === undefined || functionType.functionID === undefined) return null;
    const color = functionType?.color && typeof functionType?.color === 'string' ? functionType?.color : '#8884d8';
    const unit = functionType?.unit ?? '';
    const valueType = functionType?.type ?? 'number';
    const classes = useStyles({ color: color });
    const functionName = useSelector(selector_getDisplayName(functionType.functionID)) ?? '';
    const deviceName = useSelector(selector_getDisplayName(deviceID));
    const currentState = useSelector(selector_getStateByID(deviceID));
    const timeStamp = moment(currentState.ts).locale('de-ch').format('lll');

    const { data, allVal, calcHistory } = useSingleChartDataCalculator(deviceID, valueType);

    let container: any;
    switch (valueType) {
        case 'number': {
            container = NumberChart;
            break;
        }
        case 'boolean': {
            container = NumberChart;
            break;
        }
        default: {
            container = NumberChart;
        }
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDuration(event.target.value as T_DURATION);
        calcHistory(event.target.value as T_DURATION);
    };

    useEffect(() => {
        calcHistory(C_DEFAULT_DURATION);
    }, []);

    return (
        <div>
            <div className={classes.buttonRoot}>
                <TimeLengthSelector duration={duration} handleChange={handleChange} />
            </div>
            <div className={classes.buttonRoot}>
                <IOBContextCountedValueTitleBox title="chartOvervewBoxes.lastval" value={currentState.val.toString()} />
                {valueType === 'number' && (
                    <>
                        <IOBContextCountedValueTitleBox
                            title="chartOvervewBoxes.avval"
                            countMethod="av"
                            allValues={allVal}
                        />
                        <IOBContextCountedValueTitleBox
                            title="chartOvervewBoxes.maxval"
                            countMethod="max"
                            allValues={allVal}
                        />
                        <IOBContextCountedValueTitleBox
                            title="chartOvervewBoxes.minval"
                            countMethod="min"
                            allValues={allVal}
                        />
                    </>
                )}
            </div>
            <div className={classes.node}>
                {React.createElement(container, { data, color, unit, functionName, deviceName })}
            </div>
            <div className={classes.buttonRoot}>
                <IOBContextCountedValueTitleBox
                    title="chartOvervewBoxes.lastupdate"
                    value={timeStamp.toString()}
                    withUnit={false}
                />
                <CurrentValueImage />
            </div>
        </div>
    );
};

export default StandardDeviceOverview;
