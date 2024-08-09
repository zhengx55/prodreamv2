import { create, useStore } from 'zustand';
import useUserStore, { UserStore } from './slice/user-info';
import { ChatAgentStore, useChatAgent } from './slice/workbench/chat-agent';
import { EditorStore, useEditorStore } from './slice/workbench/editor';

type AppStore = UserStore & ChatAgentStore & EditorStore;

const useRootStore = create<AppStore>((...a) => ({
  ...useUserStore(...a),
  ...useChatAgent(...a),
  ...useEditorStore(...a),
}));

export function useUserInfo<T>(selector?: (state: UserStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useAgent<T>(selector?: (state: ChatAgentStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useEditor<T>(selector?: (state: EditorStore) => T) {
  return useStore(useRootStore, selector!);
}

export default useRootStore;
