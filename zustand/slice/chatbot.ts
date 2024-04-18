import { StateCreator } from 'zustand';
export type ChatBotStore = ChatBotState & ChatBotAction;

type ChatBotState = {
  showUploadModal: boolean;
  chatType: 'research' | 'pdf' | null;
  history: string[];
  currentSession: string | null;
};

type ChatBotAction = {
  updateUploadModal: (result: ChatBotState['showUploadModal']) => void;
  updateChatType: (result: ChatBotState['chatType']) => void;
  updateHistory: (result: ChatBotState['history']) => void;
  updateCurrentSession: (result: ChatBotState['currentSession']) => void;
};

const initialState: ChatBotState = {
  showUploadModal: false,
  chatType: null,
  history: [],
  currentSession: null,
};

export const chatbotSlice: StateCreator<ChatBotStore> = (set, get) => ({
  ...initialState,
  updateChatType(result) {
    set({ chatType: result });
  },
  updateUploadModal(result) {
    set({ showUploadModal: result });
  },
  updateHistory(result) {
    set({ history: result });
  },
  updateCurrentSession(result) {
    set({ currentSession: result });
  },
});
