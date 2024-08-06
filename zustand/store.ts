import { create, useStore } from 'zustand';
import { ChatAgentStore, useChatAgent } from './slice/chat-agent';
import useUserStore, { UserStore } from './slice/user-info';

type AppStore = UserStore & ChatAgentStore;

const useRootStore = create<AppStore>((...a) => ({
  ...useUserStore(...a),
  ...useChatAgent(...a),
}));

export function useUserInfo<T>(selector?: (state: UserStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useAgent<T>(selector?: (state: ChatAgentStore) => T) {
  return useStore(useRootStore, selector!);
}

export default useRootStore;
