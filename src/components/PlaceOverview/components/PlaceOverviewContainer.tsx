import React from 'react';
import FieldsetBorders from '../../../utils/FieldsetBorders';
import PlaceOverviewTitle from './PlaceOverviewTitle';

const COMPONENTNAME = 'PlaceOverviewContainer';

export interface I_Props {
    title: string;
}

const PlaceOverviewContainer = ({ title }: I_Props): JSX.Element => {
    return (
        <FieldsetBorders componentName={COMPONENTNAME}>
            <PlaceOverviewTitle title={title} />
        </FieldsetBorders>
    );
};

export default PlaceOverviewContainer;
