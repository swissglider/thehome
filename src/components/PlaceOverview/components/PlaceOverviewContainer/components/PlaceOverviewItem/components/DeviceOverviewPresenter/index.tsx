import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { I_HOME_CONTAINER } from '../../../../../../../../features/servConn/interfaces';
import SimpleDevicesAvarageContainer from './components/SimpleDevicesAvarageContainer';
import {
    I_Extended_Type_Params,
    useGenerateBooleanSwitchNumberCategories,
} from '../../../../../../hooks/FunctionCategoryHooks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sensorContainer: {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'nowrap',
            flexDirection: 'row',
        },
        booleanList: {
            width: theme.spacing(2),
            height: theme.spacing(2),
            marginRight: theme.spacing(0.8),
            marginTop: theme.spacing(0.6),
        },
        switchList: {
            width: theme.spacing(3.2),
            height: theme.spacing(3.2),
            marginRight: theme.spacing(0.8),
            marginTop: theme.spacing(0.6),
        },
        numberList: {},
    }),
);

export interface I_PlaceOverviewXContainer_Props extends I_Extended_Type_Params {
    categoryID: string;
    pathArray?: string[];
}

const DOPTypeContainer = ({
    categoryID,
    categoryTypeList,
    childComponent,
    pathArray,
}: {
    categoryID: string;
    categoryTypeList: I_Extended_Type_Params[];
    childComponent: any;
    pathArray: string[];
}): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.sensorContainer}>
            {categoryTypeList.map((params: I_Extended_Type_Params, index: number) => (
                <div
                    key={index}
                    className={
                        categoryID === 'switchList'
                            ? classes.switchList
                            : categoryID === 'booleanList'
                            ? classes.booleanList
                            : classes.numberList
                    }
                >
                    {React.createElement(childComponent, {
                        categoryID: categoryID,
                        pathArray: pathArray,
                        ...params,
                    })}
                </div>
            ))}
        </div>
    );
};

export interface I_PlaceOverviewValues_Props {
    homeContainer: I_HOME_CONTAINER;
    pathArray: string[];
}

const DeviceOverviewPresenter = ({ homeContainer, pathArray }: I_PlaceOverviewValues_Props): JSX.Element => {
    const blacklist = [
        'enum.functions.rain',
        'enum.functions.wind_',
        'enum.functions.smart_switch',
        'enum.functions.blinds',
    ];
    const { switchList, booleanList, numberList } = useGenerateBooleanSwitchNumberCategories(homeContainer, blacklist);
    return (
        <>
            <DOPTypeContainer
                categoryID="switchList"
                categoryTypeList={switchList}
                pathArray={pathArray}
                childComponent={SimpleDevicesAvarageContainer}
            />
            <DOPTypeContainer
                categoryID="booleanList"
                categoryTypeList={booleanList}
                pathArray={pathArray}
                childComponent={SimpleDevicesAvarageContainer}
            />
            <DOPTypeContainer
                categoryID="numberList"
                categoryTypeList={numberList}
                pathArray={pathArray}
                childComponent={SimpleDevicesAvarageContainer}
            />
        </>
    );
};

export default DeviceOverviewPresenter;
