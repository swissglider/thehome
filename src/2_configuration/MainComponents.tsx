import React from 'react';
import MoreMenu from '../1_framework/MainLayout/components/MoreMenu';
import PlaceOverview from '../14_pages/HomesPage';

export interface I_MainComponentsConfiguration {
    label: string;
    value: string;
    icon: string;
    to: string;
    component: any;
    onMainBottomNavigation?: boolean; // if it should be showed on the MainBottomMenu (default false)
    onMoreMenuNavigation?: boolean; // if it should be showed on the MoreMenu Component (default false)
    linkActive?: boolean; // if it should be acitve on the router (default false)
    linkExact?: boolean; // default false
}

// to be filled
const MainComponentsConfiguration_: I_MainComponentsConfiguration[] = [
    {
        label: 'Homes',
        value: 'homes',
        icon: 'home',
        to: '/homes',
        component: PlaceOverview,
        onMainBottomNavigation: true,
        onMoreMenuNavigation: false,
        linkActive: true,
        linkExact: false,
    },
];

// nothing to do
export const generateMainComponentConfiguration = (): I_MainComponentsConfiguration[] => {
    if (MainComponentsConfiguration_.find((c) => c.to === '/') === undefined) {
        MainComponentsConfiguration_.unshift({
            label: 'Home',
            value: '',
            icon: 'home',
            to: '/',
            component:
                MainComponentsConfiguration_[0] && MainComponentsConfiguration_[0].component ? (
                    MainComponentsConfiguration_[0].component
                ) : (
                    <div>This is the default home</div>
                ),
            onMoreMenuNavigation: true,
            linkActive: true,
            linkExact: true,
        });
    }
    if (MainComponentsConfiguration_.find((c) => c.onMoreMenuNavigation) !== undefined) {
        MainComponentsConfiguration_.push({
            label: 'More',
            value: 'moreMenu',
            icon: 'more_horiz',
            to: '/moremenu',
            component: MoreMenu,
            onMainBottomNavigation: true,
            onMoreMenuNavigation: false,
            linkActive: true,
            linkExact: false,
        });
    }
    return MainComponentsConfiguration_;
};

export const MainComponentsConfiguration = generateMainComponentConfiguration();

/**
 * Returns the link with label. If not available it returns the one with 'Home' Link
 * @param label
 */
export const getMainComponentsConfigurationByLabel = (label: string): I_MainComponentsConfiguration => {
    const link = MainComponentsConfiguration.find((button) => button.label === label);
    return link !== undefined ? link : MainComponentsConfiguration[0];
};
