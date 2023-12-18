import { create } from 'zustand';

import {
  AIEditorAction,
  AIEditorState,
  useAIEditorStore,
} from './slice/aiEditor';
import {
  GlobalEassyAction,
  GlobalEassyState,
  useGlobalEssay,
} from './slice/globalEassy';

const useRootStore = create<
  AIEditorState & AIEditorAction & GlobalEassyState & GlobalEassyAction
>((...a) => ({
  ...useAIEditorStore(...a),
  ...useGlobalEssay(...a),
}));

export default useRootStore;
