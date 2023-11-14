'use client';
import Loading from '@/components/root/CustomLoading';
import { ChatNavigatorContext } from '@/context/ChatNavigationProvider';
import { useChatGuideQas } from '@/query/query';
import { FormAnswer, FormQuestionResponse } from '@/types';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
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
  const [formAnswers, setFormAnswers] = useState<FormAnswer[]>([]);
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
  const path = usePathname();
  const template_id = path.split('/')[3];
  const {
    data: chatQas,
    isPending: isChatDataPending,
    isError: isChatDataError,
  } = useChatGuideQas(template_id);
  return isChatDataPending ? (
    <Loading />
  ) : (
    <ChatNavigatorContext.Provider
      value={{
        currentRoute,
        updateCurrentRoute,
        questions: isChatDataError ? ({} as FormQuestionResponse) : chatQas,
        isQusetionFetchError: isChatDataError,
        formAnswers: formAnswers,
        setFormAnswers: setFormAnswers,
      }}
    >
      <AnimatePresence mode='wait'>
        {currentRoute === 'startup'
          ? children
          : currentRoute === 'informations'
            ? informations
            : currentRoute === 'introductions'
              ? introductions
              : chatpanel}
      </AnimatePresence>
    </ChatNavigatorContext.Provider>
  );
}
