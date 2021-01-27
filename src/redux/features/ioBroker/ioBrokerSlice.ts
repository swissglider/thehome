import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../Store';

export interface I_ioBrokerState {
    [key: string]: any;
}

export interface I_ioBrokerConnection {
    ioBrokerStates: I_ioBrokerState[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: I_ioBrokerConnection = {
    ioBrokerStates: [],
    status: 'idle',
    error: null,
};

export const fetchIOBroker = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts');
    return response.posts;
});

const ioBrokerSlice = createSlice({
    name: 'ioBroker',
    initialState,
    reducers: {
        ioBrokerAddState: {
            reducer(state, action) {
                state.ioBrokerStates.push(action.payload);
            },
            prepare(title: string, content: string, userId: string) {
                console.log(new Date().toISOString());
                return {
                    payload: {
                        title,
                        content,
                        date: new Date().toISOString(),
                        user: userId,
                        reactions: {},
                    },
                    meta: {},
                    error: {},
                };
            },
        },
        ioBrokerUpdateState(state, action) {
            const { id, title, content } = action.payload;
            const existingPost = state.ioBrokerStates.find((post) => post.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
                date: new Date().toISOString();
            }
        },
    },
});

export const { ioBrokerAddState, ioBrokerUpdateState } = ioBrokerSlice.actions;

export const selectIOBrokerStates = (state: RootState): I_ioBrokerConnection => state.ioBroker;
export const selectIOBrokerState = (state: RootState, ioBrokerID: string | undefined): any | undefined =>
    ioBrokerID === undefined
        ? undefined
        : state.ioBroker.ioBrokerStates.find((ioBState: I_ioBrokerState) => ioBState.id === ioBrokerID);

export default ioBrokerSlice.reducer;
