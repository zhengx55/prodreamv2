import { Skeleton } from '@/components/ui/skeleton';
import { useUserSession } from '@/query/session/query';
import Image from 'next/image';
import { memo } from 'react';

type UserMessageProps = {};
type AgentMessageProps = {};

const User = ({}: UserMessageProps) => {
  const { data, status: userStatus } = useUserSession();
  return (
    <div className='flex gap-x-2 self-end'>
      <div className='h-max space-y-4 rounded-lg bg-indigo-500 px-4 py-2'>
        <p className='base-regular text-white'>
          Lorem ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Dolore, eveniet quidem? Quam ducimus a, quibusdam dicta sint debitis
          impedit officiis doloribus incidunt iste provident ratione veniam
          quasi commodi, iusto esse!
        </p>
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

const Agent = ({}: AgentMessageProps) => {
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
        <p className='base-regular text-zinc-800'>Lorem ipsum ?</p>
      </div>
    </div>
  );
};

const Message = {
  User: memo(User),
  Agent: memo(Agent),
};

export default Message;
