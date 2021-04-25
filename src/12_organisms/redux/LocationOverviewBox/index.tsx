import React from 'react';
import { makeStyles, Theme, createStyles, Grid, withWidth } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { I_HOME_CONTAINER } from '../../../30_redux/servConn/interfaces';
import { selector_getDisplayName, selector_getIOBObjectByID } from '../../../30_redux/ioBrokerObjects/selectors';
import { useGetHomeContainerLocationTo } from '../../../20_hooks/PlaceOverviewHooks';
import { LOCATION_OVERVOEW_BOX_SENSORS } from '../../../2_configuration/Sensoren';
import SensorTypesAvarageContainer from '../../../11_molecules/redux/SensorTypesAvarageContainer';
import IconComponent from '../../../10_atoms/base/IconComponent';
import { INFO_ICON } from '../../../2_configuration/Icons';
import { sizes, T_Breakpoint, T_PresentationMode } from './sizes';
import TypographyComponent from '../../../10_atoms/base/TypographyComponent';

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

interface I_GetBoxes_Props {
    homeContainer: I_HOME_CONTAINER;
    boxName: string;
    width: string;
    presentationMode: T_PresentationMode;
}

const GetBoxes = ({ homeContainer, boxName, width, presentationMode }: I_GetBoxes_Props): JSX.Element => {
    const variant = sizes(presentationMode, width, boxName) ?? 'body2';
    const iconSize = sizes(presentationMode, width, boxName) ?? 'xsmall';
    const keys = Object.keys(homeContainer?.recursiveMemberStateIDs ?? {});
    const box = LOCATION_OVERVOEW_BOX_SENSORS[boxName]
        .filter((e) => keys.includes(e))
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

interface I_LocationOverviewBox_Props {
    homeContainer: I_HOME_CONTAINER;
    width: string;
    presentationMode: T_PresentationMode;
}

const LocationOverviewBox_ = (props: I_LocationOverviewBox_Props): JSX.Element | null => {
    const { homeContainer, width, presentationMode } = { ...props };
    if (homeContainer === undefined) return null;

    const classes = useStyles({ presentationMode, bp: width as T_Breakpoint });
    const srcImg = useSelector(selector_getIOBObjectByID(homeContainer.id))?.common.icon;
    const displayName = useSelector(selector_getDisplayName(homeContainer.id));

    const { goToLocation: goTo } = useGetHomeContainerLocationTo({
        locationID: homeContainer.id,
        page: 'LocationOverviewPage',
    });

    const infoIcon = INFO_ICON;
    const { goToLocation } = useGetHomeContainerLocationTo({
        locationID: homeContainer.id,
        page: 'LocationDetailPage',
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
                            <Grid item xs onClick={onClick} style={{ textAlign: 'center' }}>
                                <TypographyComponent
                                    withAnimation={false}
                                    variant={sizes(presentationMode, width, 'title')}
                                >
                                    {displayName ?? ''}
                                </TypographyComponent>
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
                                    width={width}
                                    presentationMode={presentationMode}
                                />
                            </Grid>
                            <Grid item>
                                <GetBoxes
                                    boxName="boolean"
                                    homeContainer={homeContainer}
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
                                width={width}
                                presentationMode={presentationMode}
                            />
                        </Grid>
                    )}
                    <Grid item>
                        <GetBoxes
                            boxName="number1"
                            homeContainer={homeContainer}
                            width={width}
                            presentationMode={presentationMode}
                        />
                    </Grid>
                    {['fullBox'].includes(presentationMode) && (
                        <Grid item>
                            <GetBoxes
                                boxName="number2"
                                homeContainer={homeContainer}
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
