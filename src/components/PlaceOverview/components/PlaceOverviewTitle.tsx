import React from 'react';
import FieldsetBorders from '../../../utils/FieldsetBorders';

const COMPONENTNAME = 'PlaceOverviewTitle';

export interface I_Props {
    title: string;
}

const PlaceOverviewTitle = ({ title }: I_Props): JSX.Element => {
    return (
        <FieldsetBorders componentName={COMPONENTNAME}>
            <div>{title}</div>
        </FieldsetBorders>
    );
};

export default PlaceOverviewTitle;
