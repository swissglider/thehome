import { Action, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import { actionTypes, firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import counterReducer from './features/counter/counterSlice';
import fireStoreTestReducer from './features/fireStoreTest/fireStoreTestSlice';
import postsReducer from './features/posts/postsSlice';
import usersReducer from './features/users/usersSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        counter: counterReducer,
        users: usersReducer,
        goals: fireStoreTestReducer,
        firebase: firebaseReducer,
        firestore: firestoreReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [actionTypes.LOGIN],
        },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
