import type { LoginData } from '@/query/type';
import { StateCreator } from 'zustand';

export type UserStore = {
  user: LoginData;
  setUser: (userData: LoginData) => void;
  setUserEmail: (email: string) => void;
  setUserAvatar: (avatar: string) => void;
  setUserFirstName: (firstName: string) => void;
  setUserLastName: (lastName: string) => void;
  resetUser: () => void;
};

const initialState: LoginData = {
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

const useUserStore: StateCreator<UserStore> = (set) => ({
  user: initialState,
  setUser: (userData) => set({ user: userData }),
  setUserEmail: (email) => set((state) => ({ user: { ...state.user, email } })),
  setUserAvatar: (avatar) =>
    set((state) => ({ user: { ...state.user, avatar } })),
  setUserFirstName: (firstName) =>
    set((state) => ({ user: { ...state.user, first_name: firstName } })),
  setUserLastName: (lastName) =>
    set((state) => ({ user: { ...state.user, last_name: lastName } })),
  resetUser: () => set({ user: { ...initialState } }),
});

export default useUserStore;
