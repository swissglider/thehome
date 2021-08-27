import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { C_DURATION, getDurationByLocal, T_DURATION } from '../../../21_utils/DurationHelper';
import TypographyComponent from '../../../10_atoms/base/TypographyComponent';

export interface I_TimeLengthSelector_Props {
    duration: T_DURATION;
    handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const TimeLengthSelect = ({ duration, handleChange }: I_TimeLengthSelector_Props): JSX.Element => {
    return (
        <>
            <FormControl>
                <InputLabel id="timeLengthSelectLabel">
                    <TypographyComponent>duration</TypographyComponent>
                </InputLabel>
                <Select labelId="timeLengthSelectLabel" id="timeLengthSelect" value={duration} onChange={handleChange}>
                    {C_DURATION.map((e: T_DURATION, index) => (
                        <MenuItem key={`TimeLengthSelect_${index}`} value={e}>
                            <TypographyComponent>{getDurationByLocal(e)}</TypographyComponent>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default TimeLengthSelect;
