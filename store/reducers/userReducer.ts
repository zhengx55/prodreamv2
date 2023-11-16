/**
 * 用于储存用户信息
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../userStore';
import { LoginData } from '@/query/type';

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
    resetUser: () => {
      return initialUserState;
    },
  },
});

export const { setUser, resetUser, setUserAvatar, setUserEmail } =
  userSlice.actions;
export const selectUser = (state: UserState) => state.user;
export const selectUserEmail = (state: UserState) => state.user.email;
export const selectUserAvatar = (state: UserState) => state.user.avatar;
export const selectUserToken = (state: UserState) => state.user.access_token;
export const selectUserId = (state: UserState) => state.user.user_id;

export default userSlice.reducer;
