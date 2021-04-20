import React from 'react';
import { Breadcrumbs, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useGetHomeContainerLocationTo } from '../../../20_hooks/PlaceOverviewHooks';
import { useRecoilValue } from 'recoil';
import { currentPathElementsState, I_HistoryStateProps } from '../../../32-recoil/framework/atoms';
import { useHistory } from 'react-router-dom';

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

const LocationOverviewContainerBreadcrumbsEl = ({ pathElement }: { pathElement: I_HistoryStateProps }): JSX.Element => {
    const classes = useStyles({ active: false });
    const history = useHistory();
    const onClick = (): void => {
        const location = {
            pathname: pathElement?.pathname,
        };
        history.push(location);
    };
    return (
        <div onClick={onClick} className={classes.Breadcrumbs}>
            {pathElement.displayName}
        </div>
    );
};

const LocationOverviewBreadcrumbs = (): JSX.Element => {
    const classes = useStyles({ active: true });
    const historyProps = [...useRecoilValue<I_HistoryStateProps[]>(currentPathElementsState)];

    return (
        <Breadcrumbs
            style={{ paddingLeft: 0, marginLeft: 0 }}
            className={classes.root}
            separator="/"
            aria-label="breadcrumb"
        >
            <LocationOverviewContainerBreadcrumbsHome />
            {historyProps.map((e, index) => (
                <LocationOverviewContainerBreadcrumbsEl key={`Breadcrumbs12qw_${index}`} pathElement={e} />
            ))}
        </Breadcrumbs>
    );
};

export default LocationOverviewBreadcrumbs;
