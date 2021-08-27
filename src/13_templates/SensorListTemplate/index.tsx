import React from 'react';
import { List } from '@material-ui/core';
import { I_HOME_CONTAINER } from '../../30_redux/servConn/interfaces';
import SensorListCollapsButtons from '../../11_molecules/redux/SensorListCollapsButtons';
import SensorListContainer from '../../12_organisms/redux/SensorListContainer';

export interface I_SensorListContainer_Props {
    homeContainer: I_HOME_CONTAINER;
    functionTypeID: string;
}

const SensorListTemplate = (props: I_SensorListContainer_Props): JSX.Element => {
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
