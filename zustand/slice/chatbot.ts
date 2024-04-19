import { StateCreator } from 'zustand';
export type ChatBotStore = ChatBotState & ChatBotAction;

type ChatBotState = {
  showUploadModal: boolean;
  showDeleteModal: boolean;
  deleteSession: string;
  chatType: 'research' | 'pdf' | null;
  history: string[];
  currentSession: string | null;
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
  updateFileUploading: (result: ChatBotState['fileUploading']) => void;
  updateCurrentFile: (result: ChatBotState['currentFile']) => void;
  updateDeleteModal: (result: ChatBotState['showDeleteModal']) => void;
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
