import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import FieldsetBorders from '../../../utils/FieldsetBorders';
import PlaceOverviewItem from './PlaceOverviewItem';
import { selector_getHomeContainers } from '../../../features/servConn/selectors';
import { I_HOME_CONTAINER } from '../../../features/servConn/interfaces';

const COMPONENTNAME = 'PlaceOverviewContainer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            ...theme.typography.h5,
            padding: theme.spacing(1.5),
            textAlign: 'center',
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
        },
    }),
);

const HomeSelect = (): JSX.Element => {
    const classes = useStyles();

    const homeContainers: I_HOME_CONTAINER[] | undefined = useSelector(selector_getHomeContainers());
    // const homeEnumIDs: I_ioBrokerState | undefined = useSelector(selector_getStateByID('thehome.0.states.home.list'));
    console.log('selectHome');
    console.log(homeContainers);
    return (
        <FieldsetBorders componentName={COMPONENTNAME}>
            {homeContainers !== undefined ? (
                <div className={classes.container}>
                    {homeContainers.map((hc: I_HOME_CONTAINER, index: number) => (
                        <PlaceOverviewItem key={`home_select_${index}`} homeContainer={hc} />
                    ))}
                </div>
            ) : (
                <div>no home found</div>
            )}
        </FieldsetBorders>
    );
};

export default HomeSelect;
