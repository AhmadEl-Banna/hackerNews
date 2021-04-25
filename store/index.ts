import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { hackerNewsStoriesReducer } from './hackerNewsStoriesSlice';
import devToolsEnhancer from 'remote-redux-devtools';

const store = configureStore({
  reducer: {
    topStories: hackerNewsStoriesReducer
  },
  devTools: false,
  enhancers:[devToolsEnhancer({ realtime: true })]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
  >;
export default store;