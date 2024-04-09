import Icon from '@/components/root/Icon';
import { ChatbotEngine } from '@/constant';
import { useUserInfo } from '@/zustand/store';
import { m } from 'framer-motion';
import { memo } from 'react';
type MessageProps = { text: string; engine: number };
export const MineMessage = memo(({ text, engine }: MessageProps) => {
  const userInfo = useUserInfo((state) => state.user);
  return (
    <m.div
      initial={{
        y: -10,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className='flex flex-col gap-y-2'
    >
      <div className='flex items-center gap-x-2'>
        <Icon
          alt=''
          className='rounded-full'
          src={userInfo.avatar}
          width={16}
          height={16}
        />
        <p className='small-regular'>{userInfo.first_name}</p>
      </div>
      <div className='rounded bg-stone-50 p-2'>
        <p className='small-regular text-zinc-600'>{text}</p>
      </div>
    </m.div>
  );
});

export const SystemMessage = memo(({ text, engine }: MessageProps) => {
  return (
    <m.div
      initial={{
        y: -10,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className='flex flex-col gap-y-2'
    >
      <div className='flex items-center gap-x-2'>
        <Icon
          alt=''
          src={'/editor/chatbot/trigger.svg'}
          width={16}
          height={16}
        />
        <p className='small-regular'>
          Writting Cat | {ChatbotEngine[engine].title}
        </p>
      </div>
      <div className='rounded bg-stone-50 p-2'>
        <p className='small-regular text-zinc-600'>{text}</p>
      </div>
    </m.div>
  );
});

SystemMessage.displayName = 'SystemMessage';
MineMessage.displayName = 'MineMessage';
