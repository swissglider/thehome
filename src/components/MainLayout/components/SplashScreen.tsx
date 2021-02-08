import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Loader from 'react-loader-spinner';

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

interface I_SplashScreen_Props {
    ioBrokerStatus: string;
}

const SplashScreen = ({ ioBrokerStatus }: I_SplashScreen_Props): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.list} role="presentation">
            <div className={classes.root}>
                <div>Loading-Status: {ioBrokerStatus}</div>
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
