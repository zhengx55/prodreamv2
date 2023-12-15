import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './reducers/resumeSlice';
import userReducer from './reducers/userSlice';
import usageReducer from './reducers/usageSlice';
import essayReducer from './reducers/essaySlice';
export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    user: userReducer,
    usage: usageReducer,
    essay: essayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
