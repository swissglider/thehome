import React from 'react';
import { createStyles, InputBase, makeStyles, Theme } from '@material-ui/core';
import IconComponent, { T_IconComponent_Size } from '../../base/IconComponent';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
        },
        input: (props: { size: T_IconComponent_Size }) => {
            let mult = 1;
            switch (props.size) {
                case 'xsmall':
                    mult = 1;
                    break;
                case 'bold_xsmall':
                    mult = 1.1;
                    break;
                case 'small':
                    mult = 1.2;
                    break;
                case 'root':
                    mult = 1.7;
                    break;
                case 'large':
                    mult = 2.4;
                    break;
                case 'open':
                    mult = 2.1;
                    break;
            }
            return {
                borderStyle: 'solid',
                borderWidth: 'thin',
                borderColor: grey[300],
                padding: theme.spacing(0.1 * mult),
                maxHeight: theme.spacing(2.3 * mult),
                maxWidth: theme.spacing(5 * mult),
                fontSize: theme.spacing(1.5 * mult),
            };
        },
    }),
);

export interface I_BlindControl_Props {
    onClick: (command: 'up' | 'stop' | 'down') => void;
    size?: T_IconComponent_Size;
    withPosition?: boolean;
    setNewPosition?: (position: number) => void;
}

const BlindControl = (props: I_BlindControl_Props): JSX.Element => {
    const size = props.size ?? 'xsmall';
    const classes = useStyles({ size });
    const icon_up =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAhElEQVRIie2PsQmAMBREHxJLdxB0AVfTnRTUnQSdQSy1OSGkEfWny4NrPse9BBLG1EoUKmBVKuvxEliAU9kw/Ek4biqpNXQCI3Aoo4XEH58AB+yK0+2XZNDADOS63QJ0m9XpvwgaoPXGQ8Et6dQ1IRQ8klmZkyAJ4uFe9tcor/AolIQdF3TmJ8WFUs0CAAAAAElFTkSuQmCC';
    const icon_stop =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAAnElEQVRoge3ZsQ3CQBAF0QFRBRW4BJJrwkVQFO04oQQqoA0IyM8LhvsSmic58lraSdcgSdpgt/L+CJxGLNJxBe6ffjwDj/Az9xY8FENuwFKc/ZYGTGtD1YAFOG9a530XCgH7AYv8lAFpBqQZkGZAmgFpBqQZkGZAmgFpBqQZkGZAmgFp1dto43WrHKlVhqoBE4VDa8Lf/+CQJHU9AbkwKhzqocnpAAAAAElFTkSuQmCC';
    const icon_down =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAoUlEQVRIie3TQQ7BUBSF4S90KpagEsIiWBV7koiRtRgZIKR2IIY1uS/pSKjWqH9yJrcn/3mT0tEwAwzbHDjg2ObAI/IxvZYe0g10A38aWGKN/ptOHyss6ozvUWKDLG7VHy2Lb2V0v2aOewi2IUwDWdzK6MzrDMAMRYh2eEZ2cSui8xM5ziGs5obpr/LECKeK/IpJU/LEGJfIuGl5Io90NMcL3fImzx43SdQAAAAASUVORK5CYII=';
    return (
        <div className={classes.root}>
            <IconComponent
                icon={icon_up}
                variants="square"
                size={size}
                withAnimation={true}
                onClick={() => props.onClick('up')}
            />
            <IconComponent
                icon={icon_stop}
                variants="square"
                size={size}
                withAnimation={true}
                onClick={() => props.onClick('stop')}
            />
            <IconComponent
                icon={icon_down}
                variants="square"
                size={size}
                withAnimation={true}
                onClick={() => props.onClick('down')}
            />
            {props.withPosition && props.setNewPosition && (
                <InputBase
                    className={classes.input}
                    placeholder="up %"
                    type="number"
                    inputProps={{
                        type: 'number',
                        max: 100,
                        min: 0,
                        step: 1,
                        onKeyDown: (e: any) => {
                            if (e.key === 'Enter') {
                                if (props.setNewPosition) props.setNewPosition(parseInt(e.target.value));
                                e.target.value = '';
                            }
                            if (e.key === '.') {
                                e.preventDefault();
                            }
                        },
                    }}
                    onChange={(e) => {
                        if (parseInt(e.target.value) > 100) e.target.value = '100';
                    }}
                    onBlur={(e) => {
                        return;
                    }}
                />
            )}
        </div>
    );
};

export default BlindControl;
