import Posts from '../components/Posts';
import TestIOBroker from '../components/TestIOBroker';

export interface I_MainComponentsConfiguration {
    label: string;
    value: string;
    icon: string;
    to: string;
    component: any;
    onMainBottomNavigation: boolean;
    linkActive: boolean;
    linkExact: boolean;
}
export const MainComponentsConfiguration: I_MainComponentsConfiguration[] = [
    {
        label: 'Home',
        value: '',
        icon: 'restore',
        to: '/',
        component: Posts,
        onMainBottomNavigation: false,
        linkActive: true,
        linkExact: true,
    },
    {
        label: 'Posts',
        value: 'posts',
        icon: 'email',
        to: '/posts',
        component: Posts,
        onMainBottomNavigation: true,
        linkActive: true,
        linkExact: false,
    },
    {
        label: 'TestIOBroker',
        value: 'testiobroker',
        icon: 'email',
        to: '/testiobroker',
        component: TestIOBroker,
        onMainBottomNavigation: true,
        linkActive: true,
        linkExact: false,
    },
];

/**
 * Returns the link with label. If not available it returns the one with 'Home' Link
 * @param label
 */
export const getMainComponentsConfigurationByLabel = (label: string): I_MainComponentsConfiguration => {
    const link = MainComponentsConfiguration.find((button) => button.label === label);
    return link !== undefined ? link : MainComponentsConfiguration[0];
};
