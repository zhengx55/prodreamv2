import { ChevronLeft } from 'lucide-react';
import { memo } from 'react';

const BackButton = ({ onBack }: { onBack: () => void }) => {
  return (
    <div
      className='flex cursor-pointer items-center hover:underline'
      onClick={onBack}
    >
      <ChevronLeft className='text-black' />
      <h1 className='small-semibold text-black'>Back</h1>
    </div>
  );
};

export default memo(BackButton);
