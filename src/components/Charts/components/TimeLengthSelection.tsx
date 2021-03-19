import React from 'react';
import { Button, createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import { C_DURATION, getDurationByLocal, T_DURATION } from '../';
import { Trans } from '@lingui/macro';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);

export interface I_TimeLengthSelector_Props {
    duration: T_DURATION;
    handleChange: (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
}

export const TimeLengthSelector = ({ duration, handleChange }: I_TimeLengthSelector_Props): JSX.Element => {
    const classes = useStyles();
    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                    <Trans id="duration">Duration</Trans>
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={duration}
                    onChange={handleChange}
                >
                    {C_DURATION.map((e: T_DURATION, index) => (
                        <MenuItem key={`TimeLengthSelector_${index}`} value={e}>
                            {getDurationByLocal(e)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button color="secondary">
                <Trans id="refresh">refresh</Trans>
            </Button>
        </>
    );
};
