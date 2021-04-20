import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { selector_getStatesStatus } from '../../30_redux/ioBrokerStates/selectors';
import { selector_getObjectsStatus } from '../../30_redux/ioBrokerObjects/selectors';
import { selector_getConnectionStatus } from '../../30_redux/servConn/selectors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: '100vw',
        },
        root: {
            padding: theme.spacing(1.5),
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            flexWrap: 'nowrap',
        },
        stati: {
            padding: theme.spacing(1.5),
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            flexWrap: 'nowrap',
        },
    }),
);

const SplashScreen = (): JSX.Element => {
    const classes = useStyles();
    const ioBrokerStatus = useSelector(selector_getConnectionStatus());
    const statesStatus = useSelector(selector_getStatesStatus());
    const objectsStatus = useSelector(selector_getObjectsStatus());

    return (
        <div className={classes.list} role="presentation">
            <div className={classes.root}>
                <div className={classes.stati}>
                    <div>States-Status: {statesStatus}</div>
                    <div>Objects-Status: {objectsStatus}</div>
                    <div>Loading-Status: {ioBrokerStatus}</div>
                </div>
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={30}
                    width={30}
                    // timeout={3000} //3 secs
                />
            </div>
        </div>
    );
};

export default SplashScreen;
