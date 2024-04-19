import Spacer from '@/components/root/Spacer';
import { useChatBotSessions } from '@/query/query';
import { EditorDictType } from '@/types';
import { useChatbot } from '@/zustand/store';
import { m } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { memo } from 'react';
import SearchBar from './SearchBar';

type Props = { t: EditorDictType };
const ChatHistory = ({ t }: Props) => {
  const { id } = useParams();
  const closeHistory = useChatbot((state) => state.closeHistory);
  const { data } = useChatBotSessions({
    document_id: id as string,
    history_type: 'chat',
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
      </m.div>
    </m.section>
  );
};
export default memo(ChatHistory);
