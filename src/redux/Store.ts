import { Action, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import ioBrokerStatesReducer from './features/ioBroker/ioBrokerSlice';
import postsReducer from './features/posts/postsSlice';
import usersReducer from './features/users/usersSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        counter: counterReducer,
        users: usersReducer,
        ioBroker: ioBrokerStatesReducer,
    },
    middleware: [...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
