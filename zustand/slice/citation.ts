import { saveDoc, updateCitation } from '@/query/api';
import { ReferenceType } from '@/query/type';
import { ICitationData, ICitationType } from '@/types';
import { NodeViewProps } from '@tiptap/react';
import { StateCreator } from 'zustand';

const initialState: CitationState = {
  showCustomCitiation: false,
  citationStyle: 'mla',
  showCreateCitation: false,
  showEditCitation: false,
  inTextCitation: [],
  inDocCitation: [],
  inTextCitationIds: [],
  inDocCitationIds: [],
  currentInline: null,
  showMineCitation: false,
};

type CitationState = {
  citationStyle: ReferenceType;
  showCreateCitation: boolean;
  showEditCitation: boolean;
  inTextCitation: { type: ICitationType; data: ICitationData }[];
  inDocCitation: { type: ICitationType; data: ICitationData }[];
  inTextCitationIds: string[];
  inDocCitationIds: string[];
  showCustomCitiation: boolean;
  currentInline: NodeViewProps | null;
  showMineCitation: boolean;
};

type CitationAction = {
  updateCitationStyle: (result: CitationState['citationStyle']) => void;
  updateCustomCitiation: (result: CitationState['showCustomCitiation']) => void;
  updateCurrentInline: (result: CitationState['currentInline']) => void;
  updateShowEditCitation: (result: CitationState['showEditCitation']) => void;
  updateShowMineCitation: (result: CitationState['showMineCitation']) => void;
  updateShowCreateCitation: (
    result: CitationState['showCreateCitation']
  ) => void;
  updateInTextCitation: (
    result: CitationState['inTextCitation'],
    id_array: string[]
  ) => void;
  updateCitationItem: (result: {
    type: ICitationType;
    data: ICitationData;
  }) => void;
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
  updateCurrentInline: (result) => {
    set(() => ({
      currentInline: result,
    }));
  },
  updateShowMineCitation: (result) => {
    set(() => ({
      showMineCitation: result,
    }));
  },
  updateCitationItem: async (result) => {
    const { inTextCitation, inDocCitation } = get();
    let needsSorting = false;
    const updateInDocCitation = inDocCitation.map((item) => {
      if (item.data.id === result.data.id) {
        return { ...item, data: { ...result.data } };
      }
      return item;
    });

    const updatedInTextCitation = inTextCitation.map((item) => {
      if (item.data.id === result.data.id) {
        if (item.data.in_text_pos !== result.data.in_text_pos) {
          needsSorting = true; // Set flag to sort and rank later if position changed
        }
        return { ...item, data: { ...result.data } };
      }
      return item;
    });
    if (needsSorting) {
      await updateCitation({
        citation_type: result.type,
        id: result.data.id,
        data: result.data,
      });
      updatedInTextCitation.sort(
        (a, b) => (a.data.in_text_pos ?? 0) - (b.data.in_text_pos ?? 0)
      );
      updatedInTextCitation.forEach((item, index) => {
        item.data.in_text_rank = index + 1;
      });
    }
    set(() => {
      return {
        inTextCitation: updatedInTextCitation,
        inDocCitation: updateInDocCitation,
      };
    });
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
  updateInTextCitation: (result, id_array) => {
    result.sort(
      (a, b) => (a.data.in_text_pos ?? 0) - (b.data.in_text_pos ?? 0)
    );
    result.forEach((item, index) => {
      item.data.in_text_rank = index + 1;
    });
    set(() => ({
      inTextCitation: result,
      inTextCitationIds: id_array,
    }));
  },

  updateInDocCitation: (result, id_array) =>
    set(() => ({
      inDocCitation: result,
      inDocCitationIds: id_array,
    })),

  appendInTextCitationIds: async (result) => {
    const {
      inTextCitationIds,
      inDocCitationIds,
      inTextCitation,
      inDocCitation,
    } = get();

    let updatedIntextCitationIds = inTextCitationIds;
    let updatedInDocCitationIds = inDocCitationIds;
    let updatedInTextCitation = inTextCitation;
    let updatedInDocCitation = inDocCitation;
    const found = updatedIntextCitationIds.find(
      (item) => item === result.data.id
    );
    const found_in_doc = updatedInDocCitationIds.find(
      (item) => item === result.data.id
    );
    if (!found) {
      updatedIntextCitationIds = [...inTextCitationIds, result.data.id];
      updatedInTextCitation = [...inTextCitation, result];
    } else {
      updatedInTextCitation = updatedInTextCitation.map((item) => {
        if (item.data.id === result.data.id) {
          return { type: item.type, data: { ...result.data } };
        } else {
          return item;
        }
      });
    }
    if (!found_in_doc) {
      updatedInDocCitationIds = [...inTextCitationIds, result.data.id];
      updatedInDocCitation = [...inDocCitation, result];
    }
    if (!found || !found_in_doc) {
      await saveDoc({
        id: result.data.document_id,
        citation_ids: updatedIntextCitationIds,
        citation_candidate_ids: updatedInDocCitationIds,
      });
    }
    await updateCitation({
      citation_type: result.type,
      id: result.data.id,
      data: result.data,
    });
    updatedInTextCitation.sort(
      (a, b) => (a.data.in_text_pos ?? 0) - (b.data.in_text_pos ?? 0)
    );
    updatedInTextCitation.forEach((item, index) => {
      item.data.in_text_rank = index + 1;
    });
    set(() => {
      return {
        inTextCitationIds: updatedIntextCitationIds,
        inDocCitationIds: updatedInDocCitationIds,
        inTextCitation: updatedInTextCitation,
        inDocCitation: updatedInDocCitation,
      };
    });
  },

  appendInDocCitationIds: async (result) => {
    const found = get().inDocCitationIds.find(
      (item) => item === result.data.id
    );
    if (found) return;
    const data_after_append = [...get().inDocCitationIds, result.data.id];
    const citation_after_append = [...get().inDocCitation, result];
    await saveDoc({
      id: result.data.document_id,
      citation_candidate_ids: data_after_append,
    });
    set(() => ({
      inDocCitationIds: data_after_append,
      inDocCitation: citation_after_append,
    }));
  },

  removeInTextCitationIds: async (result, document_id) => {
    const data_after_remove = get().inTextCitationIds.filter(
      (item) => item !== result
    );
    const updatedInTextCitation = get().inTextCitation.filter(
      (item) => item.data.id !== result
    );
    updatedInTextCitation.sort(
      (a, b) => (a.data.in_text_pos ?? 0) - (b.data.in_text_pos ?? 0)
    );
    updatedInTextCitation.forEach((item, index) => {
      item.data.in_text_rank = index + 1;
    });
    await saveDoc({
      id: document_id,
      citation_ids: data_after_remove,
    });
    set(() => {
      return {
        inTextCitationIds: data_after_remove,
        inTextCitation: updatedInTextCitation,
      };
    });
  },
  removeInDocCitationIds: async (result, document_id) => {
    const currentState = get();
    const updatedInDocCitationIds = currentState.inDocCitationIds.filter(
      (id) => id !== result
    );
    const updatedInTextCitationIds = currentState.inTextCitationIds.filter(
      (id) => id !== result
    );
    const updatedInTextCitation = currentState.inTextCitation.filter(
      (item) => item.data.id !== result
    );
    const updatedInDocCitation = currentState.inDocCitation.filter(
      (item) => item.data.id !== result
    );
    updatedInTextCitation.sort(
      (a, b) => (a.data.in_text_pos ?? 0) - (b.data.in_text_pos ?? 0)
    );
    updatedInTextCitation.forEach((item, index) => {
      item.data.in_text_rank = index + 1;
    });
    await saveDoc({
      id: document_id,
      citation_candidate_ids: updatedInDocCitationIds,
      citation_ids: updatedInTextCitationIds,
    });
    set({
      inDocCitationIds: updatedInDocCitationIds,
      inTextCitationIds: updatedInTextCitationIds,
      inTextCitation: updatedInTextCitation,
      inDocCitation: updatedInDocCitation,
    });
  },
});
