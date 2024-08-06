import { create, useStore } from 'zustand';
import { ChatAgentStore, useChatAgent } from './slice/chat-agent';
import useUserStore, { UserStore } from './slice/user-info';
import { OutlineStore, useOutlineStore } from './slice/workbench/outline';

type AppStore = UserStore & ChatAgentStore & OutlineStore;

const useRootStore = create<AppStore>((...a) => ({
  ...useUserStore(...a),
  ...useChatAgent(...a),
  ...useOutlineStore(...a),
}));

export function useUserInfo<T>(selector?: (state: UserStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useAgent<T>(selector?: (state: ChatAgentStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useOutline<T>(selector?: (state: OutlineStore) => T) {
  return useStore(useRootStore, selector!);
}

export default useRootStore;
