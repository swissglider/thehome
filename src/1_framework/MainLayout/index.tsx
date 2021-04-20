import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { MainComponentsConfiguration } from '../../2_configuration/MainComponents';
import MainBottomNavigation from './components/MainBottomNavigation';
import MainContent from './components/MainContent';
import TitleBar from '../../11_molecules/recoil/FW_TitleBar';

const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(19),
            marginBottom: theme.spacing(10),
        },
    }),
);

const MainLayout = (): JSX.Element => {
    const classes = useStyles1();
    return (
        <div className={classes.root}>
            <TitleBar />
            <MainContent />
            {MainComponentsConfiguration.find((c) => c.onMainBottomNavigation) !== undefined && (
                <MainBottomNavigation />
            )}
        </div>
    );
};

export default MainLayout;
