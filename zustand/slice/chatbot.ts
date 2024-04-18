import { StateCreator } from 'zustand';
export type ChatBotStore = ChatBotState & ChatBotAction;

type ChatBotState = {
  showUploadModal: boolean;
};

type ChatBotAction = {
  updateUploadModal: (result: ChatBotState['showUploadModal']) => void;
};

const initialState: ChatBotState = {
  showUploadModal: false,
};

export const chatbotSlice: StateCreator<ChatBotStore> = (set, get) => ({
  ...initialState,
  updateUploadModal(result) {
    set({ showUploadModal: result });
  },
});
