import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { DEVELOPMENT_MODE_FIELDSETS } from '../configuration/Application';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1.5),
            marginLeft: theme.spacing(1.5),
            marginRight: theme.spacing(1.5),
            marginBottom: theme.spacing(1.5),
            borderColor: 'blue',
        },
    }),
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const FieldsetBorders = (props: any): JSX.Element => {
    const classes = useStyles();
    if (DEVELOPMENT_MODE_FIELDSETS) {
        return (
            <fieldset className={classes.root}>
                <legend>{props.componentName}</legend>
                {props.children}
            </fieldset>
        );
    }
    return props.children;
};

export default FieldsetBorders;
