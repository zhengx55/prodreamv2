import { saveDoc } from '@/query/api';
import { IPolishResultAData } from '@/query/type';
import { ICitationData, ICitationType } from '@/types';
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
  citationStyle: 'MLA',
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
  updateInTextCitation: (
    result: AIEditorState['inTextCitation'],
    id_array: string[]
  ) => void;
  updateInDocCitation: (
    result: AIEditorState['inDocCitation'],
    id_array: string[]
  ) => void;
  appendInTextCitationIds: (
    result: {
      type: ICitationType;
      data: ICitationData;
    },
    document_id: string
  ) => void;
  appendInDocCitationIds: (
    result: {
      type: ICitationType;
      data: ICitationData;
    },
    document_id: string
  ) => void;
  removeInTextCitationIds: (
    result: string,
    document_id: string
  ) => Promise<void>;
  removeInDocCitationIds: (
    result: string,
    document_id: string
  ) => Promise<void>;
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
  updateInTextCitation: (result, id_array) =>
    set(() => ({
      inTextCitation: result,
      inTextCitationIds: id_array,
    })),
  updateInDocCitation: (result, id_array) =>
    set(() => ({
      inDocCitation: result,
      inDocCitationIds: id_array,
    })),
  appendInTextCitationIds: async (result, document_id) => {
    const data_after_append = [...get().inTextCitationIds, result.data.id];
    await saveDoc({
      id: document_id,
      citation_ids: data_after_append,
    });
    set((state) => ({
      inTextCitationIds: data_after_append,
      inTextCitation: [...state.inTextCitation, result],
    }));
  },
  appendInDocCitationIds: async (result, document_id) => {
    const data_after_append = [...get().inDocCitationIds, result.data.id];
    await saveDoc({
      id: document_id,
      citation_candidate_ids: data_after_append,
    });
    set((state) => ({
      inDocCitationIds: [...state.inDocCitationIds, result.data.id],
      inDocCitation: [...state.inDocCitation, result],
    }));
  },
  removeInTextCitationIds: async (result, document_id) => {
    const data_after_remove = get().inTextCitationIds.filter(
      (item) => item !== result
    );
    await saveDoc({
      id: document_id,
      citation_ids: data_after_remove,
    });
    set((state) => ({
      inTextCitationIds: state.inDocCitationIds.filter((id) => id !== result),
      inTextCitation: state.inTextCitation.filter(
        (item) => item.data.id !== result
      ),
    }));
  },
  removeInDocCitationIds: async (result, document_id) => {
    const data_after_remove = get().inDocCitationIds.filter(
      (item) => item !== result
    );
    await saveDoc({
      id: document_id,
      citation_candidate_ids: data_after_remove,
    });
    set((state) => ({
      inDocCitationIds: state.inDocCitationIds.filter((id) => id !== result),
      inDocCitation: state.inDocCitation.filter(
        (item) => item.data.id !== result
      ),
    }));
  },
});
