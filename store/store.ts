import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './reducers/resumeSlice';
import brainStormHistoryReducer from './reducers/brainstormSlice';
import essayReducer from './reducers/essaySlice';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    brainStormHistory: brainStormHistoryReducer,
    essay: essayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
