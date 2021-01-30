import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: '100vw',
        },
        fullList: {
            width: 'auto',
        },
        root: {
            padding: theme.spacing(1.5),
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            flexWrap: 'nowrap',
        },
    }),
);

const SplashScreen = (): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.list} role="presentation">
            Hallo
        </div>
    );
};

export default SplashScreen;
