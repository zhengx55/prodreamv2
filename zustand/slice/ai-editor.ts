import { Editor } from '@tiptap/react';
import { StateCreator } from 'zustand';

export type AIEditiorStore = AIEditorState & AIEditorAction;

const initialState: AIEditorState = {
  doc_title: '',
  rightbarOpen: false,
  rightbarTab: -1,
  generateTab: -1,
  editor_instance: null,
  isSaving: false,
  showCopilotMenu: false,
  showCitiationMenu: false,
  showBubbleMenu: false,
  showSynonymMenu: false,
  paymentModalOpen: false,
  showContinue: null,
  continueResult: '',
  disableContinue: false,
  continueInsertPos: null,
  floatingMenuPos: null,
  essay_prompt: '',
  showPromptModal: false,
};

type AIEditorState = {
  doc_title: string;
  rightbarOpen: boolean;
  generateTab: number | string;
  rightbarTab: number;
  isSaving: boolean;
  editor_instance: Editor | null;
  showCopilotMenu: boolean;
  showBubbleMenu: boolean;
  showCitiationMenu: boolean;
  showSynonymMenu: boolean;
  paymentModalOpen: boolean;
  showContinue: { top: number; left: number } | null;
  continueResult: string;
  disableContinue: boolean;
  continueInsertPos: number | null;
  floatingMenuPos: { top: number; left: number } | null;
  essay_prompt: string;
  showPromptModal: boolean;
};

type AIEditorAction = {
  updateTitle: (result: AIEditorState['doc_title']) => void;
  toggleRightbar: () => void;
  updateGenerateTab: (result: AIEditorState['generateTab']) => void;
  updateRightbarTab: (result: AIEditorState['rightbarTab']) => void;
  toogleIsSaving: (result: AIEditorState['isSaving']) => void;
  setEditorInstance: (result: Editor) => void;
  reset: () => void;
  updateCopilotMenu: (result: AIEditorState['showCopilotMenu']) => void;
  updateFloatingMenuPos: (result: AIEditiorStore['floatingMenuPos']) => void;
  updateCitationMenu: (result: AIEditorState['showCitiationMenu']) => void;
  updateSynonymMenu: (result: AIEditorState['showSynonymMenu']) => void;
  updatePaymentModal: (result: AIEditorState['paymentModalOpen']) => void;
  closeRightbar: () => void;
  updateshowContinue: (result: AIEditorState['showContinue']) => void;
  updateContinueRes: (result: AIEditorState['continueResult']) => void;
  clearContinueRes: () => void;
  updateInsertPos: (result: number) => void;
  updateShowBubbleMenu: (result: AIEditorState['showBubbleMenu']) => void;
  updateEssayPrompt: (result: AIEditorState['essay_prompt']) => void;
  updatePromptModal: (result: boolean) => void;
};

export const useAIEditorStore: StateCreator<AIEditiorStore> = (set, get) => ({
  ...initialState,
  updateEssayPrompt(result) {
    set(() => ({
      essay_prompt: result,
    }));
  },
  updateShowBubbleMenu(result) {
    set(() => ({
      showBubbleMenu: result,
    }));
  },
  updateGenerateTab: (result) =>
    set(() => ({
      generateTab: result,
    })),
  closeRightbar: () => set(() => ({ rightbarOpen: false, rightbarTab: -1 })),
  updateTitle: (result) => set(() => ({ doc_title: result })),
  updatePaymentModal: (result) => set(() => ({ paymentModalOpen: result })),
  updateRightbarTab: (result) =>
    set((state) => {
      if (!state.rightbarOpen)
        return { rightbarOpen: true, rightbarTab: result, showContinue: null };
      return { rightbarTab: result };
    }),
  toggleRightbar: () =>
    set((state) => ({ showContinue: null, rightbarOpen: !state.rightbarOpen })),

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

  updateFloatingMenuPos: (result) =>
    set(() => ({
      floatingMenuPos: result,
    })),

  updateCitationMenu: (result) =>
    set(() => ({
      showCitiationMenu: result,
    })),
  updateSynonymMenu: (result) =>
    set(() => ({
      showSynonymMenu: result,
    })),

  updateshowContinue: (result) =>
    set(() => ({
      showContinue: result,
    })),
  updateContinueRes: (result) => {
    set((state) => {
      if (!state.disableContinue)
        return {
          disableContinue: true,
        };
      return {
        continueResult: state.continueResult + result,
      };
    });
  },
  clearContinueRes: () => {
    set(() => ({
      disableContinue: false,
      continueResult: '',
    }));
  },
  updateInsertPos: (result) => {
    set(() => ({
      continueInsertPos: result,
    }));
  },
  updatePromptModal: (result) => {
    set(() => ({
      showPromptModal: result,
    }));
  },
});
