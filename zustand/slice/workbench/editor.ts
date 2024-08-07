import { Editor } from '@tiptap/react';
import { StateCreator } from 'zustand';

type State = {
  editor: Editor | null;
};

type Action = {
  setEditor: (editor: Editor) => void;
  clearStore: () => void;
};

export type EditorStore = State & Action;

const initalState: State = {
  editor: null,
};

export const useEditorStore: StateCreator<EditorStore> = (set, get) => ({
  ...initalState,
  setEditor: (editor) => {
    set({ editor });
  },
  clearStore: () => {
    set(initalState);
  },
});
