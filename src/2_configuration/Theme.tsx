import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const TheHomeTheme = (prefersDarkMode: boolean) =>
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
