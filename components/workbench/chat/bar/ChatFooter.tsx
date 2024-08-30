import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { ActionButtonType, ICONS } from '@/constant/chat_agent_constant';
import { CHATAGENT_TYPE } from '@/constant/enum';
import { formatTimestamphh } from '@/lib/utils';
import { useAgentChat } from '@/query/chat_agent';
import { useDeleteSession, useGetSessionHistoryList } from '@/query/session';
import { useAgent } from '@/zustand/store';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Trash2, XCircle } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import useAgentType from '../../hooks/getChatAgentType';
import ChatInputField from './ChatInputField';

type HistoryListProps = {
  chatHistory: Array<any>;
  isPending: boolean;
  isDeleting: boolean;
  onDelete: (sessionId: string) => void;
};

const ChatFooter = () => {
  const { storeType } = useAgentType();
  const clearChatSession = useAgent((state) => state.clearSession);
  const { mutate, isPending } = useAgentChat(storeType);
  const actionMap: { [key: string]: CHATAGENT_TYPE } = {
    'Guided Input': CHATAGENT_TYPE.BSBASE,
    'In-depth': CHATAGENT_TYPE.BSADVANCE,
    'Generate Outline': CHATAGENT_TYPE.OLGEN,
    'Polish Outline': CHATAGENT_TYPE.PLPOL,
    'Generate Draft': CHATAGENT_TYPE.DR,
    'Proofread Draft': CHATAGENT_TYPE.PF,
  };

  const handleActionClick = (text: string) => {
    const agentType = actionMap[text];
    if (agentType) {
      mutate({
        response: null,
        agent: agentType,
        session_id: null,
      });
    }
  };

  const renderActionButtons = () => {
    return (ICONS[storeType] as ActionButtonType[])?.map(
      ({ alt, src, text }) => (
        <ActionButton
          disabled={isPending}
          key={alt}
          onClick={() => handleActionClick(text)}
          alt={alt}
          src={src}
          text={text}
        />
      )
    );
  };

  const { mutate: deleteSession, isPending: isDeleting } = useDeleteSession();
  const [showHistory, setShowHistory] = useState(false);
  const { data, isPending: isHistoryPending } =
    useGetSessionHistoryList(showHistory);

  const chatHistory = useMemo(
    () =>
      data?.filter(
        (item) =>
          item.class === (storeType === 'brainstorming' ? 'bs' : storeType)
      ) || [],
    [data, storeType]
  );

  return (
    <footer className='relative space-y-2 p-4'>
      <AnimatePresence>
        {showHistory && (
          <motion.div
            className='absolute bottom-[68px] left-4 right-4 flex flex-col rounded-t-lg border-l border-r border-t border-gray-300 bg-white p-4'
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
              isPending={isHistoryPending}
              isDeleting={isDeleting}
              onDelete={deleteSession}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-1'>{renderActionButtons()}</div>
        <div className='flex gap-x-2'>
          {ICONS.common.map(({ alt, src }) => (
            <IconButton
              key={alt}
              alt={alt}
              src={src}
              onClick={
                alt === 'new'
                  ? () => clearChatSession(storeType)
                  : () => setShowHistory(true)
              }
            />
          ))}
        </div>
      </div>
      <ChatInputField />
    </footer>
  );
};

type ActionButtonProps = {
  alt: string;
  src: string;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const ActionButton = ({
  alt,
  src,
  text,
  onClick = () => {},
  disabled = false,
}: ActionButtonProps) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    role='button'
    className='px-2 text-sm'
    variant='outline'
  >
    <Icon
      alt={alt}
      src={src}
      width={20}
      height={20}
      priority
      className='size-5'
    />
    {text}
  </Button>
);

type IconButtonProps = {
  alt: string;
  src: string;
  onClick?: () => void;
};

const IconButton = ({ alt, src, onClick = () => {} }: IconButtonProps) => (
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
      <ul className='flex flex-1 flex-col gap-y-2 overflow-y-auto py-4'>
        {chatHistory?.map((item) => (
          <li
            key={item.session_id}
            className='cursor-pointer space-y-2 rounded p-2 hover:bg-slate-50'
          >
            <p className='text-sm leading-7 text-zinc-600'>{item.title}</p>
            <div className='flex-between'>
              <p className='text-xs text-neutral-400'>
                {formatTimestamphh(item.updated_at)}
              </p>
              <Button
                variant={'icon'}
                className='p-0.5'
                disabled={isDeleting}
                onClick={() => onDelete(item.session_id)}
              >
                <Trash2 className='cursor-pointer text-[#57545E]' size={16} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
);

export default memo(ChatFooter);
