import React from 'react';
import { Area, AreaChart, Brush, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { I_History } from '../../../../../features/servConn/ActionIOBrokerTestSendTo';
import { CustomizedAxisTick, CustomTooltip, xAxisTickFormatter } from '../../../../Charts';

const NumberChart = ({
    data,
    color,
    unit,
    functionName,
    deviceName,
}: {
    data: I_History[];
    color: string;
    unit: string;
    functionName: string;
    deviceName: string;
}): JSX.Element => {
    return (
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
                <Tooltip content={<CustomTooltip functionName={functionName} unit={unit} />} animationDuration={0} />
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
    );
};

export default NumberChart;
