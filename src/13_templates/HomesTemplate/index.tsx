import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import LocationOverviewBreadcrumbs from '../../11_molecules/redux/LocationOverviewBreadcrumbs';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        classes1: {
            display: 'flex',
            paddingLeft: theme.spacing(1),
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
        },
        classes2: ({ classesProps1 }: { classesProps1?: string }) => {
            return {
                alignItems: classesProps1 ?? '',
            };
        },
        root: {
            paddingLeft: '25px',
            paddingRight: '25px',
        },
    }),
);

const HomesTemplate = (props: { children: JSX.Element }): JSX.Element => {
    const classes = useStyles({ classesProps1: '' });
    return (
        <>
            <LocationOverviewBreadcrumbs />
            <div className={classes.root}>{props.children}</div>
        </>
    );
};

export default HomesTemplate;
