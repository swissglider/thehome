import React from 'react';
import moment from 'moment';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            border: '2px solid #c3c3c3',
            borderRadius: '10px',
        },
    }),
);

/**
 * additional props:
 * functionName
 * unit
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const CustomTooltip = (props: any): JSX.Element | null => {
    const classes = useStyles({ color: '' });
    moment.locale('de-ch');
    // const dateTip = moment(pops.label).locale('de-ch').format('llll');
    const dateTip = moment(props.label).format('dddd hh:mm a');
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
