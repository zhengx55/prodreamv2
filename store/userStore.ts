import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

export const userStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type UserState = ReturnType<typeof userStore.getState>;
export type UserDispatch = typeof userStore.dispatch;
