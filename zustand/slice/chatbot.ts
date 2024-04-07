import { StateCreator } from 'zustand';

export type ChatBotStore = {
  chatbotOpen: boolean;
  toggleChatbot: () => void;
  closeChatbot: () => void;
  openChatbot: () => void;
};

const initialState = {
  chatbotOpen: false,
};

const useChatBotStore: StateCreator<ChatBotStore> = (set) => ({
  ...initialState,
  toggleChatbot: () => set((state) => ({ chatbotOpen: !state.chatbotOpen })),
  closeChatbot: () => set({ chatbotOpen: false }),
  openChatbot: () => set({ chatbotOpen: true }),
});

export default useChatBotStore;
