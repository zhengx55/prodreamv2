'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useRootStore from '@/zustand/store';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const HistoryTop = () => {
  const clear = useRootStore((state) => state.clearalData);
  return (
    <div className='flex-between w-full rounded-xl bg-white p-6'>
      <div className='flex flex-col gap-y-4'>
        <h1 className='h3-semibold'>
          Create a successful Activity List with one click
        </h1>
        <div className='flex items-center gap-x-3'>
          <Badge className='bg-[#FFFBD6]'>Meet Character Limit </Badge>
          <Badge className='bg-[#EBFFE4]'>Use Stronger Verbs</Badge>
          <Badge className='bg-[#EBF8FF]'>Demonstrate abilities</Badge>
        </div>
      </div>
      <Link href={'/writtingpal/activityList'}>
        <Button onClick={clear} className='gap-x-2 px-8 py-3'>
          <Plus size={22} />
          New Activity List
        </Button>
      </Link>
    </div>
  );
};

export default HistoryTop;
