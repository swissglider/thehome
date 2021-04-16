import React from 'react';
import { useSelector } from 'react-redux';
import { selector_getHomeContainerList } from '../../30_redux/servConn/selectors';
import HomesOverviewTemplate from '../../13_templates/HomesOverviewTemplate';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomesOverviewPage = (): JSX.Element | null => {
    const homeContainerList = useSelector(selector_getHomeContainerList());
    if (homeContainerList === undefined) return null;
    return <HomesOverviewTemplate homeContainerList={homeContainerList} />;
};

export default HomesOverviewPage;
