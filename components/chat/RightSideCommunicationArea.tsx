'use client';
import { useEffect, ReactNode } from 'react';
import { useOnboarding, useChatAgent } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import Icon from '@/components/root/Icon';
import RobotMessage from './widgets/RobotMessage';
import UserMessage from './widgets/UserMessage';
import QuestionCheckBox from './widgets/QuestionCheckBox';
import QuestionRadioGroup from './widgets/QuestionRadioGroup';
import ChatInput from './widgets/ChatInput';
import { SendChatAgent } from '@/query/api';

const RightSidebar = () => {
  const { selectedNavItem } = useOnboarding((state) => ({
    selectedNavItem: state.selectedNavItem,
  }));
  const {
    messages,
    currentAgent,
    currentSessionId,
    setCurrentSessionId,
    addMessage,
    updateLastRobotMessage,
    clearMessages
  } = useChatAgent((state) => ({
    messages: state.messages,
    currentAgent: state.currentAgent,
    currentSessionId: state.currentSessionId,
    setCurrentSessionId: state.setCurrentSessionId,
    addMessage: state.addMessage,
    updateLastRobotMessage: state.updateLastRobotMessage,
    clearMessages: state.clearMessages,
  }));

  const handleSessionId = (data: string) => {
    const sessionId = data.trim();
    console.log('Session ID:', sessionId); // Log the session ID
    setCurrentSessionId(sessionId);
  };

  const handleData = (data: string, currentTextContent: string) => {
    const trimmedData = data.trim(); // Trim whitespace
    console.log('Data:', trimmedData); // Log the data content

    currentTextContent += trimmedData; // Append data to currentTextContent

    updateLastRobotMessage({ type: 'text', content: currentTextContent });

    return currentTextContent;
  };

  const handleDataEnd = (currentTextContent: string) => {
    console.log('handleDataEnd', currentTextContent);
    updateLastRobotMessage({ type: 'text', content: currentTextContent });
    currentTextContent = '';
    return currentTextContent;
  };

  const handleHtml = (data: string) => {
    const htmlContent = JSON.parse(data.trim()); // Parse JSON content
    console.log('HTML content:', htmlContent); // Log the HTML content

    updateLastRobotMessage({ type: 'html', content: htmlContent });
  };

  const handleOptionListStart = (data: string) => {
    const currentSelectionType = data.trim() as 'single_selection' | 'multi_selection';
    console.log('Option list start:', currentSelectionType); // Log the option list start
    return currentSelectionType;
  };

  const handleOption = (data: string, currentOptions: any[]) => {
    const optionData = JSON.parse(data.trim());
    currentOptions.push(optionData);
    console.log('Option:', optionData); // Log the option
    return currentOptions;
  };

  const handleOptionListEnd = (currentOptions: any[], currentSelectionType: 'single_selection' | 'multi_selection' | null) => {
    console.log('Option list end. Options:', currentOptions); // Log the option list end and all options
    updateLastRobotMessage({ type: 'options', content: '', options: currentOptions, selectionType: currentSelectionType });
    return { currentOptions: [], currentSelectionType: null };
  };

  const sendChatAgentMutation = useMutation({
    mutationFn: SendChatAgent,
    onMutate: () => {
      clearMessages();
    },
    onSuccess: async (stream) => {
      let currentTextContent = '';
      let currentOptions: { id: string; label: string; action: string }[] = [];
      let currentSelectionType: 'single_selection' | 'multi_selection' | null = null;
      let isCollectingOption = false;

      const reader = stream.pipeThrough(new TextDecoderStream()).getReader();

      try {
        let eventType = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          let lines = value.split('\n');

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (!line) continue; // Ignore empty lines

            if (line.startsWith('event:')) {
              eventType = line.replace('event: ', '').trim();
            } else if (line.startsWith('data:')) {
              const data = line.replace('data: ', '').trim();

              switch (eventType) {
                case 'session_id':
                  handleSessionId(data);
                  break;
                case 'data':
                  currentTextContent = handleData(data, currentTextContent);
                  break;
                case 'html':
                  handleHtml(data);
                  break;
                case 'option_list_start':
                  currentSelectionType = handleOptionListStart(data);
                  isCollectingOption = true;
                  break;
                case 'option':
                  currentOptions = handleOption(data, currentOptions);
                  break;
                case 'option_list_end':
                  ({ currentOptions, currentSelectionType } = handleOptionListEnd(currentOptions, currentSelectionType));
                  isCollectingOption = false;
                  break;
                case 'data_end':
                  currentTextContent = handleDataEnd(currentTextContent);
                  break;
                case 'new_message':
                  addMessage({
                    sessionId: currentSessionId,
                    type: 'robot',
                    contents: [],
                    avatarSrc: '/editor/chatbot/max_chat_avatar.png',
                  });
                  break;
                case 'session_end':
                  // Handle session end if needed
                  break;
                default:
                  break;
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    },
  });

  useEffect(() => {
    sendChatAgentMutation.mutate({
      session_id: null,
      response: null,
      agent: currentAgent,
    });
  }, []);

  const handleSend = (message: string) => {
    addMessage({
      sessionId: currentSessionId,
      type: 'user',
      contents: [{ type: 'text', content: message }],
      avatarSrc: '/path/to/user/avatar.png',
    });

    sendChatAgentMutation.mutate({
      session_id: currentSessionId,
      response: message,
      agent: currentAgent,
    });
  };

  const renderTextContent = (content: any, contentIndex: number) => {
    return <p key={contentIndex}>{content.content}</p>;
  };

  const renderHtmlContent = (content: any, contentIndex: number) => {
    return <div key={contentIndex} dangerouslySetInnerHTML={{ __html: content.content }} />;
  };

  const renderOptionsContent = (content: any, contentIndex: number) => {
    if (content.selectionType === 'single_selection') {
      return (
        <QuestionRadioGroup
          key={contentIndex}
          options={content.options}
          onConfirm={(selectedOption) => {
            const selectedOptionObj = content.options.find((opt: any) => opt.id === selectedOption);
            sendChatAgentMutation.mutate({
              session_id: currentSessionId,
              response: selectedOptionObj?.label,
              agent: currentAgent,
            });
          }}
        />
      );
    } else if (content.selectionType === 'multi_selection') {
      return (
        <QuestionCheckBox
          key={contentIndex}
          options={content.options}
          onConfirm={(selectedOptions) => {
            const selectedOptionLabels = selectedOptions.map((option: any) => option.label);
            sendChatAgentMutation.mutate({
              session_id: currentSessionId,
              response: selectedOptionLabels.join(','),
              agent: currentAgent,
            });
          }}
        />
      );
    }
    return null;
  };

  const renderRobotMessageContent = (contents: any[]): ReactNode => {
    return (
      <>
        {contents.map((content, contentIndex) => {
          if (content.type === 'text') {
            return renderTextContent(content, contentIndex);
          } else if (content.type === 'html') {
            return renderHtmlContent(content, contentIndex);
          } else if (content.type === 'options') {
            return renderOptionsContent(content, contentIndex);
          }
          return null;
        })}
      </>
    );
  };

  return (
    <div className={`scrollbar-hide relative mx-2 mb-2 flex  h-[calc(100vh-106px)] flex-col overflow-hidden overflow-y-auto rounded-lg border border-white bg-white ${selectedNavItem === 'Chat' ? 'w-full' : 'w-[600px]'}`}>
      <div className='sticky left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-[#E5E5E5] bg-white bg-opacity-60 px-4 py-4 backdrop-blur-lg backdrop-filter'>
        <div className='flex items-center gap-2'>
          <Icon
            alt=''
            src='/workbench/nav_chat.svg'
            width={20}
            height={20}
            className='size-[20px] cursor-pointer'
          />
          <span>{currentAgent}</span>
        </div>

        <div>
          <Icon
            alt=''
            src='/editor/rightbar/layout-sidebar-ihset-reverse.svg'
            width={20}
            height={20}
            className='size-[20px] cursor-pointer'
          />
        </div>
      </div>
      <div
        className='mx-auto mb-4 h-full'
        style={{
          width: `${selectedNavItem === 'Chat' ? '800px' : '420px'}`,
        }}
      >
        {messages.map((message: any, index: number) => {
          if (message.type === 'robot') {
            return (
              <RobotMessage
                key={index}
                avatarProps={{ src: message.avatarSrc }}
                content={renderRobotMessageContent(message.contents)}
              />
            );
          } else {
            return (
              <UserMessage
                key={index}
                avatarProps={{ src: message.avatarSrc }}
                content={message.contents[0].content}
              />
            );
          }
        })}
      </div>

      <div className='fixed bottom-0 left-0 right-0 z-10 flex flex-col space-y-4 bg-white px-2 py-2'>
        <div
          className='mx-auto flex w-full items-center'
          style={{
            width: `${selectedNavItem === 'Chat' ? '800px' : '420px'}`,
          }}
        >
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;