import { IPlagiarismData } from '@/query/type';
import { Editor } from '@tiptap/react';
import { StateCreator } from 'zustand';

export type AIEditiorStore = AIEditorState & AIEditorAction;

const initialState: AIEditorState = {
  doc_title: '',
  rightbarOpen: false,
  rightbarTab: 0,
  editor_instance: null,
  isSaving: false,
  isPlagiarismOpen: false,
  plagiarismReCheck: false,
  plagiarismResult: null,
  showCopilotMenu: false,
  showCitiationMenu: false,
  copilotRect: null,
  copilotRectX: null,
  showSynonymMenu: false,
  paymentModalOpen: false,
};

type AIEditorState = {
  doc_title: string;
  rightbarOpen: boolean;
  rightbarTab: number;
  isSaving: boolean;
  plagiarismReCheck: boolean;
  plagiarismResult: null | Omit<IPlagiarismData, 'status'>;
  isPlagiarismOpen: boolean;
  editor_instance: Editor | null;
  showCopilotMenu: boolean;
  showCitiationMenu: boolean;
  copilotRect: null | number;
  showSynonymMenu: boolean;
  copilotRectX: null | number;
  paymentModalOpen: boolean;
};

type AIEditorAction = {
  updateTitle: (result: AIEditorState['doc_title']) => void;
  toggleRightbar: () => void;
  updateRightbarTab: (result: AIEditorState['rightbarTab']) => void;
  togglePlagiarism: () => void;
  updatePlagiarismRecheck: (result: AIEditorState['plagiarismReCheck']) => void;
  toogleIsSaving: (result: AIEditorState['isSaving']) => void;
  setEditorInstance: (result: Editor) => void;
  reset: () => void;
  updatePlagiarismResult: (result: AIEditorState['plagiarismResult']) => void;
  updateCopilotMenu: (result: AIEditorState['showCopilotMenu']) => void;
  updateCopilotRect: (result: AIEditiorStore['copilotRect']) => void;
  updateCitationMenu: (result: AIEditorState['showCitiationMenu']) => void;
  updateSynonymMenu: (result: AIEditorState['showSynonymMenu']) => void;
  updateCopilotRectX: (resutl: AIEditorState['copilotRectX']) => void;
  updatePaymentModal: (result: AIEditorState['paymentModalOpen']) => void;
};

export const useAIEditorStore: StateCreator<AIEditiorStore> = (set, get) => ({
  ...initialState,
  updatePlagiarismResult: (result) =>
    set(() => ({
      plagiarismResult: result,
    })),
  updateTitle: (result) => set(() => ({ doc_title: result })),
  updatePaymentModal: (result) => set(() => ({ paymentModalOpen: result })),
  updateRightbarTab: (result) =>
    set((state) => {
      if (!state.rightbarOpen)
        return { rightbarOpen: true, righbarTab: result };
      return { rightbarTab: result };
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
  updateCopilotRectX: (result) =>
    set(() => ({
      copilotRectX: result,
    })),
});
