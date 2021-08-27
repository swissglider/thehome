import Admin_MainPage from '../14_pages/Admin_MainPage';
import HomesPage from '../14_pages/HomesPage';
import { BLACKLIST_ICON, HOME_ICON, LOCATION_ICON, SETTINGS_ICON, SWITCH_ICON } from './Icons';

export interface I_LinksConfiguration {
    label: string;
    value?: string;
    info?: string;
    icon?: string;
    to?: string;
    endIcon?: string;
    color?: 'default' | 'inherit' | 'primary' | 'secondary';
    subMenu?: I_LinksConfiguration[];
}

export interface I_MainComponentsConfiguration extends I_LinksConfiguration {
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
        icon: HOME_ICON,
        to: '/homes',
        component: HomesPage,
        onMainBottomNavigation: true,
        onMoreMenuNavigation: true,
        linkActive: true,
        linkExact: false,
    },
    {
        label: 'Admin',
        value: 'admin',
        icon: SETTINGS_ICON,
        to: '/admin',
        component: Admin_MainPage,
        onMainBottomNavigation: false,
        onMoreMenuNavigation: true,
        linkActive: true,
        linkExact: false,
    },
];

export const SubComponentsConfiguration: I_LinksConfiguration[] = [
    {
        label: 'AdminList',
        icon: SETTINGS_ICON,
        subMenu: [
            {
                label: 'Home',
                info: 'Admin Home',
                icon: HOME_ICON,
                subMenu: [
                    { label: 'Home', info: 'Admin Home', to: '/admin/home', icon: HOME_ICON },
                    {
                        label: 'Adapter Configs',
                        info: 'General Adapter Configurations',
                        to: '/admin/general_adapter_configurations',
                        icon: HOME_ICON,
                    },
                ],
            },
            {
                label: 'GUI Config',
                icon: LOCATION_ICON,
                info: 'for Location View',
                subMenu: [
                    { label: 'Location: Switch List', to: '/admin/location_config_switch', icon: SWITCH_ICON },
                    { label: 'Location: Boolean List', to: '/admin/location_config_boolean', icon: SWITCH_ICON },
                    { label: 'Location: allBoolean List', to: '/admin/location_config_allboolean', icon: SWITCH_ICON },
                    { label: 'Location: Number1 List', to: '/admin/location_config_number1', icon: SWITCH_ICON },
                    {
                        label: 'Location: Number2 List',
                        to: '/admin/location_config_number2',
                        icon: SWITCH_ICON,
                    },
                    {
                        label: 'BlackList',
                        to: '/admin/location_backlist',
                        info: 'Blacklist der Sensors',
                        icon: BLACKLIST_ICON,
                    },
                ],
            },
            {
                label: 'BlackList',
                to: '/admin/location_backlist',
                info: 'Blacklist der Sensors',
                icon: BLACKLIST_ICON,
            },
        ],
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
