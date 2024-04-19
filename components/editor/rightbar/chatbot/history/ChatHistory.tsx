import Spacer from '@/components/root/Spacer';
import { useChatBotSessions } from '@/query/query';
import { EditorDictType } from '@/types';
import { useChatbot } from '@/zustand/store';
import { m } from 'framer-motion';
import { Loader2, XCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { memo, useState } from 'react';
import SearchBar from './SearchBar';
import SessionItem from './SessionItem';

type Props = { t: EditorDictType };
const ChatHistory = ({ t }: Props) => {
  const { id } = useParams();
  const [historyType, setHistoryType] = useState<'chat' | 'research'>('chat');
  const closeHistory = useChatbot((state) => state.closeHistory);
  const {
    data: historyList,
    isPending,
    isError,
  } = useChatBotSessions({
    document_id: id as string,
    history_type: historyType,
  });

  return (
    <m.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className='absolute inset-0 z-40 bg-neutral-700/20'
    >
      <m.div
        initial={{
          height: 0,
        }}
        animate={{
          height: '85%',
        }}
        exit={{
          height: 0,
        }}
        className='absolute bottom-0 left-0 right-0 z-[99] flex flex-col rounded-t-lg border border-gray-200 bg-white p-4'
      >
        <div className='flex-between'>
          <h2 className='base-medium text-zinc-700'>Conversation History</h2>
          <XCircle
            onClick={closeHistory}
            className='cursor-pointer text-stone-300'
          />
        </div>
        <Spacer y='32' />
        <SearchBar t={t} />
        <Spacer y='16' />
        <div className='flex gap-x-4'>
          <button
            role='tab'
            onClick={() => setHistoryType('research')}
            className={`${
              historyType === 'research'
                ? 'border-violet-500 text-zinc-700'
                : 'border-transparent text-neutral-400'
            } small-regular border-b-2`}
          >
            Chat
          </button>
          <button
            role='tab'
            onClick={() => setHistoryType('chat')}
            className={`${
              historyType === 'chat'
                ? 'border-violet-500 text-zinc-700'
                : 'border-transparent text-neutral-400'
            } small-regular border-b-2`}
          >
            File
          </button>
        </div>
        <Spacer y='16' />
        {isError ? null : isPending ? (
          <div className='flex-center flex-1'>
            <Loader2 className='animate-spin text-violet-500' />
          </div>
        ) : (
          <div className='flex w-full flex-col gap-y-2 overflow-y-auto'>
            {historyList.map((session, index) => {
              return (
                <SessionItem key={`session-hitory-${index}`} item={session} />
              );
            })}
          </div>
        )}
      </m.div>
    </m.section>
  );
};
export default memo(ChatHistory);
