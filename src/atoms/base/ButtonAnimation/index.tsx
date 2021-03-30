import React from 'react';
import { ButtonBase, createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        // standard: {
        //     PointerEvent: 'none',
        // },
        // disable: {
        //     // cursor: 'not-allowed',
        //     pointerEvents: 'auto',
        // },
        root: {
            '&.Mui-disabled': {
                pointerEvents: 'auto',
            },
        },
    }),
);

export interface I_ButtonAnimation_Props {
    children: JSX.Element;
    withAnimation: boolean;
}

const ButtonAnimation = (props: I_ButtonAnimation_Props): JSX.Element => {
    const classes = useStyles();
    return (
        <ButtonBase disabled={!props.withAnimation} className={classes.root}>
            {props.children}
        </ButtonBase>
    );
    // return (
    //     <ButtonBase
    //         disableRipple={!props.withAnimation}
    //         disableTouchRipple={!props.withAnimation}
    //         focusRipple={props.withAnimation}
    //     >
    //         {props.children}
    //     </ButtonBase>
    // );
};

export default ButtonAnimation;
