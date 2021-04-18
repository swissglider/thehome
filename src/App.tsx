import React, { PropsWithChildren, useEffect, useState } from 'react';
import {
    unstable_createMuiStrictModeTheme as createMuiTheme,
    MuiThemeProvider,
    useMediaQuery,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainLayout from './1_framework/MainLayout';
import SplashScreen from './1_framework/MainLayout/components/SplashScreen';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_IOBROKER_INIT } from './30_redux/servConn/actions';
import { selector_getConnectionStatus, selector_getHomeContainersLoaded } from './30_redux/servConn/selectors';
import { AppDispatch } from './30_redux/Store';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import catalogDE from './31_locales/de/messages.js';
import { LANGUAGE } from './2_configuration/Application';

// REDUX
import { Provider } from 'react-redux';
import { store } from './30_redux/Store';
import { BrowserRouter } from 'react-router-dom';
// import { IOBROKER_SERV_CONN_SET_FUNCTION_TYPES } from './features/servConn/slice';

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
        typography: {
            body2: {
                fontSize: '0.9rem',
                fontWeight: 400,
            },
            body1: {
                fontSize: '0.8rem',
            },
            subtitle2: {
                fontSize: '0.9rem',
                fontWeight: 600,
            },
            subtitle1: {
                fontSize: '1.0rem',
                fontWeight: 600,
                opacity: 0.7,
            },
        },
    });

export const LoadStateManagementData = ({ children }: PropsWithChildren<{ id?: string }>): JSX.Element => {
    const [statesLoaded, setStatesLoaded] = useState<boolean>(false);
    const [containerLoaded, setContainerLoaded] = useState<boolean>(false);

    const dispatch: AppDispatch = useDispatch();

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
    // return <>{statesLoaded && containerLoaded && children}</>;
    return (
        <>
            {statesLoaded && containerLoaded ? (
                <I18nProvider i18n={i18n}>
                    <BrowserRouter basename="/thehome">{children}</BrowserRouter>
                </I18nProvider>
            ) : (
                <SplashScreen />
            )}
        </>
    );
};

export const WithProviders = (props: PropsWithChildren<{ id?: string }>): JSX.Element => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [light, setLight] = React.useState(prefersDarkMode);
    const theme = themeDark(light);

    useEffect(() => {
        setLight(prefersDarkMode);
    }, [prefersDarkMode]);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>{props.children}</Provider>
        </MuiThemeProvider>
    );
};

const App = (): JSX.Element => {
    window.addEventListener('isUpdateAvailabel', (test: any) => {
        // Information to show when updates are here for this app..
        test;
    });

    return (
        <WithProviders>
            <LoadStateManagementData>
                <MainLayout />
            </LoadStateManagementData>
        </WithProviders>
    );
};

export default App;
