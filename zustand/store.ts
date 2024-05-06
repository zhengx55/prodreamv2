import { create, useStore } from 'zustand';
import { AIEditiorStore, useAIEditorStore } from './slice/ai-editor';
import { ChatBotStore, chatbotSlice } from './slice/chatbot';
import { CitationStore, useCitationStore } from './slice/citation';
import { ModalStore, useModalStore } from './slice/modal';
import useUserStore, { UserStore } from './slice/user-info';
import { UserTaskStore, useUserTaskStore } from './slice/user-task';

type AppStore = AIEditiorStore &
  ChatBotStore &
  UserStore &
  UserTaskStore &
  CitationStore &
  ModalStore;

const useRootStore = create<AppStore>((...a) => ({
  ...useAIEditorStore(...a),
  ...useUserStore(...a),
  ...useUserTaskStore(...a),
  ...useCitationStore(...a),
  ...chatbotSlice(...a),
  ...useModalStore(...a),
}));

export function useAIEditor<T>(selector?: (state: AIEditiorStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useUserInfo<T>(selector?: (state: UserStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useUserTask<T>(selector?: (state: UserTaskStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useCitation<T>(selector?: (state: CitationStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useChatbot<T>(selector?: (state: ChatBotStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useModal<Tab>(selector?: (state: ModalStore) => Tab) {
  return useStore(useRootStore, selector!);
}

export default useRootStore;
