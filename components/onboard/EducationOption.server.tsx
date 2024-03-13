'use client';

import { getDictionary } from '@/lib/get-dictionary';
import Image from 'next/image';

type Props = {
  index: number;
  dict: Awaited<ReturnType<typeof getDictionary>>;
  onClick: (index: number) => Promise<{ message: string } | undefined>;
};
const EducationOption = ({ index, dict, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(index)}
      aria-label='education option'
      className='flex h-[420px] w-96 cursor-pointer flex-col items-center justify-between rounded-3xl border border-zinc-300 bg-white px-4 py-5 hover:bg-slate-50'
    >
      <h2 className='text-2xl font-medium text-slate-600'>
        {(dict.Onboard.Education as any)['Option' + (index + 1)]}
      </h2>

      <Image
        src={`/onboard/education/education0${index + 1}.png`}
        alt={(dict.Onboard.Education as any)['Option' + (index + 1)]}
        className='h-[190px] w-40'
        width={150}
        priority
        height={200}
      />
      <p className='base-regular text-center leading-loose text-neutral-600'>
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
