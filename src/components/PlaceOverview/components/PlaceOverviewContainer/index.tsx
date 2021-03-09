import React from 'react';
import { makeStyles, Theme, createStyles, Button } from '@material-ui/core';
import FieldsetBorders from '../../../../utils/FieldsetBorders';
import PlaceOverviewItem from './components/PlaceOverviewItem';
import { I_HOME_CONTAINER, T_HOME_CONTAINER_LIST } from '../../../../features/servConn/interfaces';
import { useHistory } from 'react-router-dom';
import { useHomeContainer } from '../../hooks/PlaceOverviewHooks';
import {
    useSetLeftElement,
    useSetRightComponent,
    useSetSubNavButtons,
    useSetTitle,
} from '../../../../utils/FrameworkContext';
import SensorOverviewItem from './components/SensorOverviewItem';
import PlaceOverviewBreadcrumbs from './components/PlaceOverviewBreadcrumbs';
import StandardFunctionTypeOverview from '../StandardFunctionTypeOverview';

const COMPONENTNAME = 'PlaceOverviewContainer';

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
    functionType?: string;
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

const StandardPlaceOverviewContainer = (props: I_Container_Props): JSX.Element => {
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

const PlaceOverviewContainer = (): JSX.Element => {
    const hcPorps = useHomeContainer();

    let container: any;
    switch (hcPorps.layout) {
        case 'homes': {
            container = HomesContainerVertical;
            break;
        }
        case 'standard_place_overview': {
            container = StandardPlaceOverviewContainer;
            break;
        }
        case 'standard_function_type_overview': {
            container = StandardFunctionTypeOverview;
            break;
        }
        default: {
            container = HomesContainerVertical;
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

export default PlaceOverviewContainer;
