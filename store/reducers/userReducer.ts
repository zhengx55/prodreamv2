/**
 * 用于储存用户信息
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LoginData } from '@/query/type';
import { type RootState } from '../store';

const initialUserState: LoginData = {
  access_token: '',
  avatar: '',
  email: '',
  first_name: '',
  group_id: 0,
  is_verified: false,
  last_name: '',
  linked_google: false,
  no_password: false,
  role: '',
  traffic: '',
  user_id: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (_draft, action: PayloadAction<LoginData>) => {
      return action.payload;
    },
    setUserEmail: (draft, action: PayloadAction<string>) => {
      draft.email = action.payload;
    },
    setUserAvatar: (draft, action: PayloadAction<string>) => {
      draft.avatar = action.payload;
    },
    setUserFirstName: (draft, action: PayloadAction<string>) => {
      draft.first_name = action.payload;
    },
    setUserLastName: (draft, action: PayloadAction<string>) => {
      draft.last_name = action.payload;
    },
    resetUser: () => {
      return initialUserState;
    },
  },
});

export const {
  setUser,
  resetUser,
  setUserAvatar,
  setUserEmail,
  setUserFirstName,
  setUserLastName,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserAvatar = (state: RootState) => state.user.avatar;
export const selectUserToken = (state: RootState) => state.user.access_token;
export const selectUserId = (state: RootState) => state.user.user_id;

export default userSlice.reducer;
