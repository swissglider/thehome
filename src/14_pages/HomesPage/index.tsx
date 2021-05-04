import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LocationDetailPage from '../LocationDetailPage';
import SensorDetailsPage from '../SensorDetailsPage';
import SensorTypeListPage from '../SensorTypeListPage';
import LocationOverviewPage from '../LocationOverviewPage';
import HomesOverviewPage from '../HomesOverviewPage';
import HomesTemplate from '../../13_templates/HomesTemplate';
import {
    useGetAllPathPropsFromLocation,
    useGetCurrentPathElementsFromLocation,
    useGetHistoryStateProsFromLocation,
    useGetHistroyProsFromPathElementPairs,
} from '../../20_hooks/PlaceOverviewHooks';
import { useSetRecoilState } from 'recoil';
import {
    currentPathElementsState,
    historyState,
    I_HistoryStateProps,
    titleBarSubElementState,
    T_TitleBarSubElements,
} from '../../32-recoil/framework/atoms';
import { mainTitleState } from '../../32-recoil/framework/atoms';
import LoadIOBDataToRedux from '../../21_utils/LoadIOBDataToRedux';
import { useSelector } from 'react-redux';
import { selector_getDisplayNamesAsPathElementPairs } from '../../30_redux/ioBrokerObjects/selectors';

const HomesPage_ = (): JSX.Element => {
    const pathProps = useGetAllPathPropsFromLocation();
    // set the Main Title State
    const setMainTitle = useSetRecoilState<string>(mainTitleState);
    const setTitleBarSubElement = useSetRecoilState<T_TitleBarSubElements>(titleBarSubElementState);
    useEffect(() => {
        setMainTitle('The Home');
        setTitleBarSubElement('breadcrumbs');
    }, []);

    // set the HomeHistory State
    const pathname = useLocation().pathname;
    const setHistoryArray = useSetRecoilState<I_HistoryStateProps[]>(historyState);
    const historyStateProps = useGetHistoryStateProsFromLocation();
    useEffect(() => {
        setHistoryArray((oldHistoryArray) => {
            if (pathProps.page === 'HomesOverviewPage' || pathProps.page === undefined) {
                return [historyStateProps];
            }
            return [...oldHistoryArray, historyStateProps];
        });
    }, [pathname]);

    // set the current PathElements State
    const setCurrentPathElements = useSetRecoilState<I_HistoryStateProps[]>(currentPathElementsState);
    const pathElements = useGetCurrentPathElementsFromLocation();

    // get the pageComponent
    let pageComponent: any;
    switch (pathProps.page) {
        case 'HomesOverviewPage': {
            pageComponent = HomesOverviewPage;
            break;
        }
        case 'LocationOverviewPage': {
            pageComponent = LocationOverviewPage;
            break;
        }
        case 'SensorTypeListPage': {
            pageComponent = SensorTypeListPage;
            if (pathProps.functionTypeID !== undefined) pathElements.push(pathProps.functionTypeID);
            break;
        }
        case 'SensorDetailsPage': {
            pageComponent = SensorDetailsPage;
            if (pathProps.functionTypeID !== undefined) pathElements.push(pathProps.functionTypeID);
            if (pathProps.deviceID !== undefined) pathElements.push(pathProps.deviceID);
            break;
        }
        case 'LocationDetailPage': {
            pageComponent = LocationDetailPage;
            break;
        }
        default: {
            pageComponent = HomesOverviewPage;
        }
    }

    const pathElementPairs = useSelector(selector_getDisplayNamesAsPathElementPairs(pathElements));
    const historyProps = useGetHistroyProsFromPathElementPairs(pathElementPairs);
    useEffect(() => {
        setCurrentPathElements(historyProps ?? []);
    }, [JSON.stringify(pathElementPairs)]);

    return (
        <>
            <HomesTemplate>
                <>{React.createElement(pageComponent)}</>
            </HomesTemplate>
        </>
    );
};

const HomesPage = (): JSX.Element => {
    return (
        <LoadIOBDataToRedux>
            <HomesPage_ />
        </LoadIOBDataToRedux>
    );
};

export default HomesPage;
