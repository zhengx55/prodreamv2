'use client';

import { FormAnswer, FormQuestion, FormQuestionResponse } from '@/types';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

type NavigatorProps = {
  currentRoute: 'startup' | 'informations' | 'introductions' | 'chatPanel';
  updateCurrentRoute: (
    value: 'startup' | 'informations' | 'introductions' | 'chatPanel'
  ) => void;
  questions: FormQuestionResponse;
  isQusetionFetchError: boolean;
  formAnswers: FormAnswer[];
  setFormAnswers: Dispatch<SetStateAction<FormAnswer[]>>;
};
export const ChatNavigatorContext = createContext({} as NavigatorProps);

export const useChatNavigatorContext = () => useContext(ChatNavigatorContext);
