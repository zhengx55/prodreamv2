import { create, useStore } from 'zustand';
import { AIEditiorStore, useAIEditorStore } from './slice/ai-editor';
import { ChatBotStore, chatbotSlice } from './slice/chatbot';
import { CitationStore, useCitationStore } from './slice/citation';
import { ModalStore, useModalStore } from './slice/modal';
import useUserStore, { UserStore } from './slice/user-info';
import { OnboardingStore, useOnboardingStore } from './slice/onboarding';

type AppStore = AIEditiorStore &
  ChatBotStore &
  UserStore &
  CitationStore &
  ModalStore &
  OnboardingStore;

const useRootStore = create<AppStore>((...a) => ({
  ...useAIEditorStore(...a),
  ...useUserStore(...a),
  ...useCitationStore(...a),
  ...chatbotSlice(...a),
  ...useModalStore(...a),
  ...useOnboardingStore(...a),
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

export function useModal<Tab>(selector?: (state: ModalStore) => Tab) {
  return useStore(useRootStore, selector!);
}

export function useOnboarding<T>(selector?: (state: OnboardingStore) => T) {
  return useStore(useRootStore, selector!);
}

export default useRootStore;
