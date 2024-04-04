import { saveDoc } from '@/query/api';
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
  updateCitationItem: (result) => {
    set((state) => {
      const updatedInTextCitation = state.inTextCitation.map((item) => {
        if (item.data.id === result.data.id) {
          return { type: item.type, data: { ...result.data } };
        } else {
          return item;
        }
      });
      updatedInTextCitation.sort(
        (a, b) => (a.data.in_text_pos ?? 0) - (b.data.in_text_pos ?? 0)
      );
      updatedInTextCitation.forEach((item, index) => {
        item.data.in_text_rank = index + 1;
      });
      console.log(updatedInTextCitation);
      return {
        inTextCitation: updatedInTextCitation,
        inDocCitation: state.inDocCitation.map((item) => {
          if (item.data.id === result.data.id) {
            return { type: item.type, data: { ...result.data } };
          } else {
            return item;
          }
        }),
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
      set((state) => {
        const updatedInTextCitation = [...state.inTextCitation, result];
        const updatedInDocCitation = [...state.inDocCitation, result];
        updatedInTextCitation.sort(
          (a, b) => (a.data.in_text_pos ?? 0) - (b.data.in_text_pos ?? 0)
        );
        updatedInTextCitation.forEach((item, index) => {
          item.data.in_text_rank = index + 1;
        });
        return {
          inTextCitationIds: data_after_append,
          inDocCitationIds: libary_after_append,
          inTextCitation: updatedInTextCitation,
          inDocCitation: updatedInDocCitation,
        };
      });
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
    set((state) => {
      const updatedInTextCitation = state.inTextCitation.filter(
        (item) => item.data.id !== result
      );
      updatedInTextCitation.sort(
        (a, b) => (a.data.in_text_pos ?? 0) - (b.data.in_text_pos ?? 0)
      );
      updatedInTextCitation.forEach((item, index) => {
        item.data.in_text_rank = index + 1;
      });
      return {
        inTextCitationIds: data_after_remove,
        inTextCitation: updatedInTextCitation,
      };
    });
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
