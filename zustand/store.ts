import { create } from 'zustand';
import { ActivityListStore, useActListStore } from './slice/activity-list';
import { AIEditiorStore, useAIEditorStore } from './slice/ai-editor';
import { BrainstormStore, useBrainStorm } from './slice/brainstorm';
import {
  GlobalEassyAction,
  GlobalEassyState,
  useGlobalEssay,
} from './slice/global-eassy';

const useRootStore = create<
  AIEditiorStore &
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
