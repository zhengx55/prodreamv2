import { Button } from '@/components/ui/button';
import { workbench_rightbar } from '@/constant/workbench_constant';
import Image from 'next/image';
import { memo } from 'react';

type Props = {
  onClick: () => void;
  type: 'detection' | 'grammar' | 'plagiarism' | 'humanizer';
};

const Starter = ({ type, onClick }: Props) => {
  return (
    <div className='flex-center h-max w-full flex-col gap-y-4 rounded-lg bg-white p-4'>
      <Image
        src={workbench_rightbar[type].icon}
        alt={workbench_rightbar[type].button}
        width={200}
        height={200}
        className='size-[180px]'
        priority
      />
      <p className='small-regular text-center text-zinc-600'>
        {workbench_rightbar[type].description}
      </p>
      <Button role='button' className='h-10 w-60' onClick={onClick}>
        {workbench_rightbar[type].button}
      </Button>
    </div>
  );
};

export default memo(Starter);
