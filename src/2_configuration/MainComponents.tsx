import Admin_MainPage from '../14_pages/Admin_MainPage';
import HomesPage from '../14_pages/HomesPage';

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
export const MainComponentsConfiguration: I_MainComponentsConfiguration[] = [
    {
        label: 'Homes',
        value: 'homes',
        icon: 'home',
        to: '/homes',
        component: HomesPage,
        onMainBottomNavigation: true,
        onMoreMenuNavigation: false,
        linkActive: true,
        linkExact: false,
    },
    {
        label: 'Admin',
        value: 'admin',
        icon: 'admin_panel_settings',
        to: '/admin',
        component: Admin_MainPage,
        onMainBottomNavigation: false,
        onMoreMenuNavigation: true,
        linkActive: true,
        linkExact: false,
    },
];

export const DEFAULT_ROUTES = '/homes';

/**
 * Returns the link with label. If not available it returns the one with 'Home' Link
 * @param label
 */
export const getMainComponentsConfigurationByLabel = (label: string): I_MainComponentsConfiguration => {
    const link = MainComponentsConfiguration.find((button) => button.label === label);
    return link !== undefined ? link : MainComponentsConfiguration[0];
};
