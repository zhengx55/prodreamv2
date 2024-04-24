import { AIResearchMessage, AIResearchMessageRef } from '@/types';
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
  currentFile: {
    id: string;
    size: number;
    filename: string;
  } | null;
  messageList: {
    type: 'mine' | 'system';
    text: string;
    id: string;
    filename?: string;
  }[];
  researchList: AIResearchMessage[];
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
    filename?: string;
  }) => void;
  updateMessageItem: (id: string, data: string[]) => void;
  resetCurrentFile: () => void;
  openHistory: () => void;
  closeHistory: () => void;
  updateResearchList: (result: ChatBotState['researchList']) => void;
  appendResearchItem: (result: AIResearchMessage) => void;
  updateResearchMessage: (id: string, data: string[]) => void;
  updateResearchReference: (id: string, data: AIResearchMessageRef[]) => void;
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
  researchList: [],
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
  updateResearchList(result) {
    set({ researchList: result });
  },
  appendResearchItem(result) {
    set({ researchList: [...get().researchList, result] });
  },
  updateResearchMessage: (id, data) =>
    set((state) => {
      const messageIndex = state.researchList.findIndex(
        (message) => message.id === id
      );
      if (messageIndex !== -1) {
        const newMessages = [...state.researchList];
        const updatedMessage = {
          ...newMessages[messageIndex],
          message: newMessages[messageIndex].message + data.join(''),
        };
        newMessages[messageIndex] = updatedMessage;
        return { ...state, researchList: newMessages };
      }
      return state;
    }),
  updateResearchReference: (id, data) => {
    set((state) => {
      const messageIndex = state.researchList.findIndex(
        (message) => message.id === id
      );
      if (messageIndex !== -1) {
        const newMessages = [...state.researchList];
        const updatedMessage = {
          ...newMessages[messageIndex],
          reference: data,
        };
        newMessages[messageIndex] = updatedMessage;
        return { ...state, researchList: newMessages };
      }
      return state;
    });
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
