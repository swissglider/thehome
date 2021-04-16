import React from 'react';
import { Breadcrumbs, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useGetHomeContainerLocationTo } from '../../../20_hooks/PlaceOverviewHooks';
import { selector_getDisplayName } from '../../../30_redux/ioBrokerObjects/selectors';
import { useGetHomeArrayFromLocation } from '../../../20_hooks/HomeContainerHooks';

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
    const { goToLocation } = useGetHomeContainerLocationTo({
        pathArray: [],
    });
    return (
        <div onClick={goToLocation} className={classes.Breadcrumbs}>
            Home
        </div>
    );
};

const LocationOverviewContainerBreadcrumbsEl = ({
    pathArray,
    id,
}: {
    pathArray: string[];
    id: string;
}): JSX.Element => {
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

const LocationOverviewContainerBreadcrumbsElWithoutLink = ({ id }: { id: string }): JSX.Element => {
    const classes = useStyles({ active: true });
    const name = useSelector(selector_getDisplayName(id));
    return <div className={classes.Breadcrumbs}>{name}</div>;
};

const LocationOverviewBreadcrumbs = (): JSX.Element => {
    const classes = useStyles({ active: true });
    const pathArray: string[] = [...(useGetHomeArrayFromLocation() ?? [])];

    // filters out the function name for the SensorDetailsPage
    if (
        pathArray[pathArray.length - 1] !== undefined &&
        pathArray[pathArray.length - 1].startsWith('enum.functions.')
    ) {
        if (pathArray[pathArray.length - 2] !== undefined && !pathArray[pathArray.length - 2].startsWith('enum.')) {
            pathArray.pop();
        }
    }

    return (
        <Breadcrumbs className={classes.root} separator="/" aria-label="breadcrumb">
            <LocationOverviewContainerBreadcrumbsHome />
            {pathArray.map((e, index, arr) =>
                index === arr.length - 1 || !e.startsWith('enum.') ? (
                    <LocationOverviewContainerBreadcrumbsElWithoutLink key={`Breadcrumbs12qw_${index}`} id={e} />
                ) : (
                    <LocationOverviewContainerBreadcrumbsEl
                        key={`Breadcrumbs12qw_${index}`}
                        pathArray={arr.slice(0, index + 1)}
                        id={e}
                    />
                ),
            )}
        </Breadcrumbs>
    );
};

export default LocationOverviewBreadcrumbs;
