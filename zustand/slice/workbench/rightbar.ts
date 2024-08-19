import { PdfResult } from '@/types';
import { StateCreator } from 'zustand';

type State = {
  rightbarTab: number;
  plagiarismResult: PdfResult | undefined;
  plagiarismLoading: boolean;
  plagiarismProgress: number;
  plagiarismTimer: NodeJS.Timeout | null;
};

type Action = {
  setRightbarTab: (tab: number) => void;
  closeRightbarTab: () => void;
  updatePlagiarismResult: (result: PdfResult | undefined) => void;
  updatePlagiarismLoading: (result: boolean) => void;
  updatePlagiarismProgress: (result: number) => void;
  incrementPlagiarismProgress: (result: number) => void;
  startPlagiarismTimer: (result: NodeJS.Timeout) => void;
  stopPlagiarismTimer: () => void;
};

export type RightbarStore = State & Action;

const initialState: State = {
  rightbarTab: 0,
  plagiarismResult: undefined,
  plagiarismLoading: false,
  plagiarismProgress: 0,
  plagiarismTimer: null,
};

export const useRightbarStore: StateCreator<RightbarStore> = (set, get) => ({
  ...initialState,
  setRightbarTab: (tab) => {
    const currentTab = get().rightbarTab;
    if (currentTab === tab) {
      set({ rightbarTab: -1 });
    } else {
      set({ rightbarTab: tab });
    }
  },
  closeRightbarTab: () => {
    set({ rightbarTab: -1 });
  },
  updatePlagiarismResult: (result) => {
    set({ plagiarismResult: result });
  },
  updatePlagiarismLoading: (result) => {
    set({ plagiarismLoading: result });
  },
  updatePlagiarismProgress: (result) => {
    set({ plagiarismProgress: result });
  },
  incrementPlagiarismProgress: (result) => {
    set((state) => {
      if (state.plagiarismProgress === 100) return state;
      return { plagiarismProgress: state.plagiarismProgress + result };
    });
  },
  startPlagiarismTimer: (result) => {
    set({ plagiarismTimer: result });
  },
  stopPlagiarismTimer: () => {
    clearInterval(get().plagiarismTimer!);
    set({ plagiarismTimer: null });
  },
});
