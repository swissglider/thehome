import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { getMainComponentsConfigurationByLabel } from '../../../configuration/MainComponents';
import { I_Goal } from '../../../redux/features/fireStoreTest/fireStoreTestSlice';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        secondary_content: {
            color: '#2196f3',
        },
        material_icons: {
            margin: 10,
        },
        delete: {
            color: 'red',
        },
        edit: {
            color: 'green',
        },
    }),
);

const Goals = (props: { goals: I_Goal[] }): JSX.Element => {
    // let goal;
    // const classes = useStyles();
    const hL = getMainComponentsConfigurationByLabel('FireStoreTest').to;

    const goal =
        props.goals.length === 0 ? (
            <h5>You haven&apos;t set a goal</h5>
        ) : (
            props.goals.map((g: I_Goal) => {
                return (
                    <li className="collection-item" key={g.id}>
                        {g.goal}
                        <Link className="secondary-content" to={hL}>
                            <i className="material-icons">edit</i>
                        </Link>
                        <Link className="secondary-content" to={hL}>
                            <i className="material-icons">delete</i>
                        </Link>
                    </li>
                );
            })
        );
    return (
        <div>
            <ul className="collection">{goal}</ul>
        </div>
    );
};
export default Goals;
