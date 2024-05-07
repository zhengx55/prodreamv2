import '@/lib/tiptap/styles/index.css';
import { useAIEditor } from '@/zustand/store';
import { memo } from 'react';
import Icon from '../../../root/Icon';
import { Button } from '../../../ui/button';
const ChatTrigger = () => {
  const rightbarTab = useAIEditor((state) => state.rightbarTab);
  const updateRightbarTab = useAIEditor((state) => state.updateRightbarTab);
  const closeRightbar = useAIEditor((state) => state.closeRightbar);
  return (
    <Button
      className='absolute bottom-2 right-4 z-50 h-max w-max cursor-pointer border-none bg-transparent p-0'
      role='button'
      variant={'outline'}
      onClick={() =>
        rightbarTab === 6 ? closeRightbar() : updateRightbarTab(6)
      }
    >
      <Icon
        src='/editor/chatbot/trigger.svg'
        alt='trigger_chat'
        height={44}
        width={44}
        priority
        className='size-11'
      />
    </Button>
  );
};
export default memo(ChatTrigger);
