import { IPolishResultAData } from '@/query/type';
import { Editor } from '@tiptap/react';
import { StateCreator } from 'zustand';

export type AIEditiorStore = AIEditorState & AIEditorAction;

const initialState: AIEditorState = {
  editor_instance: null,
  polishResult: [],
  polishResultWholeParagraph: '',
  isPolishing: false,
  isChatEditMode: false,
  isEvaluationOpen: false,
  isPlagiarismOpen: false,
};

type AIEditorState = {
  polishResult: IPolishResultAData[];
  polishResultWholeParagraph: string;
  isPolishing: boolean;
  isChatEditMode: boolean;
  isEvaluationOpen: boolean;
  isPlagiarismOpen: boolean;
  editor_instance: Editor | null;
};

type AIEditorAction = {
  updatePolishResult: (polishResult: AIEditorState['polishResult']) => void;
  updatePolishResultWholeParagraph: (
    result: AIEditorState['polishResultWholeParagraph']
  ) => void;
  updateIsPolishing: (result: AIEditorState['isPolishing']) => void;
  updateIsChatEditMode: (result: AIEditorState['isChatEditMode']) => void;
  updateIsEvaluationOpen: (result: AIEditorState['isEvaluationOpen']) => void;
  updateIsPlagiarismOpen: (result: AIEditorState['isPlagiarismOpen']) => void;
  clearPolishResult: () => void;
  setEditorInstance: (result: Editor) => void;
  reset: () => void;
};

export const useAIEditorStore: StateCreator<AIEditiorStore> = (set, get) => ({
  ...initialState,
  updatePolishResult: (result) => set(() => ({ polishResult: result })),
  updatePolishResultWholeParagraph: (result) =>
    set(() => ({ polishResultWholeParagraph: result })),
  updateIsPolishing: (result) => set(() => ({ isPolishing: result })),
  updateIsChatEditMode: (result) => set(() => ({ isChatEditMode: result })),
  updateIsEvaluationOpen: (result) => set(() => ({ isEvaluationOpen: result })),
  updateIsPlagiarismOpen: (result) => set(() => ({ isPlagiarismOpen: result })),
  reset: () => set(initialState),
  clearPolishResult: () =>
    set(() => ({
      polishResult: [],
      polishResultWholeParagraph: '',
    })),
  setEditorInstance: (result) =>
    set(() => ({
      editor_instance: result,
    })),
});
