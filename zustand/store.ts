import { IPolishResultAData } from '@/query/type';
import { create } from 'zustand';
import { sanitize } from 'isomorphic-dompurify';

type AIEditorState = {
  polishResult: IPolishResultAData[];
  polishResultWholeParagraph: string;
  isPolishing: boolean;
  isChatEditMode: boolean;
  isEvaluationOpen: boolean;
  isPlagiarismOpen: boolean;
  selectText: string;
  editor_html: string;
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
};

const useAIEditorStore = create<AIEditorState & AIEditorAction>((set) => ({
  editor_html: '<span></span>',
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
}));

export default useAIEditorStore;
