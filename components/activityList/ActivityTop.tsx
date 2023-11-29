import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { HardDrive } from 'lucide-react';
import Link from 'next/link';

type Props = {};

const ActivityTop = (props: Props) => {
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
      <Link href={'/writtingpal/activityList/history'}>
        <Button className='gap-x-2 px-8 py-3'>
          <HardDrive size={22} /> View History
        </Button>
      </Link>
    </div>
  );
};

export default ActivityTop;
