import React, { useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { CurrentValueAvarageBox } from '.';
import { MemoryRouter } from 'react-router-dom';
import { useGetIOBFunctionTypeByIOBDeviceID } from '../../hooks/PlaceOverviewHooks';
import { selector_getFunctionTypeByID } from '../../features/servConn/selectors';
import { useSelector } from 'react-redux';
import { useSingleChartDataCalculator } from '../../components/Charts/hooks/SingleChartDataCalculator';
import { C_DEFAULT_DURATION } from '../../components/Charts';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'TheHome/Molecules/CurrentValueAvarageBox',
    component: CurrentValueAvarageBox,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<any> = (args) => {
    const functionID = useGetIOBFunctionTypeByIOBDeviceID(args.deviceID) ?? '';
    const functionType = useSelector(selector_getFunctionTypeByID(functionID));
    if (functionType === undefined || functionType.functionID === undefined) return <div>Not loadable</div>;
    const valueType = functionType?.type ?? 'number';

    const { allVal, calcHistory } = useSingleChartDataCalculator(args.deviceID, valueType);
    useEffect(() => {
        calcHistory(C_DEFAULT_DURATION);
    }, []);
    return (
        <MemoryRouter
            initialEntries={[
                {
                    pathname: '/homes',
                    state: {
                        deviceID: args.deviceID,
                        functionType: functionID,
                        pathArray: [''],
                    },
                },
            ]}
        >
            <CurrentValueAvarageBox allValues={allVal} type={valueType} />
        </MemoryRouter>
    );
};

export const FirstStory = Template.bind({});
FirstStory.args = {
    /*👇 The args you need here will depend on your component */
    deviceID: 'jeelink.0.LaCrosse_stube.humid',
};
FirstStory.storyName = '1st Story';
