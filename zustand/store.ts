import { create, useStore } from 'zustand';
import { ActivityListStore, useActListStore } from './slice/activity-list';
import { AIEditiorStore, useAIEditorStore } from './slice/ai-editor';
import { BrainstormStore, useBrainStorm } from './slice/brainstorm';
import {
  GlobalEassyAction,
  GlobalEassyState,
  useGlobalEssay,
} from './slice/global-eassy';
import { UsageStore, useUsageStore } from './slice/usage';

const useRootStore = create<
  AIEditiorStore &
    GlobalEassyState &
    GlobalEassyAction &
    BrainstormStore &
    ActivityListStore &
    UsageStore
>((...a) => ({
  ...useAIEditorStore(...a),
  ...useGlobalEssay(...a),
  ...useBrainStorm(...a),
  ...useActListStore(...a),
  ...useUsageStore(...a),
}));

export function useAIEditor<T>(selector?: (state: AIEditiorStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useUsage<T>(selector?: (state: UsageStore) => T) {
  return useStore(useRootStore, selector!);
}

export default useRootStore;
