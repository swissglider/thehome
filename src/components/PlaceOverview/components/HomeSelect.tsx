import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import FieldsetBorders from '../../../utils/FieldsetBorders';
import { I_ioBrokerState } from '../interfaces/IoBrokerInterfaces';
import { selector_getHomeSelection } from '../features/reducers/ioBrokerSlice';
import PlaceOverviewItem, { I_PlaceOverviewItem_Props } from './PlaceOverviewItem';

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

const HomeSelect = (): JSX.Element => {
    const classes = useStyles();
    const homeEnumIDs: I_ioBrokerState | undefined = useSelector(selector_getHomeSelection(), shallowEqual);
    return (
        <FieldsetBorders componentName={COMPONENTNAME}>
            <div className={classes.title}>Select Home</div>
            {homeEnumIDs && homeEnumIDs !== undefined && homeEnumIDs !== null ? (
                <div className={classes.container}>
                    {(homeEnumIDs.val as I_PlaceOverviewItem_Props[]).map(
                        (props: I_PlaceOverviewItem_Props, index: number) => (
                            <PlaceOverviewItem key={`home_select_${index}`} {...props} />
                        ),
                    )}
                </div>
            ) : (
                <div>no home found</div>
            )}
        </FieldsetBorders>
    );
};

export default HomeSelect;
