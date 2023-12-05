import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { memo } from 'react';
const Bulletin = dynamic(() => import('../../notification/Bulletin'));

const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex-center h-11 w-11 cursor-pointer rounded-full bg-primary-50 text-primary-200 transition-transform hover:scale-110 data-[state=open]:bg-primary-200 data-[state=open]:text-primary-50 '>
          <Bell size={22} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex flex-col bg-white p-4 md:h-[450px] md:w-[630px]'>
        <Bulletin />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(Notification);
