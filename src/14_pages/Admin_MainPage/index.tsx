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
    switch (pathname) {
        case '/admin/location_backlist': {
            adminPageComponent = Admin_BlackListConfig;
            break;
        }
        case '/admin/t1': {
            adminPageComponent = T1;
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
    return <>{React.createElement(adminPageComponent)}</>;
};

const IOBAdminConnector = (): JSX.Element => {
    useRecoilValue<boolean>(servConnConnectedSelector);
    return <AdminRouter />;
};

const Admin_MainPage = (): JSX.Element => {
    useEffect(() => {
        useLoadSocket(servConnAdminCB);
    }, []);
    console.log('Admin_MainPage');
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <IOBAdminConnector />
        </React.Suspense>
    );
};

export default Admin_MainPage;
