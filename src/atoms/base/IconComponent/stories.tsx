import React, { ComponentProps, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import IconComponent from '.';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'TheHome/Atoms/Base/IconComponent',
    component: IconComponent,
    argTypes: {
        icon_false: {
            table: {
                disable: true,
            },
        },
        icon_true: {
            table: {
                disable: true,
            },
        },
        icon: {
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
        sizes: {
            table: {
                disable: true,
            },
        },
        srcSet: {
            table: {
                disable: true,
            },
        },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof IconComponent> {
    icon_false: string;
    icon_true: string;
    onClicked: (i: string) => void;
}

//👇 We create a “template” of how args map to rendering
const Template: Story<I_Props> = (args) => {
    const [icon, setIcon] = useState<string>(args.icon_false);
    // const iconTrue
    const { icon: _icon, onClick, ...props } = { ...args };
    return (
        <IconComponent
            icon={icon}
            onClick={() => {
                if (args.onClick) args.onClick();
                icon === args.icon_false ? setIcon(args.icon_true) : setIcon(args.icon_false);
                return icon === args.icon_false
                    ? args.onClicked('Icon Clicked : false')
                    : args.onClicked('Icon Clicked : true');
            }}
            {...props}
        />
    );
};

export const Light = Template.bind({});
Light.args = {
    icon_false:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAACXElEQVQ4jY2Uv08TYRzGn/dei3D2BXq2utQUhsZ2oEmLm05OJv4JLqwk0LUR8UcckKQlDl0cmo5qjI7GycQE4kAgQSOh5hpxaD1IrwPctdfj+vo6kCum9K58p+/7PPd88n7vffMS+NTc3Nyooij3ZVm+DQCmaW5wzj8Wi0XbK0O8jFwuNx+JRBaSyWRcUZQAADSbTadSqai6rhdXV1dfDcrRQeLy8vLzTCbzKJ1O3wgGg5RSCkopgsEgnZqaisiyfCcej8vr6+tfhgKz2exsMpl8mUgkrnrtfnJycvTk5CQRi8U+b25uHvzvSf0fK4ryZGZm5poXzK1UKnU9HA4/7dcv9QuMsWlCiNtjYmICjuMAAAKBAI6OjmAYBgghYIxNDwVSSmW3Hx8fR61WgyyfSu12G9FoFIZhnI4nSVeGAjnnptvbtg3GWA/AGINtn90Yx3HM/vy5f3h8fLwvhAAA6LqOUCjU80KhEBqNBgBACAHDMH4PBbZarcd7e3uH7rrb7WJQv7u727As69lQYKFQ+KGq6lf3IAaV4zhQVXUjn8/vDAUCgKZp89vb27+8gFtbW/uapi0M8gYCS6XSYa1W+9Bqtc55pmmKer3+vlwu/7kwEAB0XV+rVqtav16tVg90XV/zynk+DgDwcGmpezORoIQQAQBCCPKzUuEvVlbOXTe3PA0AGBsba2dmbzEA5Pu3nZ7ml/EcGQAIId2LaBcG2p2OxTnvrcVfAcuyOn4Z35ENw7j77u2bT5zzaQCgkrRv2/Y9v4zvoQDA4uLi5U6n80CSJDEyMvLa7/kHgH/Za/IMFrpllAAAAABJRU5ErkJggg==',
    icon_true:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAACcUlEQVQ4jY2UXUhTYRjH/++Oc2dTWzbXpmk4WB8ERVH0gUayuvCDyLorpe4iw+yuLqSSiO4k0iAhkEQsCPu4qFaKBjmFgkDEiGhtoaXb1LnVtrNzdj66mFtxtnO25+p9n//7/z3P+8FLoBJ1Xe/oypJY0zo6WAMAIa7UtUppXjk7GlklD1ESzt8baqs2eNuPWp1bbMVuLQB4IvbEuK/hmzda3fvgUmtf3sCLvYM3m6sedxwomzRm0z8s14ae/zzdc7+99YZco+SJM3df7nVYnXcclrcmpe4rDXN0jC/arjt0a2x2ZMj3v6aRLy4v/HW9sfzFRiVYKpo2PbNUGOYyOiyQJ8y0z0YRISkaD6NgQz1EdiFZXVcBPvgGfHgCFBFg0fttOYE6whrSYukxxL2doIp3AwC4yDRo223w4QkAQCHYopzAuKiLpMYi4wFlrIEQnlzruBYi406vjYp0RO7POMOluNUrrqU5/wC0puZ/1U0nwPn6AQCCRCHAlP/IDUyYr40uNvlTc4lfQbbxiO/40u9oWVdO4ODlU7PvA46puKCXS+lgeANcgSOuh1dOTucEAsCX0I624fkWjxLwyfxZ79fI1vZsWlbgWOdB/0xoz9MV1pyhLbNm6fPqzuHRq7ULeQMBwB22d7uW6xbl+YmAw+f+Y+9W8il+DgBwru8jv6uqiCIEEgBIEsjMfFQYuLA/47mlQlEAAFpLx/Zt21wCgHz6HgQBQGuFmJpHccsAQDSEzyeXNzDG8YwgSum5KEmIsXxczaO6ZYbhHf3jHqcoirZkdeJNiFy9mkf1UgCgoee1ToiubyEajaTRBx+pff8A8BcmtOgLgmblyAAAAABJRU5ErkJggg==',
    onClick: () => {
        return;
    },
};
Light.argTypes = { onClicked: { action: 'Light Clicked' } };

export const Door = Template.bind({});
Door.args = {
    icon_false:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAjElEQVQ4jWNgoDJgROZU19Q8UVFV/UOKAXdu32ZpbWmRgfFZkCVVVFX/6Ojqyd+7e4cow5SUVRgYGBgeIouxoCu6d/cOg7OrG1EG7t29C0OMiSidJIBRA4eLgQvmzaWugQlJydQ1EB8YNXAQGohSfN25fZuFl4fny5bvGzmI0fzi2bMfn798wSgCqQoAKqIjUPYlXwAAAAAASUVORK5CYII=',
    icon_true:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAjElEQVQ4jWNgoDJgROZU19Q8UVFV/UOKAXdu32ZpbWmRgfFZkCVVVFX/6Ojqyd+7e4cow5SUVRgYGBgeIouxoCu6d/cOg7OrG1EG7t29C0OMiSidJIBRA4eLgQvmzaWugQlJydQ1EB8YNXAQGohSfN25fZuFl4fny5bvGzmI0fzi2bMfn798wSgCqQoAKqIjUPYlXwAAAAAASUVORK5CYII=',
    onClick: () => {
        return;
    },
};
Door.argTypes = { onClicked: { action: 'Door Clicked' } };

export const Root = Template.bind({});
Root.args = {
    icon_false:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAjElEQVQ4jWNgoDJgROZU19Q8UVFV/UOKAXdu32ZpbWmRgfFZkCVVVFX/6Ojqyd+7e4cow5SUVRgYGBgeIouxoCu6d/cOg7OrG1EG7t29C0OMiSidJIBRA4eLgQvmzaWugQlJydQ1EB8YNXAQGohSfN25fZuFl4fny5bvGzmI0fzi2bMfn798wSgCqQoAKqIjUPYlXwAAAAAASUVORK5CYII=',
    icon_true:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAjElEQVQ4jWNgoDJgROZU19Q8UVFV/UOKAXdu32ZpbWmRgfFZkCVVVFX/6Ojqyd+7e4cow5SUVRgYGBgeIouxoCu6d/cOg7OrG1EG7t29C0OMiSidJIBRA4eLgQvmzaWugQlJydQ1EB8YNXAQGohSfN25fZuFl4fny5bvGzmI0fzi2bMfn798wSgCqQoAKqIjUPYlXwAAAAAASUVORK5CYII=',
    onClick: () => {
        return;
    },
    size: 'root',
};
Root.argTypes = { onClicked: { action: 'Door Clicked' } };

export const Small = Template.bind({});
Small.args = {
    icon_false:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAjElEQVQ4jWNgoDJgROZU19Q8UVFV/UOKAXdu32ZpbWmRgfFZkCVVVFX/6Ojqyd+7e4cow5SUVRgYGBgeIouxoCu6d/cOg7OrG1EG7t29C0OMiSidJIBRA4eLgQvmzaWugQlJydQ1EB8YNXAQGohSfN25fZuFl4fny5bvGzmI0fzi2bMfn798wSgCqQoAKqIjUPYlXwAAAAAASUVORK5CYII=',
    icon_true:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAjElEQVQ4jWNgoDJgROZU19Q8UVFV/UOKAXdu32ZpbWmRgfFZkCVVVFX/6Ojqyd+7e4cow5SUVRgYGBgeIouxoCu6d/cOg7OrG1EG7t29C0OMiSidJIBRA4eLgQvmzaWugQlJydQ1EB8YNXAQGohSfN25fZuFl4fny5bvGzmI0fzi2bMfn798wSgCqQoAKqIjUPYlXwAAAAAASUVORK5CYII=',
    onClick: () => {
        return;
    },
    size: 'small',
};
Small.argTypes = { onClicked: { action: 'Door Clicked' } };

export const Large = Template.bind({});
Large.args = {
    icon_false:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAjElEQVQ4jWNgoDJgROZU19Q8UVFV/UOKAXdu32ZpbWmRgfFZkCVVVFX/6Ojqyd+7e4cow5SUVRgYGBgeIouxoCu6d/cOg7OrG1EG7t29C0OMiSidJIBRA4eLgQvmzaWugQlJydQ1EB8YNXAQGohSfN25fZuFl4fny5bvGzmI0fzi2bMfn798wSgCqQoAKqIjUPYlXwAAAAAASUVORK5CYII=',
    icon_true:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAjElEQVQ4jWNgoDJgROZU19Q8UVFV/UOKAXdu32ZpbWmRgfFZkCVVVFX/6Ojqyd+7e4cow5SUVRgYGBgeIouxoCu6d/cOg7OrG1EG7t29C0OMiSidJIBRA4eLgQvmzaWugQlJydQ1EB8YNXAQGohSfN25fZuFl4fny5bvGzmI0fzi2bMfn798wSgCqQoAKqIjUPYlXwAAAAAASUVORK5CYII=',
    onClick: () => {
        return;
    },
    size: 'large',
};
Large.argTypes = { onClicked: { action: 'Door Clicked' } };

export const LargeWithout = Template.bind({});
LargeWithout.args = {
    onClick: () => {
        return;
    },
    size: 'large',
};
LargeWithout.argTypes = { onClicked: { action: 'Door Clicked' } };
LargeWithout.decorators = [(Story) => <Story />];

export const Circular = Template.bind({});
Circular.args = {
    icon_false:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAlElEQVQ4je2SPQrDMAyFX4sP4lGgq3TsgTTI98gBPPYqAh9G0CwJ1D/QNkmXkm8yz/izQO+CBRG5hRDu2IC7ZxF5VKGqTs+NqOq0ekL7WykFZlZlzAwAw5yIqqwTmhlijF0GYJi3wmsr3Msp3E+3ZWb+qjYtv5/w7OEfCg/vYSckoq4Kr3cfT+juOaX09sEId8/reQbglHX3cPdLSQAAAABJRU5ErkJggg==',
    icon_true:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABdklEQVQ4jWMMnXLO8su3f6+2l5ncZaAAeHadUebhYhJjEedmSY8yF/W1WHfz1vP33zf++sOQa6LE/5sYQ87c+8jKyPi/X0qQw8dQXkBz39XX21kYGBgYAkwkhFz0JCw+fv1hvufCnf8/v99hitc5g9ewhVdMGOxUJf65GKh08XNzMPKwMTDsu/qagQWm4PDj/wz87OyMPhY6jFuPfWL4+bgDr4Ec7NsYvC10mG6+/c/w8d1/Bk9lRgYGBgYGJmRFH38yMLz7/p8Y3zIwMEDUfvyJKsaEXSn5YPAbCI8UWKAyMDAwHCdSs6oQI4OqEA4Dt9+FRIaKIPGuuf3uP8Od96gOGvxhOGoglQ3kZ2dgEOJkxKUWAwhxMjLws6OKwdOhrSwjw8evP/5vOXHn/8+f35jYVSvwGvbjyjeGLSeu/HMxUGHkF+OAu4KFgYGBYcOZF+8uPf6EVMCq/J53SwW/89gYGA7d/sh6+M4NeAHLwMDAwEjtKgAA2tSGeh5PDr4AAAAASUVORK5CYII=',
    onClick: () => {
        return;
    },
    size: 'root',
    variants: 'circular',
};
Circular.argTypes = { onClicked: { action: 'Door Clicked' } };
Circular.decorators = [
    (Story) => (
        <div style={{ margin: '3em' }}>
            <Story />
        </div>
    ),
];

export const Rounded = Template.bind({});
Rounded.args = {
    icon_false:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAlElEQVQ4je2SPQrDMAyFX4sP4lGgq3TsgTTI98gBPPYqAh9G0CwJ1D/QNkmXkm8yz/izQO+CBRG5hRDu2IC7ZxF5VKGqTs+NqOq0ekL7WykFZlZlzAwAw5yIqqwTmhlijF0GYJi3wmsr3Msp3E+3ZWb+qjYtv5/w7OEfCg/vYSckoq4Kr3cfT+juOaX09sEId8/reQbglHX3cPdLSQAAAABJRU5ErkJggg==',
    icon_true:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABdklEQVQ4jWMMnXLO8su3f6+2l5ncZaAAeHadUebhYhJjEedmSY8yF/W1WHfz1vP33zf++sOQa6LE/5sYQ87c+8jKyPi/X0qQw8dQXkBz39XX21kYGBgYAkwkhFz0JCw+fv1hvufCnf8/v99hitc5g9ewhVdMGOxUJf65GKh08XNzMPKwMTDsu/qagQWm4PDj/wz87OyMPhY6jFuPfWL4+bgDr4Ec7NsYvC10mG6+/c/w8d1/Bk9lRgYGBgYGJmRFH38yMLz7/p8Y3zIwMEDUfvyJKsaEXSn5YPAbCI8UWKAyMDAwHCdSs6oQI4OqEA4Dt9+FRIaKIPGuuf3uP8Od96gOGvxhOGoglQ3kZ2dgEOJkxKUWAwhxMjLws6OKwdOhrSwjw8evP/5vOXHn/8+f35jYVSvwGvbjyjeGLSeu/HMxUGHkF+OAu4KFgYGBYcOZF+8uPf6EVMCq/J53SwW/89gYGA7d/sh6+M4NeAHLwMDAwEjtKgAA2tSGeh5PDr4AAAAASUVORK5CYII=',
    onClick: () => {
        return;
    },
    size: 'root',
    variants: 'rounded',
};
Rounded.argTypes = { onClicked: { action: 'Door Clicked' } };
Rounded.decorators = [
    (Story) => (
        <div style={{ margin: '3em' }}>
            <Story />
        </div>
    ),
];

export const Square = Template.bind({});
Square.args = {
    icon_false:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAlElEQVQ4je2SPQrDMAyFX4sP4lGgq3TsgTTI98gBPPYqAh9G0CwJ1D/QNkmXkm8yz/izQO+CBRG5hRDu2IC7ZxF5VKGqTs+NqOq0ekL7WykFZlZlzAwAw5yIqqwTmhlijF0GYJi3wmsr3Msp3E+3ZWb+qjYtv5/w7OEfCg/vYSckoq4Kr3cfT+juOaX09sEId8/reQbglHX3cPdLSQAAAABJRU5ErkJggg==',
    icon_true:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABdklEQVQ4jWMMnXLO8su3f6+2l5ncZaAAeHadUebhYhJjEedmSY8yF/W1WHfz1vP33zf++sOQa6LE/5sYQ87c+8jKyPi/X0qQw8dQXkBz39XX21kYGBgYAkwkhFz0JCw+fv1hvufCnf8/v99hitc5g9ewhVdMGOxUJf65GKh08XNzMPKwMTDsu/qagQWm4PDj/wz87OyMPhY6jFuPfWL4+bgDr4Ec7NsYvC10mG6+/c/w8d1/Bk9lRgYGBgYGJmRFH38yMLz7/p8Y3zIwMEDUfvyJKsaEXSn5YPAbCI8UWKAyMDAwHCdSs6oQI4OqEA4Dt9+FRIaKIPGuuf3uP8Od96gOGvxhOGoglQ3kZ2dgEOJkxKUWAwhxMjLws6OKwdOhrSwjw8evP/5vOXHn/8+f35jYVSvwGvbjyjeGLSeu/HMxUGHkF+OAu4KFgYGBYcOZF+8uPf6EVMCq/J53SwW/89gYGA7d/sh6+M4NeAHLwMDAwEjtKgAA2tSGeh5PDr4AAAAASUVORK5CYII=',
    onClick: () => {
        return;
    },
    size: 'root',
    variants: 'square',
};
Square.argTypes = { onClicked: { action: 'Door Clicked' } };
Square.decorators = [
    (Story) => (
        <div style={{ margin: '3em' }}>
            <Story />
        </div>
    ),
];

export const SquareWithoutAnimation = Template.bind({});
SquareWithoutAnimation.args = {
    icon_false:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAlElEQVQ4je2SPQrDMAyFX4sP4lGgq3TsgTTI98gBPPYqAh9G0CwJ1D/QNkmXkm8yz/izQO+CBRG5hRDu2IC7ZxF5VKGqTs+NqOq0ekL7WykFZlZlzAwAw5yIqqwTmhlijF0GYJi3wmsr3Msp3E+3ZWb+qjYtv5/w7OEfCg/vYSckoq4Kr3cfT+juOaX09sEId8/reQbglHX3cPdLSQAAAABJRU5ErkJggg==',
    icon_true:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABdklEQVQ4jWMMnXLO8su3f6+2l5ncZaAAeHadUebhYhJjEedmSY8yF/W1WHfz1vP33zf++sOQa6LE/5sYQ87c+8jKyPi/X0qQw8dQXkBz39XX21kYGBgYAkwkhFz0JCw+fv1hvufCnf8/v99hitc5g9ewhVdMGOxUJf65GKh08XNzMPKwMTDsu/qagQWm4PDj/wz87OyMPhY6jFuPfWL4+bgDr4Ec7NsYvC10mG6+/c/w8d1/Bk9lRgYGBgYGJmRFH38yMLz7/p8Y3zIwMEDUfvyJKsaEXSn5YPAbCI8UWKAyMDAwHCdSs6oQI4OqEA4Dt9+FRIaKIPGuuf3uP8Od96gOGvxhOGoglQ3kZ2dgEOJkxKUWAwhxMjLws6OKwdOhrSwjw8evP/5vOXHn/8+f35jYVSvwGvbjyjeGLSeu/HMxUGHkF+OAu4KFgYGBYcOZF+8uPf6EVMCq/J53SwW/89gYGA7d/sh6+M4NeAHLwMDAwEjtKgAA2tSGeh5PDr4AAAAASUVORK5CYII=',
    onClick: () => {
        return;
    },
    size: 'root',
    variants: 'square',
    withAnimation: false,
};
SquareWithoutAnimation.argTypes = { onClicked: { action: 'Door Clicked' } };
SquareWithoutAnimation.decorators = [
    (Story) => (
        <div style={{ margin: '3em' }}>
            <Story />
        </div>
    ),
];
