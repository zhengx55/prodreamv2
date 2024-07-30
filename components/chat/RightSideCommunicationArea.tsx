'use client';
import { useState, useEffect } from 'react';
import { useOnboarding } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import Icon from '@/components/root/Icon';
import RobotMessage from './widgets/RobotMessage';
import UserMessage from './widgets/UserMessage';
import StepCard from './widgets/StepCard';
import QuestionBtn from './widgets/QuestionBtn';
import QuestionCheckBox from './widgets/QuestionCheckBox';
import QuestionRadioGroup from './widgets/QuestionRadioGroup';
import EmphasizeText from './widgets/EmphasizeText';
import ChatInput from './widgets/ChatInput';
import FeatureTag from './widgets/FeatureTag';
import { SendChatAgent } from '@/query/api';

const RightSidebar = () => {
  const { selectedNavItem } = useOnboarding((state) => ({
    selectedNavItem: state.selectedNavItem,
  }));
  const [messages, setMessages] = useState<string[]>([]);

  const sendChatAgentMutation = useMutation({
    mutationFn: SendChatAgent,
    onMutate: () => {
      // 可以在这里设置一些初始状态
      setMessages([]);
    },
    onSuccess: async (streamCallback) => {
      await streamCallback((chunk) => {
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            setMessages((prev) => [...prev, data]);
          } else if (line.startsWith('event: ')) {
            const event = line.slice(7);
            // 处理不同的事件类型
            switch (event) {
              case 'session_id':
                // 处理 session_id
                break;
              case 'data_end':
                // 处理数据结束
                break;
              case 'option_list_start':
                // 处理选项列表开始
                break;
              case 'option':
                // 处理选项
                break;
              case 'option_list_end':
                // 处理选项列表结束
                break;
              case 'new_message':
                // 处理新消息
                break;
              // ... 其他事件类型
            }
          }
        }
      });
    },
    onError: (error) => {
      console.error('Error:', error);
      // 处理错误
    },
  });

  useEffect(() => {
    sendChatAgentMutation.mutate({
      session_id: null,
      response: null,
      agent: 'Max',
    });
  }, []);

  // Example Data
  const example_step_message = () => {
    return (
      <>
        <p>
          I&apos;m here to help you effortlessly craft your application essays
          with three simple steps, all backed by my professional expertise.
        </p>
        <StepCard
          iconSrc='/workbench/nav_brainstorming.svg'
          title='Brainstorming'
          titleColor='#1a1a1a'
          step='Step 1'
          description='Uncover your most compelling stories, experiences, and strengths. This generates ideas and key themes to make your personal statement stand out.'
          stepBgColor='#FFFAF2'
          stepTextColor='#FF9500'
        />
        <StepCard
          iconSrc='/workbench/nav_outline.svg'
          title='Outline'
          titleColor='#1a1a1a'
          step='Step 2'
          description='Uncover your most compelling stories, experiences, and strengths. This generates ideas and key themes to make your personal statement stand out.'
          stepBgColor='#F2F4FF'
          stepTextColor='#5C73E5'
        />
        <StepCard
          iconSrc='/workbench/nav_draftproofread.svg'
          title='Draft&proofread'
          titleColor='#1a1a1a'
          step='Step 3'
          description='Uncover your most compelling stories, experiences, and strengths. This generates ideas and key themes to make your personal statement stand out.'
          stepBgColor='#F2FFF3'
          stepTextColor='#52CC5C'
        />
        <p>
          With my guidance, these three steps will make the essay-writing
          process manageable and empowering, paving the way for your academic
          success.
        </p>
        <p>
          Also,You can also use the navigation above to quickly start each
          stage.
        </p>
      </>
    );
  };

  const ExampleCheckbox = () => {
    const options = [
      { id: '1', label: 'Common Application essay' },
      { id: '2', label: 'UC Personal Insight Questions' },
      { id: '3', label: 'Another type of application' },
    ];

    const handleConfirm = (selectedOptions: string[]) => {
      console.log('Checkbox Selected options:', selectedOptions);
    };

    return <QuestionCheckBox options={options} onConfirm={handleConfirm} />;
  };

  const ExampleRadioGroup = () => {
    const options = [
      { id: '1', label: 'Start from scratch, begin with brainstorming' },
      { id: '2', label: 'Start from outline' },
      { id: '3', label: 'Start from draft&proofread' },
    ];

    const handleConfirm = (selectedOption: string) => {
      console.log('Radio Selected option:', selectedOption);
    };

    return <QuestionRadioGroup options={options} onConfirm={handleConfirm} />;
  };

  const ExampleEmphasizeText = () => {
    return (
      <>
        <div>
          <p>
            This is normal text.{' '}
            <EmphasizeText>This is emphasized text.</EmphasizeText> And this is
            normal again.
          </p>
          <div className='mt-2 flex items-center justify-end space-x-2'>
            <QuestionBtn outline>No</QuestionBtn>
            <QuestionBtn>Yes</QuestionBtn>
          </div>
        </div>
      </>
    );
  };

  const ChatComponent = () => {
    const handleSend = (message: string) => {
      console.log('Sending message:', message);

      sendChatAgentMutation.mutate({
        session_id: null,
        response: null,
        agent: 'Max',
      });
    };

    // 假设这是你的标签列表
    const tags = [
      {
        icon: '/workbench/tag_guidance.svg',
        text: 'Common guidance',
        onClick: () => {
          console.log('Common guidance clicked');
        },
      },
      // 添加更多标签...
    ];

    return (
      <div className='flex w-full flex-col space-y-4'>
        <div className='flex flex-wrap gap-2'>
          {tags.map((tag, index) => (
            <FeatureTag
              key={index}
              icon={tag.icon}
              text={tag.text}
              onClick={tag.onClick}
            />
          ))}
        </div>
        <ChatInput onSend={handleSend} />
      </div>
    );
  };

  const toggleCommunicationArea = () => {
    console.log('clicked');
  };

  return (
    <div
      className={`scrollbar-hide relative mx-2 mb-2 flex  h-[calc(100vh-106px)] flex-col overflow-hidden overflow-y-auto rounded-lg border border-white bg-white ${selectedNavItem === 'Chat' ? 'w-full' : 'w-[600px]'}`}
    >
      <div className='sticky left-0 right-0 top-0 z-10 flex items-center justify-end border-b border-[#E5E5E5] bg-white bg-opacity-60 px-2 py-2 backdrop-blur-lg backdrop-filter'>
        <div onClick={toggleCommunicationArea}>
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
          // backgroundColor: '#F2F4FF',
        }}
      >
        {messages.map((message, index) => {
          return <div key={index}>{message}</div>;
        })}
        {/* <RobotMessage
          avatarProps={{
            src: '/editor/chatbot/max_chat_avatar.png',
          }}
          content="Hello, I'm Max, an admissions advisor and entrepreneur, and a graduate of UCLA and Harvard University. I am dedicated to helping students uncover their unique strengths and achieve success in their academic and application journeys, particularly for undergraduate admissions. With my patient and professional guidance, I aim to provide comprehensive support in preparing application materials and planning for the future. Together, we can ensure a bright and successful path ahead."
        />

        <UserMessage
          avatarProps={{
            src: '/path/to/user/avatar.png',
          }}
          content='This is a user message.'
        />

        <RobotMessage
          avatarProps={{
            src: '/editor/chatbot/max_chat_avatar.png',
          }}
          content={example_step_message()}
        />

        <RobotMessage
          avatarProps={{
            src: '/editor/chatbot/max_chat_avatar.png',
          }}
          content={<ExampleCheckbox />}
        />

        <RobotMessage
          avatarProps={{
            src: '/editor/chatbot/max_chat_avatar.png',
          }}
          content={<ExampleRadioGroup />}
        />

        <UserMessage
          avatarProps={{
            src: '/path/to/user/avatar.png',
          }}
          content='Start from scratch, begin with brainstorming'
        />

        <RobotMessage
          avatarProps={{
            src: '/editor/chatbot/max_chat_avatar.png',
          }}
          content={<ExampleEmphasizeText />}
        /> */}
      </div>

      <div className='sticky bottom-0 left-0 right-0 z-10 flex flex-col space-y-4 bg-white px-2 py-2'>
        <div
          className='mx-auto flex w-full items-center'
          style={{
            width: `${selectedNavItem === 'Chat' ? '800px' : '420px'}`,
            // backgroundColor: '#F2F4FF',
          }}
        >
          <ChatComponent />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
