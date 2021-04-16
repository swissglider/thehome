import React from 'react';
import { createStyles, InputBase, makeStyles, Theme } from '@material-ui/core';
import IconComponent, { T_IconComponent_Size } from '../../base/IconComponent';
import { grey } from '@material-ui/core/colors';
import { ICON_DOWN, ICON_STOP, ICON_UP } from '../../../configuration/Icons';

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
                case 'medium':
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

export type T_BLIND_COMMANDS = 'open(open)' | 'stop(stop)' | 'close(close)';

export interface I_BlindControl_Props {
    onClick: (command: T_BLIND_COMMANDS) => void;
    size?: T_IconComponent_Size;
    withPosition?: boolean;
    setNewPosition?: (position: number) => void;
}

const BlindControl = (props: I_BlindControl_Props): JSX.Element => {
    const size = props.size ?? 'xsmall';
    const classes = useStyles({ size });
    const icon_up = ICON_UP;
    const icon_stop = ICON_STOP;
    const icon_down = ICON_DOWN;
    return (
        <div className={classes.root}>
            <IconComponent
                icon={icon_up}
                variants="square"
                size={size}
                withAnimation={true}
                onClick={() => props.onClick('open(open)')}
            />
            <IconComponent
                icon={icon_stop}
                variants="square"
                size={size}
                withAnimation={true}
                onClick={() => props.onClick('stop(stop)')}
            />
            <IconComponent
                icon={icon_down}
                variants="square"
                size={size}
                withAnimation={true}
                onClick={() => props.onClick('close(close)')}
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
                    onBlur={() => {
                        return;
                    }}
                />
            )}
        </div>
    );
};

export default BlindControl;
