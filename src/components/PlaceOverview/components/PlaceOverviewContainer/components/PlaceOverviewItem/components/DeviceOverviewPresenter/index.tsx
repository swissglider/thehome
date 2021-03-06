import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { I_HOME_CONTAINER } from '../../../../../../../../features/servConn/interfaces';
import PlaceOverviewBooleanContainer from './components/PlaceOverviewBooleanContainer';
import PlaceOverviewNumberContainer from './components/PlaceOverviewNumberContainer';
import PlaceOverviewSwitchContainer from './components/PlaceOverviewSwitchContainer';
import {
    I_Extended_Type_Params,
    useGenerateBooleanSwitchNumberCategories,
} from '../../../../../../hooks/FunctionCategoryHooks';

const useStyles = makeStyles(() =>
    createStyles({
        sensorContainer: {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'nowrap',
            flexDirection: 'row',
        },
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
            {categoryTypeList.map((params: I_Extended_Type_Params, index: number) =>
                React.createElement(childComponent, {
                    key: index,
                    categoryID: categoryID,
                    pathArray: pathArray,
                    ...params,
                }),
            )}
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
                categoryID={'switchList'}
                categoryTypeList={switchList}
                pathArray={pathArray}
                childComponent={PlaceOverviewSwitchContainer}
            />
            <DOPTypeContainer
                categoryID={'booleanList'}
                categoryTypeList={booleanList}
                pathArray={pathArray}
                childComponent={PlaceOverviewBooleanContainer}
            />
            <DOPTypeContainer
                categoryID={'numberList'}
                categoryTypeList={numberList}
                pathArray={pathArray}
                childComponent={PlaceOverviewNumberContainer}
            />
        </>
    );
};

export default DeviceOverviewPresenter;
