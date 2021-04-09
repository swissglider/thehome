import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import FieldsetBorders from '../../utils/FieldsetBorders';
import {
    useSetTitle,
    useSetSubNavButtons,
    useSetLeftElement,
    useSetRightComponent,
} from '../../utils/FrameworkContext';
import PlaceDetail from './components/PlaceDetail';
import PlaceOverviewBreadcrumbs from './components/PlaceOverviewBreadcrumbs';
import SensorDetailsPage from '../../pages/SensorDetailsPage';
import { useHomeContainer } from '../../hooks/PlaceOverviewHooks';
import SensorTypeListPage from '../../pages/SensorTypeListPage';
import LocationOverviewPage from '../../pages/LocationOverviewPage';
import HomesOverviewPage from '../../pages/HomesOverviewPage';

const COMPONENTNAME = 'PlaceOverview';

const PlaceOverview = (): JSX.Element => {
    const hcPorps = useHomeContainer();

    let container: any;
    switch (hcPorps.layout) {
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
        case 'place_detail': {
            container = PlaceDetail;
            break;
        }
        default: {
            container = HomesOverviewPage;
        }
    }

    const BackComponent = (): JSX.Element => {
        const history = useHistory();
        const onClick = (): void => {
            history.goBack();
        };
        return <Button onClick={onClick}>Back</Button>;
    };

    useSetTitle('Home');
    useSetSubNavButtons([]);
    useSetLeftElement({});
    useSetRightComponent(hcPorps.pathArray.length === 0 ? <div></div> : <BackComponent />);

    return (
        <FieldsetBorders componentName={COMPONENTNAME}>
            <PlaceOverviewBreadcrumbs {...hcPorps} />
            {React.createElement(container, { ...hcPorps })}
        </FieldsetBorders>
    );
};

export default PlaceOverview;
