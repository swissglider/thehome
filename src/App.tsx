import React, { PropsWithChildren, useEffect } from 'react';
import { MuiThemeProvider, useMediaQuery } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import FW_MainLayout from './14_pages/FW_MainPage';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import catalogDE from './31_locales/de/messages.js';
import { LANGUAGE } from './2_configuration/Application';

// React Router
import { BrowserRouter } from 'react-router-dom';

// lingui/react
i18n.load('de', catalogDE.messages);
i18n.activate(LANGUAGE);

// Recoil
import { RecoilRoot } from 'recoil';
import { TheHomeTheme } from './2_configuration/Theme';

export const WithProviders = (props: PropsWithChildren<{ id?: string }>): JSX.Element => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [light, setLight] = React.useState(prefersDarkMode);
    const theme = TheHomeTheme(light);

    useEffect(() => {
        setLight(prefersDarkMode);
    }, [prefersDarkMode]);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter basename="/thehome">
                <I18nProvider i18n={i18n}>
                    <RecoilRoot>{props.children}</RecoilRoot>
                </I18nProvider>
            </BrowserRouter>
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
            <FW_MainLayout />
        </WithProviders>
    );
};

export default App;
