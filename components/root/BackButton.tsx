import { ChevronLeft } from 'lucide-react';
import React, { memo } from 'react';

const BackButton = () => {
  return (
    <div className='absolute left-12 top-10 flex cursor-pointer items-center hover:underline'>
      <ChevronLeft />
      <h1 className='title-semibold text-black-200'>Back</h1>
    </div>
  );
};

export default memo(BackButton);
