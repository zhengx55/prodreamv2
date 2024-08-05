import { create, useStore } from 'zustand';
import { AIEditiorStore, useAIEditorStore } from './slice/ai-editor';
import { ChatAgentStore, useChatAgent } from './slice/chat-agent';
import { ChatBotStore, chatbotSlice } from './slice/chatbot';
import { CitationStore, useCitationStore } from './slice/citation';
import { OnboardingStore, useOnboardingStore } from './slice/onboarding';
import useUserStore, { UserStore } from './slice/user-info';

type AppStore = AIEditiorStore &
  ChatBotStore &
  UserStore &
  CitationStore &
  OnboardingStore &
  ChatAgentStore;

const useRootStore = create<AppStore>((...a) => ({
  ...useAIEditorStore(...a),
  ...useUserStore(...a),
  ...useCitationStore(...a),
  ...chatbotSlice(...a),
  ...useOnboardingStore(...a),
  ...useChatAgent(...a),
}));

export function useAIEditor<T>(selector?: (state: AIEditiorStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useUserInfo<T>(selector?: (state: UserStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useCitation<T>(selector?: (state: CitationStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useChatbot<T>(selector?: (state: ChatBotStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useOnboarding<T>(selector?: (state: OnboardingStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useAgent<T>(selector?: (state: ChatAgentStore) => T) {
  return useStore(useRootStore, selector!);
}

export default useRootStore;
