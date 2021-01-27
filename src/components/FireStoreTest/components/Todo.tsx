import React, { useState } from 'react';

const Todo = (props: { addAGoal: any }): JSX.Element => {
    const [goalString, setGoalString] = useState<string>('');

    const getGoal = (e: any) => {
        e.preventDefault();
        if (goalString !== '') {
            props.addAGoal(goalString);
            setGoalString('');
        }
    };

    return (
        <div>
            <div className="row">
                <form className="col s12" style={{ marginTop: '70px' }} onSubmit={getGoal}>
                    <input
                        type="text"
                        onChange={(e) => {
                            setGoalString(e.target.value);
                        }}
                        value={goalString}
                        required
                    />
                    <div className="center">
                        <button className="btn btn-large blue" onClick={getGoal}>
                            Add Goal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Todo;
