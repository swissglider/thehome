import React from 'react';
import { Avatar } from '@material-ui/core';
import { selector_getAvOnValueFromList } from '../../../features/ioBrokerStates/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { selector_getIOBObjectByID } from '../../../features/ioBrokerObjects/selectors';
import { I_PlaceOverviewXContainer_Props } from './PlaceOverviewValues';
import { ACTION_IOBROKER_UPDATE_STATE } from '../../../features/ioBrokerStates/actions';

const PlaceOverviewSwitchContainer = ({
    functionID,
    functionsTypeList,
    classesP,
}: I_PlaceOverviewXContainer_Props): JSX.Element => {
    const classes = classesP;
    const dispatch = useDispatch();

    const val: boolean = useSelector(selector_getAvOnValueFromList(functionsTypeList));
    const enumOb = useSelector(selector_getIOBObjectByID(functionID));
    const icon = val === true ? enumOb.common.icon_true_20 : enumOb.common.icon_false_20;

    const handleBooleanChange = () => {
        for (const id of functionsTypeList) {
            dispatch(ACTION_IOBROKER_UPDATE_STATE(id, !val));
        }
    };

    return (
        <>
            <Avatar onClick={handleBooleanChange} className={classes.imageWithoutValue} src={icon} />
        </>
    );
};

export default PlaceOverviewSwitchContainer;
