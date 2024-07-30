import { AIResearchMessage, AIResearchMessageRef } from '@/types';
import { StateCreator } from 'zustand';

const initialState = {
  isFirstTime: true,
};

export const chatAgentSlice: StateCreator<any> = (set, get) => ({
  ...initialState,
  setIsFirstTime: (isFirstTime: boolean) => set({ isFirstTime }),
});
