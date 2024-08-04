import { StateCreator } from 'zustand';

export type StoreTypes = 'brainstorming' | 'outline' | 'draft' | 'chat';

type Message = {
  id: string;
  role: 'user' | 'agent';
  text: string;
  options?: { label: string; id: string }[];
  options_type?: 'single' | 'multi';
  html_content?: string;
};

type State = {
  sessionId: string | null;
  messages: Message[];
  brainstormingSessionId: string | null;
  outLineSessionId: string | null;
  draftSessionId: string | null;
  brainstormingMessages: Message[];
  outLineMessages: Message[];
  draftMessages: Message[];
};
type Action = {
  addUserMessage: (id: string, type: StoreTypes, message: string) => void;
  addAgentMessage: (id: string, type: StoreTypes, message: string) => void;
  appendAgentMessage: (id: string, type: StoreTypes, segment: string) => void;
  setAgentMessageOption: (
    id: string,
    type: StoreTypes,
    options_type?: 'single' | 'multi'
  ) => void;
  appendAgentMessageOptions: (
    id: string,
    type: StoreTypes,
    option: { label: string; id: string }
  ) => void;
  setSessionId: (type: StoreTypes, session_id: string) => void;
  getMessages: (type: StoreTypes) => Message[];
};

export type ChatAgentStore = State & Action;
const initialState: State = {
  sessionId: null,
  messages: [],
  brainstormingSessionId: null,
  outLineSessionId: null,
  draftSessionId: null,
  brainstormingMessages: [],
  outLineMessages: [],
  draftMessages: [],
};
export const useChatAgent: StateCreator<ChatAgentStore> = (set, get) => ({
  ...initialState,
  addUserMessage: (id, type, message) => {
    const newMessage: Message = { id, role: 'user', text: message };
    switch (type) {
      case 'brainstorming':
        set((state) => ({
          brainstormingMessages: [...state.brainstormingMessages, newMessage],
        }));
        break;
      case 'outline':
        set((state) => ({
          outLineMessages: [...state.outLineMessages, newMessage],
        }));
        break;
      case 'draft':
        set((state) => ({
          draftMessages: [...state.draftMessages, newMessage],
        }));
        break;
      case 'chat':
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
        break;
      default:
        break;
    }
  },
  addAgentMessage: (id, type, message) => {
    const newMessage: Message = { id, role: 'agent', text: message };
    switch (type) {
      case 'brainstorming':
        set((state) => ({
          brainstormingMessages: [...state.brainstormingMessages, newMessage],
        }));
        break;
      case 'outline':
        set((state) => ({
          outLineMessages: [...state.outLineMessages, newMessage],
        }));
        break;
      case 'draft':
        set((state) => ({
          draftMessages: [...state.draftMessages, newMessage],
        }));
        break;
      case 'chat':
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
        break;
      default:
        break;
    }
  },
  setSessionId: (type, session_id) => {
    switch (type) {
      case 'brainstorming':
        set({ brainstormingSessionId: session_id });
        break;
      case 'outline':
        set({ outLineSessionId: session_id });
        break;
      case 'draft':
        set({ draftSessionId: session_id });
        break;
      case 'chat':
        set({ sessionId: session_id });
        break;
      default:
        break;
    }
  },

  setAgentMessageOption: (id, type, options_type) => {
    const state = get();
    const message = state.brainstormingMessages.find((msg) => msg.id === id);
    if (message) {
      const newMessage = { ...message, options_type };
      switch (type) {
        case 'brainstorming':
          set((state) => ({
            brainstormingMessages: [
              ...state.brainstormingMessages.filter((msg) => msg.id !== id),
              newMessage,
            ],
          }));
          break;
        case 'outline':
          set((state) => ({
            outLineMessages: [
              ...state.outLineMessages.filter((msg) => msg.id !== id),
              newMessage,
            ],
          }));
          break;
        case 'draft':
          set((state) => ({
            draftMessages: [
              ...state.draftMessages.filter((msg) => msg.id !== id),
              newMessage,
            ],
          }));
          break;
        case 'chat':
          set((state) => ({
            messages: [
              ...state.messages.filter((msg) => msg.id !== id),
              newMessage,
            ],
          }));
          break;
        default:
          break;
      }
    }
  },

  appendAgentMessageOptions: (id, type, option) => {
    const state = get();
    const message = state.brainstormingMessages.find((msg) => msg.id === id);
    if (message) {
      const newMessage = {
        ...message,
        options: message.options ? [...message.options, option] : [option],
      };
      switch (type) {
        case 'brainstorming':
          set((state) => ({
            brainstormingMessages: [
              ...state.brainstormingMessages.filter((msg) => msg.id !== id),
              newMessage,
            ],
          }));
          break;
        case 'outline':
          set((state) => ({
            outLineMessages: [
              ...state.outLineMessages.filter((msg) => msg.id !== id),
              newMessage,
            ],
          }));
          break;
        case 'draft':
          set((state) => ({
            draftMessages: [
              ...state.draftMessages.filter((msg) => msg.id !== id),
              newMessage,
            ],
          }));
          break;
        case 'chat':
          set((state) => ({
            messages: [
              ...state.messages.filter((msg) => msg.id !== id),
              newMessage,
            ],
          }));
          break;
        default:
          break;
      }
    }
  },

  appendAgentMessage: (id, type, segment) => {
    const state = get();
    const message = state.brainstormingMessages.find((msg) => msg.id === id);
    if (message) {
      const newMessage = { ...message, text: message.text + segment };
      switch (type) {
        case 'brainstorming':
          set((state) => ({
            brainstormingMessages: [
              ...state.brainstormingMessages.filter((msg) => msg.id !== id),
              newMessage,
            ],
          }));
          break;
        case 'outline':
          set((state) => ({
            outLineMessages: [
              ...state.outLineMessages.filter((msg) => msg.id !== id),
              newMessage,
            ],
          }));
          break;
        case 'draft':
          set((state) => ({
            draftMessages: [
              ...state.draftMessages.filter((msg) => msg.id !== id),
              newMessage,
            ],
          }));
          break;
        case 'chat':
          set((state) => ({
            messages: [
              ...state.messages.filter((msg) => msg.id !== id),
              newMessage,
            ],
          }));
          break;
        default:
          break;
      }
    }
  },

  getMessages: (type) => {
    const state = get();
    switch (type) {
      case 'brainstorming':
        return state.brainstormingMessages;
      case 'outline':
        return state.outLineMessages;
      case 'draft':
        return state.draftMessages;
      case 'chat':
        return state.messages;
      default:
        return [];
    }
  },
});
