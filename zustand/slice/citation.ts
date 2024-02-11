import { saveDoc } from '@/query/api';
import { ICitationData, ICitationType } from '@/types';
import { StateCreator } from 'zustand';

const initialState: CitationState = {
  showCustomCitiation: false,
  citationStyle: 'MLA',
  showCreateCitation: false,
  showEditCitation: true,
  inTextCitation: [],
  inDocCitation: [],
  inTextCitationIds: [],
  inDocCitationIds: [],
  inLineCitations: [],
  currentInlineCitation: '',
};

type CitationState = {
  citationStyle: string;
  showCreateCitation: boolean;
  showEditCitation: boolean;
  inTextCitation: { type: ICitationType; data: ICitationData }[];
  inDocCitation: { type: ICitationType; data: ICitationData }[];
  inTextCitationIds: string[];
  inDocCitationIds: string[];
  showCustomCitiation: boolean;
  inLineCitations: { inline_id: string; data: ICitationData }[];
  currentInlineCitation: string;
};

type CitationAction = {
  updateCitationStyle: (result: CitationState['citationStyle']) => void;
  appendInlineCitation: (result: {
    inline_id: string;
    data: ICitationData;
  }) => void;
  updateCurrentInLine: (result: string) => void;
  removeInlineCitation: (result: string) => void;
  updateCustomCitiation: (result: CitationState['showCustomCitiation']) => void;
  updateShowEditCitation: (result: CitationState['showEditCitation']) => void;
  updateShowCreateCitation: (
    result: CitationState['showCreateCitation']
  ) => void;
  updateInTextCitation: (
    result: CitationState['inTextCitation'],
    id_array: string[]
  ) => void;
  updateInDocCitation: (
    result: CitationState['inDocCitation'],
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

export type CitationStore = CitationAction & CitationState;

export const useCitationStore: StateCreator<CitationStore> = (set, get) => ({
  ...initialState,
  appendInlineCitation: (result) => {
    set((state) => ({
      inLineCitations: [...state.inLineCitations, result],
    }));
  },
  updateCurrentInLine: (result) => {
    set(() => ({
      currentInlineCitation: result,
    }));
  },
  removeInlineCitation: (result) => {
    set((state) => ({
      inLineCitations: state.inLineCitations.filter(
        (item) => item.inline_id !== result
      ),
    }));
  },
  updateShowEditCitation: (result) => {
    if (result) {
      set((state) => ({
        showEditCitation: result,
        showCreateCitation: state.showCreateCitation && false,
      }));
    } else {
      set({
        showEditCitation: result,
      });
    }
  },

  updateCustomCitiation: (result) =>
    set(() => ({
      showCustomCitiation: result,
    })),
  updateCitationStyle: (result) =>
    set(() => ({
      citationStyle: result,
    })),
  updateShowCreateCitation: (result) => {
    if (result) {
      set((state) => ({
        showCreateCitation: result,
        showEditCitation: state.showEditCitation && false,
      }));
    } else {
      set({
        showCreateCitation: result,
      });
    }
  },
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
    const intext_after_remove = get().inTextCitationIds.filter(
      (item) => item !== result
    );
    await saveDoc({
      id: document_id,
      citation_candidate_ids: data_after_remove,
      citation_ids: intext_after_remove,
    });
    set((state) => ({
      inDocCitationIds: state.inDocCitationIds.filter((id) => id !== result),
      inTextCitationIds: state.inTextCitationIds.filter((id) => id !== result),
      inTextCitation: state.inTextCitation.filter(
        (item) => item.data.id !== result
      ),
      inDocCitation: state.inDocCitation.filter(
        (item) => item.data.id !== result
      ),
    }));
  },
});
