'use client';
import { getDictionary } from '@/lib/get-dictionary';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Props = {
  index: number;
  dict: Awaited<ReturnType<typeof getDictionary>>;
  onClick: (index: number) => Promise<void>;
};
const LanguageOptions = ({ index, dict, onClick }: Props) => {
  const t = useTranslations('Onboard');

  return (
    <div
      onClick={() => onClick(index)}
      aria-label='language option'
      className='flex h-52 w-full cursor-pointer flex-col items-center justify-between rounded-3xl border border-zinc-300 bg-white px-4 py-5 hover:bg-slate-50 sm:h-[420px] sm:w-[460px]'
    >
      <h2 className='text-lg font-medium text-slate-600 sm:text-2xl'>
        {t(`Language_Option_${index + 1}`)}
      </h2>
      <div className='relative h-28 w-[110px] overflow-hidden sm:h-[280px] sm:w-[275px]'>
        <Image
          src={`/onboard/language/language0${index + 1}.png`}
          alt={t(`Language_Option_${index + 1}`)}
          fill
          className='object-contain'
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
        />
      </div>
    </div>
  );
};
export default LanguageOptions;
