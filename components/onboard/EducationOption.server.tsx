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
      className='flex h-[132px] w-4/5 cursor-pointer items-center justify-evenly self-center rounded-3xl border border-zinc-300 bg-white py-4 hover:bg-slate-50 sm:h-[192px] sm:w-full sm:justify-start sm:gap-x-12 sm:py-5 sm:pl-10'
    >
      <Image
        src={`/onboard/education/education0${index + 1}.png`}
        alt={(dict.Onboard.Education as any)['Option' + (index + 1)]}
        width={150}
        height={150}
        priority
        className='h-[72px]  w-[60px] object-cover sm:h-[115px] sm:w-[95px]'
      />
      <h2 className='text-lg font-medium text-slate-600 sm:text-2xl'>
        {(dict.Onboard.Education as any)['Option' + (index + 1)]}
      </h2>
      {/* <p className='small-regular sm:base-regular text-center leading-loose text-neutral-600'>
        {
          (dict.Onboard.Education as any)[
            'Option' + (index + 1) + 'Description'
          ]
        }
      </p> */}
    </div>
  );
};
export default EducationOption;
