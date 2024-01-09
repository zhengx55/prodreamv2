import { memo } from 'react';
import RotbotLoader from '../root/RotbotLoader';

const EditiorLoading = () => {
  return (
    <div className='flex h-full w-1/2 max-w-[750px]'>
      <RotbotLoader
        label='Branstorming'
        labelClass='text-black-200 body-medium'
      />
    </div>
  );
};

export default memo(EditiorLoading);
