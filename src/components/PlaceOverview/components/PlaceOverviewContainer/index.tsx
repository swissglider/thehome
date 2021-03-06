import React from 'react';
import { makeStyles, Theme, createStyles, Button } from '@material-ui/core';
import FieldsetBorders from '../../../../utils/FieldsetBorders';
import PlaceOverviewItem from './components/PlaceOverviewItem';
import { I_HOME_CONTAINER, T_HOME_CONTAINER_LIST } from '../../../../features/servConn/interfaces';
import { useHistory } from 'react-router-dom';
import { useHomeContainer } from '../../hooks/PlaceOverviewHooks';
import {
    useSetLeftElement,
    useSetRightComponent,
    useSetSubNavButtons,
    useSetTitle,
} from '../../../../utils/FrameworkContext';

const COMPONENTNAME = 'PlaceOverviewContainer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            ...theme.typography.h5,
            padding: theme.spacing(1.5),
            textAlign: 'center',
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
        },
    }),
);

interface I_VertivalHCsContainer_Props {
    pathArray: string[];
    homeContainers: T_HOME_CONTAINER_LIST;
}

export const VertivalHCsContainer = ({ pathArray, homeContainers }: I_VertivalHCsContainer_Props): JSX.Element => {
    const classes = useStyles();
    return (
        <>
            {homeContainers !== undefined ? (
                <div className={classes.container}>
                    {Object.values(homeContainers).map((hc: I_HOME_CONTAINER, index: number) => (
                        <PlaceOverviewItem key={`home_select_${index}`} homeContainer={hc} pathArray={pathArray} />
                    ))}
                </div>
            ) : (
                <div>no home found</div>
            )}
        </>
    );
};

const PlaceOverviewContainer = (): JSX.Element => {
    const { pathArray, homeContainer, childLists } = useHomeContainer();
    const homeContainers = childLists ?? homeContainer?.childrenHomeContainers;

    const BackComponent = (): JSX.Element => {
        const history = useHistory();
        const onClick = (): void => {
            history.goBack();
        };
        return <Button onClick={onClick}>Back</Button>;
    };

    useSetTitle('Home');
    useSetSubNavButtons([]);
    useSetLeftElement({});
    useSetRightComponent(pathArray.length === 0 ? <div></div> : <BackComponent />);

    return (
        <FieldsetBorders componentName={COMPONENTNAME}>
            <VertivalHCsContainer pathArray={pathArray} homeContainers={homeContainers ?? {}} />
        </FieldsetBorders>
    );
};

export default PlaceOverviewContainer;
