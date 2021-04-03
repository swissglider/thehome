import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import PlaceOverviewItem from './components/PlaceOverviewItem';
import { I_HOME_CONTAINER, T_HOME_CONTAINER_LIST } from '../../../../features/servConn/interfaces';
import SensorOverviewItem from './components/SensorOverviewItem';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        homesContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        homesContainer1: {
            display: 'flex',
            overflowX: 'auto',
            flexWrap: 'nowrap',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: '-ms-autohiding-scrollbar',
        },
        testBox: {
            minWidth: theme.spacing(20),
            minHeight: theme.spacing(1.5),
            background: 'blue',
            padding: theme.spacing(1.5),
            margin: theme.spacing(1.5),
            flex: 0,
        },
    }),
);

export interface I_Container_Props {
    pathArray: string[];
    childLists?: T_HOME_CONTAINER_LIST;
    homeContainer?: I_HOME_CONTAINER;
    layout?: string;
    functionTypeID?: string;
    deviceID?: string;
}

export const HomesContainerVertical = ({ pathArray, childLists }: I_Container_Props): JSX.Element => {
    const classes = useStyles();
    return (
        <>
            {childLists !== undefined ? (
                <div className={classes.homesContainer}>
                    {Object.keys(childLists)
                        .sort()
                        .map((hcKey: string, index: number) => (
                            <PlaceOverviewItem
                                key={`home_select_${index}`}
                                homeContainer={childLists[hcKey]}
                                pathArray={pathArray}
                            />
                        ))}
                </div>
            ) : (
                <div>no home found</div>
            )}
        </>
    );
};

export const HomesContainerHorizontal = ({ pathArray, childLists }: I_Container_Props): JSX.Element => {
    const classes = useStyles();
    return (
        <>
            {childLists !== undefined ? (
                <>
                    {['enum.area.', 'enum.zone.', 'enum.floor.', 'enum.rooms.'].map((enumS: string, index: number) => (
                        <div key={`home_select11_${index}`} className={classes.homesContainer1}>
                            {Object.keys(childLists)
                                .sort()
                                .filter((e) => e.startsWith(enumS))
                                .map((hcKey: string, index: number) => (
                                    <PlaceOverviewItem
                                        key={`home_select1_${index}`}
                                        homeContainer={childLists[hcKey]}
                                        pathArray={pathArray}
                                    />
                                ))}
                        </div>
                    ))}
                </>
            ) : (
                <div>no home found</div>
            )}
        </>
    );
};

export const SensorTypesHorizontal = ({ pathArray, homeContainer }: I_Container_Props): JSX.Element => {
    const classes = useStyles();
    return (
        <>
            {homeContainer !== undefined ? (
                <>
                    <div className={classes.homesContainer1}>
                        {Object.keys(homeContainer.recursiveMemberStateIDs)
                            .sort()
                            .map((sensorTypeID: string, index: number) => (
                                <SensorOverviewItem
                                    key={`sensor_types_hor_${index}`}
                                    pathArray={pathArray}
                                    homeContainer={homeContainer}
                                    sensorTypeID={sensorTypeID}
                                    recursiveMemberIDsList={homeContainer.recursiveMemberStateIDs[sensorTypeID]}
                                />
                            ))}
                    </div>
                </>
            ) : (
                <div>no home found</div>
            )}
        </>
    );
};

export const StandardPlaceOverviewContainer = (props: I_Container_Props): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.homesContainer}>
            {props.homeContainer ? (
                <>
                    <PlaceOverviewItem
                        homeContainer={props.homeContainer}
                        pathArray={props.pathArray}
                        withoutLink={true}
                    />
                    <HomesContainerHorizontal
                        childLists={props.homeContainer.childrenHomeContainers}
                        pathArray={props.pathArray}
                    />
                    <SensorTypesHorizontal homeContainer={props.homeContainer} pathArray={props.pathArray} />
                </>
            ) : (
                <div>no home found</div>
            )}
        </div>
    );
};

const PlaceOverviewContainer = HomesContainerVertical;

export default PlaceOverviewContainer;
