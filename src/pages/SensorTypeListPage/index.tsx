import React from 'react';
import { useGetHomeArrayFromLocation, useSearchHCByPathArray } from '../../hooks/HomeContainerHooks';
import SensorListTemplate from '../../templates/SensorListTemplate';

const SensorTypeListPage = (): JSX.Element | null => {
    const pathArray = useGetHomeArrayFromLocation();
    if (pathArray === undefined) return null;

    const functionTypeID = pathArray[pathArray.length - 1];
    if (functionTypeID === undefined || !functionTypeID.startsWith('enum.functions.')) return null;

    const homeContainer = useSearchHCByPathArray(pathArray);
    if (homeContainer === undefined) return null;

    return <SensorListTemplate homeContainer={homeContainer} functionTypeID={functionTypeID} />;
};

export default SensorTypeListPage;
