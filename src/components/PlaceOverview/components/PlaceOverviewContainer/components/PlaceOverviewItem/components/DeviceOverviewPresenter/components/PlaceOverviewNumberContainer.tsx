import React from 'react';
import { I_PlaceOverviewXContainer_Props } from '..';
import { useSelector } from 'react-redux';
import { selector_getAvValueFromList } from '../../../../../../../../../features/ioBrokerStates/selectors';
import { useGetHomeContainerLocationTo } from '../../../../../../../hooks/PlaceOverviewHooks';

const PlaceOverviewNumberContainer = (props: I_PlaceOverviewXContainer_Props): JSX.Element => {
    const value = useSelector(selector_getAvValueFromList(props.membersStateList));
    const goTo = props.pathArray
        ? useGetHomeContainerLocationTo({
              pathArray: props.pathArray,
              layout: 'standard_function_type_overview',
              functionType: props.functionID,
          }).goToLocation
        : () => {
              return;
          };

    return <div onClick={goTo}>{`${value} ${props.unit}`}</div>;
};

export default PlaceOverviewNumberContainer;
