import Icon from '@/components/root/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { ChatbotEngine } from '@/constant';
import { EditorDictType } from '@/types';
import { ChevronDown, History, Paperclip, Plus } from 'lucide-react';
import { useRef } from 'react';

type Props = {
  t: EditorDictType;
  engine: number;
  update: (value: number) => void;
};
const ChatInput = ({ t, engine, update }: Props) => {
  const chatRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className='mb-4 mt-auto flex w-full flex-col gap-y-2'>
      <div className='flex-between'>
        <div className='flex items-center gap-x-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex-between group min-w-52 cursor-pointer gap-x-2 rounded border border-gray-200 bg-white p-2 data-[state=open]:bg-zinc-100 hover:bg-zinc-100'>
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
                    onClick={() => update(index)}
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
        className='small-regular w-full rounded-lg p-2 focus-visible:ring-0'
        id='chat-textarea'
        placeholder='message Dream Cat AI...'
      />
    </div>
  );
};
export default ChatInput;
