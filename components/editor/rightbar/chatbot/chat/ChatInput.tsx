import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import useAutoSizeTextArea from '@/hooks/useAutoSizeTextArea';
import { EditorDictType } from '@/types';
import { useChatbot } from '@/zustand/store';
import {
  FileText,
  History,
  Loader2,
  Paperclip,
  Plus,
  Search,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { memo, useRef } from 'react';
import useChat from '../hooks/useChat';

type Props = {
  t: EditorDictType;
};
const ChatInput = ({ t }: Props) => {
  const chatRef = useRef<HTMLTextAreaElement>(null);
  const { sending, value, updateChatMessage, submitChat } = useChat();

  const { id } = useParams();
  useAutoSizeTextArea(chatRef.current, value, 96);
  const handleValueChnage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateChatMessage(e.target.value);
  };
  const updateUploadModal = useChatbot((state) => state.updateUploadModal);
  const fileUploading = useChatbot((state) => state.fileUploading);
  const currentFile = useChatbot((state) => state.currentFile);
  const updateChatType = useChatbot((state) => state.updateChatType);
  const currentSession = useChatbot((state) => state.currentSession);
  const openHistory = useChatbot((state) => state.openHistory);
  const chatType = useChatbot((state) => state.chatType);
  const updateCurrentSession = useChatbot(
    (state) => state.updateCurrentSession
  );
  const updateMessageList = useChatbot((state) => state.updateMessageList);

  const submit = async () => {
    if (!value.trim()) return;
    if (!chatType || chatType === 'pdf') {
      updateChatType('pdf');
      await submitChat({
        query: value,
        session_id: currentSession,
        document_id: id as string,
      });
    }
    chatRef.current?.focus();
  };

  return (
    <div className='relative mb-4 mt-auto flex w-full flex-col gap-y-2'>
      <div className='flex-between'>
        <div className='flex items-center gap-x-2'>
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
          <Button
            role='button'
            onClick={() => updateChatType('research')}
            className='size-max px-1'
            variant={'icon'}
          >
            <Search size={16} className='cursor-pointer' />
            <p className='small-regular'>Research</p>
          </Button>
          <Button
            onClick={() => {
              updateUploadModal(true);
              updateChatType('pdf');
            }}
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
            <Button
              onClick={openHistory}
              variant={'icon'}
              role='button'
              className='p-2'
            >
              <History size={18} className='text-zinc-600' />
            </Button>
          </Tooltip>
          <Tooltip side='top' tooltipContent='New Chat'>
            <Button
              variant={'icon'}
              role='button'
              onClick={() => {
                if (!chatType) return;
                updateChatType(null);
                updateMessageList([]);
              }}
              className='p-2'
            >
              <Plus
                size={18}
                className='cursor-pointer rounded-full bg-violet-500 text-white'
              />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className='flex flex-col rounded-lg border border-gray-200 p-2'>
        {currentFile ? (
          <>
            <div className='flex-between bg-stone-50 p-2'>
              <div className='flex items-center gap-x-2'>
                <span className='flex-center size-8 rounded bg-violet-500'>
                  {fileUploading ? (
                    <Loader2 className='animate-spin text-white' size={22} />
                  ) : (
                    <FileText size={22} className='text-white' />
                  )}
                </span>
                <div className='flex max-w-14 flex-col'>
                  <h3 className='small-regular line-clamp-1 text-zinc-600'>
                    {currentFile.name}
                  </h3>
                  <p className='subtle-regular text-zinc-500'>PDF</p>
                </div>
              </div>
              <Button
                disabled={fileUploading}
                variant={'outline'}
                className='size-max rounded border-none bg-gray-200 px-2 py-2 text-zinc-600'
                role='button'
              >
                <Icon
                  alt='summerize-pdf'
                  width={20}
                  height={20}
                  src='/editor/chatbot/Summerize.svg'
                />
                Summarize
              </Button>
            </div>
            <Spacer y='8' />
            <Separator className='bg-gray-200' orientation='horizontal' />
          </>
        ) : null}
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
          className='small-regular min-h-14 w-full border-none py-2 pl-0 pr-5 focus-visible:ring-0'
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
    </div>
  );
};
export default memo(ChatInput);
