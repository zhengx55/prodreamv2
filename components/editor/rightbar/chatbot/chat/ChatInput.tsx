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
  XCircle,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { memo, useRef } from 'react';
import { useHoverDirty } from 'react-use';
import useChat from '../hooks/useChat';

type Props = {
  t: EditorDictType;
};
const ChatInput = ({ t }: Props) => {
  const chatRef = useRef<HTMLTextAreaElement>(null);
  const {
    sending,
    isSummarzing,
    summary,
    value,
    updateChatMessage,
    submitChat,
  } = useChat();

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
  const updateMessageList = useChatbot((state) => state.updateMessageList);
  const updateCurrentSession = useChatbot(
    (state) => state.updateCurrentSession
  );

  const summarizeFile = async () => {
    if (!currentFile) return;
    await summary({
      session_id: currentSession,
      document_id: id as string,
      attachment: currentFile,
    });
  };

  const submit = async () => {
    if (!value.trim()) return;
    if (!chatType || chatType === 'pdf') {
      updateChatType('pdf');
      await submitChat({
        query: value,
        session_id: currentSession,
        document_id: id as string,
        attachment: currentFile ?? null,
      });
    }
    chatRef.current?.focus();
  };

  return (
    <div className='relative mb-4 mt-auto flex w-full flex-col gap-y-2'>
      <div className='flex-between'>
        <div className='flex items-center gap-x-2'>
          <Tooltip side='top' tooltipContent='Research'>
            <Button
              role='button'
              onClick={() => updateChatType('research')}
              className='size-max px-1'
              variant={'icon'}
            >
              <Search size={16} className='cursor-pointer' />
            </Button>
          </Tooltip>
          <Tooltip side='top' tooltipContent='Upload file'>
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
            </Button>
          </Tooltip>
        </div>
        <div className='flex items-center gap-x-2'>
          <Tooltip side='top' tooltipContent='History'>
            <Button
              onClick={openHistory}
              variant={'icon'}
              role='button'
              className='size-max p-1'
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
                updateCurrentSession(null);
              }}
              className='size-max p-1'
            >
              <Plus
                size={18}
                className='cursor-pointer rounded-full bg-violet-500 text-white'
              />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className='flex flex-col rounded-lg border border-gray-200 px-2 pb-0 pt-2'>
        {(currentFile || fileUploading) && (
          <FileDisplay
            sending={sending}
            isSummarizing={isSummarzing}
            summarizeFile={summarizeFile}
          />
        )}
        <div className='relative'>
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
            className='small-regular min-h-14 w-full border-none py-2 pl-0 pr-10 focus-visible:ring-0'
            id='chat-textarea'
            value={value}
            disabled={sending || isSummarzing}
            onChange={handleValueChnage}
            placeholder='Message Jessica...'
          />
          <Button
            onClick={submit}
            variant={'icon'}
            disabled={!value.trim() || sending || fileUploading || isSummarzing}
            className='absolute bottom-2 right-2 size-max p-0'
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
    </div>
  );
};
export default memo(ChatInput);

type FileIconProps = {
  uploading: boolean;
};

type FileInfoProps = {
  filename: string;
};

type SummarizeButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

type FileDisplayProps = {
  sending: boolean;
  isSummarizing: boolean;
  summarizeFile: () => void;
};

const FileIcon: React.FC<FileIconProps> = memo(({ uploading }) => (
  <span className='flex-center size-8 rounded bg-violet-500'>
    {uploading ? (
      <Loader2 className='animate-spin text-white' size={22} />
    ) : (
      <FileText size={22} className='text-white' />
    )}
  </span>
));

const FileInfo: React.FC<FileInfoProps> = memo(({ filename }) => (
  <div className='flex max-w-14 flex-col'>
    <h3 className='small-regular line-clamp-1 text-zinc-600'>{filename}</h3>
    <p className='subtle-regular text-zinc-500'>PDF</p>
  </div>
));

const SummarizeButton: React.FC<SummarizeButtonProps> = memo(
  ({ onClick, disabled }) => (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant='outline'
      className='size-max rounded border-none bg-gray-200 px-2 py-2 text-zinc-600'
      role='button'
    >
      <Icon
        alt='summarize-pdf'
        width={20}
        height={20}
        src='/editor/chatbot/Summarize.svg'
      />
      Summarize
    </Button>
  )
);

const FileDisplay: React.FC<FileDisplayProps> = memo(
  ({ sending, isSummarizing, summarizeFile }) => {
    const fileUploading = useChatbot((state) => state.fileUploading);
    const currentFile = useChatbot((state) => state.currentFile);
    const updateCurrentFile = useChatbot((state) => state.updateCurrentFile);
    const ref = useRef<HTMLDivElement>(null);
    const isHovering = useHoverDirty(ref, true);
    const disableSummarizeButton = fileUploading || sending || isSummarizing;
    return (
      <>
        <div
          ref={ref}
          className='flex-between relative cursor-pointer bg-stone-50 p-2'
        >
          {isHovering && (
            <Button
              role='button'
              variant={'icon'}
              onClick={() => {
                updateCurrentFile(null);
              }}
              className='absolute -right-1 -top-1 z-50 size-max p-0'
            >
              <XCircle size={22} className='fill-black text-white' />
            </Button>
          )}

          <div className='flex items-center gap-x-2'>
            <FileIcon uploading={fileUploading} />
            <FileInfo filename={currentFile?.filename || ''} />
          </div>
          <SummarizeButton
            onClick={summarizeFile}
            disabled={disableSummarizeButton}
          />
        </div>
        <Spacer y='8' />
        <Separator className='bg-gray-200' orientation='horizontal' />
      </>
    );
  }
);
