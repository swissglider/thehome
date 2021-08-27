import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selector_getStateLastChangeByID,
    selector_getStateTimeStampByID,
    selector_getStateValueByID,
} from '../../30_redux/ioBrokerStates/selectors';
import { ACTION_IOBROKER_UPDATE_STATE } from '../../30_redux/ioBrokerStates/actions';
import TimeHelper from '../../21_utils/TimeHelper';
import CountedIcon from '../../10_atoms/redux/CountedIcon';
import TypographyComponent from '../../10_atoms/base/TypographyComponent';
import ValueTitleBox from '../../11_molecules/base/ValueTitleBox';
import ValueUnitText from '../../10_atoms/base/ValueUnitText';
import { I_Type_Params } from '../../20_hooks/IOBObjectHooks';
import IOBBlindControl from '../../11_molecules/redux/IOBBlindControl';

export const TimeStampBox = ({ deviceID, color }: { deviceID: string; color: string | undefined }): JSX.Element => {
    const currentValueTS = useSelector(selector_getStateTimeStampByID(deviceID));
    const timeStamp = useMemo(() => TimeHelper.getLongTimeFromMillisec(currentValueTS), [currentValueTS]);

    const retrunVal = useMemo(
        () => (
            <ValueTitleBox title="chartOvervewBoxes.timestamp" color={color}>
                <TypographyComponent>{timeStamp.toString()}</TypographyComponent>
            </ValueTitleBox>
        ),
        [color, timeStamp],
    );

    return retrunVal;
};

export const LastChangeBox = ({ deviceID, color }: { deviceID: string; color: string | undefined }): JSX.Element => {
    const currentValueLC = useSelector(selector_getStateLastChangeByID(deviceID));
    const lastChange = useMemo(() => TimeHelper.getLongTimeFromMillisec(currentValueLC), [currentValueLC]);

    const retrunVal = useMemo(
        () => (
            <ValueTitleBox title="chartOvervewBoxes.lastupdate" color={color}>
                <TypographyComponent>{lastChange.toString()}</TypographyComponent>
            </ValueTitleBox>
        ),
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
            <ValueTitleBox title="chartOvervewBoxes.lastval" color={color}>
                <ValueUnitText unit={unit} value={currentValue.toString()} />
            </ValueTitleBox>
        ),
        [color, unit, currentValue],
    );

    return retrunVal;
};

export const SensorIconBox = ({
    deviceID,
    functionType,
    functionTypeID,
}: {
    deviceID: string;
    functionType: I_Type_Params;
    functionTypeID: string;
}): JSX.Element => {
    const currentValue = useSelector(selector_getStateValueByID(deviceID));

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
            <>
                {functionTypeID === 'enum.functions.blinds' ? (
                    <IOBBlindControl membersStateList={[deviceID]} size={'medium'} />
                ) : (
                    <CountedIcon
                        onClick={() => {
                            changeState(currentValue);
                        }}
                        functionTypeID={functionTypeID}
                        value={currentValue}
                        size="medium"
                    />
                )}
            </>
        ),
        [currentValue],
    );
    return retrunVal;
};
