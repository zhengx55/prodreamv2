import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useAutoSizeTextArea from '@/hooks/useAutoSizeTextArea';
import { EditorDictType } from '@/types';
import { useChatbot } from '@/zustand/store';
import { m } from 'framer-motion';
import { Search } from 'lucide-react';
import { useParams } from 'next/navigation';
import { memo, useRef } from 'react';
import useResearchChat from '../hooks/useResearchChat';

type Props = { t: EditorDictType };
const ResearchInput = ({ t }: Props) => {
  const chatRef = useRef<HTMLTextAreaElement>(null);
  const { id } = useParams();
  const { aiResearchChat, value, updateChatMessage, aiChatSending } =
    useResearchChat();
  const currentResearchSession = useChatbot(
    (state) => state.currentResearchSession
  );
  useAutoSizeTextArea(chatRef.current, value, 72);
  const handleValueChnage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateChatMessage(e.target.value);
  };

  const submit = async () => {
    if (!value.trim()) return;

    await aiResearchChat({
      query: value,
      session_id: currentResearchSession,
      document_id: id as string,
    });

    chatRef.current?.focus();
  };
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className='relative flex flex-col rounded-lg border border-gray-200 p-2'
    >
      <Textarea
        ref={chatRef}
        autoFocus
        aria-label='airesearch-textarea'
        onKeyDown={async (e) => {
          if (e.code === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            await submit();
          }
        }}
        className='small-regular h-[36px] min-h-[36px] border-none pl-0 pr-10 focus-visible:ring-0'
        id='chat-textarea'
        value={value}
        disabled={aiChatSending}
        onChange={handleValueChnage}
        placeholder='Ask a research question or search for data'
      />
      <Button
        onClick={submit}
        disabled={!value.trim() || aiChatSending}
        className='absolute bottom-0 right-0 top-0 h-full w-max px-2.5 py-2'
        type='button'
      >
        <Search className='text-white' />
      </Button>
    </m.div>
  );
};
export default memo(ResearchInput);
