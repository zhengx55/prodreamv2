import { saveDoc } from '@/query/api';
import { IPlagiarismData } from '@/query/type';
import { ICitationData, ICitationType } from '@/types';
import { Editor } from '@tiptap/react';
import { StateCreator } from 'zustand';

export type AIEditiorStore = AIEditorState & AIEditorAction;

const initialState: AIEditorState = {
  doc_title: '',
  rightbarOpen: false,
  righbarTab: 0,
  editor_instance: null,
  isSaving: false,
  isPlagiarismOpen: false,
  plagiarismReCheck: false,
  plagiarismResult: null,
  savingMode: true,
  showCopilotMenu: false,
  showCitiationMenu: false,
  copilotRect: null,
  copilotRectX: null,
  showSynonymMenu: false,
  showCustomCitiation: false,
  citationStyle: 'MLA',
  showCreateCitation: false,
  inTextCitation: [],
  inDocCitation: [],
  inTextCitationIds: [],
  inDocCitationIds: [],
};

type AIEditorState = {
  doc_title: string;
  rightbarOpen: boolean;
  righbarTab: number;
  isSaving: boolean;
  plagiarismReCheck: boolean;
  plagiarismResult: null | Omit<IPlagiarismData, 'status'>;
  isPlagiarismOpen: boolean;
  editor_instance: Editor | null;
  savingMode: boolean;
  showCopilotMenu: boolean;
  showCitiationMenu: boolean;
  copilotRect: null | number;
  showSynonymMenu: boolean;
  showCustomCitiation: boolean;
  copilotRectX: null | number;
  citationStyle: string;
  showCreateCitation: boolean;
  inTextCitation: { type: ICitationType; data: ICitationData }[];
  inDocCitation: { type: ICitationType; data: ICitationData }[];
  inTextCitationIds: string[];
  inDocCitationIds: string[];
};

type AIEditorAction = {
  updateTitle: (result: AIEditorState['doc_title']) => void;
  toggleRightbar: () => void;
  updateRightbarTab: (result: AIEditorState['righbarTab']) => void;
  togglePlagiarism: () => void;
  updatePlagiarismRecheck: (result: AIEditorState['plagiarismReCheck']) => void;
  toogleIsSaving: (result: AIEditorState['isSaving']) => void;
  setEditorInstance: (result: Editor) => void;
  reset: () => void;
  activeSaving: () => void;
  deactivateSaving: () => void;
  updatePlagiarismResult: (result: AIEditorState['plagiarismResult']) => void;
  updateCopilotMenu: (result: AIEditorState['showCopilotMenu']) => void;
  updateCopilotRect: (result: AIEditiorStore['copilotRect']) => void;
  updateCitationMenu: (result: AIEditorState['showCitiationMenu']) => void;
  updateSynonymMenu: (result: AIEditorState['showSynonymMenu']) => void;
  updateCustomCitiation: (result: AIEditorState['showCustomCitiation']) => void;
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
  appendInTextCitationIds: (result: {
    type: ICitationType;
    data: ICitationData;
  }) => Promise<void>;
  appendInDocCitationIds: (result: {
    type: ICitationType;
    data: ICitationData;
  }) => Promise<void>;
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
  updatePlagiarismResult: (result) =>
    set(() => ({
      plagiarismResult: result,
    })),
  updateTitle: (result) => set(() => ({ doc_title: result })),
  updateRightbarTab: (result) =>
    set((state) => {
      if (!state.rightbarOpen)
        return { rightbarOpen: true, righbarTab: result };
      return { righbarTab: result };
    }),
  toggleRightbar: () => set((state) => ({ rightbarOpen: !state.rightbarOpen })),
  updatePlagiarismRecheck: (result) =>
    set(() => ({ plagiarismReCheck: result })),
  togglePlagiarism: () =>
    set((state) =>
      state.isPlagiarismOpen
        ? state.rightbarOpen
          ? { rightbarOpen: false, isPlagiarismOpen: !state.isPlagiarismOpen }
          : { isPlagiarismOpen: !state.isPlagiarismOpen }
        : { isPlagiarismOpen: !state.isPlagiarismOpen }
    ),
  toogleIsSaving: (result) => set(() => ({ isSaving: result })),
  reset: () => set(initialState),

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
  appendInTextCitationIds: async (result) => {
    const found = get().inTextCitationIds.find(
      (item) => item === result.data.id
    );
    if (!found) {
      const data_after_append = [...get().inTextCitationIds, result.data.id];
      const libary_after_append = [...get().inDocCitationIds, result.data.id];
      await saveDoc({
        id: result.data.document_id,
        citation_ids: data_after_append,
        citation_candidate_ids: libary_after_append,
      });
      set((state) => ({
        inTextCitationIds: data_after_append,
        inDocCitationIds: libary_after_append,
        inDocCitation: [...state.inDocCitation, result],
        inTextCitation: [...state.inTextCitation, result],
      }));
    }
  },

  appendInDocCitationIds: async (result) => {
    const found = get().inDocCitationIds.find(
      (item) => item === result.data.id
    );
    if (found) return;
    const data_after_append = [...get().inDocCitationIds, result.data.id];
    await saveDoc({
      id: result.data.document_id,
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
      inTextCitationIds: state.inTextCitationIds.filter((id) => id !== result),
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
