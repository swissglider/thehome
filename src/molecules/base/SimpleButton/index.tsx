import React from 'react';
import ValueTitleBox from '../ValueTitleBox';

export interface I_SimpleButton_Props {
    text: string;
    onClick: () => void;
}

const SimpleButton = (props: I_SimpleButton_Props): JSX.Element => {
    return (
        <ValueTitleBox
            value={props.text}
            onClick={props.onClick}
            withAnimation={true}
            variant="button"
            withColor={false}
        />
    );
};

export default SimpleButton;
