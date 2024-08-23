import { Editor } from '@tiptap/react';
import { StateCreator } from 'zustand';

type State = {
  editor: Editor | null;
  editorContentGenerating: boolean;
  copilotPos: { top: number; left: number } | null;
  showCopilot: boolean;
  isEditorSaving: boolean;
  abortController: AbortController | null;
  recreateSignal: boolean;
};

type Action = {
  setEditor: (editor: Editor) => void;
  setEditorContentGenerating: (editorContentGenerating: boolean) => void;
  clearStore: () => void;
  setCopilotPos: (copilotPos: { top: number; left: number }) => void;
  setShowCopilot: (showCopilot: boolean) => void;
  setIsEditorSaving: (result: boolean) => void;
  createAbortController: (AbortController: AbortController) => void;
  abortGenerating: () => void;
  setRecreateSignal: (recreateSignal: boolean) => void;
};

export type EditorStore = State & Action;

const initalState: State = {
  editor: null,
  editorContentGenerating: false,
  copilotPos: null,
  showCopilot: false,
  isEditorSaving: false,
  abortController: null,
  recreateSignal: false,
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

  setIsEditorSaving: (result) => {
    set({ isEditorSaving: result });
  },

  createAbortController: (abortController: AbortController) => {
    set({ abortController });
  },

  abortGenerating: () => {
    const { abortController } = get();
    if (abortController) {
      abortController.abort();
      set({ editorContentGenerating: false });
      set({ abortController: null }); // 清除当前的 abortController
    }
  },

  setRecreateSignal: (recreateSignal) => {
    set({ recreateSignal });
  },
});
