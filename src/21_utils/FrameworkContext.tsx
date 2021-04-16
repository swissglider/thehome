import React, { useContext, useEffect } from 'react';

export interface I_SubNavButton {
    title: string;
    icon: string;
    className?: string;
    color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
    to: string;
}

export interface I_ToolBarAction {
    title: string;
    component: JSX.Element;
}

export interface I_LeftMenuListItem {
    name: string;
    icon?: string;
    to: string;
    // divider?: boolean;
    // menuList?: I_LeftMenuListItem[];
}

export interface I_LeftComponent {
    name?: string;
    icon?: string;
    menuList?: I_LeftMenuListItem[][];
    fullWidth?: boolean;
}

export interface I_Framework {
    title: string;
    subNavButtons: I_SubNavButton[];
    leftElement?: I_LeftComponent;
    rightComponent?: any; // shows a component
}

export interface I_FrameworkContextValue {
    frameworkContext?: I_Framework;
    setFrameworkContext?: any;
}

export const FrameworkContext = React.createContext<any[]>([{}, {}]);

export const useSetTitle = (title: string): void => {
    const [context, setContext] = useContext(FrameworkContext);

    useEffect(() => {
        const context_ = { ...context };
        context_.title = title;
        setContext(context_);
    }, []);
};

export const useSetSubNavButtons = (subNavButtons: I_SubNavButton[]): void => {
    const [context, setContext] = useContext(FrameworkContext);

    useEffect(() => {
        const context_ = { ...context };
        context_.subNavButtons = subNavButtons;
        setContext(context_);
    }, []);
};

export const useSetLeftElement = (leftElement: I_LeftComponent): void => {
    const [context, setContext] = useContext(FrameworkContext);

    useEffect(() => {
        const context_ = { ...context };
        context_.leftElement = leftElement;
        setContext(context_);
    }, []);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSetRightComponent = (rightComponent: any): void => {
    const [context, setContext] = useContext(FrameworkContext);

    useEffect(() => {
        const context_ = { ...context };
        context_.rightComponent = rightComponent;
        setContext(context_);
    }, []);
};
