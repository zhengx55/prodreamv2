import { IChatMessage, IChatMesssageList, ISessionId } from '@/query/type';
import { createContext, useContext } from 'react';

type ChatMessageContextPrps = {
  currentMessageList: IChatMesssageList;
  currnetSessionId: string | null;
  setCurrentSession: (value: string | null) => void;
  setCurrentMessageList: (
    value: IChatMessage,
    question_id: string,
    session_id: string,
    title: string
  ) => void;
  currentSteps: number;
  setCurrentSteps: (value: number) => void;
  setTemplateAnswers: (
    question_id: string,
    answer: any,
    subsessionId?: string
  ) => void;
  templateAnswers: Record<string, any>;
  currentSubSession: string | undefined;
  clearSubSession: () => void;
  addSubSession: (value: string) => void;
};

export const ChatMessageContext = createContext({} as ChatMessageContextPrps);

export const useChatMessageContext = () => useContext(ChatMessageContext);
