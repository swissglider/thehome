import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import ValueTitleBox from '../ValueTitleBox';
import { C_DURATION, getDurationByLocal, T_DURATION } from '../../../utils/TimeHelper';

export interface I_TimeLengthSelector_Props {
    duration: T_DURATION;
    handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const TimeLengthSelect = ({ duration, handleChange }: I_TimeLengthSelector_Props): JSX.Element => {
    return (
        <>
            <FormControl>
                <InputLabel id="timeLengthSelectLabel">
                    <ValueTitleBox value={'duration'} withoutDecoration={true} />
                </InputLabel>
                <Select labelId="timeLengthSelectLabel" id="timeLengthSelect" value={duration} onChange={handleChange}>
                    {C_DURATION.map((e: T_DURATION, index) => (
                        <MenuItem key={`TimeLengthSelect_${index}`} value={e}>
                            <ValueTitleBox value={getDurationByLocal(e)} withoutDecoration={true} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default TimeLengthSelect;
