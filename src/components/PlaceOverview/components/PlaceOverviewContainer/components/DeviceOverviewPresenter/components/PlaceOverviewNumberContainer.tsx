import React from 'react';
import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { I_PlaceOverviewXContainer_Props } from '..';
import { useSelector } from 'react-redux';
import { selector_getAvValueFromList } from '../../../../../../../features/ioBrokerStates/selectors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        imageWithValue: {
            width: theme.spacing(2),
            height: theme.spacing(2),
            marginRight: theme.spacing(0.8),
            marginTop: theme.spacing(0.6),
        },
    }),
);

const PlaceOverviewNumberContainer = (props: I_PlaceOverviewXContainer_Props): JSX.Element => {
    const classes = useStyles();

    const value = useSelector(selector_getAvValueFromList(props.membersStateList));

    return (
        <>
            <Avatar className={classes.imageWithValue} src={props.icon} /> {`${value} ${props.unit}`}
        </>
    );
};

export default PlaceOverviewNumberContainer;
