import { Button } from '@/components/ui/button';
import { EditorDictType } from '@/types';
import { useAIEditor, useChatbot } from '@/zustand/store';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, Clock, XCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
const ResearchHistory = dynamic(() => import('./ResearchHistory'));

type Props = { t: EditorDictType };
const ReserchTitle = ({ t }: Props) => {
  const updateChatType = useChatbot((state) => state.updateChatType);
  const [showHistory, setShowHistory] = useState(false);
  const closeRightbar = useAIEditor((state) => state.closeRightbar);
  return (
    <div className='flex-between mb-4'>
      <AnimatePresence>
        {showHistory && <ResearchHistory t={t} />}
      </AnimatePresence>
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
  );
};
export default memo(ReserchTitle);
