import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { T_HOME_CONTAINER_LIST } from '../../features/servConn/interfaces';
import LocationOverviewBox from '../../organisms/redux/LocationOverviewBox';

const useStyles = makeStyles(() =>
    createStyles({
        homesContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
    }),
);

const HomesOverviewTemplate = ({ homeContainerList }: { homeContainerList?: T_HOME_CONTAINER_LIST }): JSX.Element => {
    const classes = useStyles();
    console.log(homeContainerList);
    return (
        <>
            {homeContainerList !== undefined ? (
                <div className={classes.homesContainer}>
                    {Object.keys(homeContainerList)
                        .sort()
                        .map((hcKey: string, index: number) => (
                            <LocationOverviewBox
                                key={`home_select_${index}`}
                                homeContainer={homeContainerList[hcKey]}
                                pathArray={[]}
                                presentationMode="verticalList"
                            />
                        ))}
                </div>
            ) : (
                <div>no home found</div>
            )}
        </>
    );
};

export default HomesOverviewTemplate;
