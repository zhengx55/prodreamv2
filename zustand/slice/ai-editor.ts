import { ICitationType, IPolishResultAData } from '@/query/type';
import { ICitationData } from '@/types';
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
  copilotRectX: null,
  showSynonymMenu: false,
  showCustomCitiation: false,
  selectedText: '',
  citationStyle: 'APA',
  showCreateCitation: false,
  inTextCitation: [],
  inDocCitation: [],
  inTextCitationIds: [],
  inDocCitationIds: [],
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
  selectedText: string;
  copilotRectX: null | number;
  citationStyle: string;
  showCreateCitation: boolean;
  inTextCitation: { type: ICitationType; data: ICitationData }[];
  inDocCitation: { type: ICitationType; data: ICitationData }[];
  inTextCitationIds: string[];
  inDocCitationIds: string[];
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
  updateSelectedText: (result: AIEditorState['selectedText']) => void;
  updateCopilotRectX: (resutl: AIEditorState['copilotRectX']) => void;
  updateCitationStyle: (result: AIEditorState['citationStyle']) => void;
  updateShowCreateCitation: (
    result: AIEditorState['showCreateCitation']
  ) => void;
  updateInTextCitation: (result: AIEditorState['inTextCitation']) => void;
  updateInDocCitation: (result: AIEditorState['inDocCitation']) => void;
  appendInTextCitation: (result: {
    type: ICitationType;
    data: ICitationData;
  }) => void;
  appendInDocCitation: (result: {
    type: ICitationType;
    data: ICitationData;
  }) => void;
  updateInTextCitationIds: (result: string[]) => void;
  updateInDocCitationIds: (result: string[]) => void;
  appendInTextCitationIds: (result: string) => void;
  appendInDocCitationIds: (result: string) => void;
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
  updateSelectedText: (result) =>
    set(() => ({
      selectedText: result,
    })),
  updateCopilotRectX: (result) =>
    set(() => ({
      copilotRectX: result,
    })),
  updateCitationStyle: (result) =>
    set(() => ({
      citationStyle: result,
    })),
  updateShowCreateCitation: (result) =>
    set(() => ({
      showCreateCitation: result,
    })),
  updateInTextCitation: (result) =>
    set(() => ({
      inTextCitation: result,
    })),
  updateInDocCitation: (result) =>
    set(() => ({
      inDocCitation: result,
    })),
  appendInTextCitation: (result) =>
    set((state) => ({
      inTextCitation: [...state.inTextCitation, result],
    })),
  appendInDocCitation: (result) =>
    set((state) => ({
      inDocCitation: [...state.inDocCitation, result],
    })),
  updateInTextCitationIds: (result) =>
    set(() => ({
      inTextCitationIds: result,
    })),
  updateInDocCitationIds: (result) =>
    set(() => ({
      inDocCitationIds: result,
    })),
  appendInTextCitationIds: (result) =>
    set((state) => ({
      inTextCitationIds: [...state.inTextCitationIds, result],
    })),
  appendInDocCitationIds: (result) =>
    set((state) => ({
      inDocCitationIds: [...state.inDocCitationIds, result],
    })),
});
