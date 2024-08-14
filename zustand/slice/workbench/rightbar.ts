import { StateCreator } from 'zustand';

type State = {
  rightbarTab: number;
};

type Action = {
  setRightbarTab: (tab: number) => void;
  closeRightbarTab: () => void;
};

export type RightbarStore = State & Action;

const initialState: State = {
  rightbarTab: -1,
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
});
