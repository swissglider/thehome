import React, { useEffect, useState } from 'react';
import { Brush, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    IOBROKER_GET_HISTORY,
    I_GET_HISTORY_PROPS,
    I_GET_HISTORY_PROPS_OPTIONS,
    I_History,
} from '../../../../../features/servConn/ActionIOBrokerTestSendTo';
import moment from 'moment';
import { Button, createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../redux/Store';
import { unwrapResult } from '@reduxjs/toolkit';

const convertHexToRGBA = (hexCode: string, opacity: number) => {
    let hex = hexCode.replace('#', '');

    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r},${g},${b},${opacity / 100})`;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        node: {
            margin: theme.spacing(0.5),
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            height: '200px',
            width: '100hv',
        },
        custom_tooltip: {
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            border: '2px solid #c3c3c3',
            borderRadius: '10px',
        },
        buttonRoot: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-evenly',
        },
        buttonContainter: {
            padding: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            boxShadow: 'rgba(50,50,93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
            // backgroundColor: ({ color }: { color: string }) => color,
            // background: 'rgb(2,0,36)',
            background: ({ color }: { color: string }) => {
                const color1 = convertHexToRGBA(color, 1);
                const color2 = convertHexToRGBA(color, 20);
                const color3 = convertHexToRGBA(color, 40);
                return `linear-gradient(0deg, ${color1} 0%, ${color2} 35%, ${color3} 100%)`;
            },
        },
        buttonText: {
            color: theme.palette.text.secondary,
            fontWeight: 900,
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);

const CustomizedAxisTick = ({ x, y, payload }: { x: any; y: any; payload: any }) => {
    moment.locale('de-ch');
    const dateTip = moment(payload.value).locale('de-ch').format('lll');
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={35} y={0} dy={14} fontSize="0.70em" fontFamily="bold" textAnchor="end" fill="#363636">
                {dateTip}
            </text>
        </g>
    );
};

const xAxisTickFormatter = (timestamp_measured: any) => {
    return moment(timestamp_measured).locale('de-ch').format('lll').slice(0, 6);
};

const CustomTooltip = (props: any) => {
    const classes = useStyles({ color: '' });
    moment.locale('de-ch');
    // const dateTip = moment(pops.label).locale('de-ch').format('llll');
    const dateTip = moment(props.label).format('dddd hh:mm a');
    const formattedDate = dateTip;
    if (props.payload === null) return null;
    if (props.active)
        return (
            <div className={classes.custom_tooltip}>
                <p>{`${formattedDate}`}</p>
                <p>
                    <span>
                        {props.functionName}: {props.payload[0].value.toLocaleString()} {props.unit}
                    </span>
                </p>
            </div>
        );
    return null;
};

type Type_Types = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';
type DURATION_TYPES_STRUCT_TYPES = {
    hour: I_GET_HISTORY_PROPS_OPTIONS;
    day: I_GET_HISTORY_PROPS_OPTIONS;
    week: I_GET_HISTORY_PROPS_OPTIONS;
    month: I_GET_HISTORY_PROPS_OPTIONS;
    year: I_GET_HISTORY_PROPS_OPTIONS;
    twoyear: I_GET_HISTORY_PROPS_OPTIONS;
};

const durationTypeStruct: DURATION_TYPES_STRUCT_TYPES = {
    hour: {
        start: new Date().getTime() - 1000 * 60 * 60,
        end: new Date().getTime(),
        step: 1000 * 60,
        limit: false,
        aggregate: 'max',
    },
    day: {
        start: new Date().getTime() - 1000 * 60 * 60 * 24,
        end: new Date().getTime(),
        step: 1000 * 60,
        limit: false,
        aggregate: 'max',
    },
    week: {
        start: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
        end: new Date().getTime(),
        step: 1000 * 60 * 60,
        limit: false,
        aggregate: 'max',
    },
    month: {
        start: new Date().getTime() - 1000 * 60 * 60 * 24 * 30,
        end: new Date().getTime(),
        step: 1000 * 60 * 60,
        limit: false,
        aggregate: 'max',
    },
    year: {
        start: new Date().getTime() - 1000 * 60 * 60 * 24 * 365,
        end: new Date().getTime(),
        step: 1000 * 60 * 60 * 24,
        limit: false,
        aggregate: 'max',
    },
    twoyear: {
        start: new Date().getTime() - 1000 * 60 * 60 * 24 * 365 * 2,
        end: new Date().getTime(),
        step: 1000 * 60 * 60 * 24,
        limit: false,
        aggregate: 'max',
    },
};

const ChartTest = ({
    deviceID,
    unit,
    functionName,
    deviceName,
    lastValue,
    functionColor,
    lastUpdate,
    addComponent,
    valueType,
}: {
    deviceID: string;
    unit: string;
    functionName: string;
    deviceName: string;
    lastValue: boolean | number;
    functionColor: string | undefined;
    lastUpdate: string;
    addComponent?: JSX.Element;
    valueType: string;
}): JSX.Element => {
    const [data, setData] = useState<I_History[]>([]);
    const [min, setMin] = useState<number>();
    const [max, setMax] = useState<number>();
    const [av, setAv] = useState<number>();
    const [duration, setDuration] = React.useState<keyof DURATION_TYPES_STRUCT_TYPES>('week');
    const color = functionColor ?? '#8884d8';
    const classes = useStyles({ color: color });
    const dispatch1 = useDispatch<AppDispatch>();

    const calcHistory = (duration: keyof DURATION_TYPES_STRUCT_TYPES): void => {
        const historyProps: I_GET_HISTORY_PROPS = {
            id: deviceID as string,
            options: { ...durationTypeStruct[duration] },
        };
        if (valueType === 'boolean') historyProps.options.aggregate = 'max';
        if (valueType === 'number') historyProps.options.aggregate = 'average';
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
                // setLast(transData[transData.length - 1].val);
                if (valueType === 'number') {
                    const valArray = [...transData].map((d) => d.val);
                    setMin(Math.round(10 * Math.min(...valArray)) / 10);
                    setMax(Math.round(10 * Math.max(...valArray)) / 10);
                    setAv(Math.round((10 * valArray.reduce((a, b) => a + b, 0)) / valArray.length) / 10);
                    // setLast(transData[transData.length - 1].val);
                }
            })
            .catch((rejectedValueOrSerializedError) => {
                console.error(rejectedValueOrSerializedError);
            });
    };

    useEffect(() => {
        calcHistory('week');
    }, []);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDuration(event.target.value as keyof DURATION_TYPES_STRUCT_TYPES);
        calcHistory(event.target.value as keyof DURATION_TYPES_STRUCT_TYPES);
    };

    return (
        <div>
            <div className={classes.buttonRoot}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={duration}
                        onChange={handleChange}
                    >
                        <MenuItem value={'hour'}>Hour</MenuItem>
                        <MenuItem value={'day'}>Day</MenuItem>
                        <MenuItem value={'week'}>Week</MenuItem>
                        <MenuItem value={'month'}>Month</MenuItem>
                        <MenuItem value={'year'}>Year</MenuItem>
                        {/* <MenuItem value={'2year'}>2 Year</MenuItem> */}
                    </Select>
                </FormControl>
                <Button color="secondary">refresh</Button>
            </div>
            <div className={classes.buttonRoot}>
                <div className={classes.buttonContainter}>
                    <div className={classes.buttonText}>Latest Val</div>
                    <div>
                        {lastValue.toString()}
                        {unit}
                    </div>
                </div>
                {valueType === 'number' && (
                    <>
                        <div className={classes.buttonContainter}>
                            <div className={classes.buttonText}>Avarage</div>
                            <div>
                                {av}
                                {unit}
                            </div>
                        </div>
                        <div className={classes.buttonContainter}>
                            <div className={classes.buttonText}>Max. Val</div>
                            <div>
                                {max}
                                {unit}
                            </div>
                        </div>
                        <div className={classes.buttonContainter}>
                            <div className={classes.buttonText}>Min. Val</div>
                            <div>
                                {min}
                                {unit}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className={classes.node}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 0,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Legend verticalAlign="top" height={36} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ts" tick={CustomizedAxisTick} />
                        <YAxis unit={unit} tickCount={3} />
                        {/* <Tooltip /> */}
                        <Tooltip
                            content={<CustomTooltip functionName={functionName} unit={unit} />}
                            animationDuration={0}
                        />
                        <Area
                            name={`${deviceName} ${functionName}`}
                            type="monotone"
                            dataKey="val"
                            stroke={color}
                            fillOpacity={1}
                            fill="url(#colorVal)"
                        />
                        <Brush tickFormatter={xAxisTickFormatter} dataKey="ts" travellerWidth={20} />
                        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className={classes.buttonRoot}>
                <div className={classes.buttonContainter}>
                    <div className={classes.buttonText}>Latest Update</div>
                    <div>{new Date(lastUpdate).toLocaleString()}</div>
                </div>
                {addComponent && <div className={classes.buttonContainter}>{addComponent}</div>}
            </div>
        </div>
    );
};

export default ChartTest;
