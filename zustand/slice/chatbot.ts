import { StateCreator } from 'zustand';
export type ChatBotStore = ChatBotState & ChatBotAction;

type ChatBotState = {
  showUploadModal: boolean;
  showDeleteModal: boolean;
  deleteSession: string;
  chatType: 'research' | 'pdf' | null;
  history: string[];
  currentSession: string | null;
  currentResearchSession: string | null;
  fileUploading: boolean;
  currentFile: File | null;
  messageList: { type: 'mine' | 'system'; text: string; id: string }[];
  showHistory: boolean;
};

type ChatBotAction = {
  updateDeleteSession: (result: ChatBotState['deleteSession']) => void;
  updateUploadModal: (result: ChatBotState['showUploadModal']) => void;
  updateChatType: (result: ChatBotState['chatType']) => void;
  updateHistory: (result: ChatBotState['history']) => void;
  updateCurrentSession: (result: ChatBotState['currentSession']) => void;
  updateCurrentResearchSession: (
    result: ChatBotState['currentResearchSession']
  ) => void;
  updateFileUploading: (result: ChatBotState['fileUploading']) => void;
  updateCurrentFile: (result: ChatBotState['currentFile']) => void;
  updateDeleteModal: (result: ChatBotState['showDeleteModal']) => void;
  updateMessageList: (result: ChatBotState['messageList']) => void;
  appendMessage: (result: {
    type: 'mine' | 'system';
    text: string;
    id: string;
  }) => void;
  updateMessageItem: (id: string, data: string[]) => void;
  resetCurrentFile: () => void;
  openHistory: () => void;
  closeHistory: () => void;
};

const initialState: ChatBotState = {
  deleteSession: '',
  showUploadModal: false,
  chatType: null,
  history: [],
  currentSession: null,
  currentResearchSession: null,
  fileUploading: false,
  currentFile: null,
  messageList: [],
  showHistory: false,
  showDeleteModal: false,
};

export const chatbotSlice: StateCreator<ChatBotStore> = (set, get) => ({
  ...initialState,
  updateDeleteSession(result) {
    set({ deleteSession: result });
  },
  updateMessageList(result) {
    set({ messageList: result });
  },
  appendMessage(result) {
    set({ messageList: [...get().messageList, result] });
  },
  updateMessageItem: (id, data) =>
    set((state) => {
      const messageIndex = state.messageList.findIndex(
        (message) => message.id === id
      );
      if (messageIndex !== -1) {
        const newMessages = [...state.messageList];
        const updatedMessage = {
          ...newMessages[messageIndex],
          text: newMessages[messageIndex].text + data.join(''),
        };
        newMessages[messageIndex] = updatedMessage;
        return { ...state, messageList: newMessages };
      }
      return state;
    }),
  updateChatType(result) {
    set({ chatType: result });
  },
  updateDeleteModal(result) {
    set({ showDeleteModal: result });
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
  updateFileUploading(result) {
    set({ fileUploading: result });
  },
  updateCurrentFile(result) {
    set({ currentFile: result });
  },
  updateCurrentResearchSession(result) {
    set({ currentResearchSession: result });
  },
  resetCurrentFile() {
    set({ currentFile: null });
  },
  openHistory() {
    set({ showHistory: true });
  },
  closeHistory() {
    set({ showHistory: false });
  },
});
