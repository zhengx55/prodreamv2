import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

type Props = { progress: number };

const PlagiarismLoading = ({ progress }: Props) => {
  return (
    <div className='flex-center h-max w-full flex-col gap-y-4 rounded-lg bg-white p-4'>
      <Image
        src='/workbench/plagiarism_loading.png'
        alt='loading'
        width={200}
        height={200}
        className='size-[180px]'
      />
      <Progress value={progress} />

      <p className='text-center text-sm font-normal text-zinc-600'>
        May take up to 5 minutes, thank you for waiting
      </p>
      <Button variant={'outline'} className='h-10 w-60'>
        Cancel
      </Button>
    </div>
  );
};

export default PlagiarismLoading;
