import FireStoreTest2 from '../components/FB_Links';
import FireStoreTest from '../components/FireStoreTest';
import Posts from '../components/Posts';

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
        label: 'FireStoreTest',
        value: 'fireTest',
        icon: 'local_fire_department',
        to: '/fireTest',
        component: FireStoreTest,
        onMainBottomNavigation: false,
        linkActive: true,
        linkExact: false,
    },
    {
        label: 'Links',
        value: 'fireTest2',
        icon: 'link',
        to: '/fireTest2',
        component: FireStoreTest2,
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
