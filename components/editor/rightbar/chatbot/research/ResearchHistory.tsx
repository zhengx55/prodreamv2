import Spacer from '@/components/root/Spacer';
import { useChatBotSessions } from '@/query/query';
import { EditorDictType } from '@/types';
import { m } from 'framer-motion';
import { Loader2, XCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { memo } from 'react';
import ResearchHistoryItem from './ResearchHistoryItem';

type Props = { t: EditorDictType; closeHistory: () => void };
const ResearchHistory = ({ t, closeHistory }: Props) => {
  const { id } = useParams();
  const {
    data: researchHistory,
    isPending,
    isError,
  } = useChatBotSessions({
    document_id: id as string,
    history_type: 'research',
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
          <h2 className='base-medium text-zinc-700'>Search History</h2>
          <XCircle
            size={20}
            onClick={closeHistory}
            className='cursor-pointer text-stone-300'
          />
        </div>
        <Spacer y='32' />
        {isError ? null : isPending ? (
          <div className='flex-center flex-1'>
            <Loader2 className='animate-spin text-violet-500' />
          </div>
        ) : (
          <div className='flex w-full flex-col gap-y-2 overflow-y-auto'>
            {researchHistory.map((session, index) => {
              return (
                <ResearchHistoryItem
                  t={t}
                  key={`session-hitory-${index}`}
                  item={session}
                />
              );
            })}
          </div>
        )}
      </m.div>
    </m.section>
  );
};
export default memo(ResearchHistory);
