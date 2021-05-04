import React from 'react';
import { Backdrop, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { selector_getStatesStatus } from '../../30_redux/ioBrokerStates/selectors';
import { selector_getObjectsStatus } from '../../30_redux/ioBrokerObjects/selectors';
import { selector_getConnectionStatus } from '../../30_redux/servConn/selectors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

const SplashScreen = (): JSX.Element => {
    const classes = useStyles();
    const ioBrokerStatus = useSelector(selector_getConnectionStatus());
    const statesStatus = useSelector(selector_getStatesStatus());
    const objectsStatus = useSelector(selector_getObjectsStatus());

    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={30}
                        width={30}
                        // timeout={3000} //3 secs
                    />
                </Grid>
                <Grid item>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid>
                            <div>States-Status: {statesStatus}</div>
                        </Grid>
                        <Grid>
                            <div>Objects-Status: {objectsStatus}</div>
                        </Grid>
                        <Grid>
                            <div>Loading-Status: {ioBrokerStatus}</div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Backdrop>
    );
};

export default SplashScreen;
