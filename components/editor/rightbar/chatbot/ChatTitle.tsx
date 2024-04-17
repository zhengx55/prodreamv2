import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { XCircle } from 'lucide-react';
import { memo } from 'react';

type Props = { t: EditorDictType; title: string };
const ChatTitle = ({ t, title }: Props) => {
  const closeRightbar = useAIEditor((state) => state.closeRightbar);

  return (
    <div className='flex-between mb-4'>
      <div className='flex items-center gap-x-4'>
        <h2 className='title-medium'>{title}</h2>
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
