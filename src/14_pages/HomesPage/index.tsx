import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    useSetTitle,
    useSetSubNavButtons,
    useSetLeftElement,
    useSetRightComponent,
} from '../../21_utils/FrameworkContext';
import LocationDetailPage from '../LocationDetailPage';
import SensorDetailsPage from '../SensorDetailsPage';
import SensorTypeListPage from '../SensorTypeListPage';
import LocationOverviewPage from '../LocationOverviewPage';
import HomesOverviewPage from '../HomesOverviewPage';
import HomesTemplate from '../../13_templates/HomesTemplate';
import { useGetAllPathPropsFromLocation, useGetHomeContainerLocationTo } from '../../20_hooks/PlaceOverviewHooks';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { homesHistoryState, T_Home_History } from '../../32-recoil/homes/atoms';
import { selector_getDisplayName } from '../../30_redux/ioBrokerObjects/selectors';
import { useSelector } from 'react-redux';
import { BACKWARD_ICON } from '../../2_configuration/Icons';
import SimpleButton from '../../10_atoms/base/SimpleButton';

const PlaceOverview = (): JSX.Element => {
    const pathname = useLocation().pathname;
    const pathProps = useGetAllPathPropsFromLocation();
    const setHistoryArray = useSetRecoilState<T_Home_History>(homesHistoryState);
    useEffect(() => {
        setHistoryArray((oldHistoryArray) => [...oldHistoryArray, pathProps]);
    }, [pathname]);

    let page: any;
    switch (pathProps.page) {
        case 'HomesOverviewPage': {
            page = HomesOverviewPage;
            break;
        }
        case 'LocationOverviewPage': {
            page = LocationOverviewPage;
            break;
        }
        case 'SensorTypeListPage': {
            page = SensorTypeListPage;
            break;
        }
        case 'SensorDetailsPage': {
            page = SensorDetailsPage;
            break;
        }
        case 'LocationDetailPage': {
            page = LocationDetailPage;
            break;
        }
        default: {
            page = HomesOverviewPage;
        }
    }

    const BackComponent = (): JSX.Element | null => {
        const [historyArray, setHistoryArray] = useRecoilState(homesHistoryState);
        const tempHA = [...historyArray];
        tempHA.pop();
        const lastElement = tempHA.pop();
        const { goToLocation } = useGetHomeContainerLocationTo(lastElement ?? {});
        const id = lastElement?.deviceID
            ? lastElement.deviceID
            : lastElement?.functionTypeID
            ? lastElement.functionTypeID
            : lastElement?.locationID
            ? lastElement.locationID
            : '';
        const name = useSelector(selector_getDisplayName(id)) ?? 'Home';
        const onClick = (): void => {
            setHistoryArray(tempHA);
            goToLocation();
        };

        if (lastElement === undefined || pathProps.page === 'HomesOverviewPage') return <>&nbsp;</>;
        return <SimpleButton onClick={onClick} variant="text" size="medium" text={name} startIcon={BACKWARD_ICON} />;
    };

    useSetTitle('Home');
    useSetSubNavButtons([]);
    useSetLeftElement({});
    useSetRightComponent(<BackComponent />);

    return (
        <HomesTemplate>
            <>{React.createElement(page)}</>
        </HomesTemplate>
    );
};

export default PlaceOverview;
