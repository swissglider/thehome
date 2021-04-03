import React from 'react';
import { makeStyles, Theme, createStyles, Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selector_getAvValueFromList } from '../../../../../features/ioBrokerStates/selectors';
import { I_HOME_CONTAINER } from '../../../../../features/servConn/interfaces';
import { selector_getFunctionTypes } from '../../../../../features/servConn/selectors';
import { I_FunctionTypes } from '../../../../../features/servConn/slice';
import { useGetHomeContainerLocationTo } from '../../../../../hooks/PlaceOverviewHooks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginLeft: theme.spacing(1.5),
            marginRight: theme.spacing(1.5),
            marginTop: theme.spacing(1.5),
            marginButtom: theme.spacing(1.5),
            // boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
            // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            // backgroundImage: `url('https://www.slashcoding.com/wp-content/uploads/2013/10/clouds.jpg')`,
            // minWidth: theme.spacing(30),
        },
        icon: {
            width: theme.spacing(3.2),
            height: theme.spacing(3.2),
            marginRight: theme.spacing(0.8),
            marginTop: theme.spacing(0.6),
        },
    }),
);

export interface I_SensorOverviewItem_Props {
    pathArray: string[];
    homeContainer: I_HOME_CONTAINER;
    sensorTypeID: string;
    recursiveMemberIDsList: string[];
}

const ShowValue = ({ icon, value, unit }: any): JSX.Element => {
    const classes = useStyles();
    return (
        <>
            <Avatar className={classes.icon} src={icon} />
            {value && unit && <div>{`${value} ${unit}`}</div>}
        </>
    );
};

const SensorBooleanValueCalc = (props: any): JSX.Element => {
    const tmpValue = useSelector(selector_getAvValueFromList(props.recursiveMemberIDsList, 'boolean'));
    const icon =
        tmpValue === undefined
            ? props.functionTypes[props.sensorTypeID].icon
            : tmpValue === true
            ? props.functionTypes[props.sensorTypeID].icon_true
            : props.functionTypes[props.sensorTypeID].icon_false;
    return <ShowValue icon={icon} value={undefined} unit={undefined} />;
};

const SensorNumberValueCalc = (props: any): JSX.Element => {
    const value = useSelector(selector_getAvValueFromList(props.recursiveMemberIDsList, 'number'));
    const icon = props.functionTypes[props.sensorTypeID].icon;
    return <ShowValue icon={icon} value={value} unit={props.functionTypes[props.sensorTypeID].unit} />;
};

const SensorOtherValueCalc = (props: any): JSX.Element => {
    const value = useSelector(selector_getAvValueFromList(props.recursiveMemberIDsList, 'number'));
    const icon = props.functionTypes[props.sensorTypeID].icon;
    return <ShowValue icon={icon} value={value} unit={props.functionTypes[props.sensorTypeID].unit} />;
};

const SensorOverviewItem = (props: I_SensorOverviewItem_Props): JSX.Element => {
    const classes = useStyles();
    const functionTypes: I_FunctionTypes = useSelector(selector_getFunctionTypes());
    const { goToLocation } = useGetHomeContainerLocationTo({
        pathArray: props.pathArray,
        layout: 'standard_function_type_overview',
        functionTypeID: props.sensorTypeID,
    });

    return (
        <div className={classes.button} onClick={goToLocation}>
            {functionTypes[props.sensorTypeID].type === 'number' ? (
                <SensorNumberValueCalc {...props} functionTypes={functionTypes} />
            ) : functionTypes[props.sensorTypeID].type === 'boolean' ? (
                <SensorBooleanValueCalc {...props} functionTypes={functionTypes} />
            ) : (
                <SensorOtherValueCalc {...props} functionTypes={functionTypes} />
            )}
        </div>
    );
};

export default SensorOverviewItem;
