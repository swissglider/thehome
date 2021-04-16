import React, { ComponentProps, useEffect, useMemo, useState } from 'react';
import { selector_getDisplayName } from '../../30_redux/ioBrokerObjects/selectors';
import { useSingleChartDataCalculator } from '../../20_hooks/SingleChartDataCalculator';
import NumberChart from '../../10_atoms/enhanced/NumberChart';
import ValueTitleBox from '../../11_molecules/base/ValueTitleBox';
import { C_DEFAULT_DURATION, T_DURATION } from '../../21_utils/DurationHelper';
import TimeLengthSelect from '../../11_molecules/base/TimeLengthSelect';
import SimpleButton from '../../10_atoms/base/SimpleButton';
import SensorDetailsTemplate from '../../13_templates/SensorDetailsTemplate';
import { useSelector } from 'react-redux';
import { CurrentBox, LastChangeBox, SensorIconBox, TimeStampBox } from './subBoxes';
import { useGetHomeArrayFromLocation } from '../../20_hooks/HomeContainerHooks';
import TypographyComponent from '../../10_atoms/base/TypographyComponent';
import CountedValueText from '../../10_atoms/enhanced/CountedValueText';
import { useFunctionFullType } from '../../20_hooks/IOBObjectHools';

const SensorDetailsPage = (): JSX.Element | null => {
    const pathArray = useGetHomeArrayFromLocation();
    if (pathArray === undefined) return null;

    const functionTypeID = pathArray[pathArray.length - 1];
    if (functionTypeID === undefined || !functionTypeID.startsWith('enum.functions.')) return null;
    const deviceID = pathArray[pathArray.length - 2];
    if (deviceID === undefined || deviceID.startsWith('enum.')) return null;
    const [duration, setDuration] = useState<T_DURATION>(C_DEFAULT_DURATION);
    const functionType_ = useFunctionFullType(functionTypeID);
    if (functionType_ === undefined) return null;

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
    const functionName = useSelector(selector_getDisplayName(functionTypeID));
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
    args.sensorIconBox = useMemo(
        () => <SensorIconBox deviceID={deviceID} functionType={functionType} functionTypeID={functionTypeID} />,
        [functionType],
    );
    args.currentBox = useMemo(() => <CurrentBox deviceID={deviceID} unit={unit} color={color} />, [color, unit]);
    args.avBox = useMemo(
        () => (
            <ValueTitleBox title="chartOvervewBoxes.avval" color={color}>
                <CountedValueText allValues={allValues} countMethod="av" unit={unit} />
            </ValueTitleBox>
        ),
        [allValues, color, unit],
    );
    args.maxBox = useMemo(
        () => (
            <ValueTitleBox title="chartOvervewBoxes.maxval" color={color}>
                <CountedValueText allValues={allValues} countMethod="max" unit={unit} />
            </ValueTitleBox>
        ),
        [allValues, color, unit],
    );
    args.minBox = useMemo(
        () => (
            <ValueTitleBox title="chartOvervewBoxes.minval" color={color}>
                <CountedValueText allValues={allValues} countMethod="min" unit={unit} />
            </ValueTitleBox>
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
    args.deviceIDBox = <TypographyComponent variant="caption">{deviceID}</TypographyComponent>;

    return <SensorDetailsTemplate {...((args as unknown) as ComponentProps<typeof SensorDetailsTemplate>)} />;
};

export default SensorDetailsPage;
