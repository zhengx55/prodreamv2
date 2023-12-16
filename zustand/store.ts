import { IPolishResultAData } from '@/query/type';
import { create } from 'zustand';

type AIEditorState = {
  polishResult: IPolishResultAData[];
  polishResultWholeParagraph: string;
  isPolishing: boolean;
  isChatEditMode: boolean;
  isEvaluationOpen: boolean;
  isPlagiarismOpen: boolean;
  selectText: string;
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
};

const useAIEditorStore = create<AIEditorState & AIEditorAction>((set) => ({
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
}));

export default useAIEditorStore;
