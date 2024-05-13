import Icon from '@/components/root/Icon';
import { useUserInfo } from '@/zustand/store';
import { m } from 'framer-motion';
import { FileText, Loader2 } from 'lucide-react';
import { memo } from 'react';
import Markdown from 'react-markdown';

type MessageProps = { text: string; filename?: string };
export const MineMessage = memo(({ text, filename }: MessageProps) => {
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
          className='size-7 rounded-full'
          src={userInfo.avatar}
          width={30}
          height={30}
        />
        <p className='small-regular'>{userInfo.first_name}</p>
      </div>
      <div className='min-h-9 p-2'>
        <p className='small-regular text-zinc-600'>{text}</p>
      </div>
      {filename && (
        <div className='flex-between rounded border border-gray-200 p-2'>
          <div className='flex items-center gap-x-2'>
            <span className='flex-center size-8 rounded bg-violet-500'>
              <FileText size={22} className='text-white' />
            </span>
            <div className='flex max-w-14 flex-col'>
              <h3 className='small-regular line-clamp-1 text-zinc-600'>
                {filename}
              </h3>
              <p className='subtle-regular text-zinc-500'>PDF</p>
            </div>
          </div>
        </div>
      )}
    </m.div>
  );
});

export const SystemMessage = memo(({ text }: MessageProps) => {
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
          width={28}
          height={28}
          className='size-7'
        />
        <p className='small-regular'>Jessica</p>
      </div>

      <div className='min-h-9 p-2'>
        {!text ? (
          <Loader2 className='animate-spin text-zinc-600' size={18} />
        ) : (
          <Markdown className='small-regular text-zinc-600'>{text}</Markdown>
        )}
      </div>
    </m.div>
  );
});

SystemMessage.displayName = 'SystemMessage';
MineMessage.displayName = 'MineMessage';
