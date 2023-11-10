import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './reducers/resumeSlice';
import brainStormHistoryReducer from './reducers/brainstormSlice';
export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    brainStormHistory: brainStormHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
