import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import CountedIcon from '.';

export default {
    title: 'TheHome/Atoms/enhanced/CountedIcon',
    component: CountedIcon,
    argTypes: {
        icon: { table: { disable: true } },
        onClick: { table: { disable: true } },
        getIcon: { table: { disable: true } },
        type: { table: { disable: true } },
        ref: { table: { disable: true } },
        onClicked: { table: { disable: true } },
        sizes: { table: { disable: true } },
        srcSet: { table: { disable: true } },
        alt: { table: { disable: true } },
        imgProps: { table: { disable: true } },
        src: { table: { disable: true } },
    },
} as Meta;

const icon_true =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABYElEQVRIidXVP0gbYRjH8U9i/ANBhCAitFtA6eCkdKngqIJboZPdO1ZaFOrm2qGL4GCx6FRwat0dtFvHQFHQbtWWFgtWBxWCwxvhclySa0xAf3Bwz8Nzv+9zd8/7vtwxdbfLOIMVnGILubQPZlPWzaGIfnRgJi0gTSejeInHuMRv9KUFNFIv9jFVifM4xkCrABt4G4lfYL1V5rP4iq5KnEEJY60wL+IIw5HcJHZaYd4ldP48ln+PExwmXCUsC/+sSpkEwCIeCZ8oDs5X7rOqJymHN/iFhXrdZ/ETD+oV1dAzrCUZRvUQf/GjCcAfTGCkHiCP8ybMYRvvhFGuCbiNsniCg3YBhoQ96ku7AHuYFxvvOOBCwiynVAFP8b1eUaewmAabACxhU6zp+BtcCStyFT3/CfiGM5SjyaSVnMMH4Rz4KGzX5YS6qAp4jVf43Ahwo3FMC6dYI/3DJ+ymqL1nugaDDDforiPY9gAAAABJRU5ErkJggg==';
const icon_false =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABbUlEQVRIidXVO0gcURQG4G+NOxYbURaFQCBgFGJELDQhTbSwCCZdwFKxt0thbZ0uELDSxspKfJRWIWATBVGLGLAJwVgFJJXNYnFHGIZlHusD/GGK87j/fw733DM8dFQyYhN4j3oBnv/YxPd0oL1JchWrGMEaDtDIEahjBQuxUKbAImoYxWUOcRIX+JgnUMU8hkqSi8/U0Caj4+c4KUl8jTp28CnpbEsldQgX1gr+YR19WUkvsdeiwKBQ3OukM93BTfAL23h7VwIN7GIgK+kZfrYoMIlTDCed6Q7+oBtPWxDowTccJ53pd9DAV3zGTCoWCXN+XVhXIlbFB5wXqSTCD8ym/MvCKJ42+Q7jwh4XEYB+nOFFwvdOk2V2E8wInUSxXcERXpUheZQRO8Q43ggrgHBH09goI5KFTmE3TcV2DX/Re1sCMIbfeBLbq5grerjIS97Hl5g4Eub9olyN+ahgSVhmW5r/qG4FUX7KPeMKO3M8+ty6HCsAAAAASUVORK5CYII=';
const icon_error =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAACbElEQVRYhe3YS2xMURzH8U8fmEojEdFIiUQjUmFBaqEJSSWs1FLtCAvBEjvFii1btVPdsWVho4kFwqKJhQbReEUiEtEK8arFPbcz2nncO52ZW4lfcpLJ+f/P+X/nntf/HP5rfmqpcX+daMOXGvdbE+XwIpRcxixFNYjpUM5kzDJHnZjEw1AmQ92C0TB+Ywe2h9/XMiUqUAw0XFB3XR44UzXhvmjVri2oX40pPEJzBlwzOiRaFINFbGeD7WBDiQrUjrd4haVF7Dm8xHssayDXjC6KvtD+Mj4DwedCQ4gKtA5fcU80D8vpLr5hfb2hCnUTv9CTwHcLfuJGXYkKtEs0bFdStBkKbfbUhahALRjDJ3TMsnXLn8Xds2wdoc2Y2icof+mE6EucLGLrkT+Liw39qWA7Xi+45fiAZ1hSBeAiPMVHrKgH4OUQfG8JeyVA6A/2S7WG24jvuFPGJwkg3MIPbK4ZHW6HTjeV8UkK2K3yn02lfZINS1JA8tOlf75wizEu2cROAxgvuOeKL7jEOh0CHkvgmwaQaLuZFm0/VSneXJ+gtQ6A8ab/GauqAbwq3fGUFpD8sTmUFm6r9Ad8NYDkE49tSRs0YVSUTnWlCJTD7lDS3Iu7QqxRlVM3cEDjk8w4+R2o5NiGCbwTpfRptBJHQ5md6VRSe4g5ERhK6rzqLzp98nOwr4r28QXsXCmHNaKr4gPVXRXnC9gcYk8FljkaEV22e6vonGhoekIpO0xl1BsYRkoZFsJzRfyMsjOuiD/t7NeBrBS/SjwWptoRpV8HslL8KnG4Ca+VmJQLQG9aRbnZhqxJSmg8a4B/X38AL8Kf3q2D+cIAAAAASUVORK5CYII=';
const icon_cold =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAB/ElEQVRoge2Zv0scURDHv7P7LINg5+GRk23Ewso/IEWIYoT8Dwl6KVIKWgoKdpEQUnnae5WFSOKlsU5lo6IEjnC314m2+t6OzamckvuxM+shvk+3927m8+Zm597CAh7Py4aySFqr1UastesAppofVZxzS1EUnWm71Atobv4QwNCDpfMwDCfy+Xxd0xdoJgOA5i//cPMAMGSt/artUy8A97fNI4jov2tpyaKAV23WBrVlWRTwpJisBbsHfzLN/+w7oP43Wq1Wud16oVBQdT77DvgZ6Dd+BvqNn4F+42eg36jPQFQZaLlOfu9pK1rwHehE8Ham5dptK+fXTff0ZN4BPwMd8DNwR5lDU4pXOn3NbMSrKHOopdU5FcschpfxDoDZLrV7rj78ActkpWqVDpiL+gq63jwA8IzJxWsabnkHSvHrkPkvgF5vC3bMY5gfOZXoxR0wCX9B75sHADIIPkv94gKY8CZ1MPG01K8xA1HaQAZGpXKNAtKfJYwrqVx+CwH/UscSp469RVxAwLQviP0p9ksTWEMlAC5NqGXalPrlM/Bx+IiAH72GEdN3FHMnUr3KSWyTxgKAStcBjH3L8aKGW+dhrjh57ZLGeyL+BqDd840lpnXHjVkUJ6811PqvWbca4ybhTwkn7whUAAAGVwMEvyywibncsbrT43nB3ABFf5unbEJ2TgAAAABJRU5ErkJggg==';
const icon_warm =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACD0lEQVRoge2ZsW4TQRRFz8y6QSKOkja4QSGiIWmwTQEGsjKUIIogUYeKH+AnUFokxAeEihpkE8cFsKJASQNiJYooHXIk43JnH00kSBR5jd8sFtKczp69787V27c7siEQUGHKKLqfpjWXyZZg7hx/1bHYp2uXL3717eU9wH6a1rJMPoNZPLV0VKmwdmV5+cCnn/VZDMBlsnXG5gEWssw88+3nPcAft81Zq3d9+3kPAMyNWav6NisjwD+lUrZB79NeqfVDB4q4eXW11PqhA0WEGSggzMCs8d6BS08enfi8dzj0bXGC0IEiVpdOHX+++K0fOlBEmIECwgzMmjADs+a/nwFvvwsN48aKhRdAa+yFQs9F5vH824/ffPh6CfBzvd4y1rxGWJjQ9SgX7lU7SV/rrQ4wjBsr1vBh4s3/ZuBc1JzfeZ9q/NVDbOH5FJsHWIwi99KD//SM4mYbuK0o0Rq167FmD8oOyEOdHiRnQ6PX3kLXlXqM2PFPrQJUAQwsafQAxsgFjX7mb2KBXKNXBRA41OiPUdXQBlC/iAR2NXrdDBjZ1ugBEF6p9qD1H8WNDrA+lVjone8mtzT+6iGOIjaBH1NIBy6PNrX+6gDn3iTfc3gADP5CNsjhvvYcBJ4eo9VO0nfWXAPZmeDyd85FTR8nUSjhf+JRux5LzobB3DBQAxA4EKSPmO25btL17RkIKPgFSbmNfS29ao8AAAAASUVORK5CYII';
const icon_hot =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAB/klEQVRoge2ZMWsUURCAv3cbcxZulNSBKCkiKdQzWNloo6IRJXCllUUsLAXtI9h5iNiZP3BVIiiaNDY2yikLouJh0IBEG0F2C/V2b6yuSCK3dzezXpH3dct7M98bZodddsHj2d24IpJGUXOiPSo1hLMAAmuO4FZlZqpp7TIvIIqaE+09EgHj25Z+uECOHJue/mrpK1kmA2iPSo2dhwcYl4y71j7zAjq3zb9xXdYGw74ACLus7beWFVHAf2WkaMGLV1Gh+X0H8jh54mih+X0HtrNxZXbL9a/fk9aKLfgO5LG3/KXQ/L4Deeycgbem+X0H8vAzkIOfgWHjZ2DY+BkYNn4GOtSrBCuzY4t5+x4dH7tdrxJYeU0+bNWrBOX1cBmY61H6JAzjS6efk2rdJh0or4eL9Hh4AIHzP+PwjoVb3YHHlQOTaSn7BH3fFpIFHJ5/GX/U+NUdaJWy6/R/eAA3knJN61cX4BynBg/mnNavnwFhavBQDmn1FkOseZb80cotCtgYNFAUsR30MyCsKsKfav3qAtoiD4FsgNA0gCWtX13A5TfJO4c86DfOCfcvNuIPWr/Jk3iT5AbIWq/7BVnddPFNC7dJAQsNWt9ILoDcg67vN6kTat9J5hYatCzc5n8plyv7ZlzJXRU44+AggMBnB88ykaX518l7a6fHs5v5C4R/hnoLyNvNAAAAAElFTkSuQmCC';

interface I_Props extends ComponentProps<typeof CountedIcon> {
    onClicked: (i: string) => void;
}

const Template: Story<I_Props> = (props: I_Props) => {
    const { onClicked, ...args } = { ...props };
    console.log(args);
    args.onClick = onClicked
        ? (value: any) => {
              onClicked('Value: ' + value);
              if (props.onClick) props.onClick('Value: ' + value);
          }
        : undefined;
    return <CountedIcon {...args} />;
};

export const BooleanAV = Template.bind({});
BooleanAV.args = {
    allValues: [true, false, false],
    countMethod: 'av',
    getIcon: (value: any): string => {
        if (typeof value !== 'number') return icon_error;
        return value === 0 ? icon_false : icon_true;
    },
    onClicked: undefined,
};

export const TempAV = Template.bind({});
TempAV.args = {
    allValues: [3, 15, 30],
    countMethod: 'av',
    getIcon: (value: any): string => {
        if (typeof value !== 'number') return icon_error;
        return value <= 15 ? icon_cold : value > 15 && value < 25 ? icon_warm : icon_hot;
    },
    onClicked: undefined,
};

export const ClickWithClick = Template.bind({});
ClickWithClick.args = {
    allValues: [3, 15, 30],
    countMethod: 'av',
    getIcon: (value: any): string => {
        if (typeof value !== 'number') return icon_error;
        return value <= 15 ? icon_cold : value > 15 && value < 25 ? icon_warm : icon_hot;
    },
    onClick: (value: any): void => {
        console.log(value);
    },
};

export const WollerauLights = Template.bind({});
WollerauLights.args = {
    allValues: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
    ],
    countMethod: 'max',
    getIcon: (value: any): string => {
        return value === 0 ? icon_false : icon_true;
    },
    size: 'large',
    withAnimation: false,
    onClick: (value: any): void => {
        console.log(value);
    },
};
