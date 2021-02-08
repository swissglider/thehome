import { Action, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import ioBrokerReducer, { IOBrokerMiddleware } from '../components/PlaceOverview/features/reducers/ioBrokerSlice';
import counterReducer from './features/counter/counterSlice';
import postsReducer from './features/posts/postsSlice';
import usersReducer from './features/users/usersSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        counter: counterReducer,
        users: usersReducer,
        ioBroker: ioBrokerReducer,
    },
    middleware: [...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }), IOBrokerMiddleware],
});

// const rootReducer = combineReducers({
//     posts: postsReducer,
//     counter: counterReducer,
//     users: usersReducer,
//     ioBroker: ioBrokerReducer,
// });

// const middlewareEnhancer = applyMiddleware(IOBrokerMiddleware, thunkMiddleware);
// const composeEnhancers = composeWithDevTools(middlewareEnhancer);

// export const store1 = createStore(rootReducer, composeEnhancers);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
