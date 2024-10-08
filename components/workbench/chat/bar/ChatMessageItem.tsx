import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { CHATAGENT_TYPE } from '@/constant/enum';
import { cn } from '@/lib/utils';
import { useAgentChat } from '@/query/chat_agent';
import { useUserSession } from '@/query/session';
import { Message as MessageProps } from '@/zustand/slice/workbench/chat-agent';
import { useAgent } from '@/zustand/store';
import Image from 'next/image';
import { memo } from 'react';
import Markdown from 'react-markdown';
import useAgentType from '../../hooks/getChatAgentType';

type UserMessageProps = {
  text: string;
  className?: string;
};
type AgentMessageProps = {
  message: MessageProps;
  className?: string;
};

const User = ({ text, className }: UserMessageProps) => {
  const { data, status: userStatus } = useUserSession();
  return (
    <div className='flex gap-x-2 self-end'>
      <div className={cn(className, 'rounded-lg bg-slate-200 px-4 py-2')}>
        <p className='text-sm leading-6 text-zinc-800'>{text}</p>
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
          className='size-8 rounded-full'
        />
      )}
    </div>
  );
};

const Agent = ({ message, className }: AgentMessageProps) => {
  const { storeType } = useAgentType();
  const setOptionsSelected = useAgent(
    (state) => state.setAgentMessageOptionsSelected
  );
  const getSessionId = useAgent((state) => state.getSessionId);
  const { mutateAsync: select, isPending: isSelecting } =
    useAgentChat(storeType);
  const setAgentMessageSelectionDone = useAgent(
    (state) => state.setAgentMessageSelectionDone
  );
  const handleConfirmSelection = async () => {
    await select({
      response:
        message.options_type === 'multi'
          ? message.options_selected!
          : message.options_selected![0],
      agent:
        storeType === 'brainstorming'
          ? CHATAGENT_TYPE.BS
          : storeType === 'outline'
            ? CHATAGENT_TYPE.OL
            : storeType === 'draft'
              ? CHATAGENT_TYPE.DR
              : CHATAGENT_TYPE.REGULAR,
      session_id: getSessionId(storeType),
    });
    setAgentMessageSelectionDone(message.id, storeType);
  };
  return (
    <div className='flex w-full gap-x-2'>
      <Image
        src='/chat/max.png'
        alt='Agent'
        width={40}
        height={40}
        className='size-8'
      />
      <div
        className={cn(
          className,
          'overflow-x-hidden rounded-lg bg-white px-4 py-2'
        )}
      >
        <Markdown className='prose prose-sm !max-w-none prose-p:my-1 prose-p:leading-6 prose-p:text-zinc-800 prose-strong:text-indigo-500 prose-ol:my-1.5 prose-ul:my-1.5 prose-hr:my-2.5'>
          {message.text}
        </Markdown>
        {message.html_content && (
          <span dangerouslySetInnerHTML={{ __html: message.html_content }} />
        )}
        {message.options && message.options?.length > 0 ? (
          <div className='flex flex-col items-end gap-y-2.5'>
            <ul className='mt-2.5 size-full space-y-2.5'>
              {message.options.map((item, index) => {
                const isSelected = message.options_selected?.includes(index);
                return (
                  <li
                    onClick={() => {
                      if (message.selection_done) return;
                      setOptionsSelected(message.id, storeType, index);
                    }}
                    key={item.id}
                    className={`${isSelected ? 'border-indigo-500 bg-violet-50' : 'border-gray-300 hover:bg-violet-50'} group flex cursor-pointer items-start gap-x-2 rounded-[10px] border px-4 py-2.5`}
                  >
                    <Checkbox
                      onClick={(e) => e.preventDefault()}
                      checked={isSelected}
                      className={`${message.options_type === 'single' ? 'rounded-full' : 'rounded'} mt-0.5 size-4 group-hover:border-indigo-500`}
                    />
                    <Markdown
                      className={`${isSelected ? 'text-indigo-500' : 'text-zinc-600 group-hover:text-indigo-500'} prose prose-sm prose-p:leading-snug`}
                    >
                      {item.label}
                    </Markdown>
                  </li>
                );
              })}
            </ul>
            <Button
              onClick={handleConfirmSelection}
              disabled={
                message.options_selected?.length === 0 ||
                !message.options_selected ||
                isSelecting ||
                message.selection_done
              }
              role='button'
            >
              Confirm
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const Message = {
  User: memo(User),
  Agent: memo(Agent),
};

export default Message;
