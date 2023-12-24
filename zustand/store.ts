import { create } from 'zustand';
import { BrainstormStore, useBrainStorm } from './slice/brainstorm';

import {
  AIEditorAction,
  AIEditorState,
  useAIEditorStore,
} from './slice/ai-editor';
import {
  GlobalEassyAction,
  GlobalEassyState,
  useGlobalEssay,
} from './slice/global-eassy';

const useRootStore = create<
  AIEditorState &
    AIEditorAction &
    GlobalEassyState &
    GlobalEassyAction &
    BrainstormStore
>((...a) => ({
  ...useAIEditorStore(...a),
  ...useGlobalEssay(...a),
  ...useBrainStorm(...a),
}));

export default useRootStore;
