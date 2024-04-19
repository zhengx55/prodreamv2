import { Button } from '@/components/ui/button';
import { EditorDictType } from '@/types';
import { useAIEditor, useChatbot } from '@/zustand/store';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, Clock, XCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
const ResearchHistory = dynamic(() => import('./ResearchHistory'));
const DeleteModal = dynamic(() => import('../chat/history/DeleteModal'));

type Props = { t: EditorDictType };
const ResearchChat = ({ t }: Props) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const closeRightbar = useAIEditor((state) => state.closeRightbar);
  const updateChatType = useChatbot((state) => state.updateChatType);
  return (
    <div
      ref={setContainer}
      className='flex w-full flex-1 flex-col overflow-hidden'
    >
      <AnimatePresence>
        {showHistory && <ResearchHistory t={t} />}
      </AnimatePresence>
      <DeleteModal t={t} container={container} />

      <div className='flex-between mb-4'>
        <div className='flex items-center gap-x-1'>
          <Button
            role='button'
            onClick={() => updateChatType(null)}
            variant={'icon'}
            className='size-max p-1'
          >
            <ChevronLeft size={18} />
          </Button>
          <h2 className='title-medium'>Al Research</h2>
          <Button
            role='button'
            onClick={() => setShowHistory(true)}
            variant={'icon'}
            className='size-max p-1'
          >
            <Clock size={18} />
          </Button>
        </div>
        <XCircle
          size={20}
          onClick={closeRightbar}
          className='shrink-0 cursor-pointer text-shadow hover:opacity-50'
        />
      </div>
    </div>
  );
};
export default memo(ResearchChat);
