import { Button } from '@/components/ui/button';
import { useAIEditor } from '@/zustand/store';
import { RefreshCcw, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
  showRecheck?: boolean;
  recheck?: () => Promise<void>;
};
const Title = ({ showRecheck, recheck }: Props) => {
  const toggleRightbar = useAIEditor((state) => state.toggleRightbar);
  const rightbarTab = useAIEditor((state) => state.rightbarTab);
  const trans = useTranslations('Editor');

  return (
    <div className='flex-between mb-4'>
      <div className='flex items-center gap-x-3'>
        <h2 className='title-medium'>
          {trans(`RightBar.${OPTIONS[rightbarTab]}`)}
        </h2>
        {showRecheck && (
          <Button
            role='button'
            variant={'outline'}
            className='h-max rounded border px-3 py-1'
            onClick={recheck}
          >
            <RefreshCcw size={14} />
            <p className='subtle-regular'>{trans('Plagiarism.recheck')}</p>
          </Button>
        )}
      </div>

      <XCircle
        size={20}
        onClick={toggleRightbar}
        className='shrink-0 cursor-pointer text-neutral-400 hover:opacity-50'
      />
    </div>
  );
};
export default memo(Title);
