import React from 'react';
import moment from 'moment';

export const CustomizedAxisTick = ({ x, y, payload }: { x: any; y: any; payload: any }): JSX.Element => {
    moment.locale('de-ch');
    const dateTip = moment(payload.value).locale('de-ch').format('lll');
    return (
        <g transform={`translate(${x},${y})`}>
            {/* <text x={35} y={0} dy={14} fontSize="0.70em" fontFamily="bold" textAnchor="end" fill="#363636"> */}
            <text x={35} y={0} dy={14} fontSize="0.70em" fontFamily="bold" textAnchor="end">
                {dateTip}
            </text>
        </g>
    );
};
