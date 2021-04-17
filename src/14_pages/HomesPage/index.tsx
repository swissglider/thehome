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
import { useGetHomeArrayFromLocation, useGetHomeLayoutFromLocation } from '../../20_hooks/HomeContainerHooks';

const PlaceOverview = (): JSX.Element => {
    const layout = useGetHomeLayoutFromLocation() ?? 'homes';

    let container: any;
    switch (layout) {
        case 'homes': {
            container = HomesOverviewPage;
            break;
        }
        case 'standard_place_overview': {
            container = LocationOverviewPage;
            break;
        }
        case 'standard_function_type_overview': {
            container = SensorTypeListPage;
            break;
        }
        case 'sensor_details_page': {
            container = SensorDetailsPage;
            break;
        }
        case 'location_detail': {
            container = LocationDetailPage;
            break;
        }
        default: {
            container = HomesOverviewPage;
        }
    }

    const BackComponent = (): JSX.Element | null => {
        const history = useHistory();
        const onClick = (): void => {
            history.goBack();
        };
        const homeArray = useGetHomeArrayFromLocation();
        if (history.length === 0 || homeArray === undefined) return <>&nbsp;</>;
        return <Button onClick={onClick}>Back</Button>;
    };

    useSetTitle('Home');
    useSetSubNavButtons([]);
    useSetLeftElement({});
    useSetRightComponent(<BackComponent />);

    return (
        <HomesTemplate>
            <>{React.createElement(container)}</>
        </HomesTemplate>
    );
};

export default PlaceOverview;
