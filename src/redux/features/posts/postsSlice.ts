import { createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../Store';

export interface I_Post {
    id: string;
    title: string;
    content: string;
    user: string;
    date: string;
    reactions: {
        [key: string]: number;
    };
}

const initialState: I_Post[] = [
    {
        id: '1',
        title: 'First Post!',
        content: 'Hello!',
        user: '1',
        date: '2021-01-18T16:07:57.437Z',
        reactions: { thumbsUp: 2, hooray: 9 },
    },
    {
        id: '2',
        title: 'Second Post',
        content: 'More text',
        user: '1',
        date: '2021-01-17T16:07:57.437Z',
        reactions: { thumbsUp: 3, hooray: 0 },
    },
    {
        id: '3',
        title: '3th Post',
        content: 'More text',
        user: '2',
        date: '2021-01-19T13:07:57.437Z',
        reactions: { thumbsUp: 1, hooray: 2, heart: 3 },
    },
    {
        id: '4',
        title: '4th Post',
        content: 'More text',
        user: '0',
        date: '2021-01-19T12:07:57.437Z',
        reactions: { thumbsUp: 0, hooray: 0 },
    },
    {
        id: '5',
        title: '5th Post',
        content: 'More text',
        user: '1',
        date: '2021-01-19T16:01:57.437Z',
        reactions: { thumbsUp: 7, hooray: 1 },
    },
    {
        id: '6',
        title: '6th Post',
        content: 'More text',
        user: '2',
        date: '2021-01-19T16:07:57.437Z',
        reactions: { thumbsUp: 11, hooray: 3 },
    },
    {
        id: '7',
        title: '7th Post',
        content: 'More text',
        user: '0',
        date: '2020-12-19T16:07:57.437Z',
        reactions: { thumbsUp: 21, hooray: 22 },
    },
    {
        id: '8',
        title: '8th Post',
        content: 'More text',
        user: '2',
        date: '2021-01-19T16:07:57.437Z',
        reactions: { thumbsUp: 0, hooray: 1 },
    },
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(title: string, content: string, userId: string) {
                console.log(new Date().toISOString());
                return {
                    payload: {
                        id: nanoid(),
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
        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const existingPost = state.find((post) => post.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
                date: new Date().toISOString();
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.find((post) => post.id === postId);
            if (existingPost) {
                if (reaction in existingPost.reactions) existingPost.reactions[reaction]++;
                else existingPost.reactions[reaction] = 1;
            }
        },
    },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export const selectPosts = (state: RootState): I_Post[] => state.posts;
export const selectPost = (state: RootState, postId: string | undefined): I_Post | undefined =>
    postId === undefined ? undefined : state.posts.find((post: I_Post) => post.id === postId);

export default postsSlice.reducer;
