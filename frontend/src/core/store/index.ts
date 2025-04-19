import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Dependencies } from '@src/app/dependencies';
import { moviesReducer } from '@src/features/movies/core/store';

const reducers = combineReducers({
  movies: moviesReducer
});


export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = AppStore["dispatch"];

export const createStore = (config: {
  initialState?: RootState;
  dependencies: Dependencies;
}) => {
  const store = configureStore({
    preloadedState: config?.initialState,
    reducer: reducers,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: config.dependencies,
        },
      });
    },
  });

  return store;
};