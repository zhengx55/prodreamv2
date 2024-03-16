'use client';

import { getDictionary } from '@/lib/get-dictionary';
import Image from 'next/image';

type Props = {
  index: number;
  dict: Awaited<ReturnType<typeof getDictionary>>;
  onClick: (index: number) => Promise<void>;
};
const EducationOption = ({ index, dict, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(index)}
      aria-label='education option'
      className='flex h-52 w-full cursor-pointer flex-col items-center justify-between rounded-3xl border border-zinc-300 bg-white py-3 hover:bg-slate-50 sm:h-[420px] sm:w-96 sm:px-4 sm:py-5'
    >
      <h2 className='text-lg font-medium text-slate-600 sm:text-2xl'>
        {(dict.Onboard.Education as any)['Option' + (index + 1)]}
      </h2>
      <div className='relative h-[87px] w-20 overflow-hidden sm:h-[190px] sm:w-40'>
        <Image
          src={`/onboard/education/education0${index + 1}.png`}
          alt={(dict.Onboard.Education as any)['Option' + (index + 1)]}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
        />
      </div>
      <p className='small-regular sm:base-regular text-center leading-loose text-neutral-600'>
        {
          (dict.Onboard.Education as any)[
            'Option' + (index + 1) + 'Description'
          ]
        }
      </p>
    </div>
  );
};
export default EducationOption;
