import React from 'react';
import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selector_getStateByID } from '../../../features/ioBrokerStates/selectors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'nowrap',
            flexDirection: 'row',
        },
        image: {
            width: theme.spacing(2),
            height: theme.spacing(2),
            marginRight: theme.spacing(0.5),
            marginTop: theme.spacing(0.4),
        },
    }),
);

export interface I_PlaceOverviewSensorValue_Props {
    summarizedID: string;
}

const PlaceOverviewSensorValue = ({ summarizedID }: I_PlaceOverviewSensorValue_Props): JSX.Element => {
    const classes = useStyles();
    const m = summarizedID.split('.');
    const tempID = m[m.length - 2];
    const { val } = useSelector(selector_getStateByID(summarizedID));
    const unit = useSelector(selector_getStateByID(`thehome.0.states.unit.${tempID}.unit`))?.val;
    const icon = useSelector(selector_getStateByID(`thehome.0.states.unit.${tempID}.icon`))?.val;
    return (
        <div className={classes.root}>
            <Avatar className={classes.image} src={icon} />
            {`${val} ${unit !== undefined ? unit : ''}`}
        </div>
    );
};

export default PlaceOverviewSensorValue;
