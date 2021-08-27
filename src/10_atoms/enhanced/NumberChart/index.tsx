import React, { useMemo } from 'react';
import { Area, AreaChart, Brush, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { I_History } from '../../../30_redux/servConn/ActionIOBrokerTestSendTo';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core';
import TimeHelper from '../../../21_utils/TimeHelper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        node: (props: { height?: string; width?: string }) => {
            return {
                height: props.height ?? theme.spacing(25),
                width: props.width ?? '100hv',
            };
        },
        node1: {
            margin: 0,
            padding: 0,
        },
        root: {
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            border: '2px solid #c3c3c3',
            borderRadius: '10px',
        },
    }),
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const CustomTooltip = (props: any): JSX.Element | null => {
    const classes = useStyles({});
    const dateTip = TimeHelper.getWeekDayTime(props.label);
    const formattedDate = dateTip;
    if (props.payload === null) return null;
    const functionName = props.functionName ?? '';
    const unit = props.unit ?? '';
    if (props.active)
        return (
            <div className={classes.root}>
                <p>{`${formattedDate}`}</p>
                <p>
                    <span>
                        {functionName}: {props.payload[0].value.toLocaleString()} {unit}
                    </span>
                </p>
            </div>
        );
    return null;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const xAxisTickFormatter = (timestamp_measured: any) => {
    return TimeHelper.getShortDateFromMillisec(timestamp_measured);
};

export const CustomizedAxisTick = ({ x, y, payload }: { x: any; y: any; payload: any }): JSX.Element => {
    const dateTip = TimeHelper.getLongTimeFromMillisec(payload.value);
    return (
        <g transform={`translate(${x},${y})`}>
            {/* <text x={35} y={0} dy={14} fontSize="0.70em" fontFamily="bold" textAnchor="end" fill="#363636"> */}
            <text x={35} y={0} dy={14} fontSize="0.70em" fontFamily="bold" textAnchor="end">
                {dateTip}
            </text>
        </g>
    );
};

export interface I_NumberChart {
    data: I_History[];
    color: string;
    unit: string;
    functionName: string;
    deviceName: string;
    height?: string;
    width?: string;
}

const NumberChart = ({ data, color, unit, functionName, deviceName, height, width }: I_NumberChart): JSX.Element => {
    const nodeProps = useMemo(() => {
        return { height, width };
    }, [height, width]);
    const classes = useStyles(nodeProps);
    const theme = useTheme();
    const _color = color === undefined || color === '' ? theme.palette.primary.main : color;
    return (
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
                            <stop offset="5%" stopColor={_color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={_color} stopOpacity={0} />
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
                        stroke={_color}
                        fillOpacity={1}
                        fill="url(#colorVal)"
                    />
                    <Brush tickFormatter={xAxisTickFormatter} dataKey="ts" travellerWidth={20} />
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default NumberChart;
