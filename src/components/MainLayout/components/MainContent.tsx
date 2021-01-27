import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles, Theme } from '@material-ui/core/styles';
import SubNavigationButtons from './SubNavigationButtons';
import { Redirect, Route, Switch } from 'react-router-dom';
import { I_MainComponentsConfiguration, MainComponentsConfiguration } from '../../../configuration/MainComponents';

interface StyleProps {
    scrollPos: number;
    marginStartValue: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: (props: StyleProps) => {
            return {
                marginTop: props.marginStartValue + theme.spacing(5),
            };
        },
        subContent: {
            marginTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
        },
    }),
);

export interface MainContentProps {
    scrollPos: number;
    marginStartValue: number;
}

const MainContent = (props: MainContentProps): JSX.Element => {
    const classes = useStyles({ scrollPos: props.scrollPos, marginStartValue: props.marginStartValue });

    const buttons: I_MainComponentsConfiguration[] = MainComponentsConfiguration;

    return (
        <div className={classes.content}>
            <SubNavigationButtons />
            <div className={classes.subContent}>
                <Switch>
                    {buttons
                        .filter((button) => button.linkActive)
                        .map((button: I_MainComponentsConfiguration, index: number) => (
                            <Route
                                key={`MainContent_${index}`}
                                exact={button.linkExact}
                                path={button.to}
                                component={button.component}
                            />
                        ))}
                    <Redirect to="/" />
                </Switch>
            </div>
        </div>
    );
};

export default MainContent;
