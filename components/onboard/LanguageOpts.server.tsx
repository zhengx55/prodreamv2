'use client';
import { getDictionary } from '@/lib/get-dictionary';
import Image from 'next/image';
type Props = {
  index: number;
  dict: Awaited<ReturnType<typeof getDictionary>>;
};
const LanguageOptions = ({ index, dict }: Props) => {
  return (
    <div
      aria-label='education option'
      className='flex h-[420px] w-[460px] cursor-pointer flex-col items-center justify-between rounded-3xl border border-zinc-300 bg-white px-4 py-5 hover:bg-slate-50'
    >
      <h2 className='text-2xl font-medium text-slate-600'>
        {(dict.Onboard.Language as any)['Option' + (index + 1)]}
      </h2>
      <Image
        src={`/onboard/language/language0${index + 1}.png`}
        alt={(dict.Onboard.Language as any)['Option' + (index + 1)]}
        className='h-[280px] w-auto'
        width={300}
        height={300}
        priority
      />
    </div>
  );
};
export default LanguageOptions;
