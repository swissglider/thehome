import React, { useEffect } from 'react';
import { createMuiTheme, MuiThemeProvider, useMediaQuery } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainLayout from './components/MainLayout';
import SplashScreen from './components/MainLayout/components/SplashScreen';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_IOBROKER_INIT } from './components/PlaceOverview/features/servConn/actions';
import { selector_getConnectionStatus } from './components/PlaceOverview/features/servConn/selectors';

const themeDark = (prefersDarkMode: boolean) =>
    createMuiTheme({
        palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            // background: {
            //     default: '#f5f5f5',
            // },
            // text: {
            //     primary: '#ffffff',
            // },
            // darkBG: {
            //     main: blueGrey[900],
            // },
            secondary: {
                light: '#a98274',
                main: '#795548',
                dark: '#4b2c20',
                contrastText: '#ffffff',
            },
        },
    });

const App = (): JSX.Element => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [light, setLight] = React.useState(prefersDarkMode);
    const theme = themeDark(light);
    const dispatch = useDispatch();

    window.addEventListener('isUpdateAvailabel', (test: any) => {
        // Information to show when updates are here for this app..
        test;
    });
    const ioBrokerServConnStatus = useSelector(selector_getConnectionStatus());

    const appLoaded = ioBrokerServConnStatus === 'loaded';

    const loadSocket = () => {
        const script = document.createElement('script');
        script.src = '/js/services/conn.js';
        script.async = true;
        script.onload = () => dispatch(ACTION_IOBROKER_INIT);
        document.body.appendChild(script);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `/js/services/socket.io.js`;
        script.async = true;
        script.onload = () => loadSocket();
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        setLight(prefersDarkMode);
    }, [prefersDarkMode]);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {appLoaded ? <MainLayout /> : <SplashScreen />}
        </MuiThemeProvider>
    );
};

export default App;
