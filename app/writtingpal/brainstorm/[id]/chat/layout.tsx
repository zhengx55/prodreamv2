'use client';
import { ChatNavigatorContext } from '@/context/ChatNavigationProvider';
import { ReactNode, SetStateAction, useCallback, useState } from 'react';

export default function ChatLayout({
  informations,
  introductions,
  children,
  chatpanel,
}: {
  informations: ReactNode;
  introductions: ReactNode;
  children: ReactNode;
  chatpanel: React.ReactNode;
}) {
  const [currentRoute, setCurrentRoute] = useState<
    'startup' | 'informations' | 'introductions' | 'chatPanel'
  >('startup');
  const updateCurrentRoute = useCallback(
    (
      value: SetStateAction<
        'startup' | 'informations' | 'introductions' | 'chatPanel'
      >
    ) => {
      setCurrentRoute(value);
    },
    []
  );
  return (
    <ChatNavigatorContext.Provider value={{ currentRoute, updateCurrentRoute }}>
      {currentRoute === 'startup'
        ? children
        : currentRoute === 'informations'
        ? informations
        : currentRoute === 'introductions'
        ? introductions
        : chatpanel}
    </ChatNavigatorContext.Provider>
  );
}
