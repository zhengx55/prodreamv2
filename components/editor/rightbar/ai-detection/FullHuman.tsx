import { EditorDictType } from '@/types';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

const FullHuman = ({ t }: { t: EditorDictType }) => {
  const trans = useTranslations('Editor');

  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-4'>
        <Image
          src='/editor/FullHuman.png'
          alt='Upgrade check'
          width={200}
          height={200}
          className='size-44 self-center'
        />
        <p className='text-center text-sm font-normal text-zinc-600'>
          {trans('Detection.full_human_title')}
        </p>
      </div>
    </div>
  );
};

export default memo(FullHuman);
