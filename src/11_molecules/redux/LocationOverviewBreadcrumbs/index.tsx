import React from 'react';
import { Breadcrumbs, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useGetHomeContainerLocationTo } from '../../../20_hooks/PlaceOverviewHooks';
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

const LocationOverviewContainerBreadcrumbsEl = ({
    test_todo,
    id,
}: {
    test_todo: string[];
    id: string;
}): JSX.Element => {
    const classes = useStyles({ active: false });
    const { goToLocation } = useGetHomeContainerLocationTo({
        page: 'LocationOverviewPage',
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
    const test_todo: string[] = [];

    return (
        <Breadcrumbs className={classes.root} separator="/" aria-label="breadcrumb">
            <LocationOverviewContainerBreadcrumbsHome />
            {test_todo.map((e, index, arr) =>
                index === arr.length - 1 || !e.startsWith('enum.') ? (
                    <LocationOverviewContainerBreadcrumbsElWithoutLink key={`Breadcrumbs12qw_${index}`} id={e} />
                ) : (
                    <LocationOverviewContainerBreadcrumbsEl
                        key={`Breadcrumbs12qw_${index}`}
                        test_todo={arr.slice(0, index + 1)}
                        id={e}
                    />
                ),
            )}
        </Breadcrumbs>
    );
};

export default LocationOverviewBreadcrumbs;
