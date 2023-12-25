import { create } from 'zustand';
import { BrainstormStore, useBrainStorm } from './slice/brainstorm';

import { ActivityListStore, useActListStore } from './slice/activity-list';
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
    BrainstormStore &
    ActivityListStore
>((...a) => ({
  ...useAIEditorStore(...a),
  ...useGlobalEssay(...a),
  ...useBrainStorm(...a),
  ...useActListStore(...a),
}));

export default useRootStore;
