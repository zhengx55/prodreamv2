import { useMaxChatContext } from '@/context/MaxChateProvider';
import { useGetSessionHistory } from '@/query/query';
import { IChatRequest, IChatSessionData, Role } from '@/query/type';
import Image from 'next/image';
import React, {
  ChangeEvent,
  useEffect,
  useState,
  KeyboardEvent,
  useRef,
} from 'react';
import { Input } from '../ui/input';
import { fetchResponse, sendMessage } from '@/query/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useDeepCompareEffect from 'use-deep-compare-effect';
import ChatTextStreamingEffect from './ChatTextStreamingEffect';

const MessageLoading = () => (
  <div className='flex gap-x-1'>
    <span className='h-2 w-2 animate-bounce rounded-full bg-dot' />
    <span className='h-2 w-2 animate-bounce rounded-full bg-dot delay-100' />
    <span className='h-2 w-2 animate-bounce rounded-full bg-dot delay-200' />
  </div>
);

const MessageList = () => {
  const { currentSession, currentChatType } = useMaxChatContext();
  const {
    data: currentMessageList,
    isPending: isMessagePending,
    isError: isMessageError,
  } = useGetSessionHistory(currentSession);

  const { mutateAsync: fetchFirst } = useMutation({
    mutationFn: (param: IChatRequest) => sendMessage(param),
    onSuccess: (data) => {
      setSystemLoading(true);
      respondTimer.current = setInterval(async () => {
        try {
          const response = await fetchResponse(data);
          if (response.status === 'doing') {
            if (response.text) {
              setAnimatedText(response.text);
              setSystemLoading(false);
            }
          }
          if (response.status === 'done') {
            setSystemLoading(false);
            setAnimatedText(response.text);
            clearInterval(respondTimer.current);
            if (!sessionid) {
              setSessionId(data);
              queryClient.invalidateQueries({ queryKey: ['chat_history'] });
            }
          }
        } catch (error) {
          setSystemLoading(false);
          console.log(error);
        }
      }, 1500);
    },
    onError: () => {
      setSystemLoading(false);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!Boolean(currentSession)) {
        fetchFirst({
          query: '',
          func_type: currentChatType,
          session_id: '',
        });
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatType, currentSession]);

  const [sessionid, setSessionId] = useState('');
  const [MessageList, setMessageList] = useState<IChatSessionData[]>([]);
  const [userMessage, setUserMessage] = useState('');
  const [systemLoading, setSystemLoading] = useState(false);
  const respondTimer = useRef<NodeJS.Timeout | undefined>();
  const chatPanelRef = useRef<HTMLElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const queryClient = useQueryClient();
  const printIndexRef = useRef<number>(0);
  const [animatedText, setAnimatedText] = useState('');

  const scrollToBottom = () => {
    if (chatPanelRef.current) {
      chatPanelRef.current.scrollTop =
        chatPanelRef.current.scrollHeight - chatPanelRef.current.clientHeight;
    }
  };

  const { mutateAsync: chat } = useMutation({
    mutationFn: (param: IChatRequest) => sendMessage(param),
    onSuccess: (data) => {
      setUserMessage('');
      setIsTyping(false);
      setSystemLoading(true);
      setMessageList((prev) => [
        ...prev,
        { role: Role.User, content: userMessage, order: 1 },
      ]);
      respondTimer.current = setInterval(async () => {
        try {
          const response = await fetchResponse(data);
          if (response.status === 'doing') {
            if (response.text) {
              setAnimatedText(response.text);
              setSystemLoading(false);
            }
          }
          if (response.status === 'done') {
            setSystemLoading(false);
            setAnimatedText(response.text);
            clearInterval(respondTimer.current);
            if (!sessionid) {
              setSessionId(data);
              queryClient.invalidateQueries({ queryKey: ['chat_history'] });
            }
          }
        } catch (error) {
          setSystemLoading(false);
          console.log(error);
        }
      }, 1500);
    },
    onError: () => {
      setSystemLoading(false);
    },
  });

  useEffect(() => {
    if (currentMessageList) {
      setMessageList(currentMessageList);
    }
  }, [currentMessageList]);

  useEffect(() => {
    // 切换聊天窗口时清除打字机特效残留
    setAnimatedText('');
    printIndexRef.current = 0;
  }, [currentSession]);

  useDeepCompareEffect(() => {
    scrollToBottom();
  }, [MessageList]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      respondTimer.current && clearInterval(respondTimer.current);
    };
  }, []);

  const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserMessage(value);
    if (value.trim() !== '') {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  const onSendMessage = async () => {
    if (userMessage.trim() !== '') {
      await chat({
        query: userMessage.trim(),
        func_type: currentChatType,
        session_id: currentSession ? currentSession : sessionid,
      });
    }
  };

  const onEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className='flex w-[70%] flex-col items-center'>
      {/* top bar */}
      <section className='flex h-16 w-full shrink-0 items-center gap-x-4 rounded-tl-2xl border-b border-[#E8ECEF] bg-[#FEFEFE] px-7 shadow-chatWindow'>
        <h1 className='title-semibold'>Max Tang, M.Ed.</h1>
        <p className='subtle-regular text-shadow-100'>
          College admission expert
        </p>
      </section>
      {/* chat message list section */}
      <section
        ref={chatPanelRef}
        className='flex min-h-[calc(100%_-8rem)] w-full flex-col gap-y-8 overflow-y-auto  p-7'
      >
        {!isMessageError && !isMessagePending && null}
        {MessageList.map((item, index) => (
          <div key={`chat-${index}`} className='flex gap-x-3'>
            <div
              className={`flex-center h-12 w-12 shrink-0 rounded-[4px] ${
                item.role === Role.User
                  ? 'border border-shadow-border bg-white'
                  : 'relative bg-primary-50'
              } `}
            >
              {item.role !== Role.User ? (
                <Image
                  alt='max'
                  src='/max.png'
                  width={30}
                  className='self-end'
                  height={40}
                />
              ) : (
                <p className='text-[30px]'>🦁</p>
              )}
            </div>
            <div className='flex flex-col gap-y-2'>
              <h1 className='base-semibold'>
                {item.role === Role.User ? 'Your' : 'Max'}
              </h1>
              <p className='base-regular whitespace-pre-line break-keep'>
                {item.content}
              </p>
            </div>
          </div>
        ))}
        {animatedText && (
          <div className='flex gap-x-3'>
            <div className='flex-center relative h-12 w-12 shrink-0  rounded-[4px] bg-primary-50'>
              <Image
                alt='max'
                src='/max.png'
                width={30}
                className='self-end'
                height={40}
              />
            </div>
            <div className='flex flex-col gap-y-2'>
              <h1 className='base-semibold'>Max</h1>
              <ChatTextStreamingEffect
                printIndexRef={printIndexRef}
                text={animatedText}
                speed={30}
                setAnimatedText={setAnimatedText}
                setMessageList={setMessageList}
              />
            </div>
          </div>
        )}
        {systemLoading && (
          <div className='flex gap-x-3'>
            <div className='flex-center relative h-12 w-12 shrink-0  rounded-[4px] bg-primary-50'>
              <Image
                alt='max'
                src='/max.png'
                width={30}
                className='self-end'
                height={40}
              />
            </div>
            <div className='flex flex-col gap-y-2'>
              <h1 className='base-semibold'>Max</h1>
              <MessageLoading />
            </div>
          </div>
        )}
      </section>

      {/* chat type field */}
      <section className='relative flex h-16 w-full shrink-0 justify-center px-8'>
        <div className='flex-center absolute bottom-7 left-10 h-6 w-6 rounded-full bg-primary-200'>
          <Image
            src='/robotoutline.png'
            alt='max-chat-engine'
            width={18}
            height={15}
          />
        </div>
        <Input
          className='h-12 pl-10'
          value={userMessage}
          disabled={systemLoading}
          onChange={onMessageChange}
          onKeyDown={onEnterKey}
        />
        {isTyping ? (
          <div
            className='flex-center absolute bottom-7 right-10 h-6 w-6 cursor-pointer rounded-lg bg-primary-200 transition-transform hover:-translate-y-1'
            onClick={onSendMessage}
          >
            <Image alt='chatsent' src='/telegram.svg' width={18} height={18} />
          </div>
        ) : (
          <Image
            alt='chatsent'
            className='absolute bottom-7 right-10'
            src='/telegram_fill.svg'
            width={23}
            height={24}
          />
        )}
      </section>
    </div>
  );
};

export default MessageList;
