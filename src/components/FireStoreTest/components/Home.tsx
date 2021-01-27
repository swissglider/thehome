import React from 'react';
import Todo from './Todo';
import Goals from './Goals';
import { createGoal, I_Goal, selectGoals } from '../../../redux/features/fireStoreTest/fireStoreTestSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = (): JSX.Element => {
    const goals_: I_Goal[] = useSelector(selectGoals);

    const dispatch = useDispatch();

    const addAGoal = (goalString: string) => {
        dispatch(createGoal(goalString));
    };

    return (
        <div className="container">
            <Todo addAGoal={addAGoal} />
            <Goals goals={goals_} />
        </div>
    );
};

export default Home;
