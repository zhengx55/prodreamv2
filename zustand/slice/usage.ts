import { IUsage } from '@/types';
import { StateCreator } from 'zustand';

export type UsageStore = {
  usage: IUsage;
  updateUsage: (result: IUsage) => void;
  updateSingleUsage: (result: keyof IUsage) => void;
};

const initialUsageState = {
  first_editior: false,
  first_brainstorm: false,
  first_resume: false,
  first_activity_list: false,
  first_activity_list_upload: false,
  first_activity_list_generate: false,
  first_activity_list_edit: false,
};

export const useUsageStore: StateCreator<UsageStore> = (set) => ({
  usage: initialUsageState,
  updateUsage: (result: IUsage) =>
    set(() => ({
      usage: result,
    })),
  updateSingleUsage: (result: keyof IUsage) =>
    set((state) => ({
      usage: {
        ...state.usage,
        [result]: false,
      },
    })),
});
