import React, { useMemo } from 'react';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import IconComponent from '../../../atoms/base/IconComponent';
import ValueTitleBox from '../../../molecules/base/ValueTitleBox';
import SensorTypesAvarageContainer, {
    I_SimpleDevicesAvarageContainer_Props,
} from '../../../molecules/redux/SensorTypesAvarageContainer';
import { useGetHomeContainerLocationTo } from '../../../hooks/PlaceOverviewHooks';
import { selector_getDisplayName } from '../../../features/ioBrokerObjects/selectors';
import { useSelector } from 'react-redux';

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

const infoIcon =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABoUlEQVRIia3Wv05UURDH8Q/bqRD/sOxS6lJroZ2NDUJJa1CjrcpLGAgPgEp8CCoblacQITYmRgVNLDQmBiuDFmdWL5t77p+43+QkN3NmfnPu3DmTSzsmYo2NWaxgGwf4EesAL/EgfFozhXV8xiPMY7qwP43reBw+a5hsKj6HPWyMiOboRqJdDJqIf8SNpqcpsByxF3IOU9LJc+InpXJt4ETG5yZey5RrPYJz3MXvWHcq/DaxOmqclT5WVc0v+ddFFyv8ZkKrXzSuSK9fx+lYdTzB/aJhW2rFcbGAF0XDPs7VBL3FN3xqkKArdRToSHWtGwFn8BOHDRJMhGan08B5yHepg1rRwVEEn20bXEFXKufR8A3e4MoYE1wOTcMEz7A0xgRLofmXvnQ5ujWBh+o/ci+0eqMba9JUzLGFX7G2Kvye4mHZxqQ0cpczgdekyzgfz2Xcxg5O5bIPpAuSS1LFLXzA+TrHgTRyN6XBVUdPKstOmXjZRXuHq/haSLTgeAPMYDH2XuFLxLxvcKBj9KWp+FyaV8NxvR+2e0q65X9o/dvyB5wUVSkWeL/rAAAAAElFTkSuQmCC';
const forwartIcon =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAAAW0lEQVRIie3VzQ1AQBCA0YcqFEBhSuCkHc1ohD504CfsRpjvPNk3mcsSfaUa3Z0HqgvQhALzHfBMDRaMqaHAAjusxYp+b6jMsckTZTldID9GVgwpER74+KL3twGpJheRUoJ4zAAAAABJRU5ErkJggg==';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const backwardIcon =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAAAU0lEQVRIiWNgGAXDHSQxMDBI0tqSYgYGhqcMDAyqtLSkkIGB4TkDA4PWqCWjllAdFDFAkrAapQYxUe4W6gG6BN2oZaOWEQXoUk3AAF0qvlFAHwAA+50XiFrW8RwAAAAASUVORK5CYII=';

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
                  pathArray: props.pathArray ?? [],
                  layout: 'standard_function_type_overview',
                  functionTypeID: props.functionTypeID,
              }
            : {
                  pathArray: props.pathArray ?? [],
                  layout: 'sensor_details_page',
                  deviceID: props.deviceID,
                  functionTypeID: props.functionTypeID,
              };

    const { location, goToLocation } = useGetHomeContainerLocationTo(goToArray);

    const name = useSelector(selector_getDisplayName(props.deviceID ?? props.folderID ?? ''));

    const goToFolder = props.pathArray
        ? () => {
              console.log('Go To Folder:', location);
              //   return goToLocation();
          }
        : undefined;
    const goToDetails = props.pathArray
        ? () => {
              console.log('Go To Details:', location);
              //   return goToLocation();
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
