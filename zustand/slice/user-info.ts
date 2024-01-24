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
  avatar: '',
  create_time: 0,
  email: '',
  first_name: '',
  last_name: '',
  update_time: 0,
  user_id: '',
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
