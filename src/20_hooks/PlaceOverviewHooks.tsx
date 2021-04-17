import { useHistory } from 'react-router-dom';

interface I_State {
    pathArray: string[];
    page?: string;
    functionTypeID?: string;
    deviceID?: string;
}

interface I_Location {
    pathname: string;
    state: I_State;
}

export const useGetHomeContainerLocationTo = (
    stateProps: I_State,
): { location: I_Location; goToLocation: () => void } => {
    const location = {
        pathname: '/homes',
        state: { ...stateProps },
    };
    const history = useHistory();
    const goTo = () => {
        history.push(location);
    };
    return { location: location, goToLocation: goTo };
};
