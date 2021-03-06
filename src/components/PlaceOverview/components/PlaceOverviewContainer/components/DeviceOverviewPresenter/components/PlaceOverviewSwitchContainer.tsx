import React from 'react';
import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { I_PlaceOverviewXContainer_Props } from '..';
import { selector_getAvOnValueFromList } from '../../../../../../../features/ioBrokerStates/selectors';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        imageWithoutValueSwitch: {
            width: theme.spacing(3.2),
            height: theme.spacing(3.2),
            marginRight: theme.spacing(0.8),
            marginTop: theme.spacing(0.6),
        },
    }),
);

const PlaceOverviewSwitchContainer = (props: I_PlaceOverviewXContainer_Props): JSX.Element => {
    const classes = useStyles();
    const changeState = () => {
        return;
    };
    const value = useSelector(selector_getAvOnValueFromList(props.membersStateList));
    const icon = value === undefined ? props.icon : value === true ? props.icon_true : props.icon_false;

    return (
        <>
            <Avatar onClick={changeState} className={classes.imageWithoutValueSwitch} src={icon} />
        </>
    );
};

export default PlaceOverviewSwitchContainer;
