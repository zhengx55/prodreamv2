'use client';

import { FormQuestionResponse } from '@/types';
import { createContext, useContext } from 'react';

type NavigatorProps = {
  currentRoute: 'startup' | 'informations' | 'introductions' | 'chatPanel';
  updateCurrentRoute: (
    value: 'startup' | 'informations' | 'introductions' | 'chatPanel'
  ) => void;
  questions: FormQuestionResponse;
  isQusetionFetchError: boolean;
};
export const ChatNavigatorContext = createContext({} as NavigatorProps);

export const useChatNavigatorContext = () => useContext(ChatNavigatorContext);
