import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useAutoSizeTextArea from '@/hooks/useAutoSizeTextArea';
import { EditorDictType } from '@/types';
import { m } from 'framer-motion';
import { useParams } from 'next/navigation';
import { memo, useRef } from 'react';
import useResearchChat from '../hooks/useResearchChat';

type Props = { t: EditorDictType };
const ResearchInput = (props: Props) => {
  const chatRef = useRef<HTMLTextAreaElement>(null);
  const { id } = useParams();
  const { aiResearchChat, value, updateChatMessage, aiChatSending } =
    useResearchChat();

  useAutoSizeTextArea(chatRef.current, value, 96);
  const handleValueChnage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateChatMessage(e.target.value);
  };

  const submit = async () => {};
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className='relative flex flex-col
     rounded-lg border border-gray-200 p-2'
    >
      <Textarea
        ref={chatRef}
        autoFocus
        aria-label='chat-textarea'
        onKeyDown={(e) => {
          if (e.code === 'Enter' && !e.shiftKey) {
            e.preventDefault();
          }
        }}
        className='small-regular min-h-14 w-full border-none py-2 pl-0 pr-5 focus-visible:ring-0'
        id='chat-textarea'
        value={value}
        disabled={aiChatSending}
        onChange={handleValueChnage}
        placeholder='Ask a research question or search for data'
      />
      <Button
        onClick={submit}
        disabled={!value.trim() || aiChatSending}
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
    </m.div>
  );
};
export default memo(ResearchInput);
