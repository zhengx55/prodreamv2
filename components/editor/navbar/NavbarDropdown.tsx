'use client';
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { FileOutput } from 'lucide-react';
import { memo } from 'react';

const NavbarDropdown = () => {
  const handleExportPdf = async () => {};
  return (
    <DropdownMenuContent
      side='bottom'
      align='end'
      sideOffset={2}
      className='bg-white'
    >
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          handleExportPdf();
        }}
        className='flex cursor-pointer gap-x-2 text-shadow hover:bg-shadow-50'
      >
        <FileOutput size={16} />
        Export
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
export default memo(NavbarDropdown);
