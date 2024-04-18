import { StateCreator } from 'zustand';
export type ChatBotStore = ChatBotState & ChatBotAction;

type ChatBotState = {
  showUploadModal: boolean;
  chatType: 'research' | 'pdf';
};

type ChatBotAction = {
  updateUploadModal: (result: ChatBotState['showUploadModal']) => void;
  updateChatType: (result: ChatBotState['chatType']) => void;
};

const initialState: ChatBotState = {
  showUploadModal: false,
  chatType: 'research',
};

export const chatbotSlice: StateCreator<ChatBotStore> = (set, get) => ({
  ...initialState,
  updateChatType(result) {
    set({ chatType: result });
  },
  updateUploadModal(result) {
    set({ showUploadModal: result });
  },
});
