import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import ioBrokerObjectsReducer from '../features/ioBrokerObjects/slice';
import ioBrokerStateReducer from '../features/ioBrokerStates/slice';
import { IOBrokerMiddleware } from '../features/servConn/middleware';
import ioBrokerServConnReducer from '../features/servConn/slice';
import counterReducer from './features/counter/counterSlice';
import postsReducer from './features/posts/postsSlice';
import usersReducer from './features/users/usersSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        counter: counterReducer,
        users: usersReducer,
        ioBrokerServConn: ioBrokerServConnReducer,
        ioBrokerStates: ioBrokerStateReducer,
        ioBrokerObjects: ioBrokerObjectsReducer,
    },
    // middleware: [...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }), IOBrokerMiddleware],
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares({ immutableCheck: false, serializableCheck: false }).concat(IOBrokerMiddleware),
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
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
