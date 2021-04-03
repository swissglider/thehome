/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useHomeContainer } from '../../../../hooks/PlaceOverviewHooks';
import { useDispatch } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { I_GET_HISTORY_PROPS_OPTIONS } from '../../../../features/servConn/ActionIOBrokerTestSendTo';
import { AppDispatch } from '../../../../redux/Store';
import TimeHelper from '../../../../utils/TimeHelper';

const CustomizedAxisTick = ({ x, y, payload }: { x: any; y: any; payload: any }) => {
    const dateTip = TimeHelper.getMiddleLongTimeFromMillisec(payload.value);
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={35} y={0} dy={14} fontSize="0.80em" fontFamily="bold" textAnchor="end">
                {dateTip}
            </text>
        </g>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        node: {
            margin: theme.spacing(0.5),
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            height: '200px',
            width: '100hv',
        },
    }),
);

const week: I_GET_HISTORY_PROPS_OPTIONS = {
    start: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
    end: new Date().getTime(),
    step: 1000 * 60 * 60,
    limit: false,
    aggregate: 'average',
};

interface I_FullArrayType {
    vals: number[];
    avarage: number;
    min: number;
    max: number;
    ts: number;
}

const PlaceDetail = (): JSX.Element => {
    const classes = useStyles({ color: '' });
    const { homeContainer, pathArray } = useHomeContainer();
    const tempIDs = homeContainer?.recursiveMemberStateIDs['enum.functions.temp'] ?? [];
    const dispatch = useDispatch<AppDispatch>();

    const [fullArray, setFullArray] = useState<I_FullArrayType[]>([]);
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(0);
    const [av, setAv] = useState<number>(0);

    const calculateValues = async () => {
        const dynAction = await import('../../../../features/servConn/ActionIOBrokerTestSendTo');
        const promiseArray: any[] = [];
        for (const tempID of tempIDs) {
            // dispatch(dynAction.IOBROKER_GET_HISTORY({ id: tempID, options: week }));
            promiseArray.push(dispatch(dynAction.IOBROKER_GET_HISTORY({ id: tempID, options: week })));
        }
        Promise.all(promiseArray).then((values) => {
            const fullObjectArray: {
                [id: number]: I_FullArrayType;
            } = {};
            const tempArray: { val: number; ts: number }[][] = values.map(
                (e) => e.payload as { val: number; ts: number }[],
            );
            if (tempArray.length !== 0) {
                tempArray[0].forEach((e) => {
                    if (!(e.ts in fullObjectArray)) {
                        fullObjectArray[e.ts] = { vals: [], ts: e.ts, avarage: 0, min: 0, max: 0 };
                    }
                    tempArray.forEach((ee) => {
                        const tEE = ee.find((i) => i.ts === e.ts);
                        if (tEE) {
                            fullObjectArray[e.ts].vals.push(tEE.val);
                        }
                    });
                });
            }
            let allValues: number[] = [];
            Object.values(fullObjectArray).forEach((e) => {
                e.min = Math.round(10 * Math.min(...e.vals)) / 10;
                e.max = Math.round(10 * Math.max(...e.vals)) / 10;
                e.avarage = Math.round((10 * e.vals.reduce((a, b) => a + b, 0)) / e.vals.length) / 10;
                allValues = [...allValues, ...e.vals];
            });
            const min = Math.round(10 * Math.min(...allValues)) / 10;
            const max = Math.round(10 * Math.max(...allValues)) / 10;
            const av = Math.round((10 * allValues.reduce((a, b) => a + b, 0)) / allValues.length) / 10;
            // console.log(fullObjectArray, allValues, min, max, av);
            setFullArray(Object.values(fullObjectArray));
            setMin(min);
            setMax(max);
            setAv(av);
        });
    };

    useEffect(() => {
        calculateValues();
    }, []);

    return (
        <div className={classes.node}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={300}
                    data={fullArray}
                    margin={{
                        top: 0,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="avCol" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="red" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="minCol" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="blue" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="blue" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="maxCol" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="green" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="green" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Legend verticalAlign="top" height={36} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="ts"
                        tick={CustomizedAxisTick}
                        // tickFormatter={(timestamp: number) =>
                        //     moment(timestamp).locale('de-ch').format('ddd DoMM, HH:mm')
                        // }
                    />
                    {/* <YAxis unit={unit} tickCount={3} /> */}
                    <YAxis tickCount={3} type="number" domain={['dataMin', 'dataMax']} />
                    <Tooltip labelFormatter={(timestamp: number) => TimeHelper.getWeekDayTime(timestamp)} />
                    {/* <Tooltip /> */}
                    {/* <Tooltip
                        content={<CustomTooltip functionName={functionName} unit={unit} />}
                        animationDuration={0}
                    /> */}
                    <Area
                        // name={`${deviceName} ${functionName}`}
                        type="linear"
                        dataKey="max"
                        stroke="green"
                        fillOpacity={1}
                        fill="url(#maxCol)"
                    />
                    <Area
                        // name={`${deviceName} ${functionName}`}
                        type="linear"
                        dataKey="min"
                        stroke="blue"
                        fillOpacity={1}
                        fill="url(#minCol)"
                    />
                    <Area
                        // name={`${deviceName} ${functionName}`}
                        type="linear"
                        dataKey="avarage"
                        stroke="red"
                        fillOpacity={1}
                        fill="url(#avCol)"
                    />
                    {/* <Brush tickFormatter={xAxisTickFormatter} dataKey="ts" travellerWidth={20} /> */}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PlaceDetail;
