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
    addMessage,
    updateLastRobotMessage,
    clearMessages
  } = useChatAgent((state) => ({
    messages: state.messages,
    currentAgent: state.currentAgent,
    addMessage: state.addMessage,
    updateLastRobotMessage: state.updateLastRobotMessage,
    clearMessages: state.clearMessages,
  }));

  const handleSessionId = (data: string) => {
    const sessionId = data.trim();
    console.log('Session ID:', sessionId); // Log the session ID
    addMessage({
      sessionId,
      type: 'robot',
      contents: [],
      avatarSrc: '/editor/chatbot/max_chat_avatar.png',
    });
  };

  const handleData = (data: string, currentTextContent: string) => {
    const trimmedData = data.trim(); // Trim whitespace
    console.log('Data:', trimmedData); // Log the data content

    currentTextContent += trimmedData; // Append data to currentTextContent

    return currentTextContent;
  };

  const handleDataEnd = (currentTextContent: string) => {
    if (currentTextContent) {
      console.log('Text content:', currentTextContent); // Log the text content
      addMessage({
        sessionId: '',
        type: 'robot',
        contents: [{ type: 'text', content: currentTextContent }],
        avatarSrc: '/editor/chatbot/max_chat_avatar.png',
      });
      currentTextContent = '';
    }
    return currentTextContent;
  };

  const handleHtml = (data: string) => {
    const htmlContent = JSON.parse(data.trim()); // Parse JSON content
    console.log('HTML content:', htmlContent); // Log the HTML content
    addMessage({
      sessionId: '',
      type: 'robot',
      contents: [{ type: 'html', content: htmlContent }],
      avatarSrc: '/editor/chatbot/max_chat_avatar.png',
    });
  };

  const handleOptionListStart = (data: string) => {
    const currentSelectionType = data.trim() as 'single_selection' | 'multi_selection';
    console.log('Option list start:', currentSelectionType); // Log the option list start
    return currentSelectionType;
  };

  const handleOption = (data: string) => {
    const currentOptionAction = data.trim();
    console.log('Option action:', currentOptionAction); // Log the option action
    return currentOptionAction;
  };

  const handleOptionListEnd = (currentOptions: any[], currentSelectionType: 'single_selection' | 'multi_selection' | null) => {
    console.log('Option list end. Options:', currentOptions); // Log the option list end and all options
    addMessage({
      sessionId: '',
      type: 'robot',
      contents: [{ type: 'options', options: currentOptions, selectionType: currentSelectionType }],
      avatarSrc: '/editor/chatbot/max_chat_avatar.png',
    });
    return { currentOptions: [], currentSelectionType: null };
  };

  const sendChatAgentMutation = useMutation({
    mutationFn: SendChatAgent,
    onMutate: () => {
      clearMessages();
    },
    onSuccess: async (stream) => {
      let sessionId = '';
      let currentTextContent = '';
      let currentOptions: { id: string; label: string; action: string }[] = [];
      let currentSelectionType: 'single_selection' | 'multi_selection' | null = null;
      let isCollectingOption = false;
      let currentOptionAction = '';

      const reader = stream.pipeThrough(new TextDecoderStream()).getReader();

      try {
        let eventType = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const lines = value.split('\n');
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue; // Ignore empty lines

            if (line.startsWith('event:')) {
              eventType = line.split(':')[1].trim();
              if (eventType === 'new_message') {
                addMessage({
                  sessionId,
                  type: 'robot',
                  contents: [],
                  avatarSrc: '/editor/chatbot/max_chat_avatar.png',
                });
              }
            } else if (line.startsWith('data:')) {
              const data = line.slice('data:'.length).trim();
              if (eventType === 'session_id') {
                handleSessionId(data);
              } else if (eventType === 'data') {
                currentTextContent = handleData(data, currentTextContent);
              } else if (eventType === 'data_end') {
                currentTextContent = handleDataEnd(currentTextContent);
              } else if (eventType === 'html') {
                handleHtml(data);
              } else if (eventType === 'option_list_start') {
                currentSelectionType = handleOptionListStart(data);
              } else if (eventType === 'option') {
                currentOptionAction = handleOption(data);
                isCollectingOption = true;
              } else if (eventType === 'option_list_end') {
                ({ currentOptions, currentSelectionType } = handleOptionListEnd(currentOptions, currentSelectionType));
              }
            } else if (isCollectingOption && eventType === 'data') {
              // Collect options data
              currentOptions.push({
                id: `option-${currentOptions.length}`,
                label: line.slice('data:'.length).trim(),
                action: currentOptionAction
              });
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
  }, [currentAgent, sendChatAgentMutation]);

  const handleSend = (message: string) => {
    addMessage({
      sessionId: '',
      type: 'user',
      contents: [{ type: 'text', content: message }],
      avatarSrc: '/path/to/user/avatar.png',
    });

    sendChatAgentMutation.mutate({
      session_id: messages[messages.length - 1].sessionId,
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
              session_id: messages[messages.length - 1].sessionId,
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
              session_id: messages[messages.length - 1].sessionId,
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
      <div className='sticky left-0 right-0 top-0 z-10 flex items-center justify-end border-b border-[#E5E5E5] bg-white bg-opacity-60 px-2 py-2 backdrop-blur-lg backdrop-filter'>
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