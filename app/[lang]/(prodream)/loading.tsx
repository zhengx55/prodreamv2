import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex flex-1 flex-col overflow-hidden rounded-lg bg-white'>
      <div className='h-[63px] border-b bg-white' />
      <div className='flex-center flex-1 bg-[#F6F7FB]'>
        <Loader2 size={32} className='animate-spin text-indigo-500' />
      </div>
    </div>
  );
}
