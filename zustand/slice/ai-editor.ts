import { IPolishResultAData } from '@/query/type';
import { Editor } from '@tiptap/react';
import { StateCreator } from 'zustand';

export type AIEditiorStore = AIEditorState & AIEditorAction;

const initialState: AIEditorState = {
  editor_instance: null,
  polishResult: [],
  isPolishing: false,
  isPlagiarismOpen: false,
  savingMode: true,
  showCopilotMenu: false,
  showCitiationMenu: false,
  copilotRect: null,
  showSynonymMenu: false,
  showCustomCitiation: false,
};

type AIEditorState = {
  polishResult: IPolishResultAData[];
  isPolishing: boolean;
  isPlagiarismOpen: boolean;
  editor_instance: Editor | null;
  savingMode: boolean;
  showCopilotMenu: boolean;
  showCitiationMenu: boolean;
  copilotRect: null | number;
  showSynonymMenu: boolean;
  showCustomCitiation: boolean;
};

type AIEditorAction = {
  updatePolishResult: (polishResult: AIEditorState['polishResult']) => void;
  updateIsPolishing: (result: AIEditorState['isPolishing']) => void;
  updateIsPlagiarismOpen: (result: AIEditorState['isPlagiarismOpen']) => void;
  clearPolishResult: () => void;
  setEditorInstance: (result: Editor) => void;
  reset: () => void;
  activeSaving: () => void;
  deactivateSaving: () => void;
  updateCopilotMenu: (result: AIEditorState['showCopilotMenu']) => void;
  updateCopilotRect: (result: AIEditiorStore['copilotRect']) => void;
  updateCitationMenu: (result: AIEditorState['showCitiationMenu']) => void;
  updateSynonymMenu: (result: AIEditorState['showSynonymMenu']) => void;
  updateCustomCitiation: (result: AIEditorState['showCustomCitiation']) => void;
};

export const useAIEditorStore: StateCreator<AIEditiorStore> = (set, get) => ({
  ...initialState,
  updatePolishResult: (result) => set(() => ({ polishResult: result })),
  updateIsPolishing: (result) => set(() => ({ isPolishing: result })),
  updateIsPlagiarismOpen: (result) => set(() => ({ isPlagiarismOpen: result })),
  reset: () => set(initialState),
  clearPolishResult: () =>
    set(() => ({
      polishResult: [],
    })),
  setEditorInstance: (result) =>
    set(() => ({
      editor_instance: result,
    })),
  activeSaving: () =>
    set(() => ({
      savingMode: true,
    })),
  deactivateSaving: () =>
    set(() => ({
      savingMode: false,
    })),
  updateCopilotMenu: (result) =>
    set(() => ({
      showCopilotMenu: result,
    })),
  updateCopilotRect: (result) =>
    set(() => ({
      copilotRect: result,
    })),
  updateCitationMenu: (result) =>
    set(() => ({
      showCitiationMenu: result,
    })),
  updateSynonymMenu: (result) =>
    set(() => ({
      showSynonymMenu: result,
    })),
  updateCustomCitiation: (result) =>
    set(() => ({
      showCustomCitiation: result,
    })),
});
