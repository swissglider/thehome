import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    IOBROKER_GET_HISTORY,
    I_GET_HISTORY_PROPS,
    I_History,
} from '../../../features/servConn/ActionIOBrokerTestSendTo';
import { AppDispatch } from '../../../redux/Store';
import { getDurationTypeStructByDurationAndDataType, T_DURATION } from '../../../utils/TimeHelper';

export const useSingleChartDataCalculator = (
    deviceID: string,
    valueType: string,
): {
    data: I_History[];
    allValues: number[];
    calcHistory: (duration: T_DURATION) => void;
} => {
    const [data, setData] = useState<I_History[]>([]);
    const [allVal, setAllVal] = useState<number[]>([]);
    const dispatch1 = useDispatch<AppDispatch>();

    const calcHistory = (duration: T_DURATION): void => {
        console.log('🚀 ~ file: SingleChartDataCalculator.tsx ~ line 26 ~ calcHistory ~ duration', duration);
        const historyProps: I_GET_HISTORY_PROPS = {
            id: deviceID as string,
            options: getDurationTypeStructByDurationAndDataType(duration, valueType),
        };
        console.log(valueType);
        dispatch1(IOBROKER_GET_HISTORY(historyProps))
            .then(unwrapResult)
            .then((originalPromiseResult: I_History[]) => {
                // console.log(originalPromiseResult);
                const transData: { val: number; ts: number }[] = originalPromiseResult
                    .filter((d: I_History) => d.val !== null && d.val !== undefined)
                    .map((d: I_History) => ({
                        val:
                            typeof d.val === 'boolean'
                                ? d.val === true
                                    ? 1
                                    : 0
                                : typeof d.val === 'number'
                                ? Math.round(10 * d.val) / 10
                                : d.val,
                        ts: d.ts,
                    }));
                setData(transData);
                if (valueType === 'number') {
                    setAllVal([...transData].map((d) => d.val));
                }
            })
            .catch((rejectedValueOrSerializedError) => {
                console.error(rejectedValueOrSerializedError);
            });
    };

    return { data, allValues: allVal, calcHistory };
};
