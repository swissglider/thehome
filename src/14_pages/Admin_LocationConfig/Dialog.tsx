import React, { ComponentProps, useEffect, useMemo, useState } from 'react';
import {
    Avatar,
    Checkbox,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    makeStyles,
    Theme,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { Admin_LocationConfig_Selection } from '.';
import SimpleButton from '../../10_atoms/base/SimpleButton';
import IconComponent from '../../10_atoms/base/IconComponent';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            backgroundColor: blue[100],
            color: blue[600],
        },
        subTitle: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            marginTop: theme.spacing(-1),
        },
    }),
);

export interface I_Admin_LocationConfig_Dialog_Props {
    open: boolean;
    selectedValue: Admin_LocationConfig_Selection;
    boxName: string;
    onClose: (selected: string[]) => void;
    onCancel: () => void;
}

const Admin_LocationConfig_Dialog = (props: I_Admin_LocationConfig_Dialog_Props): JSX.Element => {
    const classes = useStyles();
    const [selected, setSelected] = useState<string[]>([]);

    const onSave = () => {
        props.onClose(selected);
    };

    const onCancel = () => {
        props.onCancel();
    };

    const handleChange = (id: string) => (event: any) => {
        if (event.target.checked) {
            if (!selected.includes(id)) {
                const tmp = [...selected, id];
                setSelected(tmp);
            }
        } else {
            if (selected.includes(id)) {
                const tmp = [...selected];
                const index = tmp.indexOf(id);
                tmp.splice(index, 1);
                setSelected(tmp);
            }
        }
    };

    return (
        <Dialog onClose={onCancel} aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="simple-dialog-title">Select Function on {props.boxName}</DialogTitle>
            <DialogContentText className={classes.subTitle}>
                Select the function that should be displayed on the Location Overview in the <b>{props.boxName}</b> box
            </DialogContentText>
            <DialogContent dividers={true}>
                <FormGroup>
                    {props.selectedValue.map((e, index: number) => (
                        <FormControlLabel
                            key={`Admin_LocationConfig_Dialog_${index}_${e.id}`}
                            // label={e.name}
                            label={
                                <SimpleButton
                                    text={e.name}
                                    onClick={() => () => {
                                        ('');
                                    }}
                                    variant="text"
                                    startIcon={e.icon ?? ''}
                                    size="small"
                                />
                            }
                            control={
                                <Checkbox
                                    checked={selected.includes(e.id)}
                                    onChange={handleChange(e.id)}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                        />
                    ))}
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <SimpleButton autoFocus onClick={onSave} color="primary" variant="text" text="Save" />
                <SimpleButton autoFocus onClick={onCancel} color="primary" variant="text" text="Cancel" />
            </DialogActions>
        </Dialog>
    );
};

export default Admin_LocationConfig_Dialog;
