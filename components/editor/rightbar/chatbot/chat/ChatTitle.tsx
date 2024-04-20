import Icon from '@/components/root/Icon';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { XCircle } from 'lucide-react';
import { memo } from 'react';

type Props = { t: EditorDictType };
const ChatTitle = ({ t }: Props) => {
  const closeRightbar = useAIEditor((state) => state.closeRightbar);
  return (
    <div className='flex-between mb-4'>
      <div className='flex items-center gap-x-2'>
        <Icon
          alt=''
          className='h-8 w-8'
          src='/editor/chatbot/trigger.svg'
          width={32}
          height={32}
        />
        <h2 className='title-medium'>Jessica</h2>
      </div>
      <XCircle
        size={20}
        onClick={closeRightbar}
        className='shrink-0 cursor-pointer text-shadow hover:opacity-50'
      />
    </div>
  );
};
export default memo(ChatTitle);
