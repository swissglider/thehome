import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import SensorDetailsTemplate from '.';
import { rgba2HexConverter } from '../../21_utils/Hex2rgbaConverter';
import TimeLengthSelect from '../../11_molecules/base/TimeLengthSelect';
import { C_DEFAULT_DURATION } from '../../21_utils/DurationHelper';
import SimpleButton from '../../10_atoms/base/SimpleButton';
import ValueTitleBox from '../../11_molecules/base/ValueTitleBox';
import NumberChart from '../../10_atoms/enhanced/NumberChart';
import TimeHelper from '../../21_utils/TimeHelper';

export default {
    title: 'TheHome/Templates/SensorDetailsTemplate',
    component: SensorDetailsTemplate,
    argTypes: {
        color: { control: { type: 'color' } },
        onClicked: { table: { disable: true } },
        durationSelect: { table: { disable: true } },
        refreshButton: { table: { disable: true } },
        sensorIconBox: { table: { disable: true } },
        currentBox: { table: { disable: true } },
        avBox: { table: { disable: true } },
        maxBox: { table: { disable: true } },
        minBox: { table: { disable: true } },
        timeStampBox: { table: { disable: true } },
        lastUpdateBox: { table: { disable: true } },
        chart: { table: { disable: true } },
        deviceIDBox: { table: { disable: true } },
    },
} as Meta;

const icon_false =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABbUlEQVRIidXVO0gcURQG4G+NOxYbURaFQCBgFGJELDQhTbSwCCZdwFKxt0thbZ0uELDSxspKfJRWIWATBVGLGLAJwVgFJJXNYnFHGIZlHusD/GGK87j/fw733DM8dFQyYhN4j3oBnv/YxPd0oL1JchWrGMEaDtDIEahjBQuxUKbAImoYxWUOcRIX+JgnUMU8hkqSi8/U0Caj4+c4KUl8jTp28CnpbEsldQgX1gr+YR19WUkvsdeiwKBQ3OukM93BTfAL23h7VwIN7GIgK+kZfrYoMIlTDCed6Q7+oBtPWxDowTccJ53pd9DAV3zGTCoWCXN+XVhXIlbFB5wXqSTCD8ym/MvCKJ42+Q7jwh4XEYB+nOFFwvdOk2V2E8wInUSxXcERXpUheZQRO8Q43ggrgHBH09goI5KFTmE3TcV2DX/Re1sCMIbfeBLbq5grerjIS97Hl5g4Eub9olyN+ahgSVhmW5r/qG4FUX7KPeMKO3M8+ty6HCsAAAAASUVORK5CYII=';

const data = [
    { val: 1, ts: 1617178411520 },
    { val: 4, ts: 1617278421620 },
    { val: 2, ts: 1617378431720 },
    { val: 7, ts: 1617478441820 },
    { val: 3, ts: 1617578451920 },
    { val: 7, ts: 1617678461520 },
    { val: 10, ts: 1617678471520 },
];

const unit = '°C';
const functionName = 'Temperatur';
const deviceName = 'Temp Bad';
const deviceID = 'jeelink.0.LaCrosse_bad.temp';

interface I_Props {
    onClicked: (i: string) => void;
    color: string;
}

// const Template: Story<I_Props> = (props: I_Props) => {
//     const { onClicked } = { ...props };
//     let color = props.color;

//     if (props.color && props.color.startsWith('rgba')) {
//         color = '#' + rgba2HexConverter(props.color);
//     }

//     const allValues = data.map((e) => e.val);

//     const args_: ComponentProps<typeof SensorDetailsTemplate> = {
//         durationSelect: (
//             <TimeLengthSelect
//                 duration={C_DEFAULT_DURATION}
//                 handleChange={(event: React.ChangeEvent<{ value: unknown }>) => {
//                     onClicked(('durationSelect: ' + event.target.value) as string);
//                 }}
//             />
//         ),
//         refreshButton: <SimpleButton text={'refresh'} onClick={() => onClicked('refreshButton')} />,
//         sensorIconBox: (
//             <ValueTitleBox
//                 valueWithIcon={{ icon: icon_false }}
//                 onClick={() => onClicked('sensorIconBox')}
//                 withoutDecoration={true}
//                 withAnimation={false}
//             />
//         ),
//         currentBox: <SimpleValueTitleBox title="chartOvervewBoxes.lastval" unit={unit} color={color} />,
//         avBox: (
//             <SimpleValuesTitleBox
//                 title="chartOvervewBoxes.avval"
//                 allValues={allValues}
//                 unit={unit}
//                 color={color}
//                 countMethod="av"
//             />
//         ),
//         maxBox: (
//             <SimpleValuesTitleBox
//                 title="chartOvervewBoxes.maxval"
//                 allValues={allValues}
//                 unit={unit}
//                 color={color}
//                 countMethod="max"
//             />
//         ),
//         minBox: (
//             <SimpleValuesTitleBox
//                 title="chartOvervewBoxes.minval"
//                 allValues={allValues}
//                 unit={unit}
//                 color={color}
//                 countMethod="min"
//             />
//         ),
//         timeStampBox: <SimpleValueTitleBox title="chartOvervewBoxes.timestamp" color={color} />,
//         lastUpdateBox: <SimpleValueTitleBox title="chartOvervewBoxes.lastupdate" color={color} />,
//         chart: (
//             <NumberChart
//                 data={data}
//                 color={color ?? ''}
//                 unit={unit}
//                 functionName={functionName}
//                 deviceName={deviceName ?? ''}
//             />
//         ),
//         deviceIDBox: <ValueTitleBox value={deviceID} withoutDecoration={true} variant="caption" />,
//     };

//     return <SensorDetailsTemplate {...args_} />;
// };

// export const Simple = Template.bind({});
// Simple.args = {};
