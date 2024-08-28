import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { ICONS } from '@/constant/chat_agent_constant';
import { CHATAGENT_TYPE } from '@/constant/enum';
import { formatTimestamphh } from '@/lib/utils';
import { useDeleteSession, useGetSessionHistoryList } from '@/query/session';
import { useAgent } from '@/zustand/store';
import { AnimatePresence, motion } from 'framer-motion';
import { Layers, Loader2, Trash2, XCircle } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import ChatInputField from './ChatInputField';

type IconButtonProps = {
  alt: string;
  src: string;
  onClick?: () => void;
};

type HistoryListProps = {
  chatHistory: Array<any>;
  isPending: boolean;
  isDeleting: boolean;
  onDelete: (sessionId: string) => void;
};

type Props = {
  isChatPending: boolean;
  onSubmit: (agent: string, response?: string) => void;
};

const IconButton: React.FC<IconButtonProps> = memo(
  ({ alt, src, onClick = () => {} }) => (
    <Button
      onClick={onClick}
      variant='icon'
      className='size-max p-1'
      role='button'
    >
      <Icon
        alt={alt}
        src={src}
        width={20}
        height={20}
        priority
        className='size-5'
      />
    </Button>
  )
);

const HistoryList: React.FC<HistoryListProps> = memo(
  ({ chatHistory, isPending, isDeleting, onDelete }) => {
    if (isPending) {
      return (
        <div className='flex-center flex-1'>
          <Loader2 size={30} className='animate-spin text-indigo-500' />
        </div>
      );
    }

    return (
      <ul className='flex flex-1 flex-col gap-y-4 overflow-y-auto py-4'>
        {chatHistory?.map((item) => (
          <li
            key={item.session_id}
            className='cursor-pointer space-y-4 rounded p-4 hover:bg-slate-50'
          >
            <p className='text-base leading-7 text-zinc-600'>{item.title}</p>
            <div className='flex-between'>
              <p className='text-sm text-neutral-400'>
                {formatTimestamphh(item.updated_at)}
              </p>
              <Button
                variant={'icon'}
                className='p-0.5'
                disabled={isDeleting}
                onClick={() => onDelete(item.session_id)}
              >
                <Trash2 className='cursor-pointer text-[#57545E]' size={20} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
);

const ChatFooter: React.FC<Props> = ({ isChatPending, onSubmit }) => {
  const clearChatSession = useAgent((state) => state.clearSession);
  const { mutate: deleteSession, isPending: isDeleting } = useDeleteSession();
  const [showHistory, setShowHistory] = useState(false);
  const { data, isPending } = useGetSessionHistoryList(showHistory);

  const chatHistory = useMemo(
    () => data?.filter((item) => item.class === 'chat') || [],
    [data]
  );

  return (
    <footer className='relative w-[860px] space-y-2.5 self-center pt-4'>
      <AnimatePresence>
        {showHistory && (
          <motion.div
            className='absolute bottom-[52px] left-0 right-0 flex flex-col rounded-t-lg border-l border-r border-t border-gray-300 bg-white p-4'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '60vh' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className='flex-between'>
              <h3 className='text-xl font-medium text-zinc-700'>History</h3>
              <XCircle
                size={20}
                className='cursor-pointer text-stone-300'
                onClick={() => setShowHistory(false)}
              />
            </div>
            <HistoryList
              chatHistory={chatHistory}
              isPending={isPending}
              isDeleting={isDeleting}
              onDelete={deleteSession}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className='flex-between'>
        <Button
          disabled={isChatPending}
          role='button'
          className='px-2 text-sm'
          variant='outline'
          onClick={() => onSubmit(CHATAGENT_TYPE.INITIAL)}
        >
          <Layers size={20} className='text-indigo-500' />
          Common guidance
        </Button>
        <div className='flex gap-x-2'>
          {ICONS.common.map(({ alt, src }) => (
            <IconButton
              key={alt}
              alt={alt}
              src={src}
              onClick={
                alt === 'new'
                  ? () => clearChatSession('chat')
                  : () => setShowHistory(true)
              }
            />
          ))}
        </div>
      </div>
      <ChatInputField
        showHistory={showHistory}
        isChatPending={isChatPending}
        onSubmit={onSubmit}
      />
    </footer>
  );
};

export default memo(ChatFooter);
