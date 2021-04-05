import React from 'react';
import { Collapse, createStyles, Divider, Grid, List, ListItem, makeStyles, Theme } from '@material-ui/core';
import SensorListElement, { I_SensorListElement_Props } from '../SensorListElement';
import { useDispatch, useSelector } from 'react-redux';
import {
    selector_getSensorListContainerAll,
    selector_getSensorListContainerOpenByID,
    SENSORLISTCONTAINER_STATES_UPDATE,
    SENSORLISTCONTAINER_STATES_CREATE,
    SENSORLISTCONTAINER_STATES_UPDATE_MANY,
} from '../../../features/SensorListContainerCollapsStates/slice';
import { AppDispatch } from '../../../redux/Store';
import SimpleButton from '../../../molecules/base/SimpleButton';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // backgroundColor: theme.palette.background.paper,
        },
        listItem: (props: { level?: number; presentationMode?: 'folder' | 'sensor' }) => {
            const level = props.level ?? 0;
            const presentationMode = props.presentationMode ?? 'folder';
            if (presentationMode === 'folder') {
                return {
                    paddingTop: theme.spacing(0.2),
                    paddingBottom: theme.spacing(0.2),
                    paddingLeft: theme.spacing(0 + level),
                    paddingRight: theme.spacing(0 + (5 - level)),
                };
            }
            return {
                backgroundColor: theme.palette.action.hover,
                paddingTop: theme.spacing(0.2),
                paddingBottom: theme.spacing(0.2),
                paddingLeft: theme.spacing(0 + 6),
                paddingRight: theme.spacing(0),
            };
        },
    }),
);

export interface I_SensorListContainerElement_Props {
    level: number;
    listElementProps: I_SensorListElement_Props;
}

export interface I_SensorListContainerElement_PropsExt extends I_SensorListContainerElement_Props {
    iconOnClick?: () => void;
}

const SensorListContainerElement = (props: I_SensorListContainerElement_PropsExt): JSX.Element => {
    const classes = useStyles({ level: props.level, presentationMode: props.listElementProps.presentationMode });
    return (
        <ListItem className={classes.listItem}>
            <SensorListElement {...props.listElementProps} iconOnClick={props.iconOnClick} />
        </ListItem>
    );
};

interface I_SensorListContainer_Props_Ext extends I_SensorListContainer_Props {
    id: string;
}

const FolderListContainerElement = (props: I_SensorListContainer_Props_Ext): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();

    dispatch(SENSORLISTCONTAINER_STATES_CREATE({ id: props.id, open: true }));
    const open = useSelector(selector_getSensorListContainerOpenByID(props.id));
    const handleClick = () => {
        dispatch(SENSORLISTCONTAINER_STATES_UPDATE({ id: props.id, open: !open }));
    };
    return (
        <>
            {props.listItems.map((e, index) => (
                <React.Fragment key={`ListContainer_${index}`}>
                    {Array.isArray(e) ? (
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <FolderListContainerElement listItems={e} id={`${props.id}_${index}`} />
                            </List>
                        </Collapse>
                    ) : (
                        <SensorListContainerElement
                            iconOnClick={e.listElementProps.presentationMode === 'folder' ? handleClick : undefined}
                            listElementProps={e.listElementProps}
                            level={e.level}
                        />
                    )}

                    <Divider />
                </React.Fragment>
            ))}
        </>
    );
};

export type I_SensorListContainerElement_PropsArray = (
    | I_SensorListContainerElement_Props
    | I_SensorListContainerElement_PropsArray
)[];

export interface I_SensorListContainer_Props {
    listItems: I_SensorListContainerElement_PropsArray;
}

const SensorListContainer = (props: I_SensorListContainer_Props): JSX.Element => {
    const classes = useStyles({});
    const allStates = useSelector(selector_getSensorListContainerAll());
    const dispatch: AppDispatch = useDispatch();

    const updateAll = (newVal: boolean): void => {
        const newState = allStates.map((e: string) => ({ id: e, open: newVal }));
        dispatch(SENSORLISTCONTAINER_STATES_UPDATE_MANY(newState));
    };

    const collapseAll = (): void => {
        updateAll(false);
    };
    const expandAll = (): void => {
        updateAll(true);
    };

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs>
                    <SimpleButton text={'collapseAll'} onClick={() => collapseAll()} />
                </Grid>
                <Grid item xs>
                    <SimpleButton text={'expandAll'} onClick={() => expandAll()} />
                </Grid>
            </Grid>

            <List className={classes.root}>
                <FolderListContainerElement listItems={props.listItems} id={'root_SensorListContainer'} />
            </List>
        </>
    );
};

export default SensorListContainer;
