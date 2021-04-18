import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
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
import { useGetPageFromLocation } from '../../20_hooks/PlaceOverviewHooks';

const PlaceOverview = (): JSX.Element => {
    const page_ = useGetPageFromLocation();

    let page: any;
    switch (page_) {
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
        const history = useHistory();
        const onClick = (): void => {
            history.goBack();
        };
        if (history.length === 0 || page_ === 'HomesOverviewPage') return <>&nbsp;</>;
        return <Button onClick={onClick}>Back</Button>;
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
