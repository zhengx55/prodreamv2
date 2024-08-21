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
        <p className='base-regular text-zinc-800'>{text}</p>
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

const Agent = ({ message, className }: AgentMessageProps) => {
  const setOptionsSelected = useAgent(
    (state) => state.setAgentMessageOptionsSelected
  );
  const getSessionId = useAgent((state) => state.getSessionId);
  const { mutateAsync: select, isPending: isSelecting } = useAgentChat('chat');
  const setAgentMessageSelectionDone = useAgent(
    (state) => state.setAgentMessageSelectionDone
  );
  const handleConfirmSelection = async () => {
    await select({
      response:
        message.options_type === 'multi'
          ? message.options_selected!
          : message.options_selected![0],
      agent: CHATAGENT_TYPE.REGULAR,
      session_id: getSessionId('chat'),
    });
    setAgentMessageSelectionDone(message.id, 'chat');
  };
  return (
    <div className='flex w-full gap-x-2'>
      <Image
        src='/chat/max.png'
        alt='Agent'
        width={40}
        height={40}
        className='size-10'
      />
      <div
        className={cn(
          className,
          'overflow-x-hidden rounded-lg bg-white px-4 py-2'
        )}
      >
        <Markdown className='prose prose-base !max-w-none prose-p:my-1 prose-p:leading-normal prose-p:text-zinc-800 prose-strong:text-indigo-500 prose-ol:my-1'>
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
                      setOptionsSelected(message.id, 'chat', index);
                    }}
                    key={item.id}
                    className={`${isSelected ? 'border-indigo-500 bg-violet-50' : 'border-transparent hover:bg-violet-50'} t group flex cursor-pointer items-center gap-x-2 rounded-[10px] border px-4 py-2.5`}
                  >
                    <Checkbox
                      onClick={(e) => e.preventDefault()}
                      checked={isSelected}
                      className={`${message.options_type === 'single' ? 'rounded-full' : 'rounded'} group-hover:border-indigo-500`}
                    />
                    <Markdown
                      className={`${isSelected ? 'text-indigo-500' : 'text-zinc-600 group-hover:text-indigo-500'} prose prose-sm`}
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
