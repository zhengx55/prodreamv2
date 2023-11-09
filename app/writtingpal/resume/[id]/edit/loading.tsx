import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex-center flex-1'>
      <Loader2 size={24} className=' animate-spin' />
    </div>
  );
}
