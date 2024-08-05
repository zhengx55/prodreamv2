'use client';
import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useState } from 'react';

const ChatMessageList = dynamic(() => import('./ChatMessageList'));
const ChatFooter = dynamic(() => import('./ChatFooter'));

const ChatBar = () => {
  const [expanded, setExpanded] = useState(true);
  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const renderButton = useCallback(
    (
      alt: string,
      src: string,
      className: string,
      onClick: () => void,
      buttonClass?: string
    ) => (
      <Button
        role='button'
        variant={'icon'}
        onClick={onClick}
        className={cn(buttonClass, 'size-max p-2')}
      >
        <Icon
          alt={alt}
          src={src}
          width={24}
          height={24}
          className={className}
          priority
        />
      </Button>
    ),
    []
  );

  return (
    <div className='flex'>
      <div
        className={`transition-all duration-300 ease-in-out ${
          expanded
            ? 'w-[400px] rounded-bl-lg rounded-tl-lg'
            : 'w-0 rounded-bl-lg rounded-tl-lg'
        } flex flex-1 overflow-hidden bg-slate-100`}
      >
        {expanded && (
          <div className='flex flex-1 flex-col'>
            <div className='flex-between h-[63px] rounded-tl-lg border-b border-gray-200 bg-white px-4'>
              <div className='flex items-center gap-x-2'>
                <Image
                  src='/workbench/nav_chat.svg'
                  alt='agent'
                  width={24}
                  height={24}
                  className='size-6'
                />
                <h2 className='text-xl font-medium text-zinc-800'>Max</h2>
              </div>
              {renderButton(
                'collapse',
                '/workbench/collapse.svg',
                'size-5',
                toggleExpanded
              )}
            </div>
            <ChatMessageList />
            <ChatFooter />
          </div>
        )}
      </div>
      <div
        className={`flex h-full w-[60px] flex-col items-center ${
          expanded
            ? 'rounded-br-lg rounded-tr-lg'
            : 'rounded-bl-lg rounded-br-lg rounded-tl-lg rounded-tr-lg'
        } border-l border-gray-200 bg-white pt-6 transition-all duration-300 ease-in-out`}
      >
        {renderButton(
          'min_agent',
          `${expanded ? '/workbench/chat_trigger.svg' : '/workbench/chat_trigger_unselected.svg'}`,
          'size-6',
          toggleExpanded,
          `${!expanded ? '' : 'bg-slate-200'}`
        )}
        <p
          className={`${expanded ? 'text-indigo-500' : 'text-zinc-600'} small-regular text-center`}
        >
          Chat
        </p>
      </div>
    </div>
  );
};

export default ChatBar;
