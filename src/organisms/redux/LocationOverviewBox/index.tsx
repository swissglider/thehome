import React from 'react';
import { makeStyles, Theme, createStyles, Grid, withWidth } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { I_HOME_CONTAINER } from '../../../features/servConn/interfaces';
import { selector_getDisplayName, selector_getIOBObjectByID } from '../../../features/ioBrokerObjects/selectors';
import { useGetHomeContainerLocationTo } from '../../../hooks/PlaceOverviewHooks';
import { LOCATION_OVERVOEW_BOX_SENSORS } from '../../../configuration/Sensoren';
import SensorTypesAvarageContainer from '../../../molecules/redux/SensorTypesAvarageContainer';
import ValueTitleBox from '../../../molecules/base/ValueTitleBox';
import IconComponent from '../../../atoms/base/IconComponent';
import { INFO_ICON } from '../../../configuration/Icons';
import { sizes, T_Breakpoint, T_PresentationMode } from './sizes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button_grid: ({ presentationMode }: { presentationMode: T_PresentationMode; bp: T_Breakpoint }) => {
            const params: { [key: string]: any } = {
                backgroundImage: `url('https://www.slashcoding.com/wp-content/uploads/2013/10/clouds.jpg')`,
                textTransform: 'none',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                borderRadius: theme.spacing(1),
                // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
            };
            if (presentationMode === 'fullBox') {
                params.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px';
                params.minHeight = theme.spacing(20);
                params.maxWidth = theme.spacing(150);
            }
            if (presentationMode === 'verticalList') {
                params.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px';
                params.minHeight = theme.spacing(18);
                params.maxHeight = theme.spacing(18);
                params.maxWidth = theme.spacing(150);
            }
            if (presentationMode === 'horizontalList') {
                params.minHeight = theme.spacing(15);
                params.maxWidth = theme.spacing(15);
            }
            return params;
        },
    }),
);

export interface I_PlaceOverviewItem_Props {
    homeContainer: I_HOME_CONTAINER;
    pathArray: string[];
}

interface I_GetBoxes_Props extends I_PlaceOverviewItem_Props {
    boxName: string;
    width: string;
    presentationMode: T_PresentationMode;
}

const GetBoxes = ({ homeContainer, boxName, width, presentationMode }: I_GetBoxes_Props): JSX.Element => {
    const variant = sizes(presentationMode, width, boxName) ?? 'body';
    const iconSize = sizes(presentationMode, width, boxName) ?? 'xsmall';
    const box = Object.keys(homeContainer?.recursiveMemberStateIDs ?? {})
        .filter((e) => LOCATION_OVERVOEW_BOX_SENSORS[boxName].includes(e))
        .map((sensorTypeID: string, index: number) => (
            <SensorTypesAvarageContainer
                key={`LocationOverviewBox_LOCATION_OVERVOEW_BOX_SENSORS${index}`}
                presentationMode="standard"
                withPosition={true}
                variant={variant}
                size={iconSize}
                membersStateList={homeContainer?.recursiveMemberStateIDs[sensorTypeID]}
                functionTypeID={sensorTypeID}
            />
        ));
    return (
        <Grid container direction="row" justify="space-evenly" alignItems="center">
            {box.map((e, indexGrid1) => (
                <Grid item key={`LocationOverviewBox_LOCATION_OVERVOEW_BOX_SENSORS_Grid_${boxName}${indexGrid1}`}>
                    <div style={{ textAlign: 'center' }}>{e}</div>
                </Grid>
            ))}
        </Grid>
    );
};

interface I_LocationOverviewBox_Props extends I_PlaceOverviewItem_Props {
    width: string;
    presentationMode: T_PresentationMode;
}

const LocationOverviewBox_ = (props: I_LocationOverviewBox_Props): JSX.Element => {
    const { homeContainer, pathArray, width, presentationMode } = { ...props };
    const classes = useStyles({ presentationMode, bp: width as T_Breakpoint });
    const srcImg = useSelector(selector_getIOBObjectByID(homeContainer.id))?.common.icon;
    const displayName = useSelector(selector_getDisplayName(homeContainer.id));
    const newPathArray = [...pathArray];
    newPathArray.push(homeContainer.id);
    const { goToLocation: goTo } = useGetHomeContainerLocationTo({
        pathArray: newPathArray,
        layout: 'standard_place_overview',
    });

    const infoIcon = INFO_ICON;
    const { goToLocation } = useGetHomeContainerLocationTo({
        pathArray: newPathArray,
        layout: 'place_detail',
    });
    const onClick =
        presentationMode !== 'fullBox'
            ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (e?: any) => goTo()
            : // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (e?: any) => {
                  return;
              };
    return (
        <Grid
            container
            className={classes.button_grid}
            direction="row"
            justify="space-between"
            alignItems={['fullBox'].includes(presentationMode) ? 'center' : 'flex-start'}
            spacing={3}
        >
            {
                // Location Icon
                ['fullBox', 'verticalList'].includes(presentationMode) && (
                    <Grid item onClick={onClick}>
                        <IconComponent icon={srcImg} size={presentationMode === 'fullBox' ? 'xlarge' : 'large'} />
                    </Grid>
                )
            }

            <Grid item xs>
                <Grid container direction="column" justify="space-between" alignItems="stretch" spacing={1}>
                    {/* Title Row */}
                    <Grid item>
                        <Grid container direction="row" justify="center" alignItems="flex-start" wrap="nowrap">
                            {/* Title */}
                            <Grid item xs onClick={onClick}>
                                <ValueTitleBox
                                    value={displayName}
                                    withAnimation={false}
                                    withoutDecoration={true}
                                    variant={sizes(presentationMode, width, 'title')}
                                />
                            </Grid>
                            {
                                // Info Icon
                                ['fullBox'].includes(presentationMode) && (
                                    <Grid item>
                                        <IconComponent
                                            icon={infoIcon}
                                            variants="square"
                                            size="xsmall"
                                            withAnimation={true}
                                            onClick={goToLocation}
                                        />
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                    {['fullBox'].includes(presentationMode) && (
                        <>
                            <Grid item>
                                <GetBoxes
                                    boxName="switch"
                                    homeContainer={homeContainer}
                                    pathArray={pathArray}
                                    width={width}
                                    presentationMode={presentationMode}
                                />
                            </Grid>
                            <Grid item>
                                <GetBoxes
                                    boxName="boolean"
                                    homeContainer={homeContainer}
                                    pathArray={pathArray}
                                    width={width}
                                    presentationMode={presentationMode}
                                />
                            </Grid>
                        </>
                    )}
                    {['verticalList', 'horizontalList'].includes(presentationMode) && (
                        <Grid item>
                            <GetBoxes
                                boxName="allboolean"
                                homeContainer={homeContainer}
                                pathArray={pathArray}
                                width={width}
                                presentationMode={presentationMode}
                            />
                        </Grid>
                    )}
                    <Grid item>
                        <GetBoxes
                            boxName="number1"
                            homeContainer={homeContainer}
                            pathArray={pathArray}
                            width={width}
                            presentationMode={presentationMode}
                        />
                    </Grid>
                    {['fullBox'].includes(presentationMode) && (
                        <Grid item>
                            <GetBoxes
                                boxName="number2"
                                homeContainer={homeContainer}
                                pathArray={pathArray}
                                width={width}
                                presentationMode={presentationMode}
                            />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

const LocationOverviewBox = withWidth()(LocationOverviewBox_);
export default LocationOverviewBox;
