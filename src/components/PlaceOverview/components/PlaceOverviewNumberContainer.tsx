import React from 'react';
import { Avatar } from '@material-ui/core';
import { selector_getAvValueFromList } from '../../../features/ioBrokerStates/selectors';
import { useSelector } from 'react-redux';
import { selector_getIOBObjectByID } from '../../../features/ioBrokerObjects/selectors';
import { I_PlaceOverviewXContainer_Props } from './PlaceOverviewValues';

const PlaceOverviewNumberContainer = ({
    functionID,
    functionsTypeList,
    classesP,
}: I_PlaceOverviewXContainer_Props): JSX.Element => {
    const classes = classesP;

    const val: number = useSelector(selector_getAvValueFromList(functionsTypeList));
    const enumOb = useSelector(selector_getIOBObjectByID(functionID));
    const icon = enumOb.common.icon;
    const firstElOb = useSelector(selector_getIOBObjectByID(functionsTypeList[1]));
    const unit = firstElOb.common.unit;
    return (
        <>
            <Avatar className={classes.imageWithValue} src={icon} /> {`${val} ${unit}`}
        </>
    );
};

export default PlaceOverviewNumberContainer;
