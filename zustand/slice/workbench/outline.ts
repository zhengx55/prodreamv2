import { Editor } from '@tiptap/react';
import { StateCreator } from 'zustand';

type State = {
  editor: Editor | null;
};

type Action = {
  setEditor: (editor: Editor) => void;
  clearStore: () => void;
};

export type OutlineStore = State & Action;

const initalState: State = {
  editor: null,
};

export const useOutlineStore: StateCreator<OutlineStore> = (set, get) => ({
  ...initalState,
  setEditor: (editor) => {
    set({ editor });
  },
  clearStore: () => {
    set(initalState);
  },
});
