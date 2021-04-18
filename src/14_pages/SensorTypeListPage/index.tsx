import React from 'react';
import SensorListTemplate from '../../13_templates/SensorListTemplate';
import {
    useGetFunctionTypeIDFromLocation,
    useGetLocationFromLocation,
    useSearchHCRecursiveByLocationID,
} from '../../20_hooks/PlaceOverviewHooks';

const SensorTypeListPage = (): JSX.Element | null => {
    const functionTypeID = useGetFunctionTypeIDFromLocation();
    const locationID = useGetLocationFromLocation();
    if (functionTypeID === undefined || locationID === undefined) return null;

    const homeContainer = useSearchHCRecursiveByLocationID(locationID);
    if (homeContainer === undefined) return null;

    return <SensorListTemplate homeContainer={homeContainer} functionTypeID={functionTypeID} />;
};

export default SensorTypeListPage;
