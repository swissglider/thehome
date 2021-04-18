import React from 'react';
import { Breadcrumbs, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
    useGetDeviceIDFromLocation,
    useGetFunctionTypeIDFromLocation,
    useGetHomeContainerLocationTo,
    useGetPathElementsFromLocation,
} from '../../../20_hooks/PlaceOverviewHooks';
import { selector_getDisplayName } from '../../../30_redux/ioBrokerObjects/selectors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(2),
        },
        Breadcrumbs: {
            marginLeft: theme.spacing(0.5),
            padding: theme.spacing(0),
            // color: (props: { color: any }) => props.color,
            color: (props: { active: any }) =>
                props.active ? theme.palette.text.primary : theme.palette.text.disabled,
        },
    }),
);

const LocationOverviewContainerBreadcrumbsHome = (): JSX.Element => {
    const classes = useStyles({ active: false });
    const { goToLocation } = useGetHomeContainerLocationTo({});
    return (
        <div onClick={goToLocation} className={classes.Breadcrumbs}>
            Home
        </div>
    );
};

const LocationOverviewContainerBreadcrumbsEl = ({ locationID }: { locationID: string }): JSX.Element => {
    const classes = useStyles({ active: false });
    const { goToLocation } = useGetHomeContainerLocationTo({
        page: 'LocationOverviewPage',
        locationID: locationID,
    });
    const name = useSelector(selector_getDisplayName(locationID));
    return (
        <div onClick={goToLocation} className={classes.Breadcrumbs}>
            {name}
        </div>
    );
};

const LocationOverviewContainerBreadcrumbsElWithoutLink = ({ id }: { id: string }): JSX.Element => {
    const classes = useStyles({ active: true });
    const name = useSelector(selector_getDisplayName(id));
    return <div className={classes.Breadcrumbs}>{name}</div>;
};

const LocationOverviewBreadcrumbs = (): JSX.Element => {
    const classes = useStyles({ active: true });
    const test_todo: string[] = useGetPathElementsFromLocation();
    const deviceID = useGetDeviceIDFromLocation();
    const functionTypeID = useGetFunctionTypeIDFromLocation();

    return (
        <Breadcrumbs className={classes.root} separator="/" aria-label="breadcrumb">
            <LocationOverviewContainerBreadcrumbsHome />
            {test_todo.map((e, index, arr) =>
                (index === arr.length - 1 || !e.startsWith('enum.')) && !(deviceID || functionTypeID) ? (
                    <LocationOverviewContainerBreadcrumbsElWithoutLink key={`Breadcrumbs12qw_${index}`} id={e} />
                ) : (
                    <LocationOverviewContainerBreadcrumbsEl key={`Breadcrumbs12qw_${index}`} locationID={e} />
                ),
            )}
            {deviceID && <LocationOverviewContainerBreadcrumbsElWithoutLink id={deviceID} />}
            {functionTypeID && <LocationOverviewContainerBreadcrumbsElWithoutLink id={functionTypeID} />}
        </Breadcrumbs>
    );
};

export default LocationOverviewBreadcrumbs;
