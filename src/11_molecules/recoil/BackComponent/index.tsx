import React from 'react';
import { useRecoilState } from 'recoil';
import { historyState } from '../../../32-recoil/framework/atoms';
import SimpleButton from '../../../10_atoms/base/SimpleButton';
import { BACKWARD_ICON } from '../../../2_configuration/Icons';
import { useHistory } from 'react-router-dom';

const BackComponent = (): JSX.Element | null => {
    const [historyArray, setHistoryArray] = useRecoilState(historyState);
    const tempHA = [...historyArray];
    tempHA.pop();
    const lastElement = tempHA.pop();
    const history = useHistory();
    const onClick = (): void => {
        const location = {
            pathname: lastElement?.pathname,
        };
        setHistoryArray(tempHA);
        history.push(location);
    };

    if (lastElement === undefined) return null;
    return (
        <SimpleButton
            style={{ paddingLeft: 0, marginLeft: 0 }}
            onClick={onClick}
            variant="text"
            size="medium"
            text={lastElement.displayName}
            startIcon={BACKWARD_ICON}
        />
    );
};

export default BackComponent;
