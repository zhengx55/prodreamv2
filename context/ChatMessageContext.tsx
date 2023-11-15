import { IChatMessage, IChatMesssageList, ISessionId } from '@/query/type';
import { createContext, useContext } from 'react';

type ChatMessageContextPrps = {
  currentMessageList: IChatMesssageList;
  currnetSessionId: string | null;
  setCurrentSeesion: (value: string) => void;
  setCurrentMessageList: (
    value: IChatMessage,
    question_id: string,
    session_id: string
  ) => void;
  currentSteps: number;
  setCurrentSteps: (value: number) => void;
};

export const ChatMessageContext = createContext({} as ChatMessageContextPrps);

export const useChatMessageContext = () => useContext(ChatMessageContext);
