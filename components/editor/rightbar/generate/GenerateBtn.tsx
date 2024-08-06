import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { EditorDictType } from '@/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { forwardRef, memo } from 'react';

type Props = {
  type: string;
  handleGenerate: () => Promise<void>;
  t: EditorDictType;
};
const GenerateBtn = ({ handleGenerate, type, t }: Props) => {
  const trans = useTranslations('Editor');

  return (
    <div className='flex flex-col'>
      <Spacer y='10' />
      <div className='flex-center relative h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-4'>
        <Image
          src='/editor/Generate.png'
          alt='generate-img'
          priority
          width={210}
          height={270}
          className='h-auto w-auto object-contain'
        />
        <p className='base-regular text-center text-neutral-400'>
          {trans(`Generate.SubTitle.${type}`)}
        </p>

        <Btn label={trans('Utility.Generate')} onClick={handleGenerate} />
      </div>
    </div>
  );
};

const Btn = forwardRef<
  HTMLButtonElement,
  {
    onClick: () => Promise<void>;
    label: string;
  }
>(({ onClick, label }, ref) => (
  <Button
    ref={ref}
    onClick={onClick}
    className='size-max self-center rounded bg-violet-500 px-8 py-2'
  >
    {label}
  </Button>
));
Btn.displayName = 'Btn';

export default memo(GenerateBtn);
