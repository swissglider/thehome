import React, { ComponentProps, useEffect } from 'react';
import { Collapse, createStyles, Divider, List, ListItem, makeStyles, Theme } from '@material-ui/core';
import SensorListElement from '../SensorListElement';
import { useDispatch, useSelector } from 'react-redux';
import {
    selector_getSensorListContainerOpenByID,
    SENSORLISTCONTAINER_STATES_UPDATE,
    SENSORLISTCONTAINER_STATES_CREATE,
} from '../../../features/SensorListContainerCollapsStates/slice';
import { AppDispatch } from '../../../redux/Store';
import { I_HOME_CONTAINER } from '../../../features/servConn/interfaces';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listItem: (props: { level?: number; isSensor?: boolean }) => {
            const level = props.level ?? 0;
            if (props.isSensor) {
                return {
                    backgroundColor: theme.palette.action.hover,
                    paddingTop: theme.spacing(0.2),
                    paddingBottom: theme.spacing(0.2),
                    paddingLeft: theme.spacing(0 + 6),
                    paddingRight: theme.spacing(0),
                };
            }
            return {
                paddingTop: theme.spacing(0.2),
                paddingBottom: theme.spacing(0.2),
                paddingLeft: theme.spacing(0 + level),
                paddingRight: theme.spacing(0 + (5 - level)),
            };
        },
    }),
);

// handles the collapsIDs and methods
const collapsHelper = (dispatch: AppDispatch, id: string): { open: any; onCollapsClick: () => void } => {
    const collapsID = id;
    const open = useSelector(selector_getSensorListContainerOpenByID(collapsID));
    const onCollapsClick = () => {
        dispatch(SENSORLISTCONTAINER_STATES_UPDATE({ id: collapsID, open: !open }));
    };
    return { open, onCollapsClick };
};

export interface I_SensorListContainerElement_PropsExt
    extends Omit<ComponentProps<typeof SensorListElement>, 'onCollapsClick'> {
    level: number;
}

// Wrapps the SensorListElement with a ListItem
const SensorListContainerElement = (props: I_SensorListContainerElement_PropsExt): JSX.Element | null => {
    if (props.isSensor && props.deviceID === undefined) return null;

    const { level, ...args } = { ...props };
    const classes = useStyles({ level: level, isSensor: props.isSensor });
    const dispatch: AppDispatch = useDispatch();
    const id = props.isSensor ? (props.deviceID as string) : props.homeContainer.id;

    const { onCollapsClick } = collapsHelper(dispatch, id);

    useEffect(() => {
        dispatch(SENSORLISTCONTAINER_STATES_CREATE({ id: id, open: true }));
    });

    return (
        <>
            <ListItem className={classes.listItem}>
                <SensorListElement {...args} onCollapsClick={onCollapsClick} />
            </ListItem>
            <Divider />
        </>
    );
};

interface I_SensorRecursiveListContainer_Props {
    homeContainer: I_HOME_CONTAINER;
    functionTypeID: string;
    level: number;
}

const SensorRecursiveListContainer = (props: I_SensorRecursiveListContainer_Props): JSX.Element | null => {
    // check if homeContainer is relevant here
    if (props.homeContainer === null) return null;
    const recursiveMemberStateIDs = props.homeContainer.recursiveMemberStateIDs[props.functionTypeID];
    const localMemberStateIDs = props.homeContainer.localMemberStateIDs[props.functionTypeID];
    if (
        !(
            (recursiveMemberStateIDs && recursiveMemberStateIDs.length > 0) ||
            (localMemberStateIDs && localMemberStateIDs.length > 0)
        )
    )
        return null;
    if (
        !(localMemberStateIDs && localMemberStateIDs.length > 0) &&
        !(Object.keys(props.homeContainer.childrenHomeContainers).length > 0)
    )
        return null;

    // check if sensor
    const isSensor =
        props.homeContainer.childrenHomeContainers && Object.keys(props.homeContainer.childrenHomeContainers).length > 0
            ? false
            : true;

    // sort the list to iterate over
    const list = isSensor
        ? [...localMemberStateIDs].sort((a: string, b: string): number => {
              if (a.toUpperCase() < b.toUpperCase()) return -1;
              if (a.toUpperCase() > b.toUpperCase()) return 1;
              return 0;
          })
        : Object.values(props.homeContainer.childrenHomeContainers).sort((a: I_HOME_CONTAINER, b: I_HOME_CONTAINER) => {
              if (a.id.toUpperCase() < b.id.toUpperCase()) return -1;
              if (a.id.toUpperCase() > b.id.toUpperCase()) return 1;
              return 0;
          });

    const dispatch: AppDispatch = useDispatch();
    const id = props.homeContainer.id;
    const { open } = collapsHelper(dispatch, id);
    useEffect(() => {
        dispatch(SENSORLISTCONTAINER_STATES_CREATE({ id: id, open: true }));
    });

    return (
        <>
            <SensorListContainerElement
                homeContainer={props.homeContainer}
                level={props.level}
                isSensor={false}
                functionTypeID={props.functionTypeID}
            />
            <Collapse in={open} timeout="auto" unmountOnExit>
                {list.map((e: string | I_HOME_CONTAINER, index: number) => (
                    <React.Fragment key={`ListContainer_${index}`}>
                        {isSensor ? (
                            <SensorListContainerElement
                                homeContainer={props.homeContainer}
                                level={props.level + 1}
                                deviceID={e as string}
                                isSensor={true}
                                functionTypeID={props.functionTypeID}
                            />
                        ) : (
                            <SensorRecursiveListContainer
                                level={props.level + 1}
                                functionTypeID={props.functionTypeID}
                                homeContainer={e as I_HOME_CONTAINER}
                            />
                        )}
                    </React.Fragment>
                ))}
                <Divider />
            </Collapse>
        </>
    );
};

const SensorListContainer = (props: I_SensorRecursiveListContainer_Props): JSX.Element | null => {
    return (
        <List>
            <SensorRecursiveListContainer {...props} />
        </List>
    );
};

export default SensorListContainer;
