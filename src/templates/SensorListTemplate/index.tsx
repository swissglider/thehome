import React from 'react';
import { List } from '@material-ui/core';
import { I_HOME_CONTAINER } from '../../features/servConn/interfaces';
import SensorListCollapsButtons from '../../molecules/redux/SensorListCollapsButtons';
import SensorListContainer from '../../organisms/redux/SensorListContainer';

export interface I_SensorListContainer_Props {
    homeContainer: I_HOME_CONTAINER;
    functionTypeID: string;
}

const SensorListTemplate = (props: I_SensorListContainer_Props): JSX.Element => {
    console.log('SensorListContainer:render');

    return (
        <>
            <SensorListCollapsButtons />
            <List>
                <SensorListContainer
                    homeContainer={props.homeContainer}
                    functionTypeID={props.functionTypeID}
                    level={0}
                />
            </List>
        </>
    );
};

export default SensorListTemplate;
