import { Editor } from '@tiptap/react';
import { StateCreator } from 'zustand';

type State = {
  editor: Editor | null;
  editorContentGenerating: boolean;
  copilotPos: { top: number; left: number } | null;
  showCopilot: boolean;
  isEditorSaveding: boolean;
};

type Action = {
  setEditor: (editor: Editor) => void;
  setEditorContentGenerating: (editorContentGenerating: boolean) => void;
  clearStore: () => void;
  setCopilotPos: (copilotPos: { top: number; left: number }) => void;
  setShowCopilot: (showCopilot: boolean) => void;
  setIsEditorSaveding: (result: boolean) => void;
};

export type EditorStore = State & Action;

const initalState: State = {
  editor: null,
  editorContentGenerating: false,
  copilotPos: null,
  showCopilot: false,
  isEditorSaveding: false,
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
  setCopilotPos: (copilotPos) => {
    set({ copilotPos });
  },
  setShowCopilot: (showCopilot) => {
    set({ showCopilot });
  },
  setIsEditorSaveding: (result) => {
    set({ isEditorSaveding: result });
  },
});
