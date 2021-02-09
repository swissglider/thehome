import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import FieldsetBorders from '../../../utils/FieldsetBorders';
import { I_ioBrokerState } from '../features/ioBrokerStates';
import { selector_getStateByID } from '../features/ioBrokerStates/selectors';
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
    const homeEnumIDs: I_ioBrokerState | undefined = useSelector(selector_getStateByID('thehome.0.states.home.list'));
    console.log('selectHome');
    return (
        <FieldsetBorders componentName={COMPONENTNAME}>
            {homeEnumIDs !== undefined ? (
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
