import { StateCreator } from 'zustand';

export interface MessageContent {
  type: 'text' | 'html' | 'options';
  content: string;
  options?: Option[];
  selectionType?: 'single_selection' | 'multi_selection';
}

export interface Message {
  sessionId: string;
  type: 'user' | 'robot';
  contents: MessageContent[];
  avatarSrc: string;
}

export interface Option {
  id: string;
  label: string;
  action: 'agent' | 'add_material' | 'material_input';
}

interface ChatAgentState {
  messages: Message[];
  currentAgent: string;
  setCurrentAgent: (agent: string) => void;
  addMessage: (message: Message) => void;
  updateLastRobotMessage: (content: MessageContent) => void;
  clearMessages: () => void;
}

const initialState = {
  messages: [],
  currentAgent: "Max",
};

export const chatAgentSlice: StateCreator<ChatAgentState> = (set) => ({
  ...initialState,
  setCurrentAgent: (agent: string) => set({ currentAgent: agent }),
  addMessage: (message: Message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  updateLastRobotMessage: (content: MessageContent) => set((state) => {
    const lastMessage = state.messages[state.messages.length - 1];
    if (lastMessage && lastMessage.type === 'robot') {
      const updatedMessage = {
        ...lastMessage,
        contents: [...lastMessage.contents, content]
      };
      return {
        messages: [...state.messages.slice(0, -1), updatedMessage]
      };
    }
    return state;
  }),
  clearMessages: () => set({ messages: [] }),
});