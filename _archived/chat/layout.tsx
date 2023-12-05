'use client';
import Loading from '@/components/root/CustomLoading';
import { ChatNavigatorContext } from '@/context/ChatNavigationProvider';
import { useChatGuideQas } from '@/query/query';
import { ChatPage } from '@/query/type';
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
  const [currentRoute, setCurrentRoute] = useState<ChatPage>('startup');
  const [chatHistoryInfo, setChatHistoryInfo] = useState();
  const updateCurrentRoute = useCallback((value: SetStateAction<ChatPage>) => {
    setCurrentRoute(value);
  }, []);
  const path = usePathname();
  const template_id = path.split('/')[3];
  const {
    data: chatQas,
    isPending: isChatDataPending,
    isError: isChatDataError,
  } = useChatGuideQas(template_id);
  // !test purpose
  const unwantedQuestionIds = [
    'a49fb3107c95416f9948bf7d2ff42727',
    'be3a57998ae847288f4d5d7aa9da6831',
  ];

  return isChatDataPending ? (
    <Loading />
  ) : (
    <ChatNavigatorContext.Provider
      value={{
        currentRoute,
        updateCurrentRoute,
        questions: isChatDataError
          ? ({} as FormQuestionResponse)
          : {
              form_question: chatQas.form_question,
              questions: chatQas?.questions.filter(
                (question) =>
                  !unwantedQuestionIds.includes(question.question_id)
              ),
            },
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
