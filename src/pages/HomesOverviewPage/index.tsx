import React from 'react';
import { useSelector } from 'react-redux';
import { I_Container_Props } from '../../features/servConn/interfaces';
import { selector_getHomeContainerList } from '../../features/servConn/selectors';
import HomesOverviewTemplate from '../../templates/HomesOverviewTemplate';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomesOverviewPage = (props: I_Container_Props): JSX.Element => {
    const homeContainerList = useSelector(selector_getHomeContainerList());
    return <HomesOverviewTemplate homeContainerList={homeContainerList} />;
};

export default HomesOverviewPage;
