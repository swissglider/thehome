import React from 'react';
import { Container, Toolbar, useScrollTrigger } from '@material-ui/core';
import FW_MainRouter from '../FW_MainRouter';
import FW_TitleBar from '../../11_molecules/recoil/FW_TitleBar';
import MainBottomNavigation from '../../12_organisms/base/FW_MainBottomNavigation';

interface Props {
    children: React.ReactElement;
}

function ElevationScroll(props: Props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const FW_MainLayout = (): JSX.Element => {
    return (
        <>
            <ElevationScroll>
                <FW_TitleBar />
            </ElevationScroll>
            <Toolbar />
            <Toolbar />
            <Container>
                <FW_MainRouter />
            </Container>
            <Toolbar />
            <ElevationScroll>
                <MainBottomNavigation />
            </ElevationScroll>
        </>
    );
};

export default FW_MainLayout;
