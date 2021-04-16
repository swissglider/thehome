import React from 'react';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        container: {
            alignItems: 'center',
        },
        itemRoot: {
            textAlign: 'center',
        },
    }),
);

export interface I_SensorDetailsTemplate_Props {
    durationSelect: JSX.Element;
    refreshButton: JSX.Element;
    sensorIconBox: JSX.Element;
    currentBox: JSX.Element;
    avBox: JSX.Element;
    maxBox: JSX.Element;
    minBox: JSX.Element;
    timeStampBox: JSX.Element;
    lastUpdateBox: JSX.Element;
    chart: JSX.Element;
    deviceIDBox: JSX.Element;
}

const SensorDetailsTemplate = (props: I_SensorDetailsTemplate_Props): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container className={classes.container} spacing={2}>
                <Grid item xs={4}>
                    <div className={classes.itemRoot}>{props.durationSelect}</div>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.itemRoot}>{props.refreshButton}</div>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.itemRoot}>{props.sensorIconBox}</div>
                </Grid>
                <Grid item xs={3} md={2}>
                    <div className={classes.itemRoot}>{props.currentBox}</div>
                </Grid>
                <Grid item xs={3} md={2}>
                    <div className={classes.itemRoot}>{props.avBox}</div>
                </Grid>
                <Grid item xs={3} md={2}>
                    <div className={classes.itemRoot}>{props.maxBox}</div>
                </Grid>
                <Grid item xs={3} md={2}>
                    <div className={classes.itemRoot}>{props.minBox}</div>
                </Grid>
                <Grid item xs={6} md={2}>
                    <div className={classes.itemRoot}>{props.timeStampBox}</div>
                </Grid>
                <Grid item xs={6} md={2}>
                    <div className={classes.itemRoot}>{props.lastUpdateBox}</div>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.itemRoot}>{props.chart}</div>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.itemRoot}>{props.deviceIDBox}</div>
                </Grid>
            </Grid>
        </div>
    );
};

export default SensorDetailsTemplate;
