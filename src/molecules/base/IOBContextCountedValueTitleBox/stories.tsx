import React from 'react';
import { Story, Meta } from '@storybook/react';
import IOBContextValueTitleBox from '.';
import { MemoryRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selector_getFunctionTypes } from '../../../features/servConn/selectors';
import { useGetIOBFunctionTypeByIOBDeviceID } from '../../../hooks/PlaceOverviewHooks';
import IconComponent from '../../../atoms/base/IconComponent';
import TypographyComponent from '../../../atoms/base/TypographyComponent';

const icon =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAjElEQVQ4jWNgoDJgROZU19Q8UVFV/UOKAXdu32ZpbWmRgfFZkCVVVFX/6Ojqyd+7e4cow5SUVRgYGBgeIouxoCu6d/cOg7OrG1EG7t29C0OMiSidJIBRA4eLgQvmzaWugQlJydQ1EB8YNXAQGohSfN25fZuFl4fny5bvGzmI0fzi2bMfn798wSgCqQoAKqIjUPYlXwAAAAAASUVORK5CYII=';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'TheHome/Molecules/base/IOBContextValueTitleBox',
    component: IOBContextValueTitleBox,
    argTypes: {
        functionType: {
            control: {
                type: 'select',
                options: [
                    'enum.functions.hum',
                    'enum.functions.temp',
                    'enum.functions.smart_switch',
                    'enum.functions.rain',
                    'enum.functions.wind_',
                    'enum.functions.pressure',
                    'enum.functions.light',
                    'enum.functions.blinds',
                    'enum.functions.blinds_position',
                    'enum.functions.doors',
                    'enum.functions.motion',
                    'enum.functions.window',
                ],
            },
        },
        onClick: { action: 'clicked1' },
    },
} as Meta;

//👇 We create a “template” of how args map to rendering
// const Template: Story<ComponentProps<typeof ValueTitleBox>> = (args) => <ValueTitleBox {...args} />;
const Template: Story<any> = (args) => {
    const allFunctionTypes = Object.values(useSelector(selector_getFunctionTypes())).map((e) => e.functionID);
    console.log(useGetIOBFunctionTypeByIOBDeviceID('jeelink.1.LaCrosseWS_balkon.wspeed2'));
    return (
        <MemoryRouter
            initialEntries={[
                {
                    pathname: '/homes',
                    state: {
                        functionType: args.functionType,
                        pathArray: [''],
                    },
                },
            ]}
        >
            <div
                onClick={() =>
                    args.onClick({
                        allFunctionTypes: allFunctionTypes,
                    })
                }
            >
                <IOBContextValueTitleBox
                    allValues={[args.value]}
                    countMethod="first"
                    withUnit={args.withUnit}
                    title={args.title}
                />
            </div>
        </MemoryRouter>
    );
};

export const FirstStory = Template.bind({});
FirstStory.args = {
    /*👇 The args you need here will depend on your component */
    value: 10,
    title: undefined,
    withUnit: true,
    functionType: 'enum.functions.hum',
};
FirstStory.storyName = '1st Story';

export const Story2 = Template.bind({});
Story2.args = {
    /*👇 The args you need here will depend on your component */
    value: 'Guido',
    title: 'chartOvervewBoxes.lastval',
    withUnit: false,
    functionType: 'enum.functions.light',
};
Story2.storyName = '2nd Story';

export const StoryIcon = Template.bind({});
StoryIcon.args = {
    /*👇 The args you need here will depend on your component */
    value: <IconComponent icon={icon} />,
    title: 'With IconComponent Value',
    withUnit: false,
    functionType: 'enum.functions.light',
};
StoryIcon.storyName = 'Icon';

export const StoryTypograph = Template.bind({});
StoryTypograph.args = {
    /*👇 The args you need here will depend on your component */
    value: <TypographyComponent variant="body">TypographyComponent</TypographyComponent>,
    title: 'With IconComponent Value',
    withUnit: false,
    functionType: 'enum.functions.light',
};
StoryTypograph.storyName = 'Typograph';
