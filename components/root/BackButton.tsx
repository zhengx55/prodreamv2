import { ChevronLeft } from 'lucide-react';
import React, { memo } from 'react';

const BackButton = ({ onBack }: { onBack: () => void }) => {
  return (
    <div
      className='hidden cursor-pointer items-center hover:underline md:flex'
      onClick={onBack}
    >
      <ChevronLeft className='text-black-200' />
      <h1 className='small-semibold text-black-200'>Back</h1>
    </div>
  );
};

export default memo(BackButton);
