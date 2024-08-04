import { Skeleton } from '@/components/ui/skeleton';
import { useUserSession } from '@/query/session/query';
import Image from 'next/image';
import { memo } from 'react';
import Markdown from 'react-markdown';

type UserMessageProps = {
  text: string;
};
type AgentMessageProps = {
  text: string;
  options_type?: 'single' | 'multi';
  options?: { label: string; id: string }[];
};

const User = ({ text }: UserMessageProps) => {
  const { data, status: userStatus } = useUserSession();
  return (
    <div className='flex gap-x-2 self-end'>
      <div className='h-max space-y-4 rounded-lg bg-indigo-500 px-4 py-2'>
        <p className='base-regular text-white'>{text}</p>
      </div>
      {userStatus !== 'success' ? (
        <Skeleton className='size-10 shrink-0 rounded-full' />
      ) : (
        <Image
          src={data.avatar}
          alt='Agent'
          width={40}
          height={40}
          priority
          className='size-10 rounded-full'
        />
      )}
    </div>
  );
};

const Agent = ({ text, options, options_type }: AgentMessageProps) => {
  return (
    <div className='flex gap-x-2'>
      <Image
        src='/chat_agent/common/max.png'
        alt='Agent'
        width={40}
        height={40}
        className='size-10'
      />
      <div className='h-max space-y-4 rounded-lg bg-white px-4 py-2'>
        <Markdown className='prose prose-base prose-p:my-1 prose-p:text-zinc-800'>
          {text}
        </Markdown>
        <ul className='space-y-2.5'>
          {options && options?.length > 0
            ? options.map((item) => {
                return (
                  <li
                    key={item.id}
                    className='flex-center gap-x-2 rounded-[10px] border border-transparent px-4 py-2.5'
                  >
                    <span className='small-regular text-zinc-600'>
                      {item.label}
                    </span>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
};

const Message = {
  User: memo(User),
  Agent: memo(Agent),
};

export default Message;
