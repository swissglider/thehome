import React from 'react';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import IconComponent from '../../../atoms/base/IconComponent';
import SensorTypesAvarageContainer, {
    I_SimpleDevicesAvarageContainer_Props,
} from '../../../molecules/redux/SensorTypesAvarageContainer';
import { useGetHomeContainerLocationTo } from '../../../hooks/PlaceOverviewHooks';
import { selector_getDisplayName } from '../../../features/ioBrokerObjects/selectors';
import { useSelector } from 'react-redux';
import { FORWARD_ICON, INFO_ICON } from '../../../configuration/Icons';
import { I_HOME_CONTAINER } from '../../../features/servConn/interfaces';
import { useGetPathArrayFromHomeContainer } from '../../../hooks/HomeContainerHooks';
import TypographyComponent from '../../../atoms/base/TypographyComponent';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // border: 'solid',
        },
        elementIcon: {
            layout: 'flex',
            justifyContent: 'flex-end',
        },
        elementText: {
            display: 'flex',
            paddingLeft: theme.spacing(1),
            justifyContent: 'flex-start',
        },
        elementValue: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
    }),
);

const infoIcon = INFO_ICON;
const forwartIcon = FORWARD_ICON;

export interface I_SensorListElement_Props {
    homeContainer: I_HOME_CONTAINER; // homeContainerID
    deviceID?: string; // only id sensor
    isSensor: boolean;
    functionTypeID: string;
    onCollapsClick?: (value?: string) => void;
}

const SensorListElement = (props: I_SensorListElement_Props): JSX.Element | null => {
    const classes = useStyles();
    if (props.isSensor && props.deviceID === undefined) return null;

    const pathArray = useGetPathArrayFromHomeContainer(props.homeContainer);
    if (pathArray === undefined) return null;

    // - goToFolder check if working ?? for number and icon control
    // - goToDetails check if working ?? for number and icon control
    const goToArray = props.isSensor
        ? {
              layout: 'sensor_details_page',
              pathArray: [...pathArray, props.deviceID ?? '', props.functionTypeID],
          }
        : {
              layout: 'standard_function_type_overview',
              pathArray: [...pathArray, props.functionTypeID],
          };

    const { goToLocation } = useGetHomeContainerLocationTo(goToArray);

    const name = useSelector(
        selector_getDisplayName(props.isSensor ? (props.deviceID as string) : props.homeContainer.id),
    );

    const goTo = () => {
        return goToLocation();
    };

    const icon = props.isSensor ? infoIcon : forwartIcon;
    const variant = props.isSensor ? 'subtitle2' : 'body2';
    const size = props.isSensor ? 'bold_xsmall' : 'xsmall';
    const membersStateList: I_SimpleDevicesAvarageContainer_Props = {
        membersStateList: props.isSensor
            ? [props.deviceID as string]
            : props.homeContainer.recursiveMemberStateIDs[props.functionTypeID] ?? [],
        functionTypeID: props.functionTypeID,
        onClick: props.isSensor ? goTo : props.onCollapsClick,
        size: size,
        variant: variant,
        withPosition: true,
        presentationMode: 'standard',
    };
    return (
        <Grid
            container
            spacing={0}
            justify="center"
            alignItems="center"
            direction="row"
            className={classes.root}
            wrap="nowrap"
        >
            <Grid item className={classes.elementIcon}>
                <IconComponent
                    icon={icon}
                    variants="square"
                    size="xsmall"
                    withAnimation={true}
                    onClick={props.isSensor ? goTo : props.onCollapsClick}
                />
            </Grid>
            <Grid item className={classes.elementText} xs>
                <TypographyComponent withAnimation={true} onClick={goTo} variant={variant}>
                    {name ?? ''}
                </TypographyComponent>
            </Grid>
            <Grid item className={classes.elementValue} xs={4}>
                <SensorTypesAvarageContainer {...membersStateList} onClick={goTo} variant={variant} size={size} />
            </Grid>
        </Grid>
    );
};

export default SensorListElement;
