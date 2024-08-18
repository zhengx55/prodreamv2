import { StateCreator } from 'zustand';

export type StoreTypes = 'brainstorming' | 'outline' | 'draft' | 'chat';

export type Message = {
  id: string;
  role: 'user' | 'agent';
  text: string;
  options?: { label: string; id: string }[];
  options_type?: 'single' | 'multi';
  options_selected?: number[];
  html_content?: string;
  selection_done?: boolean;
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
  showGenerateOutlineModal: boolean;
  showPolishOutlineModal: boolean;
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
  addAgentMessageOptions: (
    id: string,
    type: StoreTypes,
    option: { label: string; id: string }
  ) => void;
  appendAgentMessageOption: (
    id: string,
    option_id: string,
    type: StoreTypes,
    segment: string
  ) => void;
  setAgentMessageHTMLContent: (
    id: string,
    type: StoreTypes,
    html_content: string
  ) => void;
  setAgentMessageOptionsSelected: (
    id: string,
    type: StoreTypes,
    option_index: number
  ) => void;
  setAgentMessageSelectionDone: (id: string, type: StoreTypes) => void;
  setSessionId: (type: StoreTypes, session_id: string) => void;
  getMessages: (type: StoreTypes) => Message[];
  getSessionId: (type: StoreTypes) => string | null;
  clearSession: (type: StoreTypes) => void;
  setshowGenerateOutlineModal: (show: boolean) => void;
  setshowPolishOutlineModal: (show: boolean) => void;
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
  showGenerateOutlineModal: false,
  showPolishOutlineModal: false,
};

const updateMessages = (
  state: State,
  type: StoreTypes,
  updateFn: (messages: Message[]) => Message[]
): State => {
  switch (type) {
    case 'brainstorming':
      return {
        ...state,
        brainstormingMessages: updateFn(state.brainstormingMessages),
      };
    case 'outline':
      return { ...state, outLineMessages: updateFn(state.outLineMessages) };
    case 'draft':
      return { ...state, draftMessages: updateFn(state.draftMessages) };
    case 'chat':
      return { ...state, messages: updateFn(state.messages) };
    default:
      return state;
  }
};

export const useChatAgent: StateCreator<ChatAgentStore> = (set, get) => ({
  ...initialState,
  addUserMessage: (id, type, message) => {
    const newMessage: Message = { id, role: 'user', text: message };
    set((state) =>
      updateMessages(state, type, (messages) => [...messages, newMessage])
    );
  },
  addAgentMessage: (id, type, message) => {
    const newMessage: Message = { id, role: 'agent', text: message };
    set((state) =>
      updateMessages(state, type, (messages) => [...messages, newMessage])
    );
  },
  appendAgentMessage: (id, type, segment) => {
    set((state) =>
      updateMessages(state, type, (messages) =>
        messages.map((msg) =>
          msg.id === id ? { ...msg, text: msg.text + segment } : msg
        )
      )
    );
  },
  setAgentMessageOption: (id, type, options_type) => {
    set((state) =>
      updateMessages(state, type, (messages) =>
        messages.map((msg) => (msg.id === id ? { ...msg, options_type } : msg))
      )
    );
  },

  setAgentMessageHTMLContent: (id, type, html_content) => {
    set((state) =>
      updateMessages(state, type, (messages) =>
        messages.map((msg) => (msg.id === id ? { ...msg, html_content } : msg))
      )
    );
  },

  addAgentMessageOptions: (id, type, option) => {
    set((state) =>
      updateMessages(state, type, (messages) =>
        messages.map((msg) =>
          msg.id === id
            ? {
                ...msg,
                options: msg.options ? [...msg.options, option] : [option],
              }
            : msg
        )
      )
    );
  },

  appendAgentMessageOption: (id, option_id, type, segment) => {
    set((state) =>
      updateMessages(state, type, (messages) =>
        messages.map((msg) =>
          msg.id === id
            ? {
                ...msg,
                options: msg.options?.map((option) =>
                  option.id === option_id
                    ? { ...option, label: option.label + segment }
                    : option
                ),
              }
            : msg
        )
      )
    );
  },
  setAgentMessageOptionsSelected: (id, type, option_index) => {
    set((state) =>
      updateMessages(state, type, (messages) =>
        messages.map((msg) => {
          if (
            msg.id === id &&
            msg.options &&
            msg.options[option_index] !== undefined
          ) {
            let newOptionsSelected;
            if (msg.options_type === 'single') {
              newOptionsSelected = [option_index];
            } else {
              newOptionsSelected = msg.options_selected?.includes(option_index)
                ? msg.options_selected.filter((index) => index !== option_index)
                : [...(msg.options_selected || []), option_index];
            }
            return {
              ...msg,
              options_selected: newOptionsSelected,
            };
          }
          return msg;
        })
      )
    );
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
  getSessionId: (type) => {
    const state = get();
    switch (type) {
      case 'brainstorming':
        return state.brainstormingSessionId;
      case 'outline':
        return state.outLineSessionId;
      case 'draft':
        return state.draftSessionId;
      case 'chat':
        return state.sessionId;
      default:
        return null;
    }
  },
  clearSession: (type) => {
    switch (type) {
      case 'brainstorming':
        set({ brainstormingMessages: [], brainstormingSessionId: null });
        break;
      case 'outline':
        set({ outLineMessages: [], outLineSessionId: null });
        break;
      case 'draft':
        set({ draftMessages: [], draftSessionId: null });
        break;
      case 'chat':
        set({ messages: [], sessionId: null });
        break;
      default:
        break;
    }
  },

  setAgentMessageSelectionDone: (id, type) => {
    set((state) =>
      updateMessages(state, type, (messages) =>
        messages.map((msg) =>
          msg.id === id ? { ...msg, selection_done: true } : msg
        )
      )
    );
  },

  setshowGenerateOutlineModal: (show) => {
    set({ showGenerateOutlineModal: show });
  },
  setshowPolishOutlineModal: (show) => {
    set({ showPolishOutlineModal: show });
  },
});
