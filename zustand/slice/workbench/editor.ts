import { Editor } from '@tiptap/react';
import { StateCreator } from 'zustand';

type State = {
  editor: Editor | null;
  editorContentGenerating: boolean;
};

type Action = {
  setEditor: (editor: Editor) => void;
  setEditorContentGenerating: (editorContentGenerating: boolean) => void;
  clearStore: () => void;
};

export type EditorStore = State & Action;

const initalState: State = {
  editor: null,
  editorContentGenerating: false,
};

export const useEditorStore: StateCreator<EditorStore> = (set, get) => ({
  ...initalState,
  setEditor: (editor) => {
    set({ editor });
  },
  clearStore: () => {
    set(initalState);
  },
  setEditorContentGenerating: (editorContentGenerating) => {
    set({ editorContentGenerating });
  },
});
