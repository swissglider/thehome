import React, { useEffect, useState } from 'react';
import { createMuiTheme, MuiThemeProvider, useMediaQuery } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainLayout from './components/MainLayout';
import SplashScreen from './components/MainLayout/components/SplashScreen';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_IOBROKER_INIT } from './features/servConn/actions';
import { selector_getConnectionStatus, selector_getHomeContainersLoaded } from './features/servConn/selectors';
import { AppDispatch } from './redux/Store';
import { useGenerateCategoryFunctionsMap } from './components/PlaceOverview/hooks/FunctionCategoryHooks';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import catalogDE from './locales/de/messages.js';
import { LANGUAGE } from './configuration/Application';

// i18n.load('en', catalogEN.messages);
i18n.load('de', catalogDE.messages);
i18n.activate(LANGUAGE);

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

const _App = (): JSX.Element => {
    useGenerateCategoryFunctionsMap();
    return (
        <I18nProvider i18n={i18n}>
            <MainLayout />
        </I18nProvider>
    );
};

const App = (): JSX.Element => {
    const [statesLoaded, setStatesLoaded] = useState<boolean>(false);
    const [containerLoaded, setContainerLoaded] = useState<boolean>(false);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [light, setLight] = React.useState(prefersDarkMode);
    const theme = themeDark(light);
    const dispatch: AppDispatch = useDispatch();

    window.addEventListener('isUpdateAvailabel', (test: any) => {
        // Information to show when updates are here for this app..
        test;
    });
    const ioBrokerServConnStatus = useSelector(selector_getConnectionStatus());
    const ioBrokerServConnHomeContainerStatus: boolean = useSelector(selector_getHomeContainersLoaded());

    const loadSocket = () => {
        const script = document.createElement('script');

        script.src = process.env.NODE_ENV === 'production' ? '/thehome/js/services/conn.js' : '/js/services/conn.js';
        script.async = true;
        script.onload = () => dispatch<any>(ACTION_IOBROKER_INIT);
        document.body.appendChild(script);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src =
            process.env.NODE_ENV === 'production' ? `/thehome/js/services/socket.io.js` : `/js/services/socket.io.js`;
        script.async = true;
        script.onload = () => loadSocket();
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        setLight(prefersDarkMode);
    }, [prefersDarkMode]);

    useEffect(() => {
        console.log('ioBroker Connection Status: ' + ioBrokerServConnStatus);
        if (ioBrokerServConnStatus === 'connected') {
            setStatesLoaded(false);
        }
        if (ioBrokerServConnStatus === 'loaded') {
            setStatesLoaded(true);
        }
        if (ioBrokerServConnStatus === 'none') {
            setStatesLoaded(false);
        }
        if (ioBrokerServConnStatus === 'loading') {
            setStatesLoaded(false);
        }
    }, [ioBrokerServConnStatus]);

    useEffect(() => {
        setContainerLoaded(ioBrokerServConnHomeContainerStatus);
    }, [ioBrokerServConnHomeContainerStatus]);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {statesLoaded && containerLoaded ? <_App /> : <SplashScreen />}
        </MuiThemeProvider>
    );
};

export default App;
