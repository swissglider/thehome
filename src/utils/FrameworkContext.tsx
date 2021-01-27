import React from 'react';

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

export interface I_LoggedInUser {
    name?: string;
    avatar?: string;
}

export interface I_Framework {
    title: string;
    subNavButtons: I_SubNavButton[];
    user?: I_LoggedInUser;
    component?: any; // shows a component
}

export interface I_FrameworkContextValue {
    frameworkContext?: I_Framework;
    setFrameworkContext?: any;
}

export const FrameworkContext = React.createContext<any[]>([{}, {}]);
