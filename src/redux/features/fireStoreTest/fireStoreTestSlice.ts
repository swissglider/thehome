import { createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../Store';

export interface I_Goal {
    id: number;
    goal: string;
}

const initialState: I_Goal[] = [
    { id: 1, goal: 'Become better at testing apps' },
    { id: 2, goal: 'Become a google dev expert' },
];

const fireStoreTestSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        createGoal: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(goal: string) {
                return {
                    payload: {
                        id: nanoid(),
                        goal,
                    },
                    meta: {},
                    error: {},
                };
            },
        },
        updateGoal(state, action) {
            const { id, goal } = action.payload;
            const existingGoal = state.find((goal) => goal.id === id);
            if (existingGoal) {
                existingGoal.goal = goal;
            }
        },
    },
});

export const { createGoal, updateGoal } = fireStoreTestSlice.actions;
export const selectGoals = (state: RootState): I_Goal[] => state.goals;
export const selectGoal = (state: RootState, goalId: number | undefined): I_Goal | undefined =>
    goalId === undefined ? undefined : state.goals.find((goal: I_Goal) => goal.id === goalId);
export default fireStoreTestSlice.reducer;
