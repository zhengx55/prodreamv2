import { Button } from '@/components/ui/button';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { RefreshCcw, XCircle } from 'lucide-react';
import { memo } from 'react';

const OPTIONS = [
  'Grammar_Check',
  'Plagiarism_Check',
  'AI_Detection',
  'Citation',
  'My_Citation_Library',
  'Generate',
];

type Props = {
  t: EditorDictType;
  showRecheck?: boolean;
  recheck?: () => Promise<void>;
};
const Title = ({ t, showRecheck, recheck }: Props) => {
  const toggleRightbar = useAIEditor((state) => state.toggleRightbar);
  const rightbarTab = useAIEditor((state) => state.rightbarTab);

  return (
    <div className='flex-between mb-4'>
      <h2 className='title-medium'>
        {t.RightBar[OPTIONS[rightbarTab] as keyof typeof t.RightBar]}
      </h2>
      {showRecheck && (
        <Button
          role='button'
          variant={'ghost'}
          className='h-max rounded border px-4 py-1 text-zinc-600 hover:transform-none'
          onClick={recheck}
        >
          <RefreshCcw size={14} />
          <p className='subtle-regular'>{t.Plagiarism.recheck}</p>
        </Button>
      )}
      <XCircle
        size={20}
        onClick={toggleRightbar}
        className='shrink-0 cursor-pointer text-shadow hover:opacity-50'
      />
    </div>
  );
};
export default memo(Title);
