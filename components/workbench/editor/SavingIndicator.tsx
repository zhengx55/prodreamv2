import Icon from '@/components/root/Icon';
import { useEditor } from '@/zustand/store';
import { Loader } from 'lucide-react';
import { memo } from 'react';

const SavingIndicator = () => {
  const isEditorSaving = useEditor((state) => state.isEditorSaving);

  return isEditorSaving ? (
    <Loader size={20} className='animate-spin text-neutral-400' />
  ) : (
    <Icon
      src='/editor/save.svg'
      alt='save'
      width={20}
      height={20}
      className='h-auto w-5'
    />
  );
};

export default memo(SavingIndicator);
