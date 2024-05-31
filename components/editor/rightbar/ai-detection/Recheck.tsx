import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { EditorDictType } from '@/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { memo } from 'react';

const Recheck = ({ recheck }: { recheck: () => void }) => {
  const trans = useTranslations('Editor');

  return (
    <div className='flex flex-1 flex-col'>
      <p className='base-medium'>{trans('Detection.Humanizer')}</p>
      <Spacer y='14' />
      <div className='flex h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-4'>
        <Image
          src='/editor/Detection-recheck.png'
          alt='Upgrade check'
          width={200}
          height={200}
          className='size-44 self-center'
        />
        <p className='text-center text-sm font-normal text-zinc-600'>
          {trans('Detection.recheck_title')}
        </p>
        <Button
          className='base-regular size-max self-center rounded-lg px-8'
          role='button'
          onClick={recheck}
        >
          {trans('Detection.recheck_button')}
        </Button>
      </div>
    </div>
  );
};

export default memo(Recheck);
