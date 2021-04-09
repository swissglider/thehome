import React from 'react';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import IconComponent from '../../../atoms/base/IconComponent';
import ValueTitleBox from '../../../molecules/base/ValueTitleBox';
import SensorTypesAvarageContainer, {
    I_SimpleDevicesAvarageContainer_Props,
} from '../../../molecules/redux/SensorTypesAvarageContainer';
import { useGetHomeContainerLocationTo } from '../../../hooks/PlaceOverviewHooks';
import { selector_getDisplayName } from '../../../features/ioBrokerObjects/selectors';
import { useSelector } from 'react-redux';
import { FORWARD_ICON, INFO_ICON } from '../../../configuration/Icons';

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
    presentationMode: 'folder' | 'sensor';
    deviceID?: string; // only used for in sensor presentation Mode
    folderID?: string; // only used for presentation Mode folder
    pathArray: string[]; // patch history to forward if clicked if no switch change is possible
    functionTypeID: string;
    sensorValueType: I_SimpleDevicesAvarageContainer_Props;
    iconOnClick?: (value?: string) => void;
}

const SensorListElement = (props: I_SensorListElement_Props): JSX.Element => {
    const classes = useStyles();

    // - goToFolder check if working ?? for number and icon control
    // - goToDetails check if working ?? for number and icon control
    const goToArray =
        props.presentationMode === 'folder'
            ? {
                  pathArray: props.pathArray,
                  layout: 'standard_function_type_overview',
              }
            : {
                  pathArray: props.pathArray,
                  layout: 'sensor_details_page',
              };

    const { location, goToLocation } = useGetHomeContainerLocationTo(goToArray);

    const name = useSelector(selector_getDisplayName(props.deviceID ?? props.folderID ?? ''));

    const goToFolder = props.pathArray
        ? () => {
              console.log('Go To Folder:', location.state.pathArray);
              return goToLocation();
          }
        : undefined;
    const goToDetails = props.pathArray
        ? () => {
              console.log('Go To Details:', location.state.pathArray);
              return goToLocation();
          }
        : undefined;

    const goTo = props.presentationMode === 'folder' ? goToFolder : goToDetails;
    const icon = props.presentationMode === 'folder' ? forwartIcon : infoIcon;
    const variant = props.presentationMode === 'folder' ? 'body' : 'body_bold';
    const size = props.presentationMode === 'folder' ? 'xsmall' : 'bold_xsmall';
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
                    onClick={props.iconOnClick ?? goTo}
                />
            </Grid>
            <Grid item className={classes.elementText} xs>
                <ValueTitleBox
                    value={name}
                    withoutDecoration={true}
                    withAnimation={true}
                    onClick={goTo}
                    variant={variant}
                />
            </Grid>
            <Grid item className={classes.elementValue} xs={4}>
                <SensorTypesAvarageContainer {...props.sensorValueType} onClick={goTo} variant={variant} size={size} />
            </Grid>
        </Grid>
    );
};

export default SensorListElement;
