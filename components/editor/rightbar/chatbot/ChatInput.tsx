import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { ChatbotEngine } from '@/constant';
import useAutoSizeTextArea from '@/hooks/useAutoSizeTextArea';
import { EditorDictType } from '@/types';
import type { UseMutateAsyncFunction } from '@tanstack/react-query';
import { ChevronDown, History, Paperclip, Plus } from 'lucide-react';
import { memo, useRef } from 'react';

type Props = {
  t: EditorDictType;
  engine: number;
  updateEngine: (value: number) => void;
  value: string;
  updateValue: (value: string) => void;
  mutateFn: UseMutateAsyncFunction<
    any,
    Error,
    {
      session_id?: string | undefined;
      query: string;
    },
    void
  >;
};
const ChatInput = ({
  t,
  engine,
  value,
  updateValue,
  updateEngine,
  mutateFn,
}: Props) => {
  const chatRef = useRef<HTMLTextAreaElement>(null);
  useAutoSizeTextArea(chatRef.current, value, 96);
  const handleValueChnage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateValue(e.target.value);
  };
  const submit = async () => {
    if (!value.trim()) return;
    await mutateFn({ query: value });
  };
  return (
    <div className='relative mb-4 mt-auto flex w-full flex-col gap-y-2'>
      <div className='flex-between'>
        <div className='flex items-center gap-x-4'>
          <DropdownMenu>
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
                  className=' text-zinc-600 transition-transform group-data-[state=open]:rotate-180'
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
          </DropdownMenu>
          <Paperclip size={20} className='cursor-pointer text-zinc-600' />
        </div>
        <div className='flex items-center gap-x-4'>
          <History
            size={20}
            className='cursor-pointer transition-transform hover:scale-110'
          />
          <Plus
            size={20}
            className='cursor-pointer rounded-full bg-violet-500 text-white transition-transform hover:scale-110'
          />
        </div>
      </div>
      <Textarea
        ref={chatRef}
        className='small-regular w-full rounded-lg py-2 pl-2 pr-7 focus-visible:ring-0'
        id='chat-textarea'
        value={value}
        onChange={handleValueChnage}
        placeholder='message Dream Cat AI...'
      />
      <Button
        onClick={submit}
        disabled={!value.trim()}
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
