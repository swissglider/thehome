import React from 'react';
import { Breadcrumbs, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { I_UseHomeContainer_Result, useGetHomeContainerLocationTo } from '../hooks/PlaceOverviewHooks';
import { selector_getDisplayName } from '../../../features/ioBrokerObjects/selectors';

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

const PlaceOverviewContainerBreadcrumbsHome = (): JSX.Element => {
    const classes = useStyles({ active: false });
    const { goToLocation } = useGetHomeContainerLocationTo({
        pathArray: [],
    });
    return (
        <div onClick={goToLocation} className={classes.Breadcrumbs}>
            Home
        </div>
    );
};

const PlaceOverviewContainerBreadcrumbsEl = ({ pathArray, id }: { pathArray: string[]; id: string }): JSX.Element => {
    const classes = useStyles({ active: false });
    const { goToLocation } = useGetHomeContainerLocationTo({
        pathArray: pathArray,
        layout: 'standard_place_overview',
    });
    const name = useSelector(selector_getDisplayName(id));
    return (
        <div onClick={goToLocation} className={classes.Breadcrumbs}>
            {name}
        </div>
    );
};

const PlaceOverviewContainerBreadcrumbsElWithoutLink = ({ id }: { id: string }): JSX.Element => {
    const classes = useStyles({ active: true });
    const name = useSelector(selector_getDisplayName(id));
    return <div className={classes.Breadcrumbs}>{name}</div>;
};

const PlaceOverviewBreadcrumbs = (hcPorps: I_UseHomeContainer_Result): JSX.Element => {
    const classes = useStyles({ active: true });
    return (
        <Breadcrumbs className={classes.root} separator="/" aria-label="breadcrumb">
            <PlaceOverviewContainerBreadcrumbsHome />
            {hcPorps.pathArray.map((e, index, arr) =>
                index === arr.length - 1 && !hcPorps.functionType ? (
                    <PlaceOverviewContainerBreadcrumbsElWithoutLink key={`Breadcrumbs12qw_${index}`} id={e} />
                ) : (
                    <PlaceOverviewContainerBreadcrumbsEl
                        key={`Breadcrumbs12qw_${index}`}
                        pathArray={arr.slice(0, index + 1)}
                        id={e}
                    />
                ),
            )}
            {hcPorps.functionType && <PlaceOverviewContainerBreadcrumbsElWithoutLink id={hcPorps.functionType} />}
        </Breadcrumbs>
    );
};

export default PlaceOverviewBreadcrumbs;
