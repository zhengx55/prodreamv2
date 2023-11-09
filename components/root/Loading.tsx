import { Loader2 } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <div className='flex-center h-full w-full'>
      <Loader2 size={24} className=' animate-spin' />
    </div>
  );
};

export default Loading;
