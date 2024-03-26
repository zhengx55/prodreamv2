import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className='flex-center h-full w-full'>
      <Loader2 size={26} className='animate-spin text-violet-500' />
    </div>
  );
};

export default Loading;
