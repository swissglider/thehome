import React from 'react';
import { makeStyles, Theme, createStyles, Button, CardMedia } from '@material-ui/core';
import PlaceOverviewSensorValue from './PlaceOverviewSensorValue';
import { useSelector, shallowEqual } from 'react-redux';
import {
    selector_getAllSensorAvaragesIDByTheHomeFolder,
    selector_getDisplayName,
    selector_getEnumImage,
} from '../features/reducers/ioBrokerSlice';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1.5),
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
            // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            backgroundImage: `url('https://www.slashcoding.com/wp-content/uploads/2013/10/clouds.jpg')`,
        },
        rightContainer: {
            flexGrow: 10,
            flexDirection: 'column',
        },
        icon: {
            minWidth: 50,
            maxWidth: 50,
            flexGrow: 1,
        },
        title: {
            ...theme.typography.h6,
            flexGrow: 4,
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(1.5),
        },
        sensorContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            flexDirection: 'row',
        },
        sensor: {
            minWidth: 50,
            flexGrow: 1,
        },
    }),
);

export interface I_PlaceOverviewItem_Props {
    id: string;
    theHomeFolder: string;
}

const PlaceOverviewItem = ({ id, theHomeFolder }: I_PlaceOverviewItem_Props): JSX.Element => {
    const classes = useStyles();
    const srcImg = useSelector(selector_getEnumImage(id), shallowEqual);
    const sensorAvarages = useSelector(selector_getAllSensorAvaragesIDByTheHomeFolder(theHomeFolder), shallowEqual);
    const displayName = useSelector(selector_getDisplayName(id), shallowEqual);
    console.log('hallo');
    return (
        <>
            {/* <FieldsetBorders componentName={COMPONENTNAME}> */}
            <Button className={classes.button}>
                <div className={classes.icon}>
                    <CardMedia component="img" src={srcImg} />
                </div>
                <div className={classes.rightContainer}>
                    <div className={classes.title}>{displayName}</div>
                    <div className={classes.sensorContainer}>
                        {sensorAvarages.map((summarizedID: string, index: number) => (
                            <div key={`PlaceOverviewItem_sensor${index}`} className={classes.sensor}>
                                <PlaceOverviewSensorValue summarizedID={summarizedID} />
                            </div>
                        ))}
                    </div>
                    <div className={classes.sensorContainer}>
                        <div className={classes.sensor}>1</div>
                        <div className={classes.sensor}>2</div>
                        <div className={classes.sensor}>3</div>
                        <div className={classes.sensor}>3</div>
                    </div>
                </div>
            </Button>
            {/* </FieldsetBorders> */}
        </>
    );
};

export default PlaceOverviewItem;
