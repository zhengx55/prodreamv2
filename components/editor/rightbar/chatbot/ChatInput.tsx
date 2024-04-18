import Icon from '@/components/root/Icon';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useAutoSizeTextArea from '@/hooks/useAutoSizeTextArea';
import { EditorDictType } from '@/types';
import { useChatbot } from '@/zustand/store';
import type { UseMutateAsyncFunction } from '@tanstack/react-query';
import { History, Paperclip, Plus, Search } from 'lucide-react';
import { memo, useRef } from 'react';

type Props = {
  t: EditorDictType;
  value: string;
  updateValue: (value: string) => void;
  sending: boolean;
  session: string | null;
  mutateFn: UseMutateAsyncFunction<
    any,
    Error,
    {
      session_id: string | null;
      query: string;
    },
    void
  >;
};
const ChatInput = ({
  t,
  value,
  updateValue,
  session,
  mutateFn,
  sending,
}: Props) => {
  const chatRef = useRef<HTMLTextAreaElement>(null);
  useAutoSizeTextArea(chatRef.current, value, 96);
  const handleValueChnage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateValue(e.target.value);
  };
  const { updateUploadModal } = useChatbot((state) => ({
    ...state,
  }));
  const submit = async () => {
    if (!value.trim()) return;
    await mutateFn({ query: value, session_id: session });
    chatRef.current?.focus();
  };

  return (
    <div className='relative mb-4 mt-auto flex w-full flex-col gap-y-2'>
      <div className='flex-between'>
        <div className='flex items-center gap-x-1'>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex-between group min-w-52 cursor-pointer gap-x-2 rounded-lg border border-gray-200 bg-white p-2 data-[state=open]:bg-zinc-100 hover:bg-zinc-100'>
                <div className='flex items-center gap-x-2'>
                  <Icon
                    alt=''
                    src={ChatbotEngine[engine].icon}
                    width={16}
                    height={16}
                  />
                  <p className='small-regular text-zinc-600'>
                    {ChatbotEngine[engine].title}
                  </p>
                </div>
                <ChevronDown
                  size={20}
                  className='text-zinc-600 transition-transform group-data-[state=open]:rotate-180'
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='top' className='w-52 bg-white'>
              {ChatbotEngine.map((engine, index) => {
                return (
                  <DropdownMenuItem
                    className='flex cursor-pointer items-center gap-x-2 hover:bg-zinc-100'
                    key={engine.id}
                    onClick={() => updateEngine(index)}
                  >
                    <Icon alt='' src={engine.icon} width={16} height={16} />
                    {engine.title}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu> */}
          <Button role='button' className='size-max px-1' variant={'icon'}>
            <Search size={16} className='cursor-pointer' />
            <p className='small-regular'>Research</p>
          </Button>
          <Button
            onClick={() => updateUploadModal(true)}
            role='button'
            className='size-max px-1'
            variant={'icon'}
          >
            <Paperclip size={16} className='cursor-pointer' />
            <p className='small-regular'>Upload files</p>
          </Button>
        </div>
        <div className='flex items-center gap-x-2'>
          <Tooltip side='top' tooltipContent='History'>
            <Button variant={'icon'} role='button' className='p-2'>
              <History size={18} className='text-zinc-600' />
            </Button>
          </Tooltip>
          <Tooltip side='top' tooltipContent='New Chat'>
            <Button variant={'icon'} role='button' className='p-2'>
              <Plus
                size={18}
                className='cursor-pointer rounded-full bg-violet-500 text-white'
              />
            </Button>
          </Tooltip>
        </div>
      </div>
      <Textarea
        ref={chatRef}
        autoFocus
        aria-label='chat-textarea'
        onKeyDown={(e) => {
          if (e.code === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        className='small-regular h-14 w-full rounded-lg py-2 pl-2 pr-7 focus-visible:ring-0'
        id='chat-textarea'
        value={value}
        disabled={sending}
        onChange={handleValueChnage}
        placeholder='Message Dream Cat AI...'
      />
      <Button
        onClick={submit}
        disabled={!value.trim() || sending}
        className='absolute bottom-2 right-2 h-max w-max p-0'
        variant={'ghost'}
        type='button'
      >
        <Icon
          alt='messaging'
          width={18}
          height={18}
          src={
            !value.trim
              ? '/editor/chatbot/Send_disable.svg'
              : '/editor/chatbot/Send.svg'
          }
        />
      </Button>
    </div>
  );
};
export default memo(ChatInput);
