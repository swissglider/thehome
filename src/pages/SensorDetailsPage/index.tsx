import React, { ComponentProps, useEffect, useMemo, useState } from 'react';
import { selector_getDisplayName } from '../../features/ioBrokerObjects/selectors';
import { useSingleChartDataCalculator } from '../../hooks/SingleChartDataCalculator';
import NumberChart from '../../atoms/enhanced/NumberChart';
import SimpleValuesTitleBox from '../../molecules/base/SimpleValuesTitleBox';
import ValueTitleBox from '../../molecules/base/ValueTitleBox';
import { C_DEFAULT_DURATION, T_DURATION } from '../../utils/DurationHelper';
import TimeLengthSelect from '../../molecules/base/TimeLengthSelect';
import SimpleButton from '../../molecules/base/SimpleButton';
import SensorDetailsTemplate from '../../templates/SensorDetailsTemplate';
import { selector_getFunctionTypeByID } from '../../features/servConn/selectors';
import { useSelector } from 'react-redux';
import { CurrentBox, LastChangeBox, SensorIconBox, TimeStampBox } from './subBoxes';
import { useGetHomeArrayFromLocation } from '../../hooks/HomeContainerHooks';

const SensorDetailsPage = (): JSX.Element | null => {
    const pathArray = useGetHomeArrayFromLocation();
    if (pathArray === undefined) return null;

    const functionTypeID = pathArray[pathArray.length - 1];
    if (functionTypeID === undefined || !functionTypeID.startsWith('enum.functions.')) return null;
    const deviceID = pathArray[pathArray.length - 2];
    if (deviceID === undefined || deviceID.startsWith('enum.')) return null;
    const [duration, setDuration] = useState<T_DURATION>(C_DEFAULT_DURATION);
    const functionType_ = useSelector(selector_getFunctionTypeByID(functionTypeID));
    if (functionType_ === undefined || functionType_.functionID === undefined) return null;

    const functionType = useMemo(() => {
        const tempFT = { ...functionType_ };
        if (typeof tempFT.color === 'boolean') delete tempFT.color;
        return tempFT;
    }, [functionType_]);
    const color = useMemo(
        () => (functionType?.color && typeof functionType?.color === 'string' ? functionType?.color : undefined),
        [functionType.color],
    );
    const unit = useMemo(() => functionType?.unit ?? '', [functionType?.unit]);
    const valueType = useMemo(() => functionType?.type ?? 'number', [functionType.type]);
    const functionName = useSelector(selector_getDisplayName(functionType.functionID ?? ''));
    const deviceName = useSelector(selector_getDisplayName(deviceID));

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
    }, [functionTypeID, deviceID]);

    const args: { [key: string]: JSX.Element } = {};

    args.durationSelect = useMemo(
        () => <TimeLengthSelect duration={duration} handleChange={handleTimeSelectChange} />,
        [duration],
    );
    args.refreshButton = useMemo(() => <SimpleButton text={'refresh'} onClick={() => onRefresh()} />, []);
    args.sensorIconBox = useMemo(() => <SensorIconBox deviceID={deviceID} functionType={functionType} />, [
        functionType,
    ]);
    args.currentBox = useMemo(() => <CurrentBox deviceID={deviceID} unit={unit} color={color} />, [color, unit]);
    args.avBox = useMemo(
        () => (
            <SimpleValuesTitleBox
                title="chartOvervewBoxes.avval"
                allValues={allValues}
                unit={unit}
                color={color}
                countMethod="av"
            />
        ),
        [allValues, color, unit],
    );
    args.maxBox = useMemo(
        () => (
            <SimpleValuesTitleBox
                title="chartOvervewBoxes.maxval"
                allValues={allValues}
                unit={unit}
                color={color}
                countMethod="max"
            />
        ),
        [allValues, color, unit],
    );
    args.minBox = useMemo(
        () => (
            <SimpleValuesTitleBox
                title="chartOvervewBoxes.minval"
                allValues={allValues}
                unit={unit}
                color={color}
                countMethod="min"
            />
        ),
        [allValues, color, unit],
    );
    args.timeStampBox = useMemo(() => <TimeStampBox deviceID={deviceID} color={color} />, [color]);
    args.lastUpdateBox = useMemo(() => <LastChangeBox deviceID={deviceID} color={color} />, [color]);
    args.chart = useMemo(
        () => (
            <NumberChart
                data={data}
                color={color ?? ''}
                unit={unit}
                functionName={functionName ?? ''}
                deviceName={deviceName ?? ''}
            />
        ),
        [data, color, unit, functionName, deviceName],
    );
    args.deviceIDBox = <ValueTitleBox value={deviceID} withoutDecoration={true} variant="caption" />;

    return <SensorDetailsTemplate {...((args as unknown) as ComponentProps<typeof SensorDetailsTemplate>)} />;
};

export default SensorDetailsPage;
