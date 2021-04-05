import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SensorListContainer from '.';

export default {
    title: 'TheHome/Organisms/Redux/SensorListContainer',
    component: SensorListContainer,
    argTypes: {
        title: { name: 'Title' },
        value: { table: { disable: true } },
        onClicked: { table: { disable: true } },
        listItems: { table: { disable: true } },
    },
} as Meta;

interface I_Props extends ComponentProps<typeof SensorListContainer> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { onClicked, ...args } = { ...props };
    return <SensorListContainer {...args} />;
};

const argsTemp = {
    pathArray: [''],
    functionTypeID: 'enum.functions.temp',
    sensorValueType: {
        membersStateList: ['jeelink.0.LaCrosse_arvian.temp'],
        functionTypeID: 'enum.functions.temp',
        iobObjectCommon: { type: 'number', unit: '°C' },
    },
};

const argsDoor = {
    pathArray: [''],
    functionTypeID: 'enum.functions.doors',
    sensorValueType: {
        membersStateList: ['deconz.0.sensors.00158d000346aa52.open'],
        functionTypeID: 'enum.functions.doors',
        iobObjectCommon: {
            type: 'boolean',
            icon:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAjklEQVQ4jWNgoDJgRObEzTj/RFuG/w8pBlx98pFlUYahDIzPgiypLcP/x0BJSP7Ws09EGaYmxcfAwMDwEFmMBV3RrWefGHxMZNCFsYItZ55giDERpZMEMGrgcDFwyvab1DUwx1OdugbiA6MGDkIDUYqvq08+sghwsX1ZdfQBBzGan779/uPDt18YRSBVAQCcWiNQFHsMNQAAAABJRU5ErkJggg==',
            icon_false:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAjElEQVQ4jWNgoDJgROZU19Q8UVFV/UOKAXdu32ZpbWmRgfFZkCVVVFX/6Ojqyd+7e4cow5SUVRgYGBgeIouxoCu6d/cOg7OrG1EG7t29C0OMiSidJIBRA4eLgQvmzaWugQlJydQ1EB8YNXAQGohSfN25fZuFl4fny5bvGzmI0fzi2bMfn798wSgCqQoAKqIjUPYlXwAAAAAASUVORK5CYII=',
            icon_true:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABJ0lEQVQ4jWNkwAMaGv4z3Re/EMnFyerw89e/dfPS9LbjU8/AwMDAiMyJm3H+ibYM/59///8zfvz6m5eFmYnbQkOE1VtHkLF46fWv4gIcb9ANuPrkI8uiDEMZGJ8FWVJbhv8PPw+b/JtPPxn8zWUZJAQ54XLMzEzcrKws3MjqNWX4GBgYGB4ii6EYyMDAwHD3+ReGLE81DK+osmxkCOduYzgq8R4udv3uEwx1TBgiFIJRA+lg4LN336hrIKmAoIFSQlzUNZBUMGrgIDQQpfi6+uQjCzsLy++LD96zqkrxMnCxIaRf/dH4f+RL+v8jFx/8g4l9/Pz9x5cfv1DMQCmxGRgYGDwnbWNn+iNsJsHHGcDPxarNx8kq7aUvKjV11/1VCzMMMgm5EADIM1CZUnzTzgAAAABJRU5ErkJggg==',
        },
    },
};

const argsLight = {
    pathArray: [''],
    functionTypeID: 'enum.functions.light',
    sensorValueType: {
        membersStateList: ['hue.0.Lampe_Stube.on'],
        functionTypeID: 'enum.functions.light',
        iobObjectCommon: {
            type: 'boolean',
            icon:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAACT0lEQVQ4jY2US0wTURSG/zstKTOALW0R4itCKpEYDY2RmOjCuPKxMXEpcQsYgnHlwqjEPQtxIW5caHSjxpWyMOqGqAkhKhgeKq1p02KndFLoPJjndTFpJVNmpmd17vnv/91zH7kEHnFm/GNzLBK+yLHBUwAgqvrMFgpvpscuqG4e4iYMPvo+0tHGjR7p6TzU0c41AQAvSPpimv/Fl6UHz671TzUMHHw4f2+gb89YYl80vJP+OyeUZ5fyk0+Hj911aoyzcOn+3PHDB+NDbjAASOyNRnr3x4YuT8wmfYGx1uY7/YnO3W6waiR7uzrbw1xdh0FnYVdrqJsh9knEWKCDI1BNCgAIBQiKMkVJARhC0Nba3O0LDBLCVfM4R7BcogiH7PGGStEXIygp9gJBBi2+QMOyxGou6xRRFhAUexxlAUmntbm6aYpOf90ZbopamlLblN0Eulr+P4SuFoLMpp1blGJD1P/4AgVJvr2Q4gu1LqxtHW3L51f5oihq477A19dP/FjJrH/SDdMp1ULTTaxk12de3Eh+8wUCQIaXRr4s5VJuwM+LuXRe2BjdSdsR+P7WyUK2UHlVkbU6rSKrNFesvHx383S+YSAArJWkiZ/Z4pqzvpxZ/7tWkibcfK6fAwBcnfpqHD0QCYDAvg0KspApm0+Gk3XPrRquAgCwTQF5oDfeBoDMrQq1mpfHdcsAQBhiNFJrGChrhmJue3sWpZBVY8vL47llRTHOPv6QmrYsq9tenaR1Szvn5fG8FAA4P/k2ZEqRK4RhKMMKz72+fwD4B1wn6YRisIvCAAAAAElFTkSuQmCC',
            icon_false:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAACXElEQVQ4jY2Uv08TYRzGn/dei3D2BXq2utQUhsZ2oEmLm05OJv4JLqwk0LUR8UcckKQlDl0cmo5qjI7GycQE4kAgQSOh5hpxaD1IrwPctdfj+vo6kCum9K58p+/7PPd88n7vffMS+NTc3Nyooij3ZVm+DQCmaW5wzj8Wi0XbK0O8jFwuNx+JRBaSyWRcUZQAADSbTadSqai6rhdXV1dfDcrRQeLy8vLzTCbzKJ1O3wgGg5RSCkopgsEgnZqaisiyfCcej8vr6+tfhgKz2exsMpl8mUgkrnrtfnJycvTk5CQRi8U+b25uHvzvSf0fK4ryZGZm5poXzK1UKnU9HA4/7dcv9QuMsWlCiNtjYmICjuMAAAKBAI6OjmAYBgghYIxNDwVSSmW3Hx8fR61WgyyfSu12G9FoFIZhnI4nSVeGAjnnptvbtg3GWA/AGINtn90Yx3HM/vy5f3h8fLwvhAAA6LqOUCjU80KhEBqNBgBACAHDMH4PBbZarcd7e3uH7rrb7WJQv7u727As69lQYKFQ+KGq6lf3IAaV4zhQVXUjn8/vDAUCgKZp89vb27+8gFtbW/uapi0M8gYCS6XSYa1W+9Bqtc55pmmKer3+vlwu/7kwEAB0XV+rVqtav16tVg90XV/zynk+DgDwcGmpezORoIQQAQBCCPKzUuEvVlbOXTe3PA0AGBsba2dmbzEA5Pu3nZ7ml/EcGQAIId2LaBcG2p2OxTnvrcVfAcuyOn4Z35ENw7j77u2bT5zzaQCgkrRv2/Y9v4zvoQDA4uLi5U6n80CSJDEyMvLa7/kHgH/Za/IMFrpllAAAAABJRU5ErkJggg==',
            icon_true:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAACcUlEQVQ4jY2UXUhTYRjH/++Oc2dTWzbXpmk4WB8ERVH0gUayuvCDyLorpe4iw+yuLqSSiO4k0iAhkEQsCPu4qFaKBjmFgkDEiGhtoaXb1LnVtrNzdj66mFtxtnO25+p9n//7/z3P+8FLoBJ1Xe/oypJY0zo6WAMAIa7UtUppXjk7GlklD1ESzt8baqs2eNuPWp1bbMVuLQB4IvbEuK/hmzda3fvgUmtf3sCLvYM3m6sedxwomzRm0z8s14ae/zzdc7+99YZco+SJM3df7nVYnXcclrcmpe4rDXN0jC/arjt0a2x2ZMj3v6aRLy4v/HW9sfzFRiVYKpo2PbNUGOYyOiyQJ8y0z0YRISkaD6NgQz1EdiFZXVcBPvgGfHgCFBFg0fttOYE6whrSYukxxL2doIp3AwC4yDRo223w4QkAQCHYopzAuKiLpMYi4wFlrIEQnlzruBYi406vjYp0RO7POMOluNUrrqU5/wC0puZ/1U0nwPn6AQCCRCHAlP/IDUyYr40uNvlTc4lfQbbxiO/40u9oWVdO4ODlU7PvA46puKCXS+lgeANcgSOuh1dOTucEAsCX0I624fkWjxLwyfxZ79fI1vZsWlbgWOdB/0xoz9MV1pyhLbNm6fPqzuHRq7ULeQMBwB22d7uW6xbl+YmAw+f+Y+9W8il+DgBwru8jv6uqiCIEEgBIEsjMfFQYuLA/47mlQlEAAFpLx/Zt21wCgHz6HgQBQGuFmJpHccsAQDSEzyeXNzDG8YwgSum5KEmIsXxczaO6ZYbhHf3jHqcoirZkdeJNiFy9mkf1UgCgoee1ToiubyEajaTRBx+pff8A8BcmtOgLgmblyAAAAABJRU5ErkJggg==',
            write: true,
        },
    },
};

const argsBlind = {
    pathArray: [''],
    functionTypeID: 'enum.functions.blinds',
    sensorValueType: {
        membersStateList: ['shelly.0.SHSW-25#B954EE#1.Shutter.state'],
        functionTypeID: 'enum.functions.blinds',
        iobObjectCommon: {
            type: 'string',
            icon:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAjklEQVRIie1VWw6AIAyrxjv7KXdDryV+kQhGXmPzkTXhg0Dp2hEAFEIYormT0hwFhL4DB1r0Sb72+BXQHv8frD2mRF1b2AbA9hCuxY7CQnOOSOuSjklRG1yd+LnJcMlRz6c1P5YKfrMwEDo3hfwg6qmlokjsTjhGt1tN4j/2VpdEzfJjpRyvHc63+S0KZhwHsz3/ZMX3FAAAAABJRU5ErkJggg==',
            write: true,
        },
    },
};

const dummies = [
    {
        listElementProps: {
            folderID: 'enum.home.1_wollerau',
            presentationMode: 'folder' as 'folder' | 'sensor',
            ...argsTemp,
        },
        level: 0,
    },
    [
        {
            listElementProps: {
                folderID: 'enum.area.inside_home',
                presentationMode: 'folder' as 'folder' | 'sensor',
                ...argsTemp,
            },
            level: 1,
        },
        [
            {
                listElementProps: {
                    folderID: 'enum.floor.1-dachgeschoss',
                    presentationMode: 'folder' as 'folder' | 'sensor',
                    ...argsTemp,
                },
                level: 2,
            },
            [
                {
                    listElementProps: {
                        folderID: 'enum.rooms.arvian',
                        presentationMode: 'folder' as 'folder' | 'sensor',
                        ...argsTemp,
                    },
                    level: 3,
                },
                [
                    {
                        listElementProps: {
                            deviceID: 'jeelink.0.LaCrosse_arvian.temp',
                            presentationMode: 'sensor' as 'folder' | 'sensor',
                            ...argsTemp,
                        },
                        level: 4,
                    },
                    {
                        listElementProps: {
                            deviceID: 'deconz.0.sensors.00158d000346aa52.open',
                            presentationMode: 'sensor' as 'folder' | 'sensor',
                            ...argsDoor,
                        },
                        level: 4,
                    },
                ],
            ],
            {
                listElementProps: {
                    folderID: 'enum.floor.3-erdgeschoss',
                    presentationMode: 'folder' as 'folder' | 'sensor',
                    ...argsTemp,
                },
                level: 2,
            },
            [
                {
                    listElementProps: {
                        folderID: 'enum.rooms.stube',
                        presentationMode: 'folder' as 'folder' | 'sensor',
                        ...argsTemp,
                    },
                    level: 3,
                },
                [
                    {
                        listElementProps: {
                            deviceID: 'hue.0.Lampe_Stube.on',
                            presentationMode: 'sensor' as 'folder' | 'sensor',
                            ...argsLight,
                        },
                        level: 4,
                    },
                    {
                        listElementProps: {
                            deviceID: 'shelly.0.SHSW-25#B954EE#1.Shutter.state',
                            presentationMode: 'sensor' as 'folder' | 'sensor',
                            ...argsBlind,
                        },
                        level: 4,
                    },
                ],
            ],
        ],
    ],
];

export const Simple = Template.bind({});
Simple.args = {
    onClicked: undefined,
    listItems: dummies,
};
