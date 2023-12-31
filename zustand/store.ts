import { create, useStore } from 'zustand';
import { ActivityListStore, useActListStore } from './slice/activity-list';
import { AIEditiorStore, useAIEditorStore } from './slice/ai-editor';
import { BrainstormStore, useBrainStorm } from './slice/brainstorm';
import {
  GlobalEassyAction,
  GlobalEassyState,
  useGlobalEssay,
} from './slice/global-eassy';
import { ResumeStore, useResumeStore } from './slice/resume';
import { UsageStore, useUsageStore } from './slice/usage';
import useUserStore, { UserStore } from './slice/user-info';

const useRootStore = create<
  AIEditiorStore &
    GlobalEassyState &
    GlobalEassyAction &
    BrainstormStore &
    ActivityListStore &
    UsageStore &
    UserStore &
    ResumeStore
>((...a) => ({
  ...useAIEditorStore(...a),
  ...useGlobalEssay(...a),
  ...useBrainStorm(...a),
  ...useActListStore(...a),
  ...useUsageStore(...a),
  ...useUserStore(...a),
  ...useResumeStore(...a),
}));

export function useAIEditor<T>(selector?: (state: AIEditiorStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useResume<T>(selector?: (state: ResumeStore) => T) {
  return useStore(useRootStore, selector!);
}
export function useUsage<T>(selector?: (state: UsageStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useUserInfo<T>(selector?: (state: UserStore) => T) {
  return useStore(useRootStore, selector!);
}

export default useRootStore;
