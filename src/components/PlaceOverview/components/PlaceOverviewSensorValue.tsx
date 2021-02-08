import React from 'react';
import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector, shallowEqual } from 'react-redux';
import { selector_getStateValueByID, selector_getUnitBySummarizedID } from '../features/reducers/ioBrokerSlice';

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
    const value = useSelector(selector_getStateValueByID(summarizedID), shallowEqual);
    const { unit, icon } = useSelector(selector_getUnitBySummarizedID(summarizedID), shallowEqual);
    return (
        <div className={classes.root}>
            <Avatar className={classes.image} src={icon} />
            {`${value} ${unit !== undefined ? unit : ''}`}
        </div>
    );
};

export default PlaceOverviewSensorValue;
