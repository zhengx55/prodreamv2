import { StateCreator } from 'zustand';

type State = {
  outlineGenerateing: boolean;
};

type Action = {
  setOutlineGenerateing: (outlineGenerateing: boolean) => void;
};

export type OutlineStore = State & Action;

const initalState: State = {
  outlineGenerateing: false,
};

export const useOutlineStore: StateCreator<OutlineStore> = (set, get) => ({
  ...initalState,
  setOutlineGenerateing: (outlineGenerateing) => {
    set({ outlineGenerateing });
  },
});
