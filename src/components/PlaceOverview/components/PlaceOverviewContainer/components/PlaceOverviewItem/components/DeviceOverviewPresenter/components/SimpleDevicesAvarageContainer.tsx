import React, { useMemo } from 'react';
import { I_PlaceOverviewXContainer_Props } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatesByMemberList } from '../../../../../../../../../features/ioBrokerStates/selectors';
import { useGetHomeContainerLocationTo } from '../../../../../../../../../hooks/PlaceOverviewHooks';
import { ACTION_IOBROKER_UPDATE_STATE } from '../../../../../../../../../features/ioBrokerStates/actions';
import IconComponent from '../../../../../../../../../atoms/base/IconComponent';
import { useGetCountedValue } from '../../../../../../../../../hooks/CountingHooks';
import CountedValueText from '../../../../../../../../../atoms/enhanced/CountedValueText';

const SimpleDevicesAvarageContainer_ = (props: I_PlaceOverviewXContainer_Props): JSX.Element | null => {
    // console.log('🚀 ~ SimpleDevicesAvarageContainer ~ line 30 ~ props', props);

    const selectNumOfTodosWithIsDone = useMemo(selectStatesByMemberList, []);
    const dispatch = useDispatch();
    // const allValues = props.membersStateList.map((e) => useSelector(selector_getStateValueByID(e)));
    const allValues = useSelector((state: any) => selectNumOfTodosWithIsDone(state, props.membersStateList));

    const value = useGetCountedValue(allValues, 'av', props.type);

    const { goToLocation } = useGetHomeContainerLocationTo({
        pathArray: props.pathArray ?? [],
        layout: 'standard_function_type_overview',
        functionTypeID: props.functionID,
    });

    const goTo = props.pathArray
        ? () => {
              return goToLocation();
          }
        : () => {
              return;
          };

    const val = useMemo(() => {
        const icon =
            props.type === 'boolean'
                ? value === undefined
                    ? props.icon ?? ''
                    : value > 0
                    ? props.icon_true ?? ''
                    : props.icon_false ?? ''
                : '';
        const unit = props.unit ?? '';

        const changeState = () => {
            for (const id of props.membersStateList) {
                dispatch(ACTION_IOBROKER_UPDATE_STATE(id, !value));
            }
        };

        if (props.type === 'number') {
            return (
                <CountedValueText onClick={goTo} allValues={allValues} type={props.type} unit={unit} countMethod="av" />
            );
        }
        if (props.type === 'boolean' && props.write === true) {
            return <IconComponent onClick={changeState} icon={icon} size="small" />;
        }

        return <IconComponent onClick={goTo} icon={icon} size="xsmall" />;
    }, [JSON.stringify(allValues)]);

    return val;
};

const SimpleDevicesAvarageContainer = React.memo(SimpleDevicesAvarageContainer_);
// const SimpleDevicesAvarageContainer = SimpleDevicesAvarageContainer_;

export default SimpleDevicesAvarageContainer;
