import { Button } from '@/components/ui/button';
import Image from 'next/image';

const NonPlagiarised = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className='flex-center h-max w-full flex-col gap-y-4 rounded-lg bg-white p-4'>
      <Image
        src='/workbench/plagiarism_start.png'
        alt='non-plag report'
        width={200}
        height={200}
        className='size-[180px]'
      />
      <p className='text-center text-sm font-normal text-zinc-600'>
        <span className='title-medium text-indigo-500'>0%</span>&nbsp; Overall
        Similarity Score
      </p>
      <Button onClick={onClick} className='h-10 w-60'>
        Recheck
      </Button>
    </div>
  );
};
export default NonPlagiarised;
