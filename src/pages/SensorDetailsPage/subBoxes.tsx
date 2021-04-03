import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selector_getStateLastChangeByID,
    selector_getStateTimeStampByID,
    selector_getStateValueByID,
} from '../../features/ioBrokerStates/selectors';
import SimpleValueTitleBox from '../../molecules/base/SimpleValueTitleBox';
import { ACTION_IOBROKER_UPDATE_STATE } from '../../features/ioBrokerStates/actions';
import ValueTitleBox from '../../molecules/base/ValueTitleBox';
import TimeHelper from '../../utils/TimeHelper';
import { I_Type_Params } from '../../features/servConn/slice';

export const TimeStampBox = ({ deviceID, color }: { deviceID: string; color: string | undefined }): JSX.Element => {
    const currentValueTS = useSelector(selector_getStateTimeStampByID(deviceID));
    const timeStamp = useMemo(() => TimeHelper.getLongTimeFromMillisec(currentValueTS), [currentValueTS]);

    const retrunVal = useMemo(
        () => <SimpleValueTitleBox title="chartOvervewBoxes.timestamp" value={timeStamp.toString()} color={color} />,
        [color, timeStamp],
    );

    return retrunVal;
};

export const LastChangeBox = ({ deviceID, color }: { deviceID: string; color: string | undefined }): JSX.Element => {
    const currentValueLC = useSelector(selector_getStateLastChangeByID(deviceID));
    const lastChange = useMemo(() => TimeHelper.getLongTimeFromMillisec(currentValueLC), [currentValueLC]);

    const retrunVal = useMemo(
        () => <SimpleValueTitleBox title="chartOvervewBoxes.timestamp" value={lastChange.toString()} color={color} />,
        [color, lastChange],
    );

    return retrunVal;
};

export const CurrentBox = ({
    deviceID,
    color,
    unit,
}: {
    deviceID: string;
    color: string | undefined;
    unit: string | undefined;
}): JSX.Element => {
    const currentValue = useSelector(selector_getStateValueByID(deviceID));
    const retrunVal = useMemo(
        () => (
            <SimpleValueTitleBox
                title="chartOvervewBoxes.lastval"
                value={currentValue.toString()}
                unit={unit}
                color={color}
            />
        ),
        [color, unit, currentValue],
    );

    return retrunVal;
};

export const SensorIconBox = ({
    deviceID,
    functionType,
}: {
    deviceID: string;
    functionType: I_Type_Params;
}): JSX.Element => {
    const currentValue = useSelector(selector_getStateValueByID(deviceID));

    const icon = useMemo(
        () =>
            currentValue !== undefined && typeof currentValue === 'boolean'
                ? currentValue === true
                    ? functionType.icon_true
                    : functionType.icon_false
                : functionType.icon,
        [currentValue, functionType.icon_true, functionType.icon_false, functionType.icon],
    );

    const dispatch = useDispatch();
    const changeState = useMemo(
        () =>
            currentValue !== undefined && typeof currentValue === 'boolean' && functionType.write === true
                ? (value: boolean) => {
                      dispatch(ACTION_IOBROKER_UPDATE_STATE(deviceID as string, !value));
                  }
                : () => {
                      return;
                  },
        [currentValue, functionType.write, deviceID],
    );

    const retrunVal = useMemo(
        () => (
            <ValueTitleBox
                valueWithIcon={{ icon: icon ?? '' }}
                onClick={() => {
                    changeState(currentValue);
                }}
                withoutDecoration={true}
                withAnimation={false}
            />
        ),
        [icon, currentValue],
    );
    return retrunVal;
};
