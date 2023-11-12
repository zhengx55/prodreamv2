'use client';

import {
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

type NavigatorProps = {
  currentRoute: 'startup' | 'informations' | 'introductions' | 'chatPanel';
  updateCurrentRoute: (
    value: 'startup' | 'informations' | 'introductions' | 'chatPanel'
  ) => void;
};
export const ChatNavigatorContext = createContext({} as NavigatorProps);

export const useChatNavigatorContext = () => useContext(ChatNavigatorContext);
