import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
    DEFAULT_ROUTES,
    I_MainComponentsConfiguration,
    MainComponentsConfiguration,
} from '../../2_configuration/MainComponents';

const FW_MainRouter = (): JSX.Element => {
    const configurations: I_MainComponentsConfiguration[] = MainComponentsConfiguration;

    return (
        <Switch>
            {configurations
                .filter((config1) => config1.linkActive !== undefined && config1.linkActive)
                .map((config: I_MainComponentsConfiguration, index: number) => (
                    <Route
                        key={`MainContent_${index}`}
                        exact={config.linkExact !== undefined && config.linkExact}
                        path={config.to}
                        component={config.component}
                    />
                ))}
            <Redirect to={DEFAULT_ROUTES ?? '/'} />
        </Switch>
    );
};

export default FW_MainRouter;
