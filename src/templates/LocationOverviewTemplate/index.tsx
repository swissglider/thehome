import React from 'react';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        locationComp: {
            marginBottom: theme.spacing(3),
        },
    }),
);

export interface I_LocationOverviewTewmplate_Props {
    locationComp: JSX.Element;
    subLocationListComp?: JSX.Element;
    zoneListComp?: JSX.Element;
    sensorListComp?: JSX.Element;
}

const LocationOverviewTemplate = (props: I_LocationOverviewTewmplate_Props): JSX.Element => {
    const classes = useStyles({ classesProps1: '' });
    return (
        <Grid container spacing={2} direction="column" wrap="nowrap" justify="flex-start" alignItems="stretch">
            <Grid item>
                <div className={classes.locationComp}>{props.locationComp}</div>
            </Grid>
            <Grid item>{props.sensorListComp}</Grid>
            <Grid item>{props.subLocationListComp}</Grid>
        </Grid>
    );
};

export default LocationOverviewTemplate;
