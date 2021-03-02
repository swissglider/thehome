import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { I_HOME_CONTAINER } from '../../../features/servConn/interfaces';
import PlaceOverviewSwitchContainer from './PlaceOverviewSwitchContainer';
import PlaceOverviewNumberContainer from './PlaceOverviewNumberContainer';
import PlaceOverviewBooleanContainer from './PlaceOverviewBooleanContainer';

const functionsArray = [
    { id: 'switch', functions: ['enum.functions.button', 'enum.functions.light'] },
    { id: 'boolean', functions: ['enum.functions.doors', 'enum.functions.motion', 'enum.functions.window'] },
    {
        id: 'number',
        functions: ['enum.functions.hum', 'enum.functions.pressure', 'enum.functions.temp'],
    },
    { id: 'others', functions: ['enum.functions.wind_', 'enum.functions.rain', 'enum.functions.smart_switch'] },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sensorContainer: {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'nowrap',
            flexDirection: 'row',
        },
        imageWithValue: {
            width: theme.spacing(2),
            height: theme.spacing(2),
            marginRight: theme.spacing(0.8),
            marginTop: theme.spacing(0.6),
        },
        imageWithoutValue: {
            width: theme.spacing(3.5),
            height: theme.spacing(3.5),
            marginRight: theme.spacing(0.8),
            marginTop: theme.spacing(0.6),
        },
    }),
);

export interface I_PlaceOverviewXContainer_Props {
    functionID: string;
    functionsTypeList: string[];
    classesP: any;
}

export interface I_PlaceOverviewValues_Props {
    homeContainer: I_HOME_CONTAINER;
}

const PlaceOverviewValues = ({ homeContainer }: I_PlaceOverviewValues_Props): JSX.Element => {
    const classes = useStyles();
    const arr = functionsArray.reduce((accom, cV) => {
        accom[cV.id] = {};
        return accom;
    }, {} as { [key: string]: { [fID: string]: string[] } });
    for (const fID of Object.keys(homeContainer.recursiveMemberStateIDs)) {
        const funcT = functionsArray.find((e) => e.functions.includes(fID));
        const funcTS = funcT === undefined ? 'others' : funcT.id;
        arr[funcTS][fID] = homeContainer.recursiveMemberStateIDs[fID];
    }
    return (
        <>
            <div className={classes.sensorContainer}>
                {Object.entries(arr.switch).map((t, index: number) => (
                    <PlaceOverviewSwitchContainer
                        key={index}
                        functionID={t[0]}
                        functionsTypeList={t[1]}
                        classesP={classes}
                    />
                ))}
            </div>
            <div className={classes.sensorContainer}>
                {Object.entries(arr.boolean).map((t, index: number) => (
                    <PlaceOverviewBooleanContainer
                        key={index}
                        functionID={t[0]}
                        functionsTypeList={t[1]}
                        classesP={classes}
                    />
                ))}
            </div>
            <div className={classes.sensorContainer}>
                {Object.entries(arr.number).map((t, index: number) => (
                    <PlaceOverviewNumberContainer
                        key={index}
                        functionID={t[0]}
                        functionsTypeList={t[1]}
                        classesP={classes}
                    />
                ))}
            </div>
        </>
    );
};

export default PlaceOverviewValues;
