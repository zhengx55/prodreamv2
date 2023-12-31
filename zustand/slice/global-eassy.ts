import { StateCreator } from 'zustand';

export type GlobalEassyState = {
  eassy: string;
};

export type GlobalEassyAction = {
  updateEssay: (result: GlobalEassyState['eassy']) => void;
};

export const useGlobalEssay: StateCreator<
  GlobalEassyState & GlobalEassyAction
> = (set) => ({
  eassy: '',
  updateEssay: (result: string) =>
    set(() => ({
      eassy: result,
    })),
});
