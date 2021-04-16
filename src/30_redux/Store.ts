import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import ioBrokerObjectsReducer from './ioBrokerObjects/slice';
import ioBrokerStateReducer from './ioBrokerStates/slice';
import SensorsListContainerCollapsStateReducer from './SensorListContainerCollapsStates/slice';
import { IOBrokerMiddleware } from './servConn/middleware';
import ioBrokerServConnReducer from './servConn/slice';

export const store = configureStore({
    reducer: {
        ioBrokerServConn: ioBrokerServConnReducer,
        ioBrokerStates: ioBrokerStateReducer,
        ioBrokerObjects: ioBrokerObjectsReducer,
        sensorsListContainerCollapsState: SensorsListContainerCollapsStateReducer,
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
