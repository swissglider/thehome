import React from 'react';
import { createStyles, Icon, List, ListItem, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selector_getDisplayName } from '../../../features/ioBrokerObjects/selectors';
import { I_HOME_CONTAINER } from '../../../features/servConn/interfaces';
import { selector_getFunctionTypes } from '../../../features/servConn/selectors';
import { I_Type_Params, I_FunctionTypes } from '../../../features/servConn/slice';
import { useGetHomeContainerLocationTo, useHomeContainer } from '../hooks/PlaceOverviewHooks';
import { I_Container_Props } from './PlaceOverviewContainer';
import PlaceOverviewBooleanContainer from './PlaceOverviewContainer/components/PlaceOverviewItem/components/DeviceOverviewPresenter/components/PlaceOverviewBooleanContainer';
import PlaceOverviewNumberContainer from './PlaceOverviewContainer/components/PlaceOverviewItem/components/DeviceOverviewPresenter/components/PlaceOverviewNumberContainer';
import PlaceOverviewSwitchContainer from './PlaceOverviewContainer/components/PlaceOverviewItem/components/DeviceOverviewPresenter/components/PlaceOverviewSwitchContainer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainList: {
            backgroundColor: theme.palette.background.paper,
            marginLeft: theme.spacing(1.5),
            marginRight: theme.spacing(1.5),
            marginTop: theme.spacing(1.5),
            marginButtom: theme.spacing(1.5),
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
            borderRadius: theme.spacing(0.8),
        },
        itemListItem: (props: { level: number }) => ({
            // backgroundColor: '#eceff1',
            backgroundColor: theme.palette.action.hover,
            paddingTop: theme.spacing(0.2),
            paddingBottom: theme.spacing(0.2),
            paddingLeft: theme.spacing(1 + props.level + 1),
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }),
        mainListItem: (props: { level: number }) => ({
            paddingTop: theme.spacing(0.2),
            paddingBottom: theme.spacing(0.2),
            paddingLeft: theme.spacing(1 + props.level),
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }),
        endValueWithImage: { display: 'flex', flexWrap: 'nowrap', flexDirection: 'row' },
        endValue: {
            fontWeight: 'bold',
        },
        StandardFunctionTypeOverviewHCIcon: {
            width: theme.spacing(2),
            height: theme.spacing(2),
            marginRight: theme.spacing(0.8),
            marginTop: theme.spacing(0.6),
        },
    }),
);

const StandardFunctionTypeOverviewAvValue = (props: {
    homeContainer?: I_HOME_CONTAINER;
    membersStateList?: string[];
    functionTypeID: string;
    functionType: I_Type_Params;
}): JSX.Element => {
    if (props.membersStateList === undefined && props.homeContainer === undefined) return <></>;
    const membersStateList =
        props.membersStateList ??
        (props.homeContainer as I_HOME_CONTAINER).recursiveMemberStateIDs[props.functionTypeID];
    const newProps = {
        ...props.functionType,
        membersStateList: membersStateList,
        categoryID: '',
    };
    switch (props.functionType.type) {
        case 'number':
            return React.createElement(PlaceOverviewNumberContainer, newProps);
        case 'boolean':
            if (props.functionType.write === false) {
                return React.createElement(PlaceOverviewBooleanContainer, newProps);
            }
            if (props.functionType.write === true) {
                return React.createElement(PlaceOverviewSwitchContainer, newProps);
            }
            break;
    }
    return <></>;
};

const StandardFunctionTypeOverviewValue = (props: {
    deviceID: string;
    functionType: I_Type_Params;
    functionTypeID: string;
    pathArray: string[];
}): JSX.Element => {
    const classes = useStyles({ level: 0 });
    const displaName = useSelector(selector_getDisplayName(props.deviceID));
    const { goToLocation } = useGetHomeContainerLocationTo({
        pathArray: props.pathArray,
        layout: 'standard_device_overview',
        deviceID: props.deviceID,
        functionType: props.functionTypeID,
    });
    return (
        <>
            <div className={classes.endValueWithImage} onClick={goToLocation}>
                <Icon color="disabled" fontSize="small">
                    info_outlined
                </Icon>
                {displaName}
            </div>
            <div className={classes.endValue}>
                <StandardFunctionTypeOverviewAvValue {...props} membersStateList={[props.deviceID]} />
            </div>
        </>
    );
};

const StandardFunctionTypeOverviewFolderElement = (props: {
    displayName: string | undefined;
    functionTypeID: string;
    pathArray: string[];
}): JSX.Element => {
    const { goToLocation } = useGetHomeContainerLocationTo({
        pathArray: props.pathArray,
        layout: 'standard_function_type_overview',
        functionType: props.functionTypeID,
    });
    return (
        <div onClick={goToLocation}>
            {'> '} {props.displayName}
        </div>
    );
};

const StandardFunctionTypeOverviewHC = (props: {
    homeContainer: I_HOME_CONTAINER;
    functionTypeID: string;
    functionType: I_Type_Params;
    level: number;
    pathArray?: string[];
}): JSX.Element | null => {
    const classes = useStyles({ level: props.level });
    const pathArray = props.pathArray
        ? [...props.pathArray, props.homeContainer.id]
        : [...useHomeContainer().pathArray];
    const displayName = useSelector(selector_getDisplayName(props.homeContainer.id));
    if (!props.homeContainer || !(props.functionTypeID in props.homeContainer.recursiveMemberStateIDs)) {
        return null;
    }
    const re = Object.keys(props.homeContainer.childrenHomeContainers)
        .sort()
        .map((key: string) =>
            React.createElement(StandardFunctionTypeOverviewHC, {
                homeContainer: props.homeContainer.childrenHomeContainers[key],
                functionTypeID: props.functionTypeID,
                functionType: props.functionType,
                level: props.level + 1,
                pathArray: pathArray,
            }),
        );
    if (re.length !== 0 && re.every((e) => e === null)) {
        return null;
    }
    return (
        <>
            <ListItem className={classes.mainListItem}>
                <StandardFunctionTypeOverviewFolderElement
                    displayName={displayName}
                    functionTypeID={props.functionTypeID}
                    pathArray={pathArray}
                />
                <StandardFunctionTypeOverviewAvValue {...props} />
            </ListItem>
            {props.functionTypeID in props.homeContainer.localMemberStateIDs &&
                props.homeContainer.localMemberStateIDs[props.functionTypeID].map((id: string, index: number) => (
                    <ListItem className={classes.itemListItem} key={`StandardFunctionTypeOverviewHC1_${index}`}>
                        <StandardFunctionTypeOverviewValue deviceID={id} {...props} pathArray={pathArray} />
                    </ListItem>
                ))}
            {re
                .filter((e) => e !== null)
                .map((e, index) => (
                    <div key={`StandardFunctionTypeOverviewHC2_${index}`}>{e}</div>
                ))}
        </>
    );
};

const StandardFunctionTypeOverview = (props: I_Container_Props): JSX.Element => {
    const classes = useStyles({ level: 0 });
    const functionTypeID = props.functionType ?? 'enum.functions.light';
    const functionTypes: I_FunctionTypes = useSelector(selector_getFunctionTypes());
    const functionType: I_Type_Params = functionTypes[functionTypeID];
    if (!props.homeContainer) return <></>;
    return (
        <List className={classes.mainList}>
            <StandardFunctionTypeOverviewHC
                homeContainer={props.homeContainer}
                functionTypeID={functionTypeID}
                functionType={functionType}
                level={0}
            />
        </List>
    );
};

export default StandardFunctionTypeOverview;
