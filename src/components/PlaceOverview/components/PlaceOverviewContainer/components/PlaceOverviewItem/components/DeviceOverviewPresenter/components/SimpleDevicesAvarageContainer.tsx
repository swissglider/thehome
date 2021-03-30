import React from 'react';
import { I_PlaceOverviewXContainer_Props } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { selector_getAllValueFromIDList } from '../../../../../../../../../features/ioBrokerStates/selectors';
import { useGetHomeContainerLocationTo } from '../../../../../../../../../hooks/PlaceOverviewHooks';
import { ACTION_IOBROKER_UPDATE_STATE } from '../../../../../../../../../features/ioBrokerStates/actions';
import IconComponent from '../../../../../../../../../atoms/base/IconComponent';
import { useGetCountedValue } from '../../../../../../../../../hooks/CountingHooks';
import CountedValueText from '../../../../../../../../../atoms/enhanced/CountedValueText';

export interface I_SimpleDevicesAvarageContainer extends I_PlaceOverviewXContainer_Props {
    useLink?: boolean;
}

const SimpleDevicesAvarageContainer = (props: I_SimpleDevicesAvarageContainer): JSX.Element => {
    console.log('🚀 ~ SimpleDevicesAvarageContainer ~ line 30 ~ props', props);

    const useLink = props.useLink ?? false;
    const dispatch = useDispatch();

    // const _value = useSelector(selector_getAvValueFromList(props.membersStateList, props.type));

    const allValues = useSelector(selector_getAllValueFromIDList(props.membersStateList));
    const value = useGetCountedValue(allValues, 'av', props.type);
    const icon = value === undefined ? props.icon : value === true ? props.icon_true : props.icon_false;

    const { goToLocation } = useGetHomeContainerLocationTo({
        pathArray: props.pathArray ?? [],
        layout: 'standard_function_type_overview',
        functionType: props.functionID,
    });

    const changeState = () => {
        for (const id of props.membersStateList) {
            dispatch(ACTION_IOBROKER_UPDATE_STATE(id, !value));
        }
    };

    const goTo = props.pathArray
        ? () => {
              return goToLocation();
          }
        : () => {
              return;
          };

    if (props.type === 'number') {
        return (
            <CountedValueText
                onClick={goTo}
                allValues={allValues}
                type={props.type}
                unit={props.unit ?? ''}
                countMethod="av"
            />
        );
    }
    if (props.type === 'boolean' && props.write === true && !useLink) {
        return <IconComponent onClick={changeState} icon={icon ?? ''} />;
    }

    return (
        <>
            <IconComponent onClick={goTo} icon={icon ?? ''} />
        </>
    );
};

export default SimpleDevicesAvarageContainer;
