import React, { ComponentProps, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import ValueTitleBox from '.';
import IconComponent from '../../base/IconComponent';
import { T_TypographyComponent_Variants } from '../../base/TypographyComponent';
import ValueUnitText from '../ValueUnitText';
import { rgba2HexConverter } from '../../../utils/Hex2rgbaConverter';

const icon =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAjElEQVQ4jWNgoDJgROZU19Q8UVFV/UOKAXdu32ZpbWmRgfFZkCVVVFX/6Ojqyd+7e4cow5SUVRgYGBgeIouxoCu6d/cOg7OrG1EG7t29C0OMiSidJIBRA4eLgQvmzaWugQlJydQ1EB8YNXAQGohSfN25fZuFl4fny5bvGzmI0fzi2bMfn798wSgCqQoAKqIjUPYlXwAAAAAASUVORK5CYII=';
const icon_false =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAACXElEQVQ4jY2Uv08TYRzGn/dei3D2BXq2utQUhsZ2oEmLm05OJv4JLqwk0LUR8UcckKQlDl0cmo5qjI7GycQE4kAgQSOh5hpxaD1IrwPctdfj+vo6kCum9K58p+/7PPd88n7vffMS+NTc3Nyooij3ZVm+DQCmaW5wzj8Wi0XbK0O8jFwuNx+JRBaSyWRcUZQAADSbTadSqai6rhdXV1dfDcrRQeLy8vLzTCbzKJ1O3wgGg5RSCkopgsEgnZqaisiyfCcej8vr6+tfhgKz2exsMpl8mUgkrnrtfnJycvTk5CQRi8U+b25uHvzvSf0fK4ryZGZm5poXzK1UKnU9HA4/7dcv9QuMsWlCiNtjYmICjuMAAAKBAI6OjmAYBgghYIxNDwVSSmW3Hx8fR61WgyyfSu12G9FoFIZhnI4nSVeGAjnnptvbtg3GWA/AGINtn90Yx3HM/vy5f3h8fLwvhAAA6LqOUCjU80KhEBqNBgBACAHDMH4PBbZarcd7e3uH7rrb7WJQv7u727As69lQYKFQ+KGq6lf3IAaV4zhQVXUjn8/vDAUCgKZp89vb27+8gFtbW/uapi0M8gYCS6XSYa1W+9Bqtc55pmmKer3+vlwu/7kwEAB0XV+rVqtav16tVg90XV/zynk+DgDwcGmpezORoIQQAQBCCPKzUuEvVlbOXTe3PA0AGBsba2dmbzEA5Pu3nZ7ml/EcGQAIId2LaBcG2p2OxTnvrcVfAcuyOn4Z35ENw7j77u2bT5zzaQCgkrRv2/Y9v4zvoQDA4uLi5U6n80CSJDEyMvLa7/kHgH/Za/IMFrpllAAAAABJRU5ErkJggg==';
const icon_true =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAACcUlEQVQ4jY2UXUhTYRjH/++Oc2dTWzbXpmk4WB8ERVH0gUayuvCDyLorpe4iw+yuLqSSiO4k0iAhkEQsCPu4qFaKBjmFgkDEiGhtoaXb1LnVtrNzdj66mFtxtnO25+p9n//7/z3P+8FLoBJ1Xe/oypJY0zo6WAMAIa7UtUppXjk7GlklD1ESzt8baqs2eNuPWp1bbMVuLQB4IvbEuK/hmzda3fvgUmtf3sCLvYM3m6sedxwomzRm0z8s14ae/zzdc7+99YZco+SJM3df7nVYnXcclrcmpe4rDXN0jC/arjt0a2x2ZMj3v6aRLy4v/HW9sfzFRiVYKpo2PbNUGOYyOiyQJ8y0z0YRISkaD6NgQz1EdiFZXVcBPvgGfHgCFBFg0fttOYE6whrSYukxxL2doIp3AwC4yDRo223w4QkAQCHYopzAuKiLpMYi4wFlrIEQnlzruBYi406vjYp0RO7POMOluNUrrqU5/wC0puZ/1U0nwPn6AQCCRCHAlP/IDUyYr40uNvlTc4lfQbbxiO/40u9oWVdO4ODlU7PvA46puKCXS+lgeANcgSOuh1dOTucEAsCX0I624fkWjxLwyfxZ79fI1vZsWlbgWOdB/0xoz9MV1pyhLbNm6fPqzuHRq7ULeQMBwB22d7uW6xbl+YmAw+f+Y+9W8il+DgBwru8jv6uqiCIEEgBIEsjMfFQYuLA/47mlQlEAAFpLx/Zt21wCgHz6HgQBQGuFmJpHccsAQDSEzyeXNzDG8YwgSum5KEmIsXxczaO6ZYbhHf3jHqcoirZkdeJNiFy9mkf1UgCgoee1ToiubyEajaTRBx+pff8A8BcmtOgLgmblyAAAAABJRU5ErkJggg==';

const TestComp = (): JSX.Element => {
    const [_icon, setIcon] = useState<string>(icon_false);
    return (
        <IconComponent
            icon={_icon}
            onClick={() => {
                _icon === icon_false ? setIcon(icon_true) : setIcon(icon_false);
            }}
            size="large"
        />
    );
};

const valueUnitArgs = {
    value: '10',
    unit: '°C',
    variant: 'body' as T_TypographyComponent_Variants,
    noWrap: true,
    spaceBeforeUnit: true,
};

//👇 This default export determines where your story goes in the story list
export default {
    title: 'TheHome/Atoms/enhanced/ValueTitleBox',
    component: ValueTitleBox,
    argTypes: {
        color: {
            control: {
                type: 'color',
            },
        },
        value: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
        onClicked: {
            table: {
                disable: true,
            },
        },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof ValueTitleBox> {
    onClicked: (i: string) => void;
}

//👇 We create a “template” of how args map to rendering
const Template: Story<I_Props> = (props: I_Props) => {
    const { onClicked, ...args } = { ...props };
    args.onClick = onClicked ? () => onClicked('Yes you clicked me') : undefined;

    if (props.color && props.color.startsWith('rgba')) {
        args.color = '#' + rgba2HexConverter(props.color);
    }
    return <ValueTitleBox {...args} />;
};

export const WithColor = Template.bind({});
WithColor.args = {
    value: <ValueUnitText {...valueUnitArgs} />,
    title: 'With Color',
    color: '#aa2a2a',
    withColor: true,
    onClicked: undefined,
};

export const StandardColor = Template.bind({});
StandardColor.args = {
    value: <ValueUnitText {...valueUnitArgs} />,
    title: 'Standard Color',
    onClicked: undefined,
};

export const WhithoutColor = Template.bind({});
WhithoutColor.args = {
    value: <ValueUnitText {...valueUnitArgs} />,
    title: 'Without Color',
    withColor: false,
    onClicked: undefined,
};

export const WhithoutColor2 = Template.bind({});
WhithoutColor2.args = {
    value: <ValueUnitText {...valueUnitArgs} />,
    title: 'Without Color 2',
    color: '#aa2a2a',
    withColor: false,
    onClicked: undefined,
};

export const WhithColorAndTitle = Template.bind({});
WhithColorAndTitle.args = {
    value: <ValueUnitText {...valueUnitArgs} />,
    color: '#aa2a2a',
    withColor: true,
    onClicked: undefined,
};

export const WhithoutColorAndTitle = Template.bind({});
WhithoutColorAndTitle.args = {
    value: <ValueUnitText {...valueUnitArgs} />,
    withColor: false,
    onClicked: undefined,
};

export const WithClick = Template.bind({});
WithClick.args = {
    value: <ValueUnitText {...valueUnitArgs} />,
    title: 'Click me',
    withColor: false,
};

export const WithClickWithoutTitle = Template.bind({});
WithClickWithoutTitle.args = {
    value: <ValueUnitText {...valueUnitArgs} />,
    withColor: false,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    value: <IconComponent icon={icon} />,
    title: 'With Icon',
    onClicked: undefined,
};

export const WithIconClickWithoutTitle = Template.bind({});
WithIconClickWithoutTitle.args = {
    value: <TestComp />,
};

export const WithIconWithoutTitleClick = Template.bind({});
WithIconWithoutTitleClick.args = {
    value: <TestComp />,
    onClicked: undefined,
};

export const WithIcon18N = Template.bind({});
WithIcon18N.args = {
    value: <IconComponent icon={icon} />,
    title: 'Test Text',
    withColor: false,
    onClicked: undefined,
};

const Template1: Story<I_Props> = (props: I_Props) => {
    const value_true = <IconComponent icon={icon_true} size="large" />;
    const value_false = <IconComponent icon={icon_false} size="large" />;

    const [value_, setValue] = useState<JSX.Element>(value_false);
    const [icon, setIcon] = useState<boolean>(false);

    const { value: _value, onClick, ...newProps } = { ...props };

    if (props.color) {
        newProps.color = '#' + rgba2HexConverter(props.color);
    }

    return (
        <ValueTitleBox
            onClick={() => {
                if (icon === true) {
                    setValue(value_false);
                    setIcon(false);
                } else {
                    setValue(value_true);
                    setIcon(true);
                }
            }}
            value={value_}
            {...newProps}
        />
    );
};

export const SpecialTest = Template1.bind({});
SpecialTest.args = {
    withColor: false,
};
SpecialTest.argTypes = {
    color: {
        control: {
            type: 'color',
        },
    },
};
