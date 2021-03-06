import React from 'react';
import { makeStyles, Theme, createStyles, Button, CardMedia } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { selector_getIOBObjectByID, selector_getDisplayName } from '../../../../../features/ioBrokerObjects/selectors';
import { I_HOME_CONTAINER } from '../../../../../features/servConn/interfaces';
import DeviceOverviewPresenter from './DeviceOverviewPresenter';
import { Link } from 'react-router-dom';
import { useGetHomeContainerLocationTo } from '../../../hooks/PlaceOverviewHooks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1.5),
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
            // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            backgroundImage: `url('https://www.slashcoding.com/wp-content/uploads/2013/10/clouds.jpg')`,
        },
        rightContainer: {
            flexGrow: 10,
            flexDirection: 'column',
        },
        icon: {
            minWidth: 50,
            maxWidth: 50,
            flexGrow: 1,
        },
        title: {
            ...theme.typography.h6,
            flexGrow: 4,
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(1.5),
        },
        sensorContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            flexDirection: 'row',
        },
        sensor: {
            minWidth: 50,
            flexGrow: 1,
        },
    }),
);

export interface I_PlaceOverviewItem_Props {
    homeContainer: I_HOME_CONTAINER;
    pathArray: string[];
}

const PlaceOverviewItem = ({ homeContainer, pathArray }: I_PlaceOverviewItem_Props): JSX.Element => {
    const classes = useStyles();
    const srcImg = useSelector(selector_getIOBObjectByID(homeContainer.id))?.common.icon;
    const displayName = useSelector(selector_getDisplayName(homeContainer.id));
    const newPathArray = [...pathArray];
    newPathArray.push(homeContainer.id);
    const location = useGetHomeContainerLocationTo({ pathArray: newPathArray });
    return (
        <>
            {/* <FieldsetBorders componentName={COMPONENTNAME}> */}
            <Button className={classes.button}>
                <div className={classes.icon}>
                    <CardMedia component="img" src={srcImg} />
                </div>
                <div className={classes.rightContainer}>
                    <Button to={location} component={Link}>
                        <div className={classes.title}>{displayName}</div>
                    </Button>
                    <DeviceOverviewPresenter homeContainer={homeContainer} />
                </div>
            </Button>
            {/* </FieldsetBorders> */}
        </>
    );
};

export default PlaceOverviewItem;
