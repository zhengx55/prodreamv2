import { create, useStore } from 'zustand';
import { AIEditiorStore, useAIEditorStore } from './slice/ai-editor';
import useUserStore, { UserStore } from './slice/user-info';

const useRootStore = create<AIEditiorStore & UserStore>((...a) => ({
  ...useAIEditorStore(...a),
  ...useUserStore(...a),
}));

export function useAIEditor<T>(selector?: (state: AIEditiorStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useUserInfo<T>(selector?: (state: UserStore) => T) {
  return useStore(useRootStore, selector!);
}

export default useRootStore;
