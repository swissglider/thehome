import React from 'react';
import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { I_PlaceOverviewXContainer_Props } from '..';
import { useSelector } from 'react-redux';
import { selector_getAvOnValueFromList } from '../../../../../../../../../features/ioBrokerStates/selectors';
import { useGetHomeContainerLocationTo } from '../../../../../../../hooks/PlaceOverviewHooks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        imageWithoutValue: {
            width: theme.spacing(2),
            height: theme.spacing(2),
            marginRight: theme.spacing(0.8),
            marginTop: theme.spacing(0.6),
        },
    }),
);

const PlaceOverviewBooleanContainer = (props: I_PlaceOverviewXContainer_Props): JSX.Element => {
    const classes = useStyles();

    const value = useSelector(selector_getAvOnValueFromList(props.membersStateList));
    const icon = value === undefined ? props.icon : value === true ? props.icon_true : props.icon_false;

    const goTo = props.pathArray
        ? useGetHomeContainerLocationTo({
              pathArray: props.pathArray,
              layout: 'standard_function_type_overview',
              functionType: props.functionID,
          }).goToLocation
        : () => {
              return;
          };

    return (
        <>
            <Avatar onClick={goTo} className={classes.imageWithoutValue} src={icon} />
        </>
    );
};

export default PlaceOverviewBooleanContainer;
