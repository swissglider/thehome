import React from 'react';
import { makeStyles, Theme, createStyles, Button, CardMedia, Icon } from '@material-ui/core';
import { useSelector } from 'react-redux';

import {
    selector_getIOBObjectByID,
    selector_getDisplayName,
} from '../../../../../../features/ioBrokerObjects/selectors';
import { I_HOME_CONTAINER } from '../../../../../../features/servConn/interfaces';
import DeviceOverviewPresenter from './components/DeviceOverviewPresenter';
import { Link } from 'react-router-dom';
import { useGetHomeContainerLocationTo } from '../../../../../../hooks/PlaceOverviewHooks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginLeft: theme.spacing(1.5),
            marginRight: theme.spacing(1.5),
            marginTop: theme.spacing(1.5),
            marginButtom: theme.spacing(1.5),
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
            backgroundImage: `url('https://www.slashcoding.com/wp-content/uploads/2013/10/clouds.jpg')`,
            'text-transform': 'none',
            minWidth: theme.spacing(30),
            // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            flexDirection: 'row',
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
            marginBottom: theme.spacing(0),
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(0),
            'text-transform': 'none',
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
        margin: {
            position: 'absolute',
            top: theme.spacing(0.5),
            right: theme.spacing(0.5),
            color: theme.palette.text.disabled,
            padding: '0px 0px',
            textAlign: 'center',
        },
    }),
);

export interface I_PlaceOverviewItem_Props {
    homeContainer: I_HOME_CONTAINER;
    pathArray: string[];
    withoutLink?: boolean;
}

const PlaceOverviewItem = ({ homeContainer, pathArray, withoutLink }: I_PlaceOverviewItem_Props): JSX.Element => {
    const classes = useStyles();
    const srcImg = useSelector(selector_getIOBObjectByID(homeContainer.id))?.common.icon;
    const displayName = useSelector(selector_getDisplayName(homeContainer.id));
    const newPathArray = [...pathArray];
    newPathArray.push(homeContainer.id);
    const { location } = useGetHomeContainerLocationTo({ pathArray: newPathArray, layout: 'standard_place_overview' });
    const linkProps = withoutLink === undefined || withoutLink === false ? { to: location, component: Link } : {};

    const WithOrWithoutLink = ({ children }: any): JSX.Element => {
        return withoutLink === undefined || withoutLink === false ? (
            <Button {...linkProps}>{children}</Button>
        ) : (
            <>{children}</>
        );
    };
    const { goToLocation } = useGetHomeContainerLocationTo({
        pathArray: newPathArray,
        layout: 'place_detail',
    });
    return (
        <>
            {/* <FieldsetBorders componentName={COMPONENTNAME}> */}
            <Button className={classes.button}>
                <Icon onClick={goToLocation} fontSize="small" className={classes.margin}>
                    info_outlined
                </Icon>
                <div className={classes.icon}>
                    <WithOrWithoutLink>
                        <CardMedia component="img" src={srcImg} />
                    </WithOrWithoutLink>
                </div>
                <div className={classes.rightContainer}>
                    <WithOrWithoutLink>
                        <div className={classes.title}>{displayName}</div>
                    </WithOrWithoutLink>

                    <DeviceOverviewPresenter pathArray={newPathArray} homeContainer={homeContainer} />
                </div>
            </Button>
            {/* </FieldsetBorders> */}
        </>
    );
};

export default PlaceOverviewItem;
