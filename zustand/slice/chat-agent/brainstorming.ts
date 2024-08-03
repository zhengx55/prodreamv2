import { StateCreator } from 'zustand';

type StoreTypes = 'brainstorming' | 'outline' | 'draft' | 'chat';

type Message = {
  role: 'user' | 'agent';
  text: string;
  options?: any[];
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
  addUserMessage: (type: StoreTypes, message: string) => void;
  addAgentMessage: (type: StoreTypes, message: string) => void;
  setSessionId: (type: StoreTypes, session_id: string) => void;
  getMessages: (type: StoreTypes) => Message[];
};

export type BrainstormingChatAgent = State & Action;
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
export const useBrainstormingChat: StateCreator<BrainstormingChatAgent> = (
  set,
  get
) => ({
  ...initialState,
  addUserMessage: (type, message) => {
    const newMessage: Message = { role: 'user', text: message };
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
  addAgentMessage: (type, message) => {
    const newMessage: Message = { role: 'agent', text: message };
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
