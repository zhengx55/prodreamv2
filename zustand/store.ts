import { IPolishResultAData } from '@/query/type';
import { create } from 'zustand';
import { sanitize } from 'isomorphic-dompurify';
import { removeHtmlTags } from '@/lib/utils';
import { Editor } from '@tiptap/react';

type AIEditorState = {
  polishResult: IPolishResultAData[];
  polishResultWholeParagraph: string;
  isPolishing: boolean;
  isChatEditMode: boolean;
  isEvaluationOpen: boolean;
  isPlagiarismOpen: boolean;
  selectText: string;
  editor_html: string;
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
  updateSelectText: (result: AIEditorState['selectText']) => void;
  clearPolishResult: () => void;
  updateEditor_html: (result: AIEditorState['editor_html']) => void;
  removesStyling: () => void;
  setEditorInstance: (result: Editor) => void;
};

const useAIEditorStore = create<AIEditorState & AIEditorAction>((set) => ({
  editor_instance: null,
  editor_html: '',
  polishResult: [],
  selectText: '',
  polishResultWholeParagraph: '',
  isPolishing: false,
  isChatEditMode: false,
  isEvaluationOpen: false,
  isPlagiarismOpen: false,
  updatePolishResult: (result) => set(() => ({ polishResult: result })),
  updatePolishResultWholeParagraph: (result) =>
    set(() => ({ polishResultWholeParagraph: result })),
  updateIsPolishing: (result) => set(() => ({ isPolishing: result })),
  updateIsChatEditMode: (result) => set(() => ({ isChatEditMode: result })),
  updateIsEvaluationOpen: (result) => set(() => ({ isEvaluationOpen: result })),
  updateIsPlagiarismOpen: (result) => set(() => ({ isPlagiarismOpen: result })),
  updateSelectText: (result) => set(() => ({ selectText: result })),
  clearPolishResult: () =>
    set(() => ({
      polishResult: [],
      polishResultWholeParagraph: '',
    })),
  updateEditor_html: (result) =>
    set(() => ({
      editor_html: sanitize(result),
    })),
  removesStyling: () =>
    set((state) => ({
      editor_html: removeHtmlTags(state.editor_html),
    })),
  setEditorInstance: (result) =>
    set(() => ({
      editor_instance: result,
    })),
}));

export default useAIEditorStore;
