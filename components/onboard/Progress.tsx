'use client';

import { usePathname } from 'next/navigation';
import { memo } from 'react';

const Progress = () => {
  const pathname = usePathname();
  const isEducation = pathname.includes('/onboard/education');
  const isLanguages = pathname.includes('/onboard/language');
  const isFirst = !isEducation && !isLanguages && pathname.includes('/onboard');
  return (
    <div className='flex h-1.5 w-56 gap-x-2'>
      <div
        className={`h-full w-16 ${isFirst ? 'bg-doc-primary' : 'bg-violet-50'} rounded-[17px]`}
      />
      <div
        className={`h-full w-16 ${isEducation ? 'bg-doc-primary' : 'bg-violet-50'} rounded-[17px]`}
      />
      <div
        className={`h-full w-16 ${isLanguages ? 'bg-doc-primary' : 'bg-violet-50'} rounded-[17px]`}
      />
    </div>
  );
};
export default memo(Progress);
