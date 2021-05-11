import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    historyState,
    mainTitleState,
    titleBarMenuButtonsState,
    titleBarSubElementState,
    T_TitleBarSubElements,
} from '../../32-recoil/framework/atoms';
import { useLoadSocket } from '../../20_hooks/IOBrokerScriptLoader';
import { servConnAdminCB } from '../../32-recoil/admin/IOBConnectionServies';
import { servConnConnectedSelector } from '../../32-recoil/admin/atomServerConnection';
import { useLocation } from 'react-router-dom';
import AdminHome from '../Admin_Home';
import Admin_BlackListConfig from '../Admin_BlackListConfig';
import { I_LinksConfiguration, SubComponentsConfiguration } from '../../2_configuration/MainComponents';
import Admin_LocationConfig from '../Admin_LocationConfig';

const T1 = (): JSX.Element => {
    return (
        <>
            hallo
            {/* <Page5 /> */}
        </>
    );
};

const AdminRouter = (): JSX.Element => {
    const setMainTitle = useSetRecoilState<string>(mainTitleState);
    const setTitleBarSubElement = useSetRecoilState<T_TitleBarSubElements>(titleBarSubElementState);
    const setTitleBarMenuButtonsState = useSetRecoilState<I_LinksConfiguration[]>(titleBarMenuButtonsState);
    const setHistoryState = useSetRecoilState(historyState);
    useEffect(() => {
        setMainTitle('Admin - Panel');
        setTitleBarSubElement('menubuttons');
        const adminMenu = SubComponentsConfiguration.find((e) => e.label === 'AdminList');
        setTitleBarMenuButtonsState(adminMenu?.subMenu ? adminMenu.subMenu : []);
        setHistoryState([]);
    }, []);

    const pathname = useLocation().pathname;
    let adminPageComponent: any;
    // eslint-disable-next-line @typescript-eslint/ban-types
    let adminPageComponentProps: {} | null = null;
    switch (pathname) {
        case '/admin/location_backlist': {
            adminPageComponent = Admin_BlackListConfig;
            break;
        }
        case '/admin/location_config_switch': {
            adminPageComponent = Admin_LocationConfig;
            adminPageComponentProps = {
                locationSensorBox: 'switch',
                title: 'Location Overview Switch List Configuration',
                info:
                    'Here you can add iob functions to the Switch list and sort them. The Switchlist is used on the location overview',
            };
            break;
        }
        case '/admin/location_config_boolean': {
            adminPageComponent = Admin_LocationConfig;
            adminPageComponentProps = {
                locationSensorBox: 'boolean',
                title: 'Location Overview Boolean List Configuration',
                info:
                    'Here you can add iob functions to the Boolean list and sort them. The Booleanlist is used on the location overview',
            };
            break;
        }
        case '/admin/location_config_allboolean': {
            adminPageComponent = Admin_LocationConfig;
            adminPageComponentProps = {
                locationSensorBox: 'allboolean',
                title: 'All Boolean to been showned',
                info:
                    'Here you can add iob functions to the allBoolean list and sort them. This list defines the iob function that should be proceeded as boolean (also switches)',
            };
            break;
        }
        case '/admin/location_config_number1': {
            adminPageComponent = Admin_LocationConfig;
            adminPageComponentProps = {
                locationSensorBox: 'number1',
                title: 'Number Sensors first row',
                info:
                    'Here you can add iob functions to the number1 list and sort them. The first number sensor list on the location overview box',
            };
            break;
        }
        case '/admin/location_config_number2': {
            adminPageComponent = Admin_LocationConfig;
            adminPageComponentProps = {
                locationSensorBox: 'number2',
                title: 'Number Sensors second row',
                info:
                    'Here you can add iob functions to the number2 list and sort them. The second number sensor list on the location overview box',
            };
            break;
        }
        case '/admin/t2': {
            adminPageComponent = T1;
            break;
        }
        default: {
            adminPageComponent = AdminHome;
            break;
        }
    }

    return <>{React.createElement(adminPageComponent, adminPageComponentProps)}</>;
};

const IOBAdminConnector = (): JSX.Element => {
    useRecoilValue<boolean>(servConnConnectedSelector);
    return <AdminRouter />;
};

const Admin_MainPage = (): JSX.Element => {
    useEffect(() => {
        useLoadSocket(servConnAdminCB);
    }, []);

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <IOBAdminConnector />
        </React.Suspense>
    );
};

export default Admin_MainPage;
