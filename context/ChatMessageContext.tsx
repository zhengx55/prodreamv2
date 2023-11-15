import { IChatMessage, IChatMesssageList, ISessionId } from '@/query/type';
import { createContext, useContext } from 'react';

type ChatMessageContextPrps = {
  currentMessageList: IChatMesssageList;
  setCurrentMessageList: (value: IChatMessage, question_id: string) => void;
  currentSteps: number;
  setCurrentSteps: (value: number) => void;
  sessionMap: ISessionId;
  setSessionMap: (value: string, question_id: string, step: number) => void;
};

export const ChatMessageContext = createContext({} as ChatMessageContextPrps);

export const useChatMessageContext = () => useContext(ChatMessageContext);
