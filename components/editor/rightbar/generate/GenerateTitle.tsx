import { Button } from '@/components/ui/button';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { ChevronLeft, XCircle } from 'lucide-react';
import { memo } from 'react';

type Props = { t: EditorDictType };
const GenerateTitle = ({ t }: Props) => {
  const toggleRightbar = useAIEditor((state) => state.toggleRightbar);
  const generateTab = useAIEditor((state) => state.generateTab);
  const setGenerateTab = useAIEditor((state) => state.updateGenerateTab);

  return (
    <div className='flex-between mb-4'>
      <div className='flex items-center gap-x-3'>
        {generateTab !== -1 ? (
          <div className='flex items-center gap-x-2'>
            <Button
              role='button'
              variant={'icon'}
              onClick={() => setGenerateTab(-1)}
              className='size-max p-0.5'
            >
              <ChevronLeft size={20} />
            </Button>
            <h2 className='title-medium capitalize'>
              {t.Generate[generateTab as keyof typeof t.Generate].toString()}
            </h2>
          </div>
        ) : (
          <h2 className='title-medium'>{t.RightBar.Generate}</h2>
        )}
      </div>

      <XCircle
        size={20}
        onClick={toggleRightbar}
        className='shrink-0 cursor-pointer text-shadow hover:opacity-50'
      />
    </div>
  );
};
export default memo(GenerateTitle);
