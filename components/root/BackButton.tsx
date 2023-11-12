import { ChevronLeft } from 'lucide-react';
import React, { memo } from 'react';

const BackButton = ({ onBack }: { onBack: () => void }) => {
  return (
    <div
      className='absolute left-12 top-10 hidden cursor-pointer items-center hover:underline md:flex'
      onClick={onBack}
    >
      <ChevronLeft />
      <h1 className='title-semibold text-black-200'>Back</h1>
    </div>
  );
};

export default memo(BackButton);
