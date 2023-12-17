import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './reducers/resumeSlice';
import userReducer from './reducers/userSlice';
import usageReducer from './reducers/usageSlice';
export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    user: userReducer,
    usage: usageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
